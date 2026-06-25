# PRD: My Personal Japanese Learning Coach MCP

문서 버전: v0.1
서비스명: My Personal Japanese Learning Coach MCP
한국어 서비스명 후보: 하루톡 일본어 코치 MCP
출품 대상: Kakao PlayMCP / AGENTIC PLAYER 10
문서 목적: PlayMCP 공모전 출품 및 MVP 개발 기준 정의

---

## 1. 제품 한 줄 소개

**My Personal Japanese Learning Coach MCP**는 사용자가 실제로 카카오톡에서 보내고 싶은 한국어 문장을 자연스러운 일본어로 바꿔주고, 히라가나·가타카나·한자 읽기가 아직 익숙하지 않은 초급 학습자도 따라 읽을 수 있도록 **로마자 발음 표기**와 쉬운 설명, 복습 퀴즈까지 제공하는 개인 일본어 학습 코치 MCP 서버다.

---

## 2. 문제 정의

일본어 초급 학습자는 다음과 같은 어려움을 자주 겪는다.

* 일본어로 말하고 싶은 문장은 있지만 자연스럽게 어떻게 표현해야 할지 모른다.
* 번역기는 문장을 바꿔주지만, 실제 일본인이 쓰는 말투인지 알기 어렵다.
* 히라가나, 가타카나, 한자 읽기가 헷갈려서 문장을 받아도 바로 읽지 못한다.
* 문법 설명이 너무 어렵고 길어서 금방 지친다.
* 매일 공부하려고 해도 무엇을 복습해야 할지 모른다.
* 책이나 강의 예문은 실제 카카오톡 대화와 거리가 있다.
* 일본인 친구, 여행, 식당, 편의점, 호텔 등 실제 상황에서 쓸 표현을 바로 연습하고 싶다.

현재 번역 도구는 “정답 문장”을 주는 데 강하지만, 초급 학습자에게 필요한 것은 단순 번역이 아니라 다음과 같은 흐름이다.

```text
내가 하고 싶은 말
→ 자연스러운 일본어 표현
→ 로마자 발음
→ 한국어 뜻
→ 왜 이렇게 말하는지 쉬운 설명
→ 다음에 다시 기억할 수 있는 복습
```

---

## 3. 제품 목표

### 3.1 핵심 목표

사용자가 카카오톡 또는 AI 채팅 환경에서 한국어로 문장을 입력하면, MCP 서버가 다음 결과를 제공한다.

1. 자연스러운 일본어 문장
2. 로마자 발음 표기
3. 한국어 뜻
4. 상황별 말투 차이
5. 핵심 표현 설명
6. 복습 카드 생성
7. 짧은 퀴즈 생성

예시 사용자 입력:

> 일본인 친구한테 “오늘 갑자기 일이 생겨서 약속 30분만 미뤄도 될까?” 자연스럽게 보내고 싶어.

예시 응답:

```text
ごめんね、急に用事が入っちゃって、30分だけ遅らせてもらってもいいかな？
(Gomen ne, kyuu ni youji ga haitchatte, sanjuppun dake okurasete moratte mo ii kana?)
미안, 갑자기 일이 생겨서 30분만 늦춰도 될까?

핵심 표현:
- 急に = kyuu ni = 갑자기
- 用事が入る = youji ga hairu = 일이 생기다
- 〜てもらってもいいかな？ = ~해줘도 괜찮을까?

이 문장은 친구에게 부드럽게 부탁할 때 자연스럽습니다.
```

---

## 4. 제품 포지셔닝

### 4.1 기존 번역기와의 차이

| 구분     | 일반 번역기 | My Personal Japanese Learning Coach MCP |
| ------ | ------ | --------------------------------------- |
| 목적     | 문장 번역  | 실전 대화 학습                                |
| 발음 지원  | 제한적    | 모든 일본어 문장에 로마자 발음 제공                    |
| 초급자 배려 | 약함     | 히라가나·가타카나 미숙자 기준 설명                     |
| 말투 조정  | 제한적    | 친구/연인/직장/여행 상황별 말투 제공                   |
| 복습     | 없음     | 오늘 배운 표현을 복습 카드로 저장                     |
| 카톡 적합성 | 낮음     | 실제 카톡 문장 중심                             |
| 학습 피드백 | 없음     | 자주 틀리는 표현과 문법 누적 분석                     |

### 4.2 핵심 차별점

이 서비스는 “일본어를 잘하는 사람을 위한 도구”가 아니라, **아직 일본어 문자를 읽는 것도 헷갈리는 초급 학습자가 실제 대화에서 바로 쓸 수 있도록 도와주는 코치**다.

특히 모든 일본어 문장에 로마자 발음을 함께 제공하여, 사용자가 일본어 문자를 완벽히 읽지 못해도 소리 내어 따라 읽을 수 있게 한다.

---

## 5. 타깃 사용자

### 5.1 주요 사용자

| 사용자            | 설명                          | 주요 니즈           |
| -------------- | --------------------------- | --------------- |
| 일본어 입문자        | 히라가나·가타카나를 아직 헷갈리는 학습자      | 발음과 뜻을 함께 보고 싶음 |
| 일본 여행 준비자      | 식당, 호텔, 편의점에서 쓸 표현이 필요한 사용자 | 상황별 실전 표현       |
| 일본인 친구가 있는 사용자 | 카톡/DM으로 자연스럽게 말하고 싶은 사용자    | 어색하지 않은 문장      |
| JLPT N5~N3 학습자 | 기초 문법과 표현을 복습하는 사용자         | 쉬운 설명과 반복 퀴즈    |
| 출퇴근 학습자        | 매일 짧게 공부하고 싶은 사용자           | 1분 복습과 미니 퀴즈    |

