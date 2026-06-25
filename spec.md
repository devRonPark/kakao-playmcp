# kakao-playmcp — Product Spec

## suggested_next 필드 (v0.2)

모든 MCP Tool 응답에 `suggested_next: string` 필드를 추가한다.

**목적**: 초급 학습자가 다음 대화 턴에 무엇을 입력할지 모를 때 안내한다.

**규칙**:
- 항상 한국어로 작성
- 구체적인 예시 문장 포함 ("'~라고 해보세요'" 형식)
- `learner_level`이 `absolute_beginner`일 때 더 단순하게 작성
- 빈 문자열 금지

**Tool별 기본값**:

| Tool | suggested_next |
|------|---------------|
| `translate_kakao_message` | `"복습 카드를 만들려면 '이 문장 카드로 저장해줘'라고 해보세요"` |
| `correct_japanese_sentence` | `"교정된 문장을 저장하려면 '카드로 만들어줘'라고 해보세요"` |
| `explain_expression` | `"이 표현으로 퀴즈를 내려면 '오늘 퀴즈 내줘'라고 해보세요"` |
| `create_review_card` | `"저장한 카드로 퀴즈를 풀려면 '오늘 퀴즈 내줘'라고 해보세요"` |
| `generate_daily_quiz` | `"틀린 표현을 더 알고 싶다면 '~가 무슨 뜻이야?'라고 해보세요"` |

**영향 범위**:
- `src/types.ts`: 5개 Output interface에 `suggested_next: string` 추가
- `src/tools/*.ts`: 각 핸들러에서 suggested_next 값 반환
- `src/tools/__tests__/`: 사용자 시나리오 TDD 테스트
