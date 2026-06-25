# BLUEPRINT.md — kakao-playmcp Harness 시스템 구조

> 이 문서는 현재 설치된 harness 시스템이 어떻게 동작하는지 한눈에 파악하기 위한 설계도다.
> 코드가 아니라 "각 레이어가 무슨 역할을 하고, 언제 발동되며, 어떻게 맞물리는가"를 설명한다.

---

## 전체 구조 한 줄 요약

```
사용자 요청
  → [Plugin Layer] 세션 시작·프롬프트 제출 시 자동 주입
  → [Harness Layer] 요청을 분석해 적절한 Agent에게 위임
  → [Agent Layer] Worker / Reviewer / Advisor 각자의 규칙으로 실행
  → 결과 반환
```

---

## 1. Plugin Layer (전역 — user scope)

세션이 시작되거나 프롬프트가 제출될 때 자동으로 동작하는 네 개의 플러그인.
Claude Code가 관리하며, 이 프로젝트에만 한정되지 않고 모든 세션에 적용된다.

### 1-1. claude-code-harness v4.16.3 (핵심 엔진)

Harness 전체를 구동하는 Go 바이너리. `harness` 명령어로 직접 호출하거나, 스킬(`/harness-work`, `/harness-plan` 등)을 통해 간접 호출된다. Plans.md의 Task를 읽어 worker·reviewer·advisor에게 배분하는 오케스트레이터 역할.

**주요 명령어**
```
harness init      → 프로젝트 초기화 (harness.toml 생성)
harness sync      → harness.toml → .claude-plugin/ 파일 동기화
harness doctor    → 설치 상태 전체 점검
```

---

### 1-2. ponytail v4.8.3 (코드 효율 강제)

"게으른 시니어 개발자" 모드. 코드를 작성하기 전에 7단계 의사결정 사다리를 실행해 불필요한 코드 작성을 막는다.

**발동 시점**

| Hook | 타이밍 | 동작 |
|------|--------|------|
| `SessionStart` | 세션 시작 시 | `ponytail-activate.js` → lazy senior dev 시스템 프롬프트 주입 |
| `SubagentStart` | **서브에이전트(worker 등) 시작 시** | `ponytail-subagent.js` → 서브에이전트에도 동일 규칙 주입 |
| `UserPromptSubmit` | 매 프롬프트 제출 시 | `ponytail-mode-tracker.js` → 현재 모드 상태 추적 |

> 핵심: `SubagentStart` 훅 덕분에 harness가 worker를 spawning할 때 **자동으로** ponytail이 함께 적용된다.

**7단계 의사결정 사다리**
```
1. 정말 필요한가? (YAGNI)
2. 이미 코드베이스에 있는가? (재사용)
3. 표준 라이브러리로 가능한가?
4. 네이티브 플랫폼 기능인가?
5. 설치된 의존성으로 가능한가?
6. 한 줄로 가능한가?
7. 그제야: 최소 필수 코드만 작성
```

---

### 1-3. caveman v25d22f864ad6 (출력 토큰 압축)

응답을 "스마트 원시인"처럼 압축해 출력 토큰을 평균 65% 줄인다. 기술적 정확성은 그대로 유지.

**발동 시점**

| Hook | 타이밍 | 동작 |
|------|--------|------|
| `SessionStart` | 세션 시작 시 | `caveman-activate.js` → caveman 모드 주입 (기본: full) |
| `UserPromptSubmit` | 매 프롬프트 제출 시 | `caveman-mode-tracker.js` → 모드 상태 추적 |

**압축 강도**
```
lite   → 불필요한 filler/hedging만 제거. 문장 구조·조사 유지. 전문적이고 간결.
full   → 관사 생략, 단편 문장 허용, 짧은 동의어. 원시인 스타일. (기본값)
ultra  → 산문 단어도 약어화. 극단적 압축.
```

> ⚠️ 기본값은 `full`이지만, **worker 에이전트는 `lite`로 고정**된다 (2절 참조).

---

### 1-4. value-for-fable v1.0.1 (Fable 5 품질 구조)