### 5.2 대표 페르소나

이름: 민지
나이: 27세
상황: 일본 여행을 준비 중이고, 히라가나는 조금 읽지만 가타카나와 한자는 자주 헷갈린다.
문제: 번역 앱이 문장을 알려줘도 읽는 법을 몰라 바로 말하기 어렵다.
사용 질문:

> 일본 편의점에서 “봉투 하나 주세요”라고 말하고 싶은데 일본어로 알려줘. 발음도 같이.

기대 결과:

```text
袋を一つください。
(Fukuro o hitotsu kudasai.)
봉투 하나 주세요.

단어:
- 袋 = fukuro = 봉투
- 一つ = hitotsu = 하나
- ください = kudasai = 주세요
```

---

## 6. 핵심 가치 제안

### 6.1 사용자 가치

* 내가 실제로 보내고 싶은 말을 일본어로 바꿀 수 있다.
* 일본어 문자를 몰라도 로마자 발음으로 따라 읽을 수 있다.
* 딱딱한 번역체가 아니라 자연스러운 일본어 말투를 배울 수 있다.
* 친구/연인/직장/여행 상황에 맞는 표현 차이를 이해할 수 있다.
* 오늘 배운 문장을 복습 카드로 저장하고 다시 퀴즈로 풀 수 있다.
* 매일 부담 없는 1분 학습 루틴을 만들 수 있다.

### 6.2 PlayMCP 관점 가치

* 단순 번역이 아니라 학습 기록, 오답 분석, 복습 퀴즈를 MCP Tool로 실행한다.
* 카카오톡 대화 맥락에 최적화된 언어 학습 경험을 제공한다.
* “나와의 채팅방” 또는 개인 메모 흐름과 결합하기 쉽다.
* 카카오톡에서 자주 발생하는 실전 문장을 학습 데이터로 전환할 수 있다.
* 사용자의 학습 수준에 따라 응답 난이도를 조절할 수 있다.

---

## 7. 주요 사용 시나리오

## 7.1 카톡 문장 일본어 변환

사용자:

> 일본인 친구한테 “오늘 좀 늦을 것 같아. 미안!”이라고 자연스럽게 보내고 싶어.

AI 동작:

1. 한국어 문장 의미 파악
2. 상대방 관계를 친구로 추론
3. 캐주얼한 일본어 문장 생성
4. 로마자 발음 추가
5. 한국어 뜻 추가
6. 핵심 표현 설명

결과:

```text
ごめん、今日ちょっと遅れそう。
(Gomen, kyou chotto okuresou.)
미안, 오늘 조금 늦을 것 같아.

핵심 표현:
- 今日 = kyou = 오늘
- ちょっと = chotto = 조금
- 遅れそう = okuresou = 늦을 것 같아
```

---

## 7.2 일본어 문장 교정

사용자:

> 내가 “Watashi wa ashita Tokyo ni iku desu”라고 썼는데 맞아?

AI 동작:

1. 로마자 일본어를 분석
2. 어색한 표현 탐지
3. 자연스러운 일본어로 교정
4. 쉬운 한국어 설명 제공

결과:

```text
조금 어색해요. 자연스럽게는 이렇게 말합니다.

私は明日東京に行きます。
(Watashi wa ashita Toukyou ni ikimasu.)
저는 내일 도쿄에 갑니다.

설명:
- “iku desu”보다는 “ikimasu”가 자연스럽습니다.
- 行きます = ikimasu = 갑니다
```

---

## 7.3 여행 상황별 표현

사용자:

> 일본 식당에서 “예약했는데요”라고 말하고 싶어.

결과:

```text
予約しています。
(Yoyaku shite imasu.)
예약했습니다.

조금 더 자연스럽게 말하면:

予約しているんですが。
(Yoyaku shite irun desu ga.)
예약했는데요.

단어:
- 予約 = yoyaku = 예약
- しています = shite imasu = 하고 있습니다
```

---

## 7.4 오늘 배운 표현 복습

사용자:

> 오늘 배운 표현 복습시켜줘.

AI 동작:

1. 사용자의 최근 학습 카드 조회
2. 자주 틀린 표현 우선 선택
3. 3문제 이내 미니 퀴즈 생성
4. 정답 후 쉬운 설명 제공

결과:

```text
오늘의 1분 복습입니다.

문제 1.
“늦을 것 같아”를 일본어로 어떻게 말할까요?

힌트:
お___そう
(o___sou)
```

---

## 7.5 말투 변환

사용자:

> 이 문장을 친구한테 보내는 말투랑 회사 사람한테 보내는 말투로 나눠줘. “오늘 약속을 미뤄도 될까요?”

결과:

```text
친구에게:

今日の約束、少し遅らせてもいい？
(Kyou no yakusoku, sukoshi okurasete mo ii?)
오늘 약속 조금 미뤄도 돼?

회사 사람에게:

本日の予定を少し遅らせていただくことは可能でしょうか。
(Honjitsu no yotei o sukoshi okurasete itadaku koto wa kanou deshou ka.)
오늘 일정을 조금 미뤄도 괜찮을까요?

차이:
- 친구에게는 짧고 부드럽게 말합니다.
- 회사 사람에게는 “いただく”, “可能でしょうか”처럼 정중한 표현을 씁니다.
```

