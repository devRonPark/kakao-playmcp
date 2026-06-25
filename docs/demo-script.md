# 시연 스크립트 (3분)

## 오프닝 (20초)

"일본어 공부하고 싶은데 막막하다면, 카카오톡에서 쓰고 싶은 문장을 그냥 물어보세요.
하루톡 일본어 코치가 번역부터 복습까지 한 번에 해드립니다."

---

## 장면 1 — 친구 카톡 변환 (45초)

**사용자 입력:**
> 일본인 친구한테 "오늘 갑자기 일이 생겨서 약속 30분만 미뤄도 될까?" 자연스럽게 보내고 싶어.

**Tool 호출:** `translate_kakao_message`
```json
{
  "korean_text": "오늘 갑자기 일이 생겨서 약속 30분만 미뤄도 될까?",
  "relationship": "friend",
  "tone": "casual",
  "learner_level": "absolute_beginner"
}
```

**포인트:**
- 3단 구조(일본어 / 로마자 / 한국어) 확인
- 핵심 표현 2~4개 설명 확인
- 말투 노트 확인

---

## 장면 2 — 문장 교정 (40초)

**사용자 입력:**
> "Watashi wa ashita Tokyo ni iku desu" 이렇게 말해도 돼?

**Tool 호출:** `correct_japanese_sentence`
```json
{
  "user_sentence": "Watashi wa ashita Tokyo ni iku desu",
  "tone": "polite",
  "learner_level": "absolute_beginner"
}
```

**포인트:**
- 교정된 문장 확인
- "이런 느낌이에요" 방식 설명 확인 (문법 용어 없음)

---

## 장면 3 — 복습 카드 저장 → 퀴즈 (55초)

**사용자 입력:**
> 방금 배운 "急に" 저장해줘.

**Tool 호출:** `create_review_card`
```json
{
  "expression": "急に",
  "reading": "きゅうに",
  "romanization": "kyuu ni",
  "korean_meaning": "갑자기",
  "context": "친구에게 약속 변경 요청"
}
```

→ 저장 확인 후:

> 오늘 배운 표현 퀴즈 내줘.

**Tool 호출:** `generate_daily_quiz`
```json
{ "quiz_count": 1, "level": "absolute_beginner", "focus": "meaning" }
```

---

## 클로징 (20초)

"번역기와 다른 점은, 처음 히라가나도 헷갈리는 분도 오늘 바로 한 문장을 써볼 수 있다는 거예요.
매일 한 문장, 하루톡 일본어 코치로 시작해보세요."