Sonnet 모델에 Fable 5의 운영 규율을 적용해 Opus 수준 품질을 Sonnet 비용(약 70% 절감)으로 끌어낸다. 압축이 아니라 **진단 구조**가 핵심이다.

**컴포넌트 구성**

| 컴포넌트 | 활성화 방식 | 역할 |
|---------|-----------|------|
| Skill (`/itsvff`) | "VFF", "패블 모드" 수동 트리거 | 현재 세션에 즉시 적용 |
| Output Style (vff-v2) | reviewer/advisor MEMORY.md 지시 | 응답 구조 상시 적용 |
| Agent (itsvff) | 복잡한 과제 자동 위임 | 별도 컨텍스트에서 처리 |
| Hook (reminder.sh) | 컨텍스트 400KB 초과 시 자동 | 장시간 세션 드리프트 방지 |

**VFF v2의 핵심 원칙**
```
- 첫 문장 = 결론 (무슨 일이 있었나 / 뭘 찾았나)
- 단서 우선 가설 (모든 단서를 설명하는 원인을 먼저 찾는다)
- 측정 먼저 좁히기 (처방 전에 가장 싼 확인 수단 제시)
- 확신도 표시 (직접 보지 않은 것은 단정하지 않는다)
- 충실함 > 압축 (짧게 자르는 것이 미덕이 아니다)
```

---

## 2. Agent Layer (per-agent 규칙)

harness가 요청을 처리할 때 spawning하는 세 종류의 에이전트. 각각 다른 Plugin 조합을 적용한다.

```
.claude/agent-memory/
├── claude-code-harness-worker/MEMORY.md    ← worker 전용 규칙
├── claude-code-harness-reviewer/MEMORY.md  ← reviewer 전용 규칙
└── claude-code-harness-advisor/MEMORY.md   ← advisor 전용 규칙
```

### Plugin 적용 매트릭스

| | worker | reviewer | advisor |
|--|:------:|:--------:|:-------:|
| **ponytail** (코드 효율) | 전체 | 전체 | 전체 |
| **caveman** (토큰 압축) | **lite** | OFF | OFF |
| **VFF v2** (진단 구조) | 검증·코드 규율만 | **전체** | **전체** |
| **VFF Hook** (드리프트 방지) | 전역 발동 | 전역 발동 | 전역 발동 |

### worker

구현 담당. Plans.md의 Task를 실제로 코드로 만드는 역할.

- **caveman lite**: filler 제거, 문장 구조는 유지 → 간결하되 읽을 수 있는 응답
- **ponytail 전체**: 코드 작성 전 7단계 사다리 → MVP 범위 외 구현 금지
- **VFF 검증·코드 규율만**: 완료 선언 전 검증 의무 + 요청 범위 외 수정 금지
- (VFF 출력 스타일은 미적용 — caveman lite와 스타일 충돌 방지)

### reviewer

완료된 구현을 검토하는 역할.

- **caveman OFF**: 판단 근거와 리뷰 내용은 압축하지 않는다
- **ponytail 전체**: 과도한 추상화·오버엔지니어링 지적 기준으로 활용
- **VFF v2 전체**: 단서 우선 진단, 확신도 표시, 핵심 변수 1~2개로 추천

### advisor

방침과 설계 방향을 결정하는 역할.

- **caveman OFF**: 설계 근거는 압축 없이 명확하게
- **ponytail 전체**: YAGNI 원칙 우선 적용
- **VFF v2 전체**: 의사결정 조언 시 핵심 변수 먼저, 일반론 나열 금지

---

## 3. Harness Layer (프로젝트 설정)

harness 자체의 동작을 정의하는 파일들.

```
kakao-playmcp/
├── harness.toml              ← 프로젝트명·버전·안전 규칙 정의
├── .claude-plugin/
│   ├── plugin.json           ← Claude Code에 이 프로젝트를 플러그인으로 등록
│   └── settings.json         ← harness sync가 자동 생성하는 설정
├── CLAUDE.md                 ← 프로젝트 전역 규칙 (기술 스택, Tool 목록, 응답 포맷)
└── Plans.md                  ← Task 목록 (cc:TODO / cc:WIP / cc:완료 마커)
```

