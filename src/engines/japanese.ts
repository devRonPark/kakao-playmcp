import Anthropic from '@anthropic-ai/sdk';
import type { TranslateInput, TranslateOutput, CorrectInput, CorrectOutput, ExplainInput, ExplainOutput } from '../types.js';
import { assembleOutput } from './formatter.js';

// ponytail: lazy init — 모듈 로드 시 클라이언트를 즉시 생성하지 않는다
let _client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!_client) _client = new Anthropic();
  return _client;
}

const MODEL = 'claude-haiku-4-5';

const FEW_SHOT = `
예시 (PRD 9.2절 Hepburn 기준):
- 今日 = きょう = kyou = 오늘
- 遅れそう = おくれそう = okuresou = 늦을 것 같아
- 用事 = ようじ = youji = 볼일, 용무
- 予約 = よやく = yoyaku = 예약
`.trim();

function extractJson(text: string): Record<string, unknown> {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = match ? match[1] : text;
  return JSON.parse(jsonStr.trim()) as Record<string, unknown>;
}

async function callEngine(prompt: string, maxTokens = 1024): Promise<Record<string, unknown>> {
  const invoke = async (p: string): Promise<string> => {
    const message = await getClient().messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: p }],
    });
    return message.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('');
  };

  const text = await invoke(prompt);
  try {
    return extractJson(text);
  } catch {
    // ponytail: one retry with stronger fence instruction before failing
    const retryText = await invoke(
      prompt + '\n\n반드시 ```json ... ``` 코드 블록으로만 응답하세요. 다른 텍스트 없이 JSON만 포함하세요.'
    );
    return extractJson(retryText);
  }
}

function buildTranslatePrompt(input: TranslateInput): string {
  const level = input.learner_level ?? 'absolute_beginner';
  const rel = input.relationship ?? 'unknown';
  const tone = input.tone ?? 'natural';

  return `당신은 일본어 초급 학습자를 위한 번역 엔진입니다.

학습자 수준: ${level}
상대방 관계: ${rel}
원하는 말투: ${tone}

${FEW_SHOT}

다음 한국어 문장을 자연스러운 일본어로 변환하고, 아래 JSON 형식으로만 응답하세요.
반드시 \`\`\`json ... \`\`\` 코드 블록으로 감싸서 반환하세요.

한국어 문장: "${input.korean_text}"

{
  "japanese": "자연스러운 일본어 문장",
  "romanization": "Hepburn 로마자 발음 (예: Gomen ne, kyou chotto okuresou.)",
  "korean_meaning": "한국어 뜻",
  "tone_note": "이 문장이 어떤 말투인지 한 줄 설명",
  "key_expressions": [
    {
      "expression": "일본어 표현 또는 한자",
      "reading": "히라가나 읽기",
      "romanization": "로마자 발음",
      "meaning": "한국어 뜻"
    }
  ],
  "alternative_versions": [
    {
      "label": "예: 더 공손한 표현",
      "japanese": "대체 일본어 문장",
      "romanization": "로마자 발음",
      "korean_meaning": "한국어 뜻"
    }
  ]
}

규칙:
- key_expressions는 핵심 표현 2~4개만 포함
- ${level === 'absolute_beginner' ? 'absolute_beginner 모드: 문법 용어 없이 "이런 느낌이에요" 방식으로 설명' : ''}
- romanization은 반드시 Hepburn 표기법 사용
- 부적절한 표현은 완곡한 대체 표현으로 안내`;
}

function buildCorrectPrompt(input: CorrectInput): string {
  const level = input.learner_level ?? 'absolute_beginner';
  const tone = input.tone ?? 'unknown';

  return `당신은 일본어 초급 학습자의 문장을 교정해주는 선생님입니다.

학습자 수준: ${level}
원하는 말투: ${tone}
${input.intended_meaning ? `의도한 의미: ${input.intended_meaning}` : ''}

${FEW_SHOT}

사용자 문장: "${input.user_sentence}"

아래 JSON 형식으로만 응답하세요. 반드시 \`\`\`json ... \`\`\` 코드 블록으로 감싸세요.

{
  "corrected_japanese": "교정된 자연스러운 일본어 문장",
  "romanization": "Hepburn 로마자 발음",
  "korean_meaning": "한국어 뜻",
  "correction_summary": "어떤 점이 어색했는지 한 줄 요약",
  "beginner_explanation": "${level === 'absolute_beginner' ? '문법 용어 없이 "이런 느낌이에요" 방식으로 설명' : '초급자 기준 설명'}",
  "mistake_tags": ["grammar", "vocabulary", "natural_expression"]
}

mistake_tags는 "grammar", "vocabulary", "natural_expression" 중 해당하는 것만 포함하세요.`;
}

function buildExplainPrompt(input: ExplainInput): string {
  const level = input.learner_level ?? 'absolute_beginner';

  return `당신은 일본어 표현을 초급 학습자에게 설명해주는 선생님입니다.

학습자 수준: ${level}
${input.context ? `표현의 상황/맥락: ${input.context}` : ''}

설명할 표현: "${input.expression}"

아래 JSON 형식으로만 응답하세요. 반드시 \`\`\`json ... \`\`\` 코드 블록으로 감싸세요.

{
  "expression": "입력된 일본어 표현",
  "reading": "히라가나 읽기",
  "romanization": "Hepburn 로마자 발음",
  "meaning": "한국어 뜻",
  "usage_note": "언제 쓰는지, 어떤 상황에서 자연스러운지 한 줄",
  "beginner_explanation": "${level === 'absolute_beginner' ? '문법 용어 없이 "이런 느낌이에요" 방식으로 설명 (2~3문장)' : '초급자 기준 설명'}",
  "example_sentence": "이 표현을 사용한 짧은 예문",
  "example_romanization": "예문 로마자 발음",
  "example_meaning": "예문 한국어 뜻"
}`;
}

export async function callTranslateEngine(input: TranslateInput): Promise<TranslateOutput> {
  try {
    const raw = await callEngine(buildTranslatePrompt(input), 2048);
    return assembleOutput(raw);
  } catch {
    throw new Error('번역 엔진 응답 파싱 실패');
  }
}

export async function callCorrectEngine(input: CorrectInput): Promise<CorrectOutput> {
  try {
    const raw = await callEngine(buildCorrectPrompt(input));
    return {
      corrected_japanese: String(raw.corrected_japanese ?? ''),
      romanization: String(raw.romanization ?? ''),
      korean_meaning: String(raw.korean_meaning ?? ''),
      correction_summary: String(raw.correction_summary ?? ''),
      beginner_explanation: String(raw.beginner_explanation ?? ''),
      mistake_tags: Array.isArray(raw.mistake_tags)
        ? (raw.mistake_tags as unknown[]).map(String)
        : [],
    };
  } catch {
    throw new Error('교정 엔진 응답 파싱 실패');
  }
}

export async function callExplainEngine(input: ExplainInput): Promise<ExplainOutput> {
  try {
    const raw = await callEngine(buildExplainPrompt(input));
    return {
      expression: String(raw.expression ?? input.expression),
      reading: String(raw.reading ?? ''),
      romanization: String(raw.romanization ?? ''),
      meaning: String(raw.meaning ?? ''),
      usage_note: String(raw.usage_note ?? ''),
      beginner_explanation: String(raw.beginner_explanation ?? ''),
      example_sentence: String(raw.example_sentence ?? ''),
      example_romanization: String(raw.example_romanization ?? ''),
      example_meaning: String(raw.example_meaning ?? ''),
    };
  } catch {
    throw new Error('표현 설명 엔진 응답 파싱 실패');
  }
}
