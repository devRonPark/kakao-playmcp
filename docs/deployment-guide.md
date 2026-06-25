# 로컬 배포 가이드

## 사전 요구사항

- Node.js 18 이상
- Anthropic API 키 ([발급](https://console.anthropic.com/))

## 1단계: 프로젝트 설치

```bash
git clone https://github.com/devRonPark/kakao-playmcp.git
cd kakao-playmcp
npm install
npm run build
```

빌드 성공 시 `dist/` 디렉토리가 생성됩니다.

## 2단계: MCP 클라이언트 연결

### Claude Desktop (권장)

`claude_desktop_config.json` 파일에 다음을 추가합니다.

**파일 위치:**

| OS | 경로 |
|----|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/claude/claude_desktop_config.json` |

**설정 내용:**

```json
{
  "mcpServers": {
    "harutalk-japanese-coach": {
      "command": "node",
      "args": ["/절대경로/kakao-playmcp/dist/index.js"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-여기에키입력"
      }
    }
  }
}
```

> `/절대경로/kakao-playmcp` 부분을 실제 경로로 변경하세요.  
> macOS/Linux 예시: `/Users/yourname/kakao-playmcp`  
> Windows 예시: `C:\\Users\\yourname\\kakao-playmcp`

### 연결 확인

Claude Desktop을 재시작한 후, 채팅창 좌측 하단에 **망치 아이콘(🔨)** 이 나타나면 연결 성공입니다.

아이콘을 클릭하면 등록된 tool 목록을 확인할 수 있습니다:
- `translate_kakao_message`
- `correct_japanese_sentence`
- `explain_expression`
- `create_review_card`
- `generate_daily_quiz`

## 3단계: 동작 확인

Claude Desktop에서 다음 메시지를 입력해보세요:

```
"나 오늘 좀 늦을 것 같아, 미안"을 친구한테 보낼 자연스러운 일본어로 번역해줘.
```

정상 응답 예시:
```
ごめん、今日ちょっと遅れそう。
(Gomen, kyou chotto okuresou.)
미안, 오늘 좀 늦을 것 같아.
```

## 문제 해결

### 서버가 연결되지 않을 때

```bash
# 서버 직접 실행해서 오류 확인
ANTHROPIC_API_KEY=sk-ant-... node dist/index.js
```

정상 실행 시 다음 메시지가 출력됩니다:
```
MCP server running — 하루톡 일본어 코치 v0.1.0
```

### API 키 오류

- `ANTHROPIC_API_KEY` 환경변수가 정확히 입력되었는지 확인
- [Anthropic Console](https://console.anthropic.com/)에서 크레딧 잔액 확인

### 빌드 오류

```bash
npm run lint   # 린트 오류 확인
npm run build  # 빌드 재시도
```
