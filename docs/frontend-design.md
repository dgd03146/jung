

# Frontend Design Guideline

Practical rules for **Readability, Predictability, Cohesion, Coupling, Accessibility, Performance, Testing, and Automation**. Treat this as a **pre-merge checklist**.

> **Source policy:** Prefer the **latest official docs**. React Effects and WAI-ARIA are stable; for data fetching, this document targets **TanStack Query v5** and **TkDodo** best practices with inline citations.

---

## Readability

### Name Magic Numbers

**Rule:** Replace unexplained numbers with **named constants**.
**Why:** Surfaces intent and lowers maintenance cost.

```ts
const ANIMATION_DELAY_MS = 300;
await delay(ANIMATION_DELAY_MS);
```

### Abstract Implementation Details

**Rule:** Extract complex interaction/auth/overlay logic into **dedicated components/guards**.
**Why:** Separation of concerns → easier testing & reuse.

### Separate Divergent UI Paths

**Rule:** Split meaningfully different branches into **specialized components**.
**Why:** Single responsibility, simpler conditions.

### Avoid Nested Ternaries

**Rule:** Prefer **early return / if / IIFE** for readability.

```ts
const status = (() => {
  if (A && B) return "BOTH";
  if (A) return "A";
  if (B) return "B";
  return "NONE";
})();
```

### Reduce Eye Movement

**Rule:** Co-locate **simple policy maps** near usage.

### Name Complex Conditions

**Rule:** Assign descriptive names to compound boolean expressions.

---

## Predictability

### Standardize Return Shapes

**Rule:** Query hooks return a **consistent** `UseQueryResult<T, Error>`; don’t unwrap `.data` at the hook level.
**Also:** Include **all parameters in the `queryKey`** to avoid cache collisions and races. ([TanStack][1])

```ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useUser(id: string): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: ["user", id],         // include params in the key
    queryFn: () => fetchUser(id),
  });
}
```

---

## Cohesion

### Form Cohesion

**Rule:** Field-level validation for independent checks; **form-level schema** for interdependent fields.

### Organize by Feature/Domain

**Rule:** Prefer **feature-based directories**; only truly shared items go in `components/`, `hooks/`, `utils/`.

```
src/domains/user/{components,hooks,...}
```

### Keep Constants Close to Logic

**Rule:** Place constants near consumers or lift them with **contextful names**.

---

## Coupling

### Avoid Premature Abstraction

**Rule:** Allow minimal duplication when use cases may diverge.

### Scope State Tightly

**Rule:** Split router/query-param/global state into **narrow hooks**.

```ts
export function useCardIdQueryParam() { /* single-responsibility */ }
```

### Prefer Composition over Prop Drilling

**Rule:** Compose to remove middlemen and reduce coupling.

---

## Effect Hygiene

### Effects Are for External Sync Only

**Rule:** Use `useEffect` **only** to sync with **external systems** (timers, non-React widgets, subscriptions, analytics). Don’t use Effects for derived state, render-time calculations, or pure event logic. **Compute at render** or lift state instead. ([React][2])

```ts
// ❌ derived state in Effect
const [fullName, setFullName] = useState("");
useEffect(() => setFullName(`${first} ${last}`), [first, last]);

// ✅ compute at render
const fullName = `${first} ${last}`;
```

> **Data fetching belongs in query hooks, not Effects.** Query libraries manage lifecycles more robustly; keep parameters in the key to avoid races. ([tkdodo.eu][3])

---

## Accessibility

### Native First, ARIA Second

**Rule:** Use native interactive elements first (`<button>`, `<a>`), apply ARIA only as enhancement. For toggles, expose `aria-pressed`. ([TanStack][4])

```tsx
<button type="button" aria-pressed={isOn} onClick={toggle}>
  Mute
</button>
```

---

## Data Fetching Standard (TanStack Query v5)

### Core Rules (v5)

1. **Use `enabled` for conditional/dependent queries.** It’s the canonical v5 pattern for serial dependencies. ([TanStack][5])
2. **Include all params in `queryKey`.** Prevents collisions and race conditions (TkDodo). ([tkdodo.eu][3])
3. **Adopt `queryOptions()`** to co-locate and reuse options (`queryKey`, `queryFn`, `staleTime`, etc.) with strong typing. ([TanStack][6])
4. **Terminology:** `cacheTime` was renamed to **`gcTime`** in v5; update code and docs accordingly. ([TanStack][4])

