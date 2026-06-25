# Plans.md — kakao-playmcp

작성일: 2026-06-25
PRD 기준: docs/my_japanese_learning_coach_mcp_prd.md

---

## 완료된 작업

| Task | 내용 | DoD | Depends | Status |
|------|------|-----|---------|--------|
| 0.1 | PRD 작성 | docs/my_japanese_learning_coach_mcp_prd.md v0.1 존재 | - | cc:완료 |
| 0.2 | Harness 초기화 | harness doctor 전체 통과, CLAUDE.md·Plans.md 존재 | - | cc:완료 |
| 0.3 | Plugin 설정 | ponytail·caveman·VFF 설치 확인, agent MEMORY.md 3개 존재 | 0.2 | cc:완료 |
| 0.4 | BLUEPRINT.md 작성 | BLUEPRINT.md 존재, 7개 섹션 포함 | 0.3 | cc:완료 |

---

## Week 1 — MCP 서버 기본 구조

| Task | 내용 | DoD | Depends | Status |
|------|------|-----|---------|--------|
| 1.0 | 개발 환경 설정 [tdd:skip:tooling-only] | package.json·tsconfig.json·eslint·prettier 존재, `npm run lint` 에러 0 | - | cc:완료 |
| 1.1 | 프로젝트 초기화 | `npm install` 성공, MCP SDK import 가능, `npm run build` 에러 0 | 1.0 | cc:완료 |
| 1.2 | MCP 서버 진입점 구현 | `src/index.ts` 존재, `node dist/index.js` 실행 시 MCP 서버 기동 로그 출력 | 1.1 | cc:완료 |
| 1.3 | `translate_kakao_message` Tool 구현 | Tool 등록 확인, 한국어 입력 → 일본어·romanization·한국어뜻 포함 JSON 반환 | 1.2 | cc:완료 |
| 1.4 | 기본 응답 포맷 구현 | 모든 응답이 3단 구조(일본어 / romanization / 한국어뜻) 준수, PRD 13절 포맷 일치 | 1.3 | cc:완료 |
| 1.5 | 핵심 표현 분해 로직 구현 | `key_expressions` 배열에 expression·reading·romanization·meaning 4필드 포함 | 1.4 | cc:완료 |

---

## Week 2 — 교정 및 말투 변환

| Task | 내용 | DoD | Depends | Status |
|------|------|-----|---------|--------|
| 2.1 | `correct_japanese_sentence` Tool 구현 | 로마자 입력 교정 가능, corrected_japanese·romanization·correction_summary 포함 | 1.5 | cc:완료 |
| 2.2 | `explain_expression` Tool 구현 | 일본어 표현 입력 시 초급자 기준 설명 반환 | 1.5 | cc:완료 |
| 2.3 | 말투 변환 로직 구현 | friend/coworker/stranger 3가지 말투로 같은 의미 문장 생성 가능 | 2.1 | cc:완료 |
| 2.4 | 초급자용 설명 템플릿 | absolute_beginner 모드 시 문법 용어 없이 "이런 느낌이에요" 방식 설명 | 2.2 | cc:완료 |

---

## Week 3 — 복습 기능

| Task | 내용 | DoD | Depends | Status |
|------|------|-----|---------|--------|
| 3.1 | 복습 카드 저장소 구현 | `store/cards.json` 생성·읽기·쓰기 가능, ReviewCard 스키마 준수 | 1.5 | cc:완료 |
| 3.2 | `create_review_card` Tool 구현 | 카드 저장 성공 시 card_id·saved:true 반환, cards.json에 실제 기록 | 3.1 | cc:완료 |
| 3.3 | `generate_daily_quiz` Tool 구현 | cards.json에 카드 1개 이상 시 quiz_items 배열 반환, 문제·힌트·정답 포함 | 3.2 | cc:완료 |
| 3.4 | 오답 기록 데이터 모델 구현 | MistakeLog 스키마 존재, correct_japanese_sentence 호출 시 기록 저장 | 3.2 | cc:완료 |

