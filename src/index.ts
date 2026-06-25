import { randomUUID } from 'crypto';
import { createServer } from 'http';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { registerTranslateTool } from './tools/translate.js';
import { registerCorrectTool } from './tools/correct.js';
import { registerExplainTool } from './tools/explain.js';
import { registerReviewCardTool } from './tools/review-card.js';
import { registerQuizTool } from './tools/quiz.js';

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('오류: ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다.');
  process.exit(1);
}

function buildServer(): McpServer {
  const server = new McpServer(
    { name: 'kakao-playmcp', version: '0.1.0' },
    { capabilities: { tools: {} } }
  );
  registerTranslateTool(server);
  registerCorrectTool(server);
  registerExplainTool(server);
  registerReviewCardTool(server);
  registerQuizTool(server);
  return server;
}

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : null;

if (!PORT) {
  // stdio mode (로컬 Claude Desktop — command 방식)
  const transport = new StdioServerTransport();
  await buildServer().connect(transport);
  console.error('MCP server running (stdio) — 하루톡 일본어 코치 v0.1.0');
} else {
  // HTTP mode (원격 Claude Desktop — url 방식)
  const httpTransports: Record<string, StreamableHTTPServerTransport> = {};
  const sseTransports: Record<string, SSEServerTransport> = {};

  const httpServer = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);

    // StreamableHTTP — 새 프로토콜 (2025-11-25)
    if (url.pathname === '/mcp') {
      const chunks: Buffer[] = [];
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      await new Promise((r) => req.on('end', r));
      const parsedBody = chunks.length
        ? JSON.parse(Buffer.concat(chunks).toString()) as unknown
        : null;

      const sessionId = req.headers['mcp-session-id'] as string | undefined;
      let transport = sessionId ? httpTransports[sessionId] : undefined;
      if (!transport) {
        const t = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (sid: string) => { httpTransports[sid] = t; },
        });
        t.onclose = () => { if (t.sessionId) delete httpTransports[t.sessionId]; };
        await buildServer().connect(t);
        await t.handleRequest(req, res, parsedBody);
      } else {
        await transport.handleRequest(req, res, parsedBody);
      }
      return;
    }

    // SSE — 레거시 프로토콜 (2024-11-05), 구버전 Claude Desktop 호환
    if (url.pathname === '/sse' && req.method === 'GET') {
      const transport = new SSEServerTransport('/messages', res);
      sseTransports[transport.sessionId] = transport;
      transport.onclose = () => delete sseTransports[transport.sessionId];
      await buildServer().connect(transport);
      return;
    }

    if (url.pathname === '/messages' && req.method === 'POST') {
      const sessionId = url.searchParams.get('sessionId') ?? '';
      const transport = sseTransports[sessionId];
      if (!transport) { res.writeHead(404).end('session not found'); return; }
      const body: Buffer[] = [];
      req.on('data', (chunk: Buffer) => body.push(chunk));
      await new Promise((r) => req.on('end', r));
      await transport.handlePostMessage(req, res, JSON.parse(Buffer.concat(body).toString()));
      return;
    }

    res.writeHead(404).end('Not found');
  });

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.error(`MCP server running (HTTP :${PORT}) — 하루톡 일본어 코치 v0.1.0`);
    console.error(`  StreamableHTTP : http://0.0.0.0:${PORT}/mcp`);
    console.error(`  SSE (legacy)   : http://0.0.0.0:${PORT}/sse`);
  });
}
