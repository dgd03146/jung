# Claude Code 사용 가이드

이 프로젝트에서 Claude Code를 효과적으로 사용하는 방법을 정리한 문서입니다.

## 목차

1. [TL;DR - 5분 퀵스타트](#tldr---5분-퀵스타트)
2. [일일 워크플로우](#일일-워크플로우)
3. [커스텀 명령어](#커스텀-명령어) - `/generate-pr`, `/generate-commit` 등
4. [Skills 사용법](#skills-사용법) - 자동 활성화되는 전문 지침
5. [Agents 사용법](#agents-사용법) - 전문가 역할 서브에이전트
6. [단축키 & 팁](#단축키--팁)
7. [Hooks](#hooks) - 자동 포맷팅, 알림 등
8. [고급 기능](#고급-기능) - Subagents, Ralph Loop 등
9. [참고 자료](#참고-자료)

---

## TL;DR - 5분 퀵스타트

### 시작하기

```bash
claude                    # 시작
claude --continue         # 이전 세션 이어하기
claude --resume feature   # 특정 세션 재개
```

### 가장 많이 쓰는 것들

```bash
# 커맨드 (슬래시로 호출)
/generate-commit          # 커밋 분할 생성
/generate-pr              # PR 자동 생성
/today-recap              # 오늘 작업 요약

# Skills (자동 활성화 - 그냥 요청하면 됨)
> 이 코드 리뷰해줘           # code-review 스킬 자동 활성화
> 보안 검사해줘              # security-check 스킬 자동 활성화
> 테스트 작성해줘            # test-writer 스킬 자동 활성화

# Agents (명시적 호출)
> debugger 에이전트로 이 에러 분석해줘
> architect 에이전트로 구조 검토해줘

# 병렬 처리
> 4개 에이전트로 코드베이스 탐색해줘
```

### 필수 단축키

| 단축키 | 기능 |
|--------|------|
| `Shift+Tab` × 2 | Plan Mode (코드 수정 없이 분석) |
| `Esc` × 2 | 되돌리기 |
| `ultrathink:` | 깊은 사고 모드 |

---

## 일일 워크플로우

### 아침 루틴

```bash
> /morning
# git pull, 브랜치 상태, 할 일 확인
```

### 기능 개발 플로우

```bash
# 1. 계획 수립 (Plan Mode)
> Shift+Tab × 2  # Plan Mode 진입
> ultrathink: 로그인 기능 어떻게 구현할지 설계해줘

# 2. 구현
> 이제 구현 시작해줘
# (자동으로 코드 작성 → Biome 포맷팅)

# 3. 리뷰 (Skills 자동 활성화)
> 방금 작성한 코드 리뷰해줘

# 4. 테스트
> 이 컴포넌트 테스트 작성해줘

# 5. 커밋
> /generate-commit
```

### PR 생성 플로우

```bash
# 1. 커밋 정리
> /generate-commit

# 2. PR 생성
> /generate-pr
# 자동으로 커밋 분석 → PR 제목/본문 생성 → 이슈 연동
```

### 디버깅 플로우

```bash
# 에러 발생 시
> debugger 에이전트로 이 에러 분석해줘
# Cannot read property 'name' of undefined

# 또는 복잡한 버그
> ultrathink: 이 버그 원인 분석해줘
```

### 리팩토링 플로우

```bash
# 1. 구조 분석
> architect 에이전트로 auth 모듈 구조 검토해줘

# 2. 리팩토링 계획
> Shift+Tab × 2  # Plan Mode
> 리팩토링 계획 세워줘

# 3. 실행 (병렬 처리)
> 이 함수 사용하는 파일들 각각 subagent로 수정해줘
```

### 하루 마무리

```bash
> /today-recap
# 오늘 한 작업, 커밋, 변경사항 요약
```

---

## 커스텀 명령어

**슬래시(/)로 시작하는 명령어**입니다. 자주 쓰는 워크플로우를 자동화합니다.

| 명령어 | 설명 |
|--------|------|
| `/generate-pr` | 커밋 분석 후 PR 자동 생성 |
| `/generate-issue` | 대화형 GitHub Issue 생성 |
| `/generate-commit` | 관심사 단위로 커밋 분할 생성 |
| `/today-recap` | 오늘 작업 요약 (Git 변경사항 포함) |
| `/morning` | 아침 루틴 (git pull, 상태 확인) |
| `/review` | 코드 리뷰 수행 |
| `/fix-types` | TypeScript 타입 에러 자동 수정 |
| `/ralph-loop` | 자동 반복 작업 (Ralph Wiggum 기법) |
| `/cancel-ralph` | Ralph 루프 취소 |

### 사용 예시

```
> /generate-pr
# 현재 브랜치의 커밋들을 분석하여 PR 생성

> /generate-commit
# 변경사항을 논리적 단위로 나누어 커밋

> /ralph-loop "REST API 구축. CRUD, 테스트 통과 필요" --max-iterations 20
# 완료될 때까지 자동으로 반복 실행
```

---

## Skills 사용법

**Skills**는 특정 작업에 특화된 지침서입니다. 관련 작업 요청 시 **자동으로 활성화**됩니다 (84% 확률).

### 설정된 Skills

| Skill | 트리거 키워드 | 용도 |
|-------|--------------|------|
| `code-review` | 리뷰, 검토, PR | 코드 품질, FSD 아키텍처, React 패턴 검사 |
| `security-check` | 보안, 취약점, XSS | OWASP Top 10 기준 보안 감사 |
| `test-writer` | 테스트, 단위테스트 | Vitest + Testing Library 테스트 작성 |
| `refactor` | 리팩토링, 정리 | 클린 코드 원칙 적용 |

### 사용 방법

```bash
# 방법 1: 그냥 요청 (자동 활성화)
> 이 코드 리뷰해줘
> 보안 검사해줘
> 테스트 작성해줘
> 리팩토링해줘

# 방법 2: 명시적 요청 (100% 확실)
> code-review 스킬로 이 PR 리뷰해줘
> security-check 스킬로 auth 모듈 검사해줘
```

### Skills vs Commands vs Agents 비교

| 구분 | 호출 방식 | 용도 | 예시 |
|------|----------|------|------|
| **Skills** | 자동 (키워드) | 특정 작업 지침 | "리뷰해줘" → code-review 활성화 |
| **Commands** | `/명령어` | 워크플로우 자동화 | `/generate-pr` |
| **Agents** | "에이전트로" | 전문가 역할 위임 | "debugger 에이전트로 분석해줘" |

---

## Agents 사용법

**Agents**는 특정 분야의 전문가 역할을 하는 서브에이전트입니다. 별도의 context window를 사용하여 메인 세션을 오염시키지 않습니다.

### 설정된 Agents

| Agent | 용도 | 사용 시점 |
|-------|------|----------|
| `debugger` | 버그 분석, 스택 트레이스 해석 | 에러 발생 시 |
| `architect` | 아키텍처 설계, 구조 검토 | 설계/리팩토링 전 |

### 사용 방법

```bash
# 명시적 호출
> debugger 에이전트로 이 에러 분석해줘
> architect 에이전트로 현재 구조 검토해줘

# 또는
> debugger 에게 이 스택 트레이스 분석 맡겨줘
> architect 한테 FSD 구조 검토 요청해줘
```

### 실전 예시

**버그 디버깅**
```bash
> debugger 에이전트로 이 에러 분석해줘
# TypeError: Cannot read property 'name' of undefined
#     at UserProfile (src/components/UserProfile.tsx:15:23)
```

**아키텍처 검토**
```bash
> architect 에이전트로 auth 모듈 구조 검토해줘
# FSD 레이어 준수, 의존성 분석, 개선 제안 받기
```

**병렬 에이전트 (Subagents)**
```bash
# 여러 에이전트 동시 실행
> 4개 에이전트로 코드베이스 탐색해줘

# 파일별 병렬 처리
> 이 함수 사용하는 75개 파일, 각각 subagent로 리팩토링해줘
```

---

## 단축키 & 팁

### 필수 단축키

| 단축키 | 기능 |
|--------|------|
| `!command` | 터미널 명령 즉시 실행 (예: `!git status`) |
| `Esc` × 2 | 이전 상태로 되돌리기 (코드/대화) |
| `Shift+Tab` × 2 | Plan Mode 전환 (읽기 전용 분석) |
| `Ctrl+R` | 이전 프롬프트 검색 |
| `Ctrl+S` | 프롬프트 임시 저장 |
| `Ctrl+G` | 외부 편집기로 프롬프트 작성 |
| `Tab` | 자동 제안 수락 |

### 프롬프트 팁

```bash
# 메모리에 바로 저장
# Always use pnpm instead of npm

# 파일 참조
> Explain @src/features/auth/api/useLogin.ts

# 깊은 사고 유도 (복잡한 작업)
> ultrathink: 인증 시스템 리팩토링 계획

# 여러 파일 비교
> Compare @old-version.ts with @new-version.ts
```

### 유용한 슬래시 명령어

| 명령어 | 설명 |
|--------|------|
| `/context` | 토큰 사용량 확인 |
| `/cost` | 비용 확인 |
| `/stats` | 사용 통계 |
| `/rename name` | 세션 이름 지정 |
| `/vim` | Vim 모드로 프롬프트 편집 |
| `/init` | CLAUDE.md 자동 생성 |
| `/export` | 대화 기록 마크다운 내보내기 |

---

## Hooks

### 현재 설정된 Hooks

#### 1. PreToolUse - 위험 명령어 차단
`rm -rf /`, `git push --force origin main` 등 위험한 명령어를 차단합니다.

```json
{
  "matcher": "Bash",
  "command": ".claude/hooks/block-dangerous.sh"
}
```

#### 2. PostToolUse - 자동 포매팅
파일 수정 후 자동으로 Biome 포매팅을 실행합니다.

```json
{
  "matcher": "Edit|Write",
  "command": ".claude/hooks/auto-format.sh"
}
```

#### 3. Stop - 완료 알림
Claude 작업 완료 시 macOS 알림을 표시합니다.

```json
{
  "matcher": "",
  "command": ".claude/hooks/notify-done.sh"
}
```

#### 4. UserPromptSubmit - 스킬 강제 평가
프롬프트 제출 시 스킬 활성화 여부를 강제로 평가합니다. (84% 활성화율)

```json
{
  "matcher": "",
  "command": ".claude/hooks/skill-forced-eval-hook.sh"
}
```

### Hook 이벤트 종류

| 이벤트 | 발동 시점 | 용도 |
|--------|----------|------|
| `PreToolUse` | 도구 실행 전 | 위험한 명령 차단 |
| `PostToolUse` | 도구 실행 후 | 자동 포매팅, 테스트 |
| `Stop` | 응답 완료 | 알림, 로깅 |
| `UserPromptSubmit` | 프롬프트 제출 | Skills 활성화 |

### Exit Code 의미

- `0`: 성공, 계속 진행
- `1`: 오류 (비차단, 로그만)
- `2`: 차단 (해당 작업 중단)

---

## Skills

프로젝트에 설정된 Skills입니다. 관련 작업 시 자동으로 활성화됩니다.

### code-review

코드 리뷰를 수행합니다. FSD 아키텍처, React 패턴, TypeScript 모범 사례를 검사합니다.

```
> Review the changes in src/features/auth/
```

**검사 항목:**
- FSD 레이어 계층 준수
- React 훅 패턴 (QueryResult 전체 반환)
- TypeScript 타입 안전성
- Vanilla Extract 스타일링 규칙
- 성능 최적화 (Optimistic updates)

### security-check

보안 취약점을 검사합니다. OWASP Top 10 기준으로 감사합니다.

```
> Security check for the auth feature
```

**검사 항목:**
- XSS 방지
- SQL Injection 방지
- 인증/인가 검증
- 민감 데이터 노출
- API 보안

### test-writer

Vitest + Testing Library를 사용한 테스트 코드를 작성합니다.

```
> Write tests for the LoginForm component
```

**지원:**
- 컴포넌트 테스트 (React Testing Library)
- Hook 테스트 (TanStack Query 포함)
- 사용자 중심 쿼리 (getByRole, getByLabelText)

### refactor

클린 코드 원칙에 따라 리팩토링을 수행합니다.

```
> Refactor the auth feature for better maintainability
```

**원칙:**
- 단일 책임
- 재사용 가능한 로직 추출
- 조건문 단순화
- FSD 레이어 준수

---

## Agents

전문 분야별 에이전트입니다. 복잡한 작업을 위임할 수 있습니다.

### debugger

버그 분석 및 디버깅 전문 에이전트입니다.

```
> @debugger Analyze this error: Cannot read property 'name' of undefined
```

**역할:**
- 에러 메시지 해석
- 스택 트레이스 분석
- 근본 원인 파악
- 수정 방안 제시

### architect

소프트웨어 아키텍처 설계 및 검토 전문 에이전트입니다.

```
> @architect Review the current feature structure
```

**역할:**
- 시스템 구조 설계
- 의존성 분석
- 확장성/유지보수성 검토
- 기술 부채 식별

---

## MCP 서버

현재 연결된 MCP 서버들입니다.

| 서버 | 용도 |
|------|------|
| Notion | 노션 페이지 조회/수정 |
| Playwright | 브라우저 자동화, E2E 테스트 |
| Context7 | 라이브러리 문서 검색 |
| Filesystem | 파일 시스템 접근 |

### MCP 사용 팁

```bash
# @ 멘션으로 MCP 리소스 참조
> Check @notion:page/12345

# /context로 MCP 오버헤드 확인
> /context
# MCP 서버는 8-30% 컨텍스트 소비
# 사용하지 않는 서버는 비활성화 권장
```

---

## 세션 관리

### 세션 저장 및 재개

```bash
# 현재 세션에 이름 붙이기
> /rename auth-refactor

# 나중에 재개
claude --resume auth-refactor

# 가장 최근 세션 이어하기
claude --continue
```

### 원격 세션 (백그라운드 실행)

```bash
# & 접두사로 백그라운드 실행
> & Run all tests and fix failures

# 원격 세션 로컬로 가져오기
claude --teleport SESSION_ID
```

---

## 고급 기능

### Plan Mode

코드 수정 없이 분석만 수행하는 모드입니다.

```bash
# Plan Mode 진입
Shift+Tab × 2

# 또는 CLI 옵션
claude --permission-mode plan
```

**용도:**
- 구조 파악
- 리팩토링 계획
- 영향 분석

### Headless Mode (CI/CD)

```bash
# 파이프라인에서 사용
git diff | claude -p "변경 사항 설명" --output-format json

# 빌드 에러 분석
npm run build 2>&1 | claude -p "에러 원인과 해결책"
```

### Extended Thinking

복잡한 문제에 더 깊은 사고를 유도합니다.

**중요**: v2.0.0 이후 `ultrathink`만 확장 사고 모드를 활성화합니다.

```
# 확장 사고 활성화 (유일한 방법)
> ultrathink: 전체 시스템 리팩토링 계획

# 이전 키워드들은 더 이상 작동하지 않음
# think, think hard 등은 v2.0.0에서 비활성화됨
```

### Subagents (병렬 처리)

여러 작업을 동시에 처리합니다. 각 subagent는 별도의 context window를 사용하여 메인 세션을 오염시키지 않습니다.

#### 빌트인 Subagents

| Subagent | 용도 | 모델 |
|----------|------|------|
| **Explore** | 읽기 전용 빠른 파일 탐색 | Haiku |
| **Plan** | Plan mode에서 codebase 연구 | Sonnet |
| **General-purpose** | 복잡한 멀티스텝 작업 | Sonnet |

#### 사용 방법

```bash
# 자동 위임 (Claude가 자동 선택)
> 최근 변경사항을 코드 리뷰해줘

# 명시적 호출
> debugger subagent에게 이 에러 분석해달라고 해줘

# 병렬 탐색 (4개 에이전트 동시 실행)
> Explore the codebase using 4 tasks in parallel.
  Each agent should explore different directories.

# 병렬 리팩토링 (75개 파일을 각각 담당)
> 이 함수가 75개 파일에서 사용됨. 각 파일마다 subagent를 띄워서 리팩토링해줘
```

#### 커스텀 Subagent 생성

```bash
# 대화형으로 생성
/agents

# 또는 직접 파일 생성: .claude/agents/code-reviewer.md
```

```markdown
---
name: code-reviewer
description: 코드 품질, 보안, 유지보수성 전문가
tools: Read, Grep, Glob, Bash
model: sonnet
---

당신은 시니어 코드 리뷰어입니다.

검토 체크리스트:
- 코드 명확성과 가독성
- 함수/변수명
- 중복 코드
- 에러 핸들링
- 시크릿/API 키 노출
```

#### Subagent 설정 필드

| 필드 | 설명 |
|------|------|
| `name` | 고유 식별자 (소문자, 하이픈) |
| `description` | 자연어로 목적 기술 |
| `tools` | 허용할 도구 목록 (생략 시 전체 상속) |
| `model` | `sonnet`, `opus`, `haiku`, `inherit` |
| `permissionMode` | `default`, `acceptEdits`, `bypassPermissions`, `plan` |
| `skills` | 자동 로드할 skill 목록 |

#### 병렬 실행 제한

- 최대 동시 실행: **10개**
- 초과 시 자동 큐잉
- 배치 단위로 실행 후 다음 배치 시작

#### 실전 활용 예시

**대규모 리팩토링**
```
> 이 deprecated 함수가 75개 파일에서 사용됨.
  각 파일마다 subagent를 띄워서 안전하게 교체해줘.
```

**장애 분석**
```
> 3개 마이크로서비스에서 장애 발생.
  각 서비스 로그를 병렬로 분석하고 타임라인 합쳐줘.
```

**코드 작성 + 리뷰 분리**
```
> 하나의 Claude는 코드 작성, 다른 하나는 테스트 작성.
  서로 독립적으로 진행하고 결과 합쳐줘.
```

#### Subagent 재개

```bash
# 초기 실행
> code-analyzer subagent로 인증 모듈 분석 시작
# [agentId: abc123 반환]

# 나중에 재개
> agent abc123 재개해서 권한 로직도 분석해줘
```

참고: [Subagents 공식 문서](https://code.claude.com/docs/en/sub-agents)

### Ralph Loop (자동 반복 작업)

Claude가 작업을 완료할 때까지 자동으로 반복합니다.
Geoffrey Huntley가 개발하고 Boris Cherny가 추천하는 기법입니다.

```bash
# 슬래시 명령어로 사용
> /ralph-loop "REST API 구축. CRUD, 테스트 통과" --max-iterations 20 --completion-promise "COMPLETE"

# 취소
> /cancel-ralph
```

**프롬프트 작성 팁:**
```
# 좋은 예시 - 명확한 완료 기준
Build a REST API for todos.
When complete:
- All CRUD endpoints working
- Input validation in place
- Tests passing (coverage > 80%)
Output: <promise>COMPLETE</promise>

# 나쁜 예시 - 모호한 기준
"todo API를 구축하고 잘 만들어"
```

**핵심 원칙:**
1. 항상 `--max-iterations` 설정 (무한 루프 방지)
2. 명확한 완료 기준 제시 (`<promise>DONE</promise>`)
3. 테스트/빌드로 검증 가능한 작업에 적합

**실제 성과:**
- Y Combinator 해커톤에서 밤새 6개 저장소 생성
- $50k 계약을 $297 API 비용으로 완료

### 세션 포킹 (실험용 분기)

메인 대화를 잃지 않고 실험할 수 있습니다.

```bash
# 현재 세션에서 분기
claude --continue --fork-session

# 새 세션에서 Esc 두 번 → 원하는 지점으로 되감기
```

### 컨텍스트 엔지니어링

효율적인 토큰 사용을 위한 팁입니다.

```bash
# 컨텍스트 60% 도달 시 새 세션으로 전환
> /context

# 수동 압축
> /compact

# 진행 상황 요약 후 새 세션
> Summarize what we've done so far, then I'll start a new session
```

**핵심 원칙:**
- 서브에이전트로 검색 위임 (Explore 에이전트)
- 불필요한 파일/정보 컨텍스트에서 제외
- 중요한 계획은 마크다운으로 기록

---

## 프로젝트 구조

```
.claude/
├── settings.json          # 팀 공유 설정 (hooks, permissions)
├── settings.local.json    # 개인 설정 (gitignore)
├── hooks/
│   ├── block-dangerous.sh      # 위험 명령어 차단
│   ├── auto-format.sh          # 자동 포매팅
│   ├── notify-done.sh          # 완료 알림
│   ├── auto-resume.sh          # 자동 재개 (Ralph Wiggum)
│   └── skill-forced-eval-hook.sh # 스킬 강제 평가 (84% 활성화율)
├── skills/
│   ├── code-review/
│   │   └── SKILL.md
│   ├── security-check/
│   │   └── SKILL.md
│   ├── test-writer/
│   │   └── SKILL.md
│   └── refactor/
│       └── SKILL.md
├── agents/
│   ├── debugger.md        # 버그 분석 전문
│   └── architect.md       # 아키텍처 설계 전문
└── commands/
    ├── generate-pr.md
    ├── generate-issue.md
    ├── generate-commit.md
    ├── today-recap.local.md
    ├── morning.md         # 아침 루틴
    ├── review.md          # 코드 리뷰
    ├── fix-types.md       # 타입 에러 수정
    ├── ralph-loop.md      # Ralph 자동 반복
    └── cancel-ralph.md    # Ralph 취소
```

---

## 권한 설정

### 허용된 작업 (자동 승인)
- `pnpm`, `git`, `turbo`, `node` 명령어
- 웹 검색

### 차단된 작업
- `.env*` 파일 읽기
- 자격 증명 파일 접근
- 개인 키 파일 (`.pem`)

---

## 문제 해결

### Hook이 실행되지 않을 때

```bash
# 스크립트 실행 권한 확인
chmod +x .claude/hooks/*.sh

# 디버그 모드로 확인
claude --debug
```

### Skill이 활성화되지 않을 때

Skill 활성화율은 기본 50% 정도입니다. **84% 성공률**을 달성하려면:

**방법 1: 명시적 요청**
```
> Use the code-review skill to review this PR
```

**방법 2: 강제 평가 훅 (권장)**

`UserPromptSubmit` 훅으로 Claude가 매 프롬프트마다 스킬을 평가하도록 강제합니다.
현재 프로젝트에 설정되어 있습니다 (`.claude/hooks/skill-forced-eval-hook.sh`).

작동 방식:
1. 프롬프트 제출 시 훅이 스킬 평가 지시 주입
2. Claude가 각 스킬에 대해 YES/NO 명시적 판단
3. YES인 스킬의 SKILL.md 파일 자동 로드

### 컨텍스트가 부족할 때

```bash
# 컨텍스트 사용량 확인
> /context

# 불필요한 MCP 서버 비활성화
# settings.json에서 미사용 서버 제거
```

---

## 참고 자료

### 공식 문서
- [Claude Code 공식 문서](https://code.claude.com/docs)
- [Hooks 가이드](https://code.claude.com/docs/en/hooks-guide)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Anthropic 공식 Use Cases (62개)](https://www.anthropic.com/use-cases) - Skills, Artifacts, Extended Thinking 등

### 커뮤니티 리소스
- [Skills 활성화 연구](https://scottspence.com/posts/how-to-make-claude-code-skills-activate-reliably) - 84% 성공률 달성 방법
- [skillsmp.com](https://skillsmp.com) - 37,000개+ 커뮤니티 스킬
- [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) - 19개 AI 역할 + 50개 워크플로우
- [BMAD for Claude Code](https://aj-geddes.github.io/claude-code-bmad-skills/) - Claude Code 전용 BMAD 스킬
- [Ralph Wiggum 원본](https://ghuntley.com/ralph/) - Geoffrey Huntley의 자동 반복 기법
- [Ralph Wiggum Plugin](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum) - 공식 플러그인

### 추천 블로그/스레드
- [Claude Code 2.0 경험기](https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/)
- [24 Claude Code Tips](https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5)
- [20+ Claude Code CLI 트릭](https://mlearning.substack.com/p/20-most-important-claude-code-tricks-2025-2026-cli-january-update)
- [Power Users 가이드](https://www.sidetool.co/post/claude-code-best-practices-tips-power-users-2025/)
- [AI & I 팟캐스트 - Boris & Cat 인터뷰](https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it)
- [Boris Cherny 커리어 인터뷰](https://www.developing.dev/p/boris-cherny-creator-of-claude-code)

### 팔로우할 전문가

**핵심 인물**
| 이름 | 역할 | 팔로우 이유 |
|------|------|-------------|
| [Boris Cherny](https://x.com/bcherny) | Claude Code 창시자 | 한 달간 IDE 없이 Opus 4.5로만 259 PR, 497 커밋 |
| [Dan Shipper](https://every.to/podcast) | Every.to CEO | Boris와 심층 인터뷰, 실전 워크플로우 공개 |
| [Geoffrey Huntley](https://ghuntley.com/ralph/) | Ralph Wiggum 창시자 | $50k 프로젝트를 $297로 완료한 자동화 기법 |
| [Cat Wu](https://x.com) | Claude Code 공동 개발자 | Anthropic 엔지니어, Boris와 함께 구축 |

**파워 유저 / 인플루언서**
| 이름 | 특기 |
|------|------|
| [@oikon](https://dev.to/oikon) | 24 Claude Code Tips, Advent Calendar 운영 |
| [@tokenbender](https://x.com/tokenbender) | 멀티 에이전트, 파워 유저 블로그 |
| [@lazy_coll](https://x.com/lazy_coll) | Telegram 알림 + Hooks 자동화 |
| [@cjzafir](https://x.com/cjzafir) | 비용 53% 절감 최적화 |
| Ian Nuttall | ccusage (토큰 모니터링 도구) 개발 |

### 2026년 전망

도쿄 Claude Code Meetup에서 Anthropic 엔지니어들이 확인:
- **Swarming (병렬 에이전트)** 기능 2026년 중점 개발
- 병렬 실행 패턴 조기 학습 권장

### BMAD-METHOD 설치 (선택)

19개 전문 에이전트와 50개 워크플로우를 제공하는 프레임워크입니다.

```bash
# 설치
npx bmad-method install

# Claude Code 선택 후 사용
# 분석 → 계획 → 솔루셔닝 → 구현 4단계 지원
```

에이전트: Analyst, PM, Architect, UX Designer, Scrum Master, Developer, QA 등