**harness.toml 주요 설정**
```toml
[project]
name = "kakao-playmcp"

[safety.permissions]
deny = ["Bash(sudo:*)"]           # sudo 금지
ask  = ["Bash(rm -r:*)",          # 삭제 시 확인 요청
         "Bash(git push --force:*)"]
```

---

## 4. 세션 타임라인 — 실제 실행 흐름

### 세션 시작 시

```
1. ponytail SessionStart 훅 → lazy senior dev 시스템 프롬프트 주입
2. caveman SessionStart 훅  → caveman 모드 주입 (기본 full)
   ※ worker spawning 시: worker MEMORY.md의 "lite" 지시로 caveman lite로 전환
```

### 매 프롬프트 제출 시

```
3. ponytail UserPromptSubmit 훅  → 현재 모드 상태 추적
4. caveman UserPromptSubmit 훅   → 현재 모드 상태 추적
5. VFF UserPromptSubmit 훅       → 컨텍스트 400KB 초과 + VFF 활성 상태면
                                    VFF 리마인더를 컨텍스트에 주입
```

### harness-work 실행 시 (/harness-work)

```
6. harness가 Plans.md에서 cc:TODO Task 선택
7. advisor에게 방침 요청 (caveman OFF + VFF v2)
8. worker에게 구현 위임 (caveman lite + ponytail + VFF 검증)
   └─ SubagentStart 훅 → ponytail이 worker에 자동 주입
9. reviewer에게 검토 요청 (caveman OFF + VFF v2)
10. 결과를 Plans.md에 반영 (cc:WIP → cc:완료)
```

---

## 5. 사용 가능한 스킬 명령어

| 명령어 | 역할 |
|--------|------|
| `/harness-plan` | Plans.md Task 추가·관리 |
| `/harness-work` | Plans.md Task 실행 (worker 팀 가동) |
| `/harness-review` | 코드·계획 리뷰 |
| `/harness-sync` | Plans.md ↔ 구현 상태 동기화 확인 |
| `/harness-progress` | 진행 현황 대시보드 |
| `/ponytail [lite\|full\|ultra]` | ponytail 강도 수동 조절 |
| `/caveman [lite\|full\|ultra]` | caveman 강도 수동 조절 |
| `/itsvff` | VFF 세션 모드 수동 활성화 |
| `/ponytail-review` | 현재 diff ponytail 기준 리뷰 |

---

## 6. Plugin 간 협력 관계 요약

```
ponytail ──────────────────────────────────────────▶ 모든 Agent
  코드를 쓰기 전에 "정말 필요한가?"를 강제

caveman ───────────────────────────────────────────▶ worker(lite), reviewer/advisor(OFF)
  worker: 간결한 진행 응답 / reviewer·advisor: 판단 근거 명확히

VFF v2 ────────────────────────────────────────────▶ reviewer/advisor(전체), worker(검증만)
  진단 구조 + 확신도 + 결론 첫 문장

VFF Hook ──────────────────────────────────────────▶ 전체 (400KB+ 세션)
  장시간 세션에서 VFF 원칙이 희미해지는 것을 자동으로 방지

harness ───────────────────────────────────────────▶ 전체 조율
  Plans.md 기반으로 위 세 Agent를 오케스트레이션
```

---

## 7. 이 프로젝트의 현재 상태

| 항목 | 상태 |
|------|------|
| harness 초기화 | ✅ 완료 (harness.toml, .claude-plugin/) |
| CLAUDE.md | ✅ 완료 |
| Plans.md | ✅ 완료 (Week 1~4 Task 정의) |
| Plugin 설치 | ✅ 4개 전부 user scope 활성 |
| Agent 규칙 | ✅ worker/reviewer/advisor MEMORY.md 설정 완료 |
| git 초기화 | ✅ 완료 (3 commits) |
| **MCP 서버 구현** | ⬜ 미시작 (Week 1부터) |

다음 단계: `/harness-work` 또는 `/harness-plan`으로 Week 1 구현 시작.
