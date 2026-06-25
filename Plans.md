# Plans.md — kakao-playmcp

## 진행 상태

| 상태 | 마커 |
|------|------|
| 완료 | cc:완료 |
| 진행 중 | cc:WIP |
| 대기 | cc:TODO |

---

## Week 1 — MCP 서버 기본 구조

- [ ] cc:TODO 프로젝트 초기화 (package.json, tsconfig, MCP SDK 설치)
- [ ] cc:TODO MCP 서버 진입점 구현 (`src/index.ts`)
- [ ] cc:TODO `translate_kakao_message` Tool 구현
- [ ] cc:TODO 기본 응답 포맷 구현 (3단 구조: 일본어 / 로마자 / 한국어)
- [ ] cc:TODO 핵심 표현 분해 로직 구현

## Week 2 — 교정 및 말투 변환

- [ ] cc:TODO `correct_japanese_sentence` Tool 구현
- [ ] cc:TODO `explain_expression` Tool 구현
- [ ] cc:TODO 말투 변환 로직 (friend/coworker/stranger)
- [ ] cc:TODO 초급자용 설명 템플릿

## Week 3 — 복습 기능

- [ ] cc:TODO `create_review_card` Tool 구현
- [ ] cc:TODO 복습 카드 저장소 (`store/cards.json`)
- [ ] cc:TODO `generate_daily_quiz` Tool 구현
- [ ] cc:TODO 오답 기록 데이터 모델

## Week 4 — PlayMCP 등록 및 제출

- [ ] cc:TODO PlayMCP 등록
- [ ] cc:TODO Tool 설명문 정리
- [ ] cc:TODO 데모 시나리오 검증
- [ ] cc:TODO 공모전 제출용 소개 문구 확정
- [ ] cc:TODO 시연 영상 또는 발표 스크립트

---

## 완료된 작업

- [x] cc:완료 PRD 작성 (`docs/my_japanese_learning_coach_mcp_prd.md` v0.1)
- [x] cc:완료 Harness 초기화 (harness.toml, CLAUDE.md, Plans.md)
