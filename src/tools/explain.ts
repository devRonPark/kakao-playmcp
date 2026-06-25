import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ExplainInputSchema } from '../types.js';
import { callExplainEngine } from '../engines/japanese.js';

export function registerExplainTool(server: McpServer): void {
  server.tool(
    'explain_expression',
    '일본어 표현을 초급 학습자 기준으로 설명합니다. 읽기, 로마자 발음, 뜻, 사용 상황, 예문을 제공합니다.',
    ExplainInputSchema.shape,
    async (args) => {
      try {
        const result = await callExplainEngine(args);

        const lines: string[] = [
          `${result.expression} = ${result.reading} = ${result.romanization} = ${result.meaning}`,
          '',
          `사용 상황: ${result.usage_note}`,
          '',
          result.beginner_explanation,
          '',
          '예문:',
          result.example_sentence,
          `(${result.example_romanization})`,
          result.example_meaning,
        ];

        lines.push('');
        lines.push(`다음 단계: 이 표현으로 퀴즈를 내려면 '오늘 퀴즈 내줘'라고 해보세요`);

        return { content: [{ type: 'text', text: lines.join('\n') }] };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[tool error]', message);
        return { content: [{ type: 'text', text: '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }], isError: true };
      }
    }
  );
}