---

## Week 5 — 리뷰 수정

| Task | 내용 | DoD | Depends | Status |
|------|------|-----|---------|--------|
| 5.1 | 입력 스키마 검증 강화 | types.ts 전체 문자열 필드에 `.max()` 추가, index.ts에 ANTHROPIC_API_KEY 시작 확인, catch 블록 에러 메시지 경로 제거 | 1.1 | cc:완료 [c386c57] |
| 5.2 | AI 엔진 견고성 개선 | extractJson 비펜스 응답 처리(펜스 강제 프롬프트 + 재시도), translate max_tokens 2048, callEngine 공통 함수 추출로 3 중복 제거 | 5.1 | cc:완료 |
| 5.3 | Quiz level 버그 수정 + 정답 분리 | buildQuizItem에 level 전달 및 로직 반영, QuizInputSchema에 reveal_answers 플래그 추가, 기본값 false로 정답 숨김 | 5.2 | cc:완료 |
| 5.4 | saveMistake 에러 처리 + 파일 I/O atomic write | saveMistake 자체 try/catch로 교정 결과 보존, writeJson을 temp파일+rename 패턴으로 경합 조건 제거 | 5.2 | cc:완료 |
| 5.5 | 코드 정리 + 프로젝트 파일 | formatter.ts 죽은 익스포트 제거, demo-check.ts 제거, LICENSE(MIT) 추가, .github/workflows/ci.yml 추가 | 5.4 | cc:완료 |
| 5.6 | README 작성 | README.md에 설치 방법, ANTHROPIC_API_KEY 설정, MCP 설정 예제(claude_desktop_config.json), 5개 Tool 설명 포함 | 5.5 | cc:완료 |

---

## Week 6 — suggested_next 기능

| Task | 내용 | DoD | Depends | Status |
|------|------|-----|---------|--------|
| 6.1 | types.ts에 suggested_next 필드 추가 [tdd:skip:types-only] [#10] | 5개 Output interface에 `suggested_next: string` 존재, `npm run build` 에러 0 | - | cc:완료 [5ae1fdf] |
| 6.2 | TDD — suggested_next 사용자 시나리오 실패 테스트 작성 [tdd:required] [#11] | `src/tools/__tests__/` 생성, 5개 Tool 테스트 RED 확인 | 6.1 | cc:완료 [9bb68f9] |
| 6.3 | 각 Tool 핸들러에 suggested_next 구현 [#12] | 5개 Tool suggested_next 반환, 6.2 테스트 전체 GREEN | 6.2 | cc:완료 [587e340] |
| 6.4 | 빌드·테스트 전체 통과 확인 및 PR 생성 [tdd:skip:ci-gate] [#13] | `npm run build` + `npm test` 에러 0, PR 머지 | 6.3 | cc:WIP |

---

## Week 4 — PlayMCP 등록 및 제출

| Task | 내용 | DoD | Depends | Status |
|------|------|-----|---------|--------|
| 4.1 | Tool 설명문 정리 | 모든 Tool의 description이 PlayMCP 등록 요건에 맞게 한국어로 작성 | 3.4 | cc:완료 |
| 4.2 | 데모 시나리오 검증 | PRD 20절 4개 데모 시나리오 실제 실행 가능, 응답 포맷 준수 확인 | 4.1 | cc:완료 |
| 4.3 | PlayMCP 등록 | PlayMCP에 MCP 서버 등록 완료, Tool 목록 정상 노출 확인 | 4.2 | cc:TODO |
| 4.4 | 공모전 제출용 소개 문구 확정 | PRD 27절 문구 기반 최종본 완성, 200자 이내 | 4.3 | cc:완료 |
| 4.5 | 시연 영상 또는 발표 스크립트 | 데모 3분 이내 시나리오 스크립트 존재 또는 영상 파일 존재 | 4.4 | cc:완료 |
