import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { TranslateInputSchema } from '../types.js';
import { callTranslateEngine } from '../engines/japanese.js';

export function registerTranslateTool(server: McpServer): void {
  server.tool(
    'translate_kakao_message',
    '한국어 카카오톡 문장을 자연스러운 일본어로 변환합니다. 초급 학습자를 위해 로마자 발음, 한국어 뜻, 핵심 표현 설명을 함께 제공합니다.',
    TranslateInputSchema.shape,
    async (args) => {
      try {
        const result = await callTranslateEngine(args);

        const lines: string[] = [
          result.japanese,
          `(${result.romanization})`,
          result.korean_meaning,
        ];

        if (args.include_expression_breakdown && result.key_expressions.length > 0) {
          lines.push('');
          lines.push('핵심 표현:');
          for (const expr of result.key_expressions) {
            lines.push(`- ${expr.expression} = ${expr.reading} = ${expr.romanization} = ${expr.meaning}`);
          }
        }

        if (result.tone_note) {
          lines.push('');
          lines.push(result.tone_note);
        }

        if (result.alternative_versions.length > 0) {
          lines.push('');
          lines.push('다른 표현:');
          for (const alt of result.alternative_versions) {
            lines.push(`[${alt.label}] ${alt.japanese} (${alt.romanization}) — ${alt.korean_meaning}`);
          }
        }

        lines.push('');
        lines.push(`다음 단계: 복습 카드를 만들려면 '이 문장 카드로 저장해줘'라고 해보세요`);

        return { content: [{ type: 'text', text: lines.join('\n') }] };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[tool error]', message);
        return { content: [{ type: 'text', text: '요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }], isError: true };
      }
    }
  );
}
