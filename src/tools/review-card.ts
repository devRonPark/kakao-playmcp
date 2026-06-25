import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ReviewCardInputSchema } from '../types.js';
import { saveCard } from '../store/cards.js';

export function registerReviewCardTool(server: McpServer): void {
  server.tool(
    'create_review_card',
    '배운 일본어 표현을 복습 카드로 저장합니다.',
    ReviewCardInputSchema.shape,
    async (args) => {
      try {
        const card = saveCard(args);
        return {
          content: [{
            type: 'text',
            text: [
              `저장 완료! (saved: true)`,
              `카드 ID: ${card.card_id}`,
              `표현: ${card.expression} (${card.romanization}) — ${card.korean_meaning}`,
              `나중에 generate_daily_quiz로 복습할 수 있어요.`,
              ``,
              `다음 단계: 저장한 카드로 퀴즈를 풀려면 '오늘 퀴즈 내줘'라고 해보세요`,
            ].join('\n'),
          }],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[tool error]', message);
        return { content: [{ type: 'text', text: '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }], isError: true };
      }
    }
  );
}
