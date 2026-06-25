import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { CorrectInputSchema } from '../types.js';
import { callCorrectEngine } from '../engines/japanese.js';
import { saveMistake } from '../store/cards.js';

export function registerCorrectTool(server: McpServer): void {
  server.tool(
    'correct_japanese_sentence',
    '사용자가 직접 작성한 일본어 문장을 교정하고, 왜 어색한지 초급자 기준으로 설명합니다.',
    CorrectInputSchema.shape,
    async (args) => {
      try {
        const result = await callCorrectEngine(args);

        saveMistake({
          input_sentence: args.user_sentence,
          corrected_sentence: result.corrected_japanese,
          mistake_tags: result.mistake_tags,
          explanation: result.beginner_explanation,
        });

        const lines: string[] = [
          result.corrected_japanese,
          `(${result.romanization})`,
          result.korean_meaning,
          '',
          `교정 요약: ${result.correction_summary}`,
          `설명: ${result.beginner_explanation}`,
        ];

        if (result.mistake_tags.length > 0) {
          lines.push(`태그: ${result.mistake_tags.join(', ')}`);
        }

        lines.push('');
        lines.push(`다음 단계: 교정된 문장을 저장하려면 '카드로 만들어줘'라고 해보세요`);

        return { content: [{ type: 'text', text: lines.join('\n') }] };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[tool error]', message);
        return { content: [{ type: 'text', text: '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }], isError: true };
      }
    }
  );
}
