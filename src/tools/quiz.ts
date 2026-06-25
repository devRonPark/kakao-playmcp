import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { QuizInputSchema } from '../types.js';
import type { QuizItem } from '../types.js';
import { loadCards } from '../store/cards.js';

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuizItem(card: { expression: string; romanization: string; korean_meaning: string; reading: string }, focus: string): QuizItem {
  if (focus === 'grammar') {
    return {
      question: `"${card.expression}"는 어떤 상황에서 쓰나요?`,
      hint: `뜻: ${card.korean_meaning}`,
      answer: `${card.romanization} — ${card.korean_meaning}`,
      explanation: `${card.expression} (${card.romanization}): ${card.korean_meaning}`,
    };
  }
  if (focus === 'pronunciation') {
    return {
      question: `"${card.expression}"를 로마자로 어떻게 읽나요?`,
      hint: `히라가나: ${card.reading || '?'}`,
      answer: card.romanization,
      explanation: `${card.expression} = ${card.reading} = ${card.romanization}`,
    };
  }
  if (focus === 'expression') {
    return {
      question: `"${card.korean_meaning}"를 일본어로?`,
      hint: `로마자: ${card.romanization}`,
      answer: card.expression,
      explanation: `${card.korean_meaning} → ${card.expression} (${card.romanization})`,
    };
  }
  // meaning (default/mixed)
  return {
    question: `"${card.expression} (${card.romanization})"의 뜻은?`,
    hint: card.reading ? `읽기: ${card.reading}` : '',
    answer: card.korean_meaning,
    explanation: `${card.expression} = ${card.reading} = ${card.romanization} = ${card.korean_meaning}`,
  };
}

export function registerQuizTool(server: McpServer): void {
  server.tool(
    'generate_daily_quiz',
    '저장된 복습 카드를 바탕으로 1분 안에 풀 수 있는 퀴즈를 생성합니다.',
    QuizInputSchema.shape,
    async (args) => {
      try {
        const cards = loadCards();
        if (cards.length === 0) {
          return {
            content: [{
              type: 'text',
              text: '저장된 복습 카드가 없습니다. create_review_card로 먼저 카드를 저장해주세요.',
            }],
          };
        }

        const count = Math.min(args.quiz_count ?? 3, cards.length);
        const selected = shuffle([...cards]).slice(0, count);
        const focuses = args.focus === 'mixed'
          ? ['meaning', 'pronunciation', 'expression']
          : [args.focus ?? 'meaning'];

        const items: QuizItem[] = selected.map((card, i) =>
          buildQuizItem(card, focuses[i % focuses.length])
        );

        const lines: string[] = [`오늘의 퀴즈 (${items.length}문제)\n`];
        items.forEach((item, i) => {
          lines.push(`Q${i + 1}. ${item.question}`);
          if (item.hint) lines.push(`힌트: ${item.hint}`);
          lines.push(`정답: ${item.answer}`);
          lines.push(`설명: ${item.explanation}`);
          lines.push('');
        });

        return { content: [{ type: 'text', text: lines.join('\n') }] };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[quiz error]', message);
        return { content: [{ type: 'text', text: '퀴즈 생성 중 오류가 발생했습니다.' }], isError: true };
      }
    }
  );
}