---

## 8. MVP 범위

### 8.1 MVP 포함 기능

| 기능              | 설명                       | 우선순위 |
| --------------- | ------------------------ | ---- |
| 카톡 문장 일본어 변환    | 한국어 문장을 자연스러운 일본어로 변환    | P0   |
| 로마자 발음 자동 제공    | 모든 일본어 문장에 로마자 발음 제공     | P0   |
| 한국어 뜻 제공        | 일본어 문장의 의미를 쉬운 한국어로 설명   | P0   |
| 핵심 표현 분해        | 주요 단어/문법을 초급자 기준으로 설명    | P0   |
| 상황별 말투 변환       | 친구/연인/직장/여행 상황에 맞게 표현 변경 | P0   |
| 일본어 문장 교정       | 사용자가 쓴 일본어를 자연스럽게 수정     | P1   |
| 복습 카드 저장        | 오늘 배운 표현을 저장             | P1   |
| 1분 복습 퀴즈        | 저장된 표현 기반 미니 퀴즈 생성       | P1   |
| 약점 분석           | 자주 틀리는 표현/문법 패턴 요약       | P2   |
| JLPT 레벨별 난이도 조정 | N5~N3 기준으로 설명 난이도 조절     | P2   |

### 8.2 MVP 제외 기능

| 제외 기능            | 제외 이유                 |
| ---------------- | --------------------- |
| 음성 인식 기반 발음 채점   | 구현 난이도와 외부 API 의존도 높음 |
| 실제 일본인과 매칭       | 커뮤니티 운영/안전 이슈         |
| 장문 번역 전문 기능      | 제품 포지셔닝이 흐려짐          |
| JLPT 전체 커리큘럼 제공  | MVP 범위 초과             |
| 자동 메시지 전송        | 오발송 위험, 사용자 확인 필요     |
| 사용자의 모든 카톡 대화 분석 | 개인정보 부담 큼             |

---

## 9. 초급 학습자 발음 보조 정책

### 9.1 기본 원칙

이 서비스는 히라가나, 가타카나, 한자 읽기가 아직 익숙하지 않은 학습자를 주요 사용자로 포함한다.

따라서 일본어 문장 또는 표현을 제공할 때는 반드시 아래 3단 구조를 따른다.

```text
일본어 문장
(Romanized pronunciation)
한국어 뜻
```

예시:

```text
ごめん、今日ちょっと遅れそう。
(Gomen, kyou chotto okuresou.)
미안, 오늘 조금 늦을 것 같아.
```

### 9.2 한자 포함 문장 처리

한자가 포함된 문장은 초급자가 읽기 어렵기 때문에, 핵심 단어는 다음 형식으로 설명한다.

```text
한자/표현 = 히라가나 읽기 = 로마자 발음 = 한국어 뜻
```

예시:

```text
今日 = きょう = kyou = 오늘
遅れそう = おくれそう = okuresou = 늦을 것 같아
用事 = ようじ = youji = 볼일, 용무
予約 = よやく = yoyaku = 예약
```

### 9.3 로마자 표기 기준

* 기본적으로 Hepburn romanization을 사용한다.
* 초급자가 따라 읽기 쉬운 표기를 우선한다.
* 장음은 필요 시 `ou`, `oo`, `ei` 등 학습 친화적 방식으로 표기한다.
* 너무 복잡한 음성학 표기는 사용하지 않는다.
* 일본어 발음을 영어식으로 완벽히 대체하려 하지 않는다.
* 로마자 표기는 읽기 보조 도구이며, 가능하면 일본어 문자도 함께 익히도록 유도한다.

### 9.4 응답 시 주의사항

하지 말아야 할 것:

* 일본어 문장만 던져주기
* 한자 읽는 법을 생략하기
* 어려운 문법 용어를 길게 설명하기
* 초급자에게 “이 정도는 알아야 한다”는 식으로 말하기
* 로마자 발음을 너무 학술적으로 표기하기

해야 할 것:

* 짧고 자연스러운 문장 제공
* 로마자 발음 제공
* 한국어 뜻 제공
* 핵심 표현 2~4개만 설명
* 필요하면 더 쉬운 대체 표현 제공

---

## 10. 핵심 기능 상세

## 10.1 카톡 문장 일본어 변환

### 기능 설명

사용자가 한국어로 입력한 카카오톡 문장을 자연스러운 일본어 문장으로 변환한다.

### 입력값

| 필드                           | 타입      | 필수 | 설명                                                           |
| ---------------------------- | ------- | -- | ------------------------------------------------------------ |
| korean_text                  | string  | 필수 | 사용자가 일본어로 바꾸고 싶은 한국어 문장                                      |
| relationship                 | string  | 선택 | friend, partner, family, coworker, manager, client, stranger |
| tone                         | string  | 선택 | casual, polite, cute, apologetic, short, natural             |
| learner_level                | string  | 선택 | absolute_beginner, beginner, intermediate                    |
| include_romanization         | boolean | 선택 | 기본값 true                                                     |
| include_expression_breakdown | boolean | 선택 | 기본값 true                                                     |

