/**
 * TDD RED: 5개 Tool이 suggested_next 안내 문구를 응답에 포함하는지 검증.
 * Task 6.3 구현 전까지 실패(RED), 구현 후 통과(GREEN).
 */
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { jest, describe, it, expect, beforeAll } from '@jest/globals';

// ── Mock fixtures ──────────────────────────────────────────────────────────

const MOCK_TRANSLATE = {
  japanese: '今日何してる？',
  romanization: 'Kyō nani shiteru?',
  korean_meaning: '오늘 뭐해?',
  tone_note: '친구 사이 캐주얼 표현.',
  key_expressions: [],
  alternative_versions: [],
};

const MOCK_CORRECT = {
  corrected_japanese: 'ありがとう',
  romanization: 'arigatou',
  korean_meaning: '감사합니다',
  correction_summary: '올바른 표현',
  beginner_explanation: '감사의 표현',
  mistake_tags: [],
};

const MOCK_EXPLAIN = {
  expression: 'ありがとう',
  reading: 'ありがとう',
  romanization: 'arigatou',
  meaning: '감사합니다',
  usage_note: '감사할 때 씁니다',
  beginner_explanation: '감사할 때 쓰는 표현이에요',
  example_sentence: 'ありがとうございます',
  example_romanization: 'arigatou gozaimasu',
  example_meaning: '정말 감사합니다',
};

const MOCK_CARD = {
  card_id: 'test-001',
  expression: 'ありがとう',
  reading: 'ありがとう',
  romanization: 'arigatou',
  korean_meaning: '감사합니다',
  example_sentence: '',
  context: '',
  difficulty: 'normal',
  created_at: '2026-06-25T00:00:00.000Z',
  review_count: 0,
  mistake_count: 0,
};

// ── Helper ─────────────────────────────────────────────────────────────────

type ToolHandler = (args: Record<string, unknown>) => Promise<{
  content: Array<{ type: string; text: string }>;
  isError?: boolean;
}>;

function captureHandler(
  register: (server: McpServer) => void,
  toolName: string,
): ToolHandler {
  let handler!: ToolHandler;
  const mockServer = {
    tool(name: string, _desc: string, _schema: unknown, h: ToolHandler) {
      if (name === toolName) handler = h;
    },
  } as unknown as McpServer;
  register(mockServer);
  return handler;
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('suggested_next 안내 문구 (Task 6.3 구현 전 RED)', () => {
  let registerTranslateTool: (server: McpServer) => void;
  let registerCorrectTool: (server: McpServer) => void;
  let registerExplainTool: (server: McpServer) => void;
  let registerReviewCardTool: (server: McpServer) => void;
  let registerQuizTool: (server: McpServer) => void;

  beforeAll(async () => {
    await jest.unstable_mockModule('../../engines/japanese.js', () => ({
      callTranslateEngine: jest.fn().mockImplementation(async () => MOCK_TRANSLATE),
      callCorrectEngine: jest.fn().mockImplementation(async () => MOCK_CORRECT),
      callExplainEngine: jest.fn().mockImplementation(async () => MOCK_EXPLAIN),
    }));

    await jest.unstable_mockModule('../../store/cards.js', () => ({
      saveCard: jest.fn().mockImplementation(() => MOCK_CARD),
      saveMistake: jest.fn(),
      loadCards: jest.fn().mockImplementation(() => [MOCK_CARD]),
    }));

    ({ registerTranslateTool } = await import('../translate.js'));
    ({ registerCorrectTool } = await import('../correct.js'));
    ({ registerExplainTool } = await import('../explain.js'));
    ({ registerReviewCardTool } = await import('../review-card.js'));
    ({ registerQuizTool } = await import('../quiz.js'));
  });

  it('translate_kakao_message: 복습 카드 저장 안내 포함', async () => {
    const handler = captureHandler(registerTranslateTool, 'translate_kakao_message');
    const result = await handler({
      korean_text: '오늘 뭐해?',
      relationship: 'friend',
      tone: 'casual',
      learner_level: 'absolute_beginner',
      include_romanization: true,
      include_expression_breakdown: false,
    });
    // spec.md: "복습 카드를 만들려면 '이 문장 카드로 저장해줘'라고 해보세요"
    expect(result.content[0].text).toContain('카드로 저장해줘');
  });

  it('correct_japanese_sentence: 카드 저장 안내 포함', async () => {
    const handler = captureHandler(registerCorrectTool, 'correct_japanese_sentence');
    const result = await handler({
      user_sentence: 'arigatou',
      learner_level: 'absolute_beginner',
    });
    // spec.md: "교정된 문장을 저장하려면 '카드로 만들어줘'라고 해보세요"
    expect(result.content[0].text).toContain('카드로 만들어줘');
  });

  it('explain_expression: 퀴즈 안내 포함', async () => {
    const handler = captureHandler(registerExplainTool, 'explain_expression');
    const result = await handler({
      expression: 'ありがとう',
      learner_level: 'absolute_beginner',
    });
    // spec.md: "이 표현으로 퀴즈를 내려면 '오늘 퀴즈 내줘'라고 해보세요"
    expect(result.content[0].text).toContain('오늘 퀴즈 내줘');
  });

  it('create_review_card: 퀴즈 풀기 안내 포함', async () => {
    const handler = captureHandler(registerReviewCardTool, 'create_review_card');
    const result = await handler({
      expression: 'ありがとう',
      romanization: 'arigatou',
      korean_meaning: '감사합니다',
    });
    // spec.md: "저장한 카드로 퀴즈를 풀려면 '오늘 퀴즈 내줘'라고 해보세요"
    expect(result.content[0].text).toContain('오늘 퀴즈 내줘');
  });

  it('generate_daily_quiz: 표현 질문 안내 포함', async () => {
    const handler = captureHandler(registerQuizTool, 'generate_daily_quiz');
    const result = await handler({
      quiz_count: 1,
      level: 'absolute_beginner',
      focus: 'meaning',
      reveal_answers: false,
    });
    // spec.md: "틀린 표현을 더 알고 싶다면 '~가 무슨 뜻이야?'라고 해보세요"
    expect(result.content[0].text).toContain('무슨 뜻이야');
  });
});
