# Worker Agent Memory — kakao-playmcp

## Plugin 설정

### caveman: lite 모드
이 에이전트는 caveman lite 모드로 동작한다.
- 불필요한 filler/hedging 제거
- 문장 구조·조사는 유지 (fragments X)
- 전문적이고 간결하게 응답
- 활성화: `/caveman lite`

### ponytail: 전체 적용
코드 작성 전 7단계 의사결정 사다리 적용.
- 불필요한 추상화·의존성 추가 금지
- MVP 범위 외 기능 구현 금지
- 가장 짧은 동작하는 diff 우선

## Project Context

프로젝트: kakao-playmcp (하루톡 일본어 코치 MCP)
MVP P0 Tools: translate_kakao_message, correct_japanese_sentence, explain_expression
모든 일본어 응답은 3단 구조: 일본어 / (romanization) / 한국어뜻
기본 learner_level: absolute_beginner