### 출력값

| 필드                   | 타입     | 설명           |
| -------------------- | ------ | ------------ |
| japanese             | string | 자연스러운 일본어 문장 |
| romanization         | string | 로마자 발음       |
| korean_meaning       | string | 한국어 뜻        |
| tone_note            | string | 말투 설명        |
| key_expressions      | array  | 핵심 표현 목록     |
| alternative_versions | array  | 다른 말투 버전     |

---

## 10.2 일본어 문장 교정

### 기능 설명

사용자가 작성한 일본어 문장, 로마자 일본어, 또는 한글식 일본어 표현을 자연스럽게 교정한다.

### 입력값

| 필드               | 타입     | 필수 | 설명                     |
| ---------------- | ------ | -- | ---------------------- |
| user_sentence    | string | 필수 | 사용자가 작성한 일본어 또는 로마자 문장 |
| intended_meaning | string | 선택 | 사용자가 의도한 한국어 의미        |
| tone             | string | 선택 | 원하는 말투                 |
| learner_level    | string | 선택 | 학습자 수준                 |

### 출력값

| 필드                   | 타입     | 설명         |
| -------------------- | ------ | ---------- |
| corrected_japanese   | string | 교정된 일본어    |
| romanization         | string | 로마자 발음     |
| korean_meaning       | string | 한국어 뜻      |
| correction_summary   | string | 무엇이 어색했는지  |
| beginner_explanation | string | 초급자용 쉬운 설명 |

---

## 10.3 복습 카드 생성

### 기능 설명

사용자가 배운 표현을 나중에 다시 복습할 수 있도록 카드 형태로 저장한다.

### 저장 항목

| 필드               | 설명         |
| ---------------- | ---------- |
| expression       | 일본어 표현     |
| reading          | 히라가나 읽기    |
| romanization     | 로마자 발음     |
| korean_meaning   | 한국어 뜻      |
| example_sentence | 예문         |
| source_context   | 사용자가 배운 상황 |
| difficulty       | 난이도        |
| created_at       | 생성일        |
| review_count     | 복습 횟수      |
| mistake_count    | 오답 횟수      |

---

## 10.4 1분 복습 퀴즈

### 기능 설명

저장된 복습 카드에서 1~3개의 짧은 문제를 생성한다.

### 퀴즈 유형

| 유형              | 설명                   |
| --------------- | -------------------- |
| 의미 맞히기          | 일본어 표현을 보고 한국어 뜻 맞히기 |
| 빈칸 채우기          | 문장 일부를 비워 표현 기억하기    |
| 말투 선택           | 친구/직장 상황에 맞는 표현 고르기  |
| 로마자 보고 일본어 떠올리기 | 발음을 보고 표현 기억하기       |
| 한국어 보고 일본어 말하기  | 한국어 문장을 일본어로 바꾸기     |

---

## 11. MCP Tool 설계

## 11.1 Tool 목록

| Tool 이름                     | 설명                       | 우선순위 |
| --------------------------- | ------------------------ | ---- |
| `translate_kakao_message`   | 한국어 카톡 문장을 자연스러운 일본어로 변환 | P0   |
| `correct_japanese_sentence` | 사용자가 쓴 일본어 문장을 교정        | P0   |
| `explain_expression`        | 일본어 표현을 초급자 기준으로 설명      | P0   |
| `create_review_card`        | 배운 표현을 복습 카드로 저장         | P1   |
| `generate_daily_quiz`       | 저장된 표현 기반 1분 퀴즈 생성       | P1   |
| `analyze_weakness`          | 자주 틀리는 문법/표현 패턴 분석       | P2   |
| `roleplay_conversation`     | 여행/친구/직장 상황별 대화 연습       | P1   |
| `recommend_next_lesson`     | 학습 기록 기반 다음 학습 추천        | P2   |

---

## 11.2 `translate_kakao_message`

### 목적

한국어 카톡 문장을 상황에 맞는 자연스러운 일본어로 변환한다.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "korean_text": {
      "type": "string",
      "description": "일본어로 바꾸고 싶은 한국어 문장"
    },
    "relationship": {
      "type": "string",
      "enum": ["friend", "partner", "family", "coworker", "manager", "client", "stranger", "unknown"],
      "description": "상대방과의 관계"
    },
    "tone": {
      "type": "string",
      "enum": ["casual", "polite", "cute", "apologetic", "short", "natural"],
      "description": "원하는 말투"
    },
    "learner_level": {
      "type": "string",
      "enum": ["absolute_beginner", "beginner", "intermediate"],
      "description": "학습자 수준"
    },
    "include_romanization": {
      "type": "boolean",
      "description": "로마자 발음 포함 여부. 기본값 true"
    },
    "include_expression_breakdown": {
      "type": "boolean",
      "description": "핵심 표현 설명 포함 여부. 기본값 true"
    }
  },
  "required": ["korean_text"]
}
```

### Output Schema

```json
{
  "type": "object",
  "properties": {
    "japanese": {
      "type": "string",
      "description": "자연스러운 일본어 문장"
    },
    "romanization": {
      "type": "string",
      "description": "로마자 발음 표기"
    },
    "korean_meaning": {
      "type": "string",
      "description": "한국어 뜻"
    },
    "tone_note": {
      "type": "string",
      "description": "이 문장이 어떤 말투인지 설명"
    },
    "key_expressions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "expression": {
            "type": "string"
          },
          "reading": {
            "type": "string"
          },
          "romanization": {
            "type": "string"
          },
          "meaning": {
            "type": "string"
          }
        }
      }
    },
    "alternative_versions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "label": {
            "type": "string"
          },
          "japanese": {
            "type": "string"
          },
          "romanization": {
            "type": "string"
          },
          "korean_meaning": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

