import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTranslateTool } from './tools/translate.js';
import { registerCorrectTool } from './tools/correct.js';
import { registerExplainTool } from './tools/explain.js';
import { registerReviewCardTool } from './tools/review-card.js';
import { registerQuizTool } from './tools/quiz.js';

const server = new McpServer(
  { name: 'kakao-playmcp', version: '0.1.0' },
  { capabilities: { tools: {} } }
);

registerTranslateTool(server);
registerCorrectTool(server);
registerExplainTool(server);
registerReviewCardTool(server);
registerQuizTool(server);

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('오류: ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다.');
  process.exit(1);
}

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('MCP server running — 하루톡 일본어 코치 v0.1.0');