```ts
// queryDefs/user.ts
import { queryOptions, useQuery, UseQueryResult } from "@tanstack/react-query";

export const userQuery = (id: string) =>
  queryOptions({
    queryKey: ["user", id],          // params in key
    queryFn: () => fetchUser(id),
    staleTime: 60_000,
    gcTime: 5 * 60_000,              // v5 rename (was cacheTime)
  });

export function useUser(id?: string): UseQueryResult<User, Error> {
  return useQuery({
    ...userQuery(id ?? ""),
    enabled: Boolean(id),            // dependent/conditional queries
  });
}
```

> **TkDodo recap:** Query key design is foundational; always put filters/params into keys and think of **your HTTP client as the fetching layer**—React Query orchestrates lifecycles on top. ([tkdodo.eu][3])

---

## Boundaries

### Error & Suspense Boundaries

**Rule:** Place **Error Boundaries** and **Suspense Boundaries** per page/section to localize failures and loading.

---

## i18n & Formatting

### Delegate to Intl/i18n

**Rule:** Use **Intl** or i18n libs for numbers/dates/currency; ensure server/client formatting parity.

---

## Logging & Telemetry

### Event Schema

**Rule:** Define a consistent taxonomy (e.g., `search.filter.apply`, `profile.open`) with typed payloads.

---

## Feature Flags

### Decide at the Outer Boundary

**Rule:** Evaluate flags at the **outermost container**; pass **resolved props** inward.

---

## Performance (Quick Checks)

* Stable **`key`** for lists
* **Virtualize** large lists (e.g., `react-window`)
* Guard expensive parts with **`memo`/`useMemo`**


### Citations (primary sources) — **replace this block**

* **React (official, latest)**

  * `useEffect` reference — “synchronize a component with an external system”. ([React][1])
  * “You Might Not Need an Effect” — 계산 가능/이벤트 처리면 Effect 불필요 원칙. ([React][2])
  * “Synchronizing with Effects” — Effect는 외부 시스템 동기화 맥락. ([React][3])
  * React reference index (hooks overview). ([React][4])
  * “Lifecycle of Reactive Effects” — 개발 모드에서 이중 실행·정합성 확인. ([React][5])

* **TanStack Query v5 (official, latest)**

  * Dependent Queries — \*\*`enabled`\*\*로 직렬 의존 제어. ([TanStack][6])
  * Query Options & **`queryOptions()`** helper — 옵션 공통화/타입 추론. ([TanStack][7])
  * TypeScript guide (v5) — 옵션 API·타입 추론 노트. ([TanStack][8])
  * (역사/용어) `cacheTime` → **`gcTime`** 리네임은 v5 변경 공지/마이그레이션 문서에 기재. ([TanStack][7])

* **TkDodo (best practices)**

  * *Effective React Query Keys* — 파라미터는 반드시 `queryKey`에 포함(충돌·레이스 방지). ([tkdodo.eu][9])
  * *Thinking in React Query* — “HTTP 클라이언트가 페칭 레이어, React Query는 오케스트레이션” 원칙·키 설계. ([tkdodo.eu][10])

* **Accessibility**

  * **WAI-ARIA APG**: Button pattern(토글·역할·키보드 인터랙션 기준). ([W3C][11])
  * **MDN**: `<button>` 요소 레퍼런스(네이티브 우선 근거). ([React][12])


[1]: https://react.dev/reference/react/useEffect?utm_source=chatgpt.com "useEffect - React"
[2]: https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com "You Might Not Need an Effect - React"
[3]: https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com "Synchronizing with Effects - React"
[4]: https://react.dev/reference/react?utm_source=chatgpt.com "React Reference Overview"
[5]: https://react.dev/learn/lifecycle-of-reactive-effects?utm_source=chatgpt.com "Lifecycle of Reactive Effects"
[6]: https://tanstack.com/query/v5/docs/react/guides/dependent-queries?utm_source=chatgpt.com "Dependent Queries | TanStack Query React Docs"
[7]: https://tanstack.com/query/v5/docs/react/guides/query-options?utm_source=chatgpt.com "Query Options | TanStack Query React Docs"
[8]: https://tanstack.com/query/v5/docs/react/typescript?utm_source=chatgpt.com "TypeScript | TanStack Query React Docs"
[9]: https://tkdodo.eu/blog/effective-react-query-keys?utm_source=chatgpt.com "Effective React Query Keys"
[10]: https://tkdodo.eu/blog/thinking-in-react-query?utm_source=chatgpt.com "Thinking in React Query"
[11]: https://www.w3.org/WAI/ARIA/apg/patterns/button/?utm_source=chatgpt.com "Button Pattern | APG | WAI"
[12]: https://react.dev/reference/react/hooks?utm_source=chatgpt.com "Built-in React Hooks"