---

## 11.3 `correct_japanese_sentence`

### 목적

사용자가 직접 작성한 일본어 문장을 교정하고, 왜 어색한지 초급자 기준으로 설명한다.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "user_sentence": {
      "type": "string",
      "description": "사용자가 작성한 일본어 문장 또는 로마자 문장"
    },
    "intended_meaning": {
      "type": "string",
      "description": "사용자가 의도한 한국어 의미"
    },
    "tone": {
      "type": "string",
      "enum": ["casual", "polite", "business", "natural", "unknown"]
    },
    "learner_level": {
      "type": "string",
      "enum": ["absolute_beginner", "beginner", "intermediate"]
    }
  },
  "required": ["user_sentence"]
}
```

### Output Schema

```json
{
  "type": "object",
  "properties": {
    "corrected_japanese": {
      "type": "string"
    },
    "romanization": {
      "type": "string"
    },
    "korean_meaning": {
      "type": "string"
    },
    "correction_summary": {
      "type": "string"
    },
    "beginner_explanation": {
      "type": "string"
    },
    "mistake_tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

---

## 11.4 `create_review_card`

### 목적

사용자가 배운 표현을 복습 카드로 저장한다.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "expression": {
      "type": "string",
      "description": "저장할 일본어 표현"
    },
    "reading": {
      "type": "string",
      "description": "히라가나 읽기"
    },
    "romanization": {
      "type": "string",
      "description": "로마자 발음"
    },
    "korean_meaning": {
      "type": "string",
      "description": "한국어 뜻"
    },
    "example_sentence": {
      "type": "string",
      "description": "예문"
    },
    "context": {
      "type": "string",
      "description": "표현을 배운 상황"
    },
    "difficulty": {
      "type": "string",
      "enum": ["easy", "normal", "hard"]
    }
  },
  "required": ["expression", "romanization", "korean_meaning"]
}
```

### Output Schema

```json
{
  "type": "object",
  "properties": {
    "card_id": {
      "type": "string"
    },
    "saved": {
      "type": "boolean"
    },
    "message": {
      "type": "string"
    },
    "next_review_hint": {
      "type": "string"
    }
  }
}
```

---

## 11.5 `generate_daily_quiz`

### 목적

저장된 복습 카드 기반으로 1분 안에 풀 수 있는 퀴즈를 생성한다.

### Input Schema

```json
{
  "type": "object",
  "properties": {
    "quiz_count": {
      "type": "number",
      "description": "문제 수. 기본값 3"
    },
    "level": {
      "type": "string",
      "enum": ["absolute_beginner", "beginner", "intermediate"]
    },
    "focus": {
      "type": "string",
      "enum": ["meaning", "pronunciation", "expression", "grammar", "mixed"]
    }
  },
  "required": []
}
```

### Output Schema

```json
{
  "type": "object",
  "properties": {
    "quiz_items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "question": {
            "type": "string"
          },
          "hint": {
            "type": "string"
          },
          "answer": {
            "type": "string"
          },
          "explanation": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

---

## 12. 사용자 경험 흐름

### 12.1 기본 학습 흐름

1. 사용자가 한국어로 말하고 싶은 문장을 입력한다.
2. AI가 상황과 관계를 파악한다.
3. 정보가 부족하면 상대방 관계나 말투를 추가 질문한다.
4. MCP 서버가 일본어 문장, 로마자 발음, 한국어 뜻을 생성한다.
5. 핵심 표현을 초급자 기준으로 설명한다.
6. 사용자가 원하면 복습 카드로 저장한다.
7. 다음날 또는 사용자가 요청할 때 1분 복습 퀴즈를 제공한다.

---

### 12.2 정보 부족 시 질문 규칙

| 부족 정보       | 질문                                        |
| ----------- | ----------------------------------------- |
| 상대방 관계가 애매함 | “친구에게 보내는 말투로 할까요, 정중한 말투로 할까요?”          |
| 문장 의미가 애매함  | “이 문장은 부탁하는 느낌인가요, 사과하는 느낌인가요?”           |
| 학습자 수준이 없음  | “히라가나가 아직 헷갈리는 초급자 기준으로 설명할게요.”           |
| 너무 긴 문장     | “문장이 길어서 자연스러운 일본어 2문장으로 나눠드릴게요.”         |
| 자동 전송 요청    | “자동 전송은 하지 않고, 복사해서 보낼 수 있는 문장만 만들어드릴게요.” |

---

## 13. 응답 포맷 규칙

### 13.1 기본 응답 포맷

모든 일본어 문장 응답은 아래 형식을 따른다.

```text
[일본어 문장]
([로마자 발음])
[한국어 뜻]

핵심 표현:
- [표현] = [읽기] = [로마자] = [뜻]
```

### 13.2 예시

```text
ごめんね、急に用事が入っちゃって、30分だけ遅らせてもらってもいいかな？
(Gomen ne, kyuu ni youji ga haitchatte, sanjuppun dake okurasete moratte mo ii kana?)
미안, 갑자기 일이 생겨서 30분만 늦춰도 될까?

핵심 표현:
- 急に = きゅうに = kyuu ni = 갑자기
- 用事 = ようじ = youji = 볼일, 용무
- 30分 = さんじゅっぷん = sanjuppun = 30분
- 遅らせる = おくらせる = okuraseru = 늦추다

말투:
친구에게 부드럽게 부탁하는 자연스러운 표현입니다.
```

---

## 14. 학습 난이도 정책

### 14.1 absolute_beginner

대상:

* 히라가나/가타카나를 아직 헷갈림
* 한자 읽기 어려움
* 문법 용어에 익숙하지 않음

응답 방식:

* 로마자 발음 반드시 제공
* 핵심 표현은 2~3개만 설명
* 문법 용어 최소화
* “이 표현은 이런 느낌이에요” 방식으로 설명

### 14.2 beginner

대상:

* 히라가나/가타카나는 어느 정도 읽음
* 기초 문법 학습 중
* JLPT N5~N4 수준

응답 방식:

* 로마자 발음 제공
* 주요 문법 1개 설명
* 비슷한 표현 1개 추가 제공

### 14.3 intermediate

대상:

* 기본 문장은 읽을 수 있음
* 자연스러운 뉘앙스 차이를 알고 싶음
* JLPT N3 이상 목표

응답 방식:

* 로마자 발음은 선택 제공
* 말투 차이, 뉘앙스, 상황별 적합성 중심 설명
* 자연스러운 대체 표현 제공

---

## 15. 데이터 및 저장 정책

### 15.1 저장 데이터

| 데이터     | 저장 목적         |
| ------- | ------------- |
| 복습 카드   | 사용자가 배운 표현 복습 |
| 오답 기록   | 약점 분석         |
| 학습 수준   | 응답 난이도 조정     |
| 선호 말투   | 자연스러운 추천      |
| 마지막 학습일 | 학습 루틴 유지      |

### 15.2 저장하지 않는 데이터

| 데이터          | 이유        |
| ------------ | --------- |
| 카카오톡 대화 전체   | 개인정보 보호   |
| 상대방 개인정보     | 불필요       |
| 연락처 정보       | 서비스 목적 외  |
| 민감한 개인 대화 원문 | 개인정보 리스크  |
| 자동 전송 기록     | 자동 전송 미지원 |

### 15.3 개인정보 원칙

* 사용자가 직접 입력한 문장만 처리한다.
* 학습 목적에 필요한 표현만 저장한다.
* 민감한 문장은 복습 카드 저장 전 사용자 확인을 받는다.
* 원문 전체 대신 학습 표현 중심으로 저장한다.
* 사용자는 저장된 복습 카드를 삭제할 수 있어야 한다.

---

## 16. 에러 및 예외 처리

| 상황            | 처리 방식                      |
| ------------- | -------------------------- |
| 문장이 너무 길다     | 짧은 문장으로 나눠서 번역             |
| 의미가 애매하다      | 확인 질문 후 진행                 |
| 부적절한 표현 요청    | 정중하고 안전한 대체 표현 제안          |
| 욕설/비하 표현 요청   | 그대로 번역하지 않고 완곡한 표현 제안      |
| 로마자 변환 실패     | 일본어 문장과 한국어 뜻만 제공하고 재시도 안내 |
| 복습 카드 저장 실패   | 저장 실패 안내 후 문장 자체는 제공       |
| 사용자가 자동 전송 요청 | 자동 전송 미지원, 복사용 문구 제공       |

---

## 17. 안전 정책

### 17.1 자동 전송 제한

이 서비스는 사용자를 대신해 카카오톡 메시지를 자동 전송하지 않는다.

지원하는 범위:

* 보낼 문장 작성
* 말투 조정
* 복사용 문구 제공
* 학습용 설명 제공

지원하지 않는 범위:

* 친구에게 자동 전송
* 단체방 자동 발송
* 상대방 프로필/대화 내용 자동 분석
* 사용자의 사적인 대화 무단 저장

### 17.2 부적절한 표현 처리

사용자가 공격적이거나 무례한 문장을 일본어로 바꿔달라고 요청하면, 그대로 번역하지 않고 더 안전하고 정중한 대체 표현을 제안한다.

예시:

사용자:

> “너 때문에 짜증나” 일본어로 해줘.

응답 방향:

```text
그대로 말하면 상대방이 공격적으로 느낄 수 있어요.
조금 더 부드럽게는 이렇게 말할 수 있습니다.

ちょっと困っている。
(Chotto komatte iru.)
조금 곤란해.
```

---

## 18. 성공 지표

### 18.1 사용자 지표

| 지표                  |       목표 |
| ------------------- | -------: |
| 첫 응답 만족도            | 4.3/5 이상 |
| 로마자 발음 유용하다고 평가한 비율 |   70% 이상 |
| 복습 카드 저장률           |   30% 이상 |
| 1분 복습 재사용률          |   20% 이상 |
| 7일 내 재방문율           |   25% 이상 |
| 문장 교정 후 재시도율        |   30% 이상 |

### 18.2 기술 지표

| 지표              |     목표 |
| --------------- | -----: |
| MCP Tool 호출 성공률 | 95% 이상 |
| 평균 응답 시간        |  3초 이하 |
| P95 응답 시간       |  8초 이하 |
| 로마자 누락률         |  1% 이하 |
| 응답 포맷 준수율       | 98% 이상 |
| 복습 카드 저장 성공률    | 95% 이상 |

---

## 19. 공모전 심사 기준 대응

### 19.1 창의성

* 단순 번역기가 아니라 실제 카톡 문장 기반 일본어 학습 코치다.
* 초급자가 읽을 수 있도록 로마자 발음을 기본 제공한다.
* 문장 생성, 말투 변환, 표현 설명, 복습 퀴즈까지 하나의 학습 흐름으로 연결한다.
* 카카오톡에서 자주 발생하는 실전 대화를 학습 콘텐츠로 전환한다.

### 19.2 편의성

* 사용자는 “이 말 일본어로 자연스럽게 뭐라고 해?”라고 묻기만 하면 된다.
* 일본어 문장, 발음, 뜻, 핵심 표현을 한 번에 받을 수 있다.
* 복습 카드와 1분 퀴즈로 매일 짧게 학습할 수 있다.
* 히라가나/가타카나가 아직 헷갈려도 사용할 수 있다.

### 19.3 안정성

* 자동 메시지 전송을 하지 않아 오발송 위험을 줄인다.
* 민감한 대화 원문을 저장하지 않는다.
* 학습에 필요한 표현 단위로만 저장한다.
* 공격적 표현은 완곡하고 안전한 표현으로 바꿔 제안한다.

---

## 20. MVP 데모 시나리오

### 데모 1. 친구에게 보낼 카톡 문장 변환

사용자:

> 일본인 친구한테 “오늘 갑자기 일이 생겨서 약속 30분만 미뤄도 될까?” 자연스럽게 보내고 싶어.

예상 응답:

```text
ごめんね、急に用事が入っちゃって、30分だけ遅らせてもらってもいいかな？
(Gomen ne, kyuu ni youji ga haitchatte, sanjuppun dake okurasete moratte mo ii kana?)
미안, 갑자기 일이 생겨서 30분만 늦춰도 될까?

핵심 표현:
- 急に = きゅうに = kyuu ni = 갑자기
- 用事 = ようじ = youji = 볼일, 용무
- 遅らせる = おくらせる = okuraseru = 늦추다

친구에게 부드럽게 부탁하는 자연스러운 표현입니다.
```

---

### 데모 2. 여행 상황 표현

사용자:

> 일본 편의점에서 “봉투 하나 주세요”라고 말하고 싶어. 나 아직 히라가나도 헷갈려서 발음도 같이 알려줘.

예상 응답:

```text
袋を一つください。
(Fukuro o hitotsu kudasai.)
봉투 하나 주세요.

핵심 표현:
- 袋 = ふくろ = fukuro = 봉투
- 一つ = ひとつ = hitotsu = 하나
- ください = kudasai = 주세요

편의점에서 바로 써도 자연스러운 표현입니다.
```

---

### 데모 3. 일본어 문장 교정

사용자:

> “Watashi wa ashita Tokyo ni iku desu” 이렇게 말해도 돼?

예상 응답:

```text
의미는 통하지만 조금 어색해요.
자연스럽게는 이렇게 말합니다.

私は明日東京に行きます。
(Watashi wa ashita Toukyou ni ikimasu.)
저는 내일 도쿄에 갑니다.

포인트:
- “iku desu”보다는 “ikimasu”가 자연스럽습니다.
- 行きます = いきます = ikimasu = 갑니다
```

---

### 데모 4. 오늘의 1분 복습

사용자:

> 오늘 배운 표현 복습시켜줘.

예상 응답:

```text
오늘의 1분 복습입니다.

문제 1.
“늦을 것 같아”를 일본어로 어떻게 말할까요?

힌트:
おくれそう
(okuresou)

정답:
遅れそう
(Okuresou.)
늦을 것 같아.
```

---

## 21. 기술 아키텍처

### 21.1 구성 요소

```text
사용자
  ↓
AI Client / Kakao Tools / PlayMCP
  ↓
My Personal Japanese Learning Coach MCP Server
  ↓
Tool Router
  ├─ translate_kakao_message
  ├─ correct_japanese_sentence
  ├─ explain_expression
  ├─ create_review_card
  ├─ generate_daily_quiz
  └─ analyze_weakness
  ↓
Learning Data Store
  ├─ Review Cards
  ├─ Mistake Logs
  └─ User Level Profile
```

### 21.2 서버 구성

| 구성 요소                         | 설명                          |
| ----------------------------- | --------------------------- |
| MCP Server                    | PlayMCP에 등록되는 remote MCP 서버 |
| Tool Router                   | 요청에 맞는 Tool 실행              |
| Japanese Expression Generator | 일본어 문장 생성                   |
| Romanization Engine           | 일본어 문장의 로마자 발음 생성           |
| Beginner Explanation Engine   | 초급자용 표현 설명 생성               |
| Review Card Store             | 복습 카드 저장                    |
| Quiz Generator                | 저장된 표현 기반 퀴즈 생성             |
| Weakness Analyzer             | 오답/교정 기록 기반 약점 분석           |
| Safety Filter                 | 부적절한 표현 완화 및 자동 전송 제한       |

---

## 22. 데이터 모델 초안

### 22.1 ReviewCard

```json
{
  "card_id": "card_001",
  "user_id": "anonymous_or_internal_user_id",
  "expression": "遅れそう",
  "reading": "おくれそう",
  "romanization": "okuresou",
  "korean_meaning": "늦을 것 같아",
  "example_sentence": "今日ちょっと遅れそう。",
  "example_romanization": "Kyou chotto okuresou.",
  "context": "friend_message",
  "difficulty": "easy",
  "created_at": "2026-06-20T10:00:00+09:00",
  "review_count": 0,
  "mistake_count": 0
}
```

### 22.2 MistakeLog

```json
{
  "mistake_id": "mistake_001",
  "user_id": "anonymous_or_internal_user_id",
  "input_sentence": "Watashi wa ashita Tokyo ni iku desu",
  "corrected_sentence": "私は明日東京に行きます。",
  "mistake_tags": ["verb_form", "politeness"],
  "explanation": "iku desu보다 ikimasu가 자연스러움",
  "created_at": "2026-06-20T10:00:00+09:00"
}
```

---

## 23. 개발 일정

### 1주차: MVP 핵심 기능

* MCP 서버 기본 구조 생성
* `translate_kakao_message` Tool 구현
* 기본 응답 포맷 구현
* 로마자 발음 필드 생성
* 핵심 표현 분해 로직 구현

### 2주차: 교정 및 설명 기능

* `correct_japanese_sentence` Tool 구현
* 초급자용 설명 템플릿 구현
* 말투 변환 로직 구현
* 친구/직장/여행 상황별 예시 구축

### 3주차: 복습 기능

* `create_review_card` Tool 구현
* 복습 카드 저장소 구현
* `generate_daily_quiz` Tool 구현
* 오답 기록 데이터 모델 구현

### 4주차: PlayMCP 등록 및 공모전 제출 준비

* PlayMCP 등록
* Tool 설명문 정리
* 데모 시나리오 작성
* 공모전 제출용 소개 문구 작성
* 개인정보/안전 정책 정리
* 시연 영상 또는 발표 스크립트 준비

---

## 24. 리스크 및 대응 방안

| 리스크            | 영향        | 대응                         |
| -------------- | --------- | -------------------------- |
| 일반 번역기와 차별화 부족 | 심사 매력도 하락 | 로마자 발음, 복습 카드, 카톡 말투 변환 강조 |
| 로마자 표기 오류      | 학습 신뢰도 하락 | 표기 기준 고정, 테스트 케이스 구축       |
| 문장 난이도 과도      | 초급자 이탈    | absolute_beginner 모드 기본 적용 |
| 개인정보 저장 우려     | 사용자 신뢰 하락 | 원문 저장 최소화, 복습 카드 저장 전 확인   |
| 일본어 뉘앙스 오류     | 품질 저하     | 상황별 표현 템플릿과 예시 데이터 보강      |
| 장문 요청 증가       | 응답 품질 저하  | 카톡 문장 중심으로 1~3문장 제한 권장     |
| 자동 전송 오해       | 안전 리스크    | 자동 전송 미지원 명확화              |

---

## 25. 향후 확장 기능

| 기능                 | 설명                         |
| ------------------ | -------------------------- |
| 카카오톡 나와의 채팅방 복습 저장 | 오늘 배운 표현을 나와의 채팅방에 저장      |
| 톡캘린더 학습 알림         | 매일 1분 일본어 복습 일정 생성         |
| 여행 모드              | 편의점, 식당, 호텔, 지하철 상황별 표현 세트 |
| 일본인 친구 모드          | 친근한 카톡 말투 중심 학습            |
| 비즈니스 일본어 모드        | 메일, 미팅, 일정 조율 표현 학습        |
| JLPT N5/N4 문법 태그   | 표현별 JLPT 문법 연결             |
| 음성 재생              | 일본어 문장을 들으며 따라 읽기          |
| 발음 녹음 피드백          | 사용자가 말한 발음을 평가             |
| 이미지 OCR 연동         | 일본어 메뉴판/간판 읽기 보조           |

---

## 26. 최종 MVP 포지셔닝 문구

**My Personal Japanese Learning Coach MCP는 단순 번역기가 아니라, 카카오톡에서 실제로 쓰고 싶은 일본어 문장을 초급자 눈높이에 맞게 바꿔주는 개인 일본어 코치다.**

사용자는 이렇게 묻기만 하면 된다.

> “일본인 친구한테 이 말 자연스럽게 어떻게 보내?”

그러면 MCP는 일본어 문장, 로마자 발음, 한국어 뜻, 핵심 표현, 복습 카드까지 제공한다.

이 서비스의 핵심은 일본어를 이미 잘하는 사람을 위한 고급 도구가 아니라, **히라가나와 가타카나도 아직 헷갈리는 학습자가 오늘 바로 한 문장을 써볼 수 있게 만드는 것**이다.

---

## 27. 공모전 제출용 짧은 소개 문구

**하루톡 일본어 코치 MCP**는 카카오톡에서 실제로 보내고 싶은 한국어 문장을 자연스러운 일본어로 바꿔주고, 초급자도 따라 읽을 수 있도록 로마자 발음과 쉬운 설명을 함께 제공하는 개인 일본어 학습 코치입니다.
단순 번역을 넘어, 상황별 말투 변환, 핵심 표현 설명, 복습 카드, 1분 퀴즈까지 연결해 매일 부담 없이 일본어를 익힐 수 있게 도와줍니다.

