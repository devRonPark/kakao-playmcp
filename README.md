# 하루톡 일본어 코치 MCP

한국어 카카오톡 문장을 자연스러운 일본어로 변환하고, 초급 학습자를 위한 발음·표현 설명·복습 카드·퀴즈를 제공하는 MCP 서버입니다.

## 설치

```bash
git clone https://github.com/your-repo/kakao-playmcp.git
cd kakao-playmcp
npm install
npm run build
```

## 환경 변수 설정

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

## MCP 클라이언트 설정 (Claude Desktop 예시)

`claude_desktop_config.json`에 추가:

```json
{
  "mcpServers": {
    "harutalk-japanese-coach": {
      "command": "node",
      "args": ["/absolute/path/to/kakao-playmcp/dist/index.js"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-..."
      }
    }
  }
}
```

## 서버 직접 실행

```bash
ANTHROPIC_API_KEY=sk-ant-... node dist/index.js
```

## 제공 Tool 목록

### `translate_kakao_message`
한국어 문장을 자연스러운 일본어로 변환합니다. 로마자 발음(Hepburn), 핵심 표현 분해, 말투별 대안 표현을 함께 반환합니다.

| 파라미터 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `korean_text` | string | 필수 | 번역할 한국어 문장 |
| `relationship` | enum | `unknown` | 상대방 관계 (friend/coworker/stranger 등) |
| `tone` | enum | `natural` | 원하는 말투 (casual/polite/cute 등) |
| `learner_level` | enum | `absolute_beginner` | 학습자 수준 |

### `correct_japanese_sentence`
사용자가 작성한 일본어(또는 로마자) 문장을 교정하고 어색한 이유를 초급자 기준으로 설명합니다.

| 파라미터 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `user_sentence` | string | 필수 | 교정받을 문장 |
| `intended_meaning` | string | - | 의도한 의미 (선택) |
| `learner_level` | enum | `absolute_beginner` | 학습자 수준 |

### `explain_expression`
일본어 표현을 초급자가 이해하기 쉽게 설명합니다. 예문과 로마자 발음 포함.

| 파라미터 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `expression` | string | 필수 | 설명받을 일본어 표현 |
| `context` | string | - | 표현의 사용 맥락 (선택) |
| `learner_level` | enum | `absolute_beginner` | 학습자 수준 |

### `create_review_card`
표현을 복습 카드로 저장합니다. 저장된 카드는 퀴즈 생성에 활용됩니다.

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `expression` | string | 일본어 표현 |
| `romanization` | string | 로마자 발음 |
| `korean_meaning` | string | 한국어 뜻 |
| `difficulty` | enum | 난이도 (easy/normal/hard) |

### `generate_daily_quiz`
저장된 복습 카드로 1분 퀴즈를 생성합니다.

| 파라미터 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `quiz_count` | number | `3` | 문제 수 (1~10) |
| `focus` | enum | `mixed` | 출제 유형 (meaning/pronunciation/expression/grammar/mixed) |
| `level` | enum | `absolute_beginner` | 학습자 수준 |
| `reveal_answers` | boolean | `false` | 정답 즉시 표시 여부 |

## 응답 포맷

모든 일본어 문장은 3단 구조로 반환됩니다:

```
今日ちょっと遅れそう。
(Kyou chotto okuresou.)
오늘 조금 늦을 것 같아.
```

## 라이선스

MIT
