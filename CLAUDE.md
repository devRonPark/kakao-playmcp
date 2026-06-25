# kakao-playmcp — CLAUDE.md

## 프로젝트 개요

**My Personal Japanese Learning Coach MCP** (하루톡 일본어 코치 MCP)
Kakao PlayMCP / AGENTIC PLAYER 10 공모전 출품작.
한국어 카카오톡 문장을 자연스러운 일본어로 변환하고, 초급 학습자를 위한 로마자 발음·핵심 표현 설명·복습 카드·퀴즈를 제공하는 MCP 서버.

## 기술 스택

- **런타임**: Node.js (TypeScript)
- **MCP SDK**: `@modelcontextprotocol/sdk`
- **배포**: Kakao PlayMCP (remote MCP server)
- **저장소**: 로컬 JSON 파일 (MVP) → 추후 DB 전환

## 디렉토리 구조

```
kakao-playmcp/
├── src/
│   ├── index.ts
│   ├── tools/
│   ├── engines/
│   └── store/
├── docs/
│   └── my_japanese_learning_coach_mcp_prd.md
├── Plans.md
├── harness.toml
└── package.json
```

## MCP Tool 목록

| Tool | 우선순위 | 설명 |
|------|--------|------|
| `translate_kakao_message` | P0 | 한국어 → 자연스러운 일본어 변환 |
| `correct_japanese_sentence` | P0 | 사용자 일본어 문장 교정 |
| `explain_expression` | P0 | 초급자용 표현 설명 |
| `create_review_card` | P1 | 복습 카드 저장 |
| `generate_daily_quiz` | P1 | 1분 복습 퀴즈 생성 |
| `roleplay_conversation` | P1 | 상황별 대화 연습 |
| `analyze_weakness` | P2 | 약점 패턴 분석 |
| `recommend_next_lesson` | P2 | 다음 학습 추천 |

## 개발 일정

- Week 1: MCP 서버 기본 구조 + `translate_kakao_message`
- Week 2: `correct_japanese_sentence` + 말투 변환
- Week 3: `create_review_card` + `generate_daily_quiz`
- Week 4: PlayMCP 등록 + 데모 + 공모전 제출

## 규칙 참조

@.claude/rules/workflow.md
@.claude/rules/coding.md
