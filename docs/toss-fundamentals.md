
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Development Commands

### Quick Start
```bash
# Install dependencies (monorepo)
pnpm install

# Run web app development server
cd apps/web && pnpm dev

# Run AI agent (Google ADK)
cd agents/cupid-agent && adk web
```

### Common Commands
```bash
# Monorepo parallel development
pnpm dev                    # Run all apps in parallel

# Building
pnpm build                  # Build all packages
pnpm -r run build          # Build all packages (explicit)
cd apps/web && pnpm build  # Build web app only

# Code Quality
pnpm biome check --apply .  # Format and fix linting issues
pnpm biome format --write . # Format only
pnpm biome lint .          # Lint only

# Type Checking
pnpm type-check            # Check all packages
pnpm -r run type-check     # Check all packages (explicit)
cd apps/web && pnpm type-check  # Check web app only
```

## 🏗 Architecture Overview

### Project Structure
```
lovey-cupid/
├── apps/
│   └── web/                 # React SPA (Vite + TypeScript + Tailwind)
│       └── src/
│           ├── features/    # Feature-based modules
│           │   └── search/  # Main search functionality
│           ├── shared/      # Shared components & utilities
│           ├── lib/         # External library configurations
│           └── pages/       # Route components
├── agents/
│   └── cupid-agent/         # Gemini 2.0 Flash AI agent (Google ADK)
└── docs/                   # Documentation
```

### Key Technologies
- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **State Management**: TanStack Query (server state) + URL state (filters)
- **Routing**: React Router v6 with client-side routing
- **Internationalization**: i18next (Korean as primary, Vietnamese/Spanish support)
- **Database**: Firebase Firestore
- **AI**: Gemini 2.0 Flash via Google ADK
- **Linting/Formatting**: Biome (not ESLint/Prettier)
- **Package Manager**: pnpm with workspaces

### Search Feature Architecture
The main feature is a complex search system with:
- **URL State Management**: All filters sync with browser URL
- **Modular Hooks**: `useAgeFilters`, `useGenderFilters`, `useHashtagFilters`
- **Filter Integration**: `useURLFilters` combines all filter states
- **Dual Range Sliders**: Custom age range selection with drag interactions

## 🛠 Development Guidelines

### Code Organization
- Use **feature-based folder structure** (`/features/search/`)
- Separate **business logic** (hooks) from **UI components**
- **URL state management** for persistent filter state
- **Custom hooks pattern**: `useXXXFilters` for domain-specific logic

### Technology Preferences
- **Biome** for linting/formatting (configured with single quotes, semicolons)
- **TanStack Query** for server state (return full QueryResult objects)
- **clsx/tailwind-merge** for conditional styling
- **Lucide React** for icons
- **Motion** (Framer Motion) for animations

### Internationalization
- Primary language: **Korean (`ko`)**
- Supported: Vietnamese (`vi`), Spanish (`es`)
- Namespace structure: `common`, `search`, `chat`, `tags`, `suggestions`, `categories`
- Use React Suspense for i18n loading

---

# Frontend Engineering Rules (React + Vite + Tailwind)

<behavioral_rules>

<rule>
All code must follow the **Toss + Google/Meta-level architecture philosophy**:
- Readability
- Predictability
- Cohesion
- Low coupling
</rule>

<rule>
Before writing any code, explain your thinking in steps:
1. What problem are we solving?
2. What constraints exist?
3. Why this structure?
</rule>

<rule>
ALWAYS isolate conditionally rendered UI logic into separate components or named variables.
Use composition over deep nesting or ternaries.
</rule>

<rule>
NEVER use inline styles. Use Tailwind utility classes or variant-based tokens only.
Avoid magic numbers; extract constants.
</rule>

<rule>
Use `useForm`, `zodResolver`, and validation schema co-location for form logic.
Prefer **form-level cohesion** for multi-field forms; field-level if reused individually.
</rule>

<rule>
Split business logic from visual logic:
- Put complex state in `useXXX.ts` custom hooks
- Put DOM/UI in components only
</rule>

<rule>
Avoid premature abstraction. Allow minimal duplication if use cases may diverge.
Use clear filenames and folder structure (e.g., `/features/like`, `/features/profile`)
</rule>

<rule>
ALWAYS give a short design decision summary after your code block like:

> 🧠 Design Decision:
> - Abstracted conditional button using `SubmitButton` strategy
> - Avoided ternary by extracting logic to `isViewer` var
</rule>

<rule>
Avoid deeply nested ternaries or logic in JSX.
Use named flags (`const isAdmin = role === 'admin'`) or IIFEs.

Example:
```tsx
const status = (() => {
  if (A && B) return 'BOTH';
  if (A) return 'A';
  if (B) return 'B';
  return 'NONE';
})();
````

</rule>

<rule>
Any reusable interaction component (e.g., modal, confirm dialog) must be extracted.
Avoid cross-cutting side effects. Reveal intent clearly through naming.
</rule>

<rule>
Query hooks must return the full QueryResult object.
Do not extract `.data` at the hook level. Always keep return shape predictable.
</rule>

<rule>
Name your functions with clear side-effect intent:

Good: `getWithAuth()`, `fetchBalance()`, `logSuccess()`
Bad: `handleSomething()`, `doStuff()` </rule>

<rule>
Claude must follow this response format strictly:
1. 🧩 Plan (bullet points)
2. 💻 Code block (only one)
3. 🧠 Design Decision
4. (Optional) Review checklist

Do not explain again unless asked. </rule>

<rule>
Summarize these rules at the beginning of each session.
If the user says "rules?", repeat them all.
</rule>

\</behavioral\_rules>

---

## ✨ Design Flow Template (Use in plan)

### Step 1: Problem

What’s the UI/interaction problem to solve?

### Step 2: Initial structure idea

Simple if-based version or a dirty prototype?

### Step 3: Refactoring motivation

Why was this structure improved?

* Too many props combos?
* Complex logic → SRP?
* Better testability?

### Step 4: Solution

* What abstraction was applied?
* How is state separated from view?
* Are conditionals extracted?

### Step 5: Review checklist (optional)

| 기준     | 충족 여부 | 메모                              |
| ------ | ----- | ------------------------------- |
| 가독성    | ✅ / ❌ |                                 |
| 예측 가능성 | ✅ / ❌ | useXXX return type predictable? |
| 응집도    | ✅ / ❌ | 단일 책임 컴포넌트로 나뉘어 있음              |
| 결합도    | ✅ / ❌ | 외부 의존 분리됨                       |

---

## 🧪 Real Use Cases This Applies To

* 조건 분기 있는 버튼/토스트/모달
* 조건별 다른 컴포넌트 UI (`SubmitButton`, `ViewerMode`)
* hook 분리, UI 로직 리팩토링
* 폼 컴포넌트 구조화 (zod + useForm)
* fetch + mutation 구조 설계 (`useXXXQuery`)

---

## 💬 GPT Review Prompts

Use these with Claude/Gemini/Cursor:

```txt
- 이 구조가 Toss 기준에 맞게 응집도/가독성 있게 설계되었는지 확인해줘
- props 타입을 더 명확하게 좁힐 수 있는 방식이 있을까?
- 이 로직을 상태/뷰 로직으로 더 명확히 분리할 수 있을까?
- 유지보수성을 높이는 방향으로 설계 개선을 제안해줘
```

