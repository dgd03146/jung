# 시맨틱 HTML & 웹 접근성 베스트 프랙티스

> **Target:** Zalando/Spotify/Revolut 수준의 프로덕션 애플리케이션  
> **Standard:** WCAG 2.1 Level AA + WAI-ARIA 1.2  
> **Framework:** Next.js 15 + React 19 + TypeScript

---

## 목차

1. [왜 시맨틱과 접근성인가?](#왜-시맨틱과-접근성인가)
2. [시맨틱 HTML 구조](#시맨틱-html-구조)
3. [랜드마크와 섹션](#랜드마크와-섹션)
4. [ARIA 기초](#aria-기초)
5. [키보드 네비게이션](#키보드-네비게이션)
6. [폼 접근성](#폼-접근성)
7. [버튼과 링크](#버튼과-링크)
8. [이미지와 미디어](#이미지와-미디어)
9. [색상과 대비](#색상과-대비)
10. [스크린 리더 최적화](#스크린-리더-최적화)
11. [인터랙티브 컴포넌트](#인터랙티브-컴포넌트)
12. [테스팅](#테스팅)
13. [프로덕션 체크리스트](#프로덕션-체크리스트)

---

## 왜 시맨틱과 접근성인가?

### 비즈니스 임팩트

**1. 법적 요구사항**
- EU: EN 301 549 (공공기관 웹사이트 필수)
- 미국: ADA (Americans with Disabilities Act)
- 한국: 웹 접근성 품질인증 (공공/금융)

**2. 사용자 범위**
- 전 세계 인구의 15% (10억 명)가 장애 보유
- 모바일 사용자 (임시적 장애 상황)
- 고령 사용자 (점진적 능력 저하)

**3. SEO & 성능**
- 시맨틱 HTML → 검색엔진 크롤링 최적화
- 접근 가능한 사이트 → 더 나은 사용자 경험 → 낮은 이탈률
- 키보드 네비게이션 → 파워 유저 생산성

**Spotify의 사례:**
> "접근성은 선택이 아닌 필수다. 우리는 모든 사용자가 음악을 즐길 수 있어야 한다고 믿는다."

---

## 시맨틱 HTML 구조

### 기본 원칙

**"의미에 맞는 태그를 사용하라"**

```tsx
// ❌ 나쁜 예: div 남용
<div className="header">
  <div className="nav">
    <div className="nav-item">Home</div>
  </div>
</div>
<div className="main">
  <div className="article">
    <div className="title">Article Title</div>
    <div className="content">Content...</div>
  </div>
</div>

// ✅ 좋은 예: 시맨틱 태그
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
  </article>
</main>
```

### 문서 구조 (Document Outline)

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {/* Skip to main content (키보드 사용자용) */}
        <a href="#main-content" className="sr-only focus:not-sr-only">
          본문으로 건너뛰기
        </a>
        
        <Header />
        
        <main id="main-content">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
```

### Heading 계층 (Critical!)

```tsx
// ✅ 좋은 예: 순차적 계층
<article>
  <h1>메인 제목</h1>
  
  <section>
    <h2>섹션 1</h2>
    <p>내용...</p>
    
    <h3>하위 섹션 1-1</h3>
    <p>내용...</p>
    
    <h3>하위 섹션 1-2</h3>
    <p>내용...</p>
  </section>
  
  <section>
    <h2>섹션 2</h2>
    <p>내용...</p>
  </section>
</article>

// ❌ 나쁜 예: 계층 건너뛰기
<article>
  <h1>메인 제목</h1>
  <h4>섹션 1</h4> {/* h2를 건너뜀 */}
  <h2>섹션 2</h2> {/* 순서 깨짐 */}
</article>
```

**원칙:**
1. 페이지당 h1은 **단 하나**
2. 계층을 건너뛰지 마라 (h1 → h3 ❌)
3. 시각적 디자인을 위해 계층을 바꾸지 마라 (CSS로 해결)

```css
/* 시각적 크기는 CSS로 조정 */
h3.large {
  font-size: 2rem; /* h2처럼 보이게 */
}
```

---

## 랜드마크와 섹션

### HTML5 랜드마크 요소

```tsx
// components/Layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 헤더 랜드마크 */}
      <header>
        <nav aria-label="메인 네비게이션">
          <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/about">소개</a></li>
          </ul>
        </nav>
      </header>
      
      {/* 메인 컨텐츠 랜드마크 (페이지당 하나) */}
      <main>
        {children}
      </main>
      
      {/* 사이드바 (보조 컨텐츠) */}
      <aside aria-label="관련 링크">
        <h2>관련 포스트</h2>
        <ul>{/* ... */}</ul>
      </aside>
      
      {/* 푸터 랜드마크 */}
      <footer>
        <nav aria-label="푸터 네비게이션">
          <a href="/privacy">개인정보처리방침</a>
          <a href="/terms">이용약관</a>
        </nav>
      </footer>
    </>
  );
}
```

### 섹션 요소

```tsx
// ✅ article: 독립적으로 배포 가능한 컨텐츠
<article>
  <h2>블로그 포스트 제목</h2>
  <p>작성자: 홍길동</p>
  <p>본문...</p>
</article>

// ✅ section: 주제별로 그룹화
<section aria-labelledby="features-heading">
  <h2 id="features-heading">주요 기능</h2>
  <div>{/* ... */}</div>
</section>

// ✅ nav: 네비게이션 링크 모음
<nav aria-label="breadcrumb">
  <ol>
    <li><a href="/">홈</a></li>
    <li><a href="/blog">블로그</a></li>
    <li aria-current="page">현재 페이지</li>
  </ol>
</nav>

// ✅ aside: 메인 컨텐츠와 간접적 관계
<aside>
  <h3>저자 소개</h3>
  <p>...</p>
</aside>
```

**사용 가이드:**

| 요소 | 용도 | 페이지당 개수 |
|------|------|---------------|
| `<header>` | 페이지/섹션 헤더 | 여러 개 가능 |
| `<nav>` | 네비게이션 | 여러 개 (label로 구분) |
| `<main>` | 메인 컨텐츠 | **단 하나** |
| `<article>` | 독립 컨텐츠 | 여러 개 가능 |
| `<section>` | 주제별 그룹 | 여러 개 가능 |
| `<aside>` | 보조 컨텐츠 | 여러 개 가능 |
| `<footer>` | 페이지/섹션 푸터 | 여러 개 가능 |

---

## ARIA 기초

### ARIA 사용 원칙

**"HTML로 안 되는 것만 ARIA로"**

```tsx
// ❌ 불필요한 ARIA
<button role="button" aria-label="클릭">클릭</button>

// ✅ 네이티브 시맨틱 사용
<button>클릭</button>

// ✅ ARIA가 필요한 경우 (아이콘만 있을 때)
<button aria-label="메뉴 열기">
  <MenuIcon />
</button>
```

### ARIA 속성 3가지 카테고리

**1. Role (역할)**

```tsx
// 커스텀 컴포넌트의 역할 명시
<div role="alert">오류가 발생했습니다</div>
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">확인</h2>
</div>

// ⚠️ 네이티브 요소의 role 변경 금지
<button role="link">링크</button> {/* ❌ */}
<a href="/" role="button">버튼</a> {/* ❌ */}
```

**2. State (상태)**

```tsx
// 현재 상태 표시
<button aria-pressed={isPressed}>토글</button>
<button aria-expanded={isOpen}>펼치기</button>
<div aria-hidden={!isVisible}>컨텐츠</div>
<input aria-invalid={hasError} />
<div aria-live="polite">동적 업데이트 영역</div>
```

**3. Property (속성)**

```tsx
// 요소의 특성 설명
<input aria-required />
<div aria-labelledby="title" />
<div aria-describedby="description" />
<button aria-haspopup="menu" />
<div aria-controls="panel-1" />
```

### aria-label vs aria-labelledby vs aria-describedby

```tsx
// 1. aria-label: 직접 레이블 제공
<button aria-label="프로필 편집">
  <PencilIcon />
</button>

// 2. aria-labelledby: 다른 요소를 레이블로 참조
<section aria-labelledby="section-title">
  <h2 id="section-title">주요 기능</h2>
  {/* ... */}
</section>

// 3. aria-describedby: 추가 설명 제공
<input
  type="password"
  aria-describedby="password-hint"
/>
<div id="password-hint">
  8자 이상, 특수문자 포함
</div>

// 4. 조합 사용
<button
  aria-label="프로필 편집"
  aria-describedby="edit-hint"
>
  <PencilIcon />
</button>
<span id="edit-hint" className="sr-only">
  프로필 사진과 이름을 변경할 수 있습니다
</span>
```

### 라이브 리전 (Live Regions)

```tsx
// 동적 업데이트를 스크린 리더에 알리기
export function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div
      role="status"
      aria-live="polite" // 현재 읽던 것 끝나고 알림
      aria-atomic="true" // 전체 내용 읽기
    >
      {message}
    </div>
  );
}

// 긴급한 알림
export function ErrorAlert({ message }: { message: string }) {
  return (
    <div
      role="alert" // 자동으로 aria-live="assertive"
      aria-atomic="true"
    >
      {message}
    </div>
  );
}

// 실시간 업데이트 (채팅, 알림 등)
export function LiveUpdates({ updates }: { updates: string[] }) {
  return (
    <div
      aria-live="polite"
      aria-relevant="additions" // 추가된 것만 읽기
    >
      {updates.map((update, i) => (
        <div key={i}>{update}</div>
      ))}
    </div>
  );
}
```

**aria-live 값:**
- `off`: 알리지 않음 (기본값)
- `polite`: 현재 읽던 것 끝나고 알림
- `assertive`: 즉시 알림 (경고/오류에만 사용)

---

## 키보드 네비게이션

### 기본 원칙

**"모든 인터랙션은 키보드로도 가능해야 한다"**

### 포커스 가능한 요소

```tsx
// ✅ 네이티브 포커스 가능 요소
<button>버튼</button>
<a href="/">링크</a>
<input type="text" />
<select />
<textarea />

// ✅ tabindex로 포커스 가능하게
<div
  tabIndex={0}
  role="button"
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  커스텀 버튼
</div>

// ❌ 클릭만 가능 (접근성 없음)
<div onClick={handleClick}>
  클릭하세요
</div>
```

**tabIndex 값:**
- `0`: 자연스러운 탭 순서에 포함
- `-1`: 포커스 가능하지만 탭으로는 접근 불가 (JS로만)
- `1+`: 탭 순서 명시 (❌ 사용 금지 - 자연스러운 흐름 깨짐)

### 키보드 이벤트 처리

```tsx
// components/KeyboardAccessible.tsx
export function KeyboardButton({ 
  onClick, 
  children 
}: { 
  onClick: () => void; 
  children: React.ReactNode;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter 또는 Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Space의 스크롤 방지
      onClick();
    }
  };
  
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

// Escape로 닫기
export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);
  
  // ...
}
```

### 포커스 관리

```tsx
'use client';

import { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      // 이전 포커스 저장
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // 모달 내 첫 포커스 가능 요소로 이동
      const firstFocusable = modalRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
      
      return () => {
        // 모달 닫힐 때 이전 포커스 복원
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen]);
  
  // 포커스 트랩 (모달 내부에만 포커스)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements || focusableElements.length === 0) return;
      
      const first = focusableElements[0] as HTMLElement;
      const last = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      // Shift+Tab on first element → 마지막으로
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
      // Tab on last element → 첫 번째로
      else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
```

### 포커스 표시 (Critical!)

```css
/* globals.css */

/* ❌ 절대 금지: 포커스 outline 제거 */
*:focus {
  outline: none; /* 접근성 위반! */
}

/* ✅ 좋은 예: 명확한 포커스 표시 */
*:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* 마우스 클릭 시에만 outline 제거 (선택사항) */
*:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* 버튼 포커스 스타일 */
button:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.1);
}

/* 링크 포커스 스타일 */
a:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
  border-radius: 2px;
}
```

---

## 폼 접근성

### 레이블 연결 (Critical!)

```tsx
// ✅ 명시적 연결 (권장)
<label htmlFor="email">이메일</label>
<input id="email" type="email" name="email" />

// ✅ 암시적 연결
<label>
  이메일
  <input type="email" name="email" />
</label>

// ❌ 레이블 없음
<input type="email" placeholder="이메일" />

// ✅ 시각적 레이블 없을 때
<input
  type="search"
  aria-label="검색"
  placeholder="검색..."
/>
```

### 에러 메시지

```tsx
'use client';

import { useState } from 'react';

export function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validate = () => {
    if (!email.includes('@')) {
      setError('올바른 이메일 형식이 아닙니다');
      return false;
    }
    setError('');
    return true;
  };
  
  return (
    <div>
      <label htmlFor="email">이메일 *</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={validate}
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <div
          id="email-error"
          role="alert" // 즉시 스크린 리더에 알림
          className="text-red-600"
        >
          {error}
        </div>
      )}
    </div>
  );
}
```

### 필드 그룹화

```tsx
// 라디오 버튼 그룹
<fieldset>
  <legend>배송 방법 선택</legend>
  <label>
    <input type="radio" name="shipping" value="standard" />
    일반 배송 (무료)
  </label>
  <label>
    <input type="radio" name="shipping" value="express" />
    빠른 배송 (+3,000원)
  </label>
</fieldset>

// 체크박스 그룹
<fieldset>
  <legend>관심 분야</legend>
  <label>
    <input type="checkbox" name="interests" value="tech" />
    기술
  </label>
  <label>
    <input type="checkbox" name="interests" value="design" />
    디자인
  </label>
</fieldset>
```

### React Hook Form 통합

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
});

type FormData = z.infer<typeof schema>;

export function AccessibleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">이메일 *</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <div id="email-error" role="alert" className="text-red-600">
            {errors.email.message}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="password">비밀번호 *</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          aria-required="true"
          aria-invalid={!!errors.password}
          aria-describedby="password-hint password-error"
        />
        <div id="password-hint" className="text-sm text-gray-600">
          8자 이상, 특수문자 포함
        </div>
        {errors.password && (
          <div id="password-error" role="alert" className="text-red-600">
            {errors.password.message}
          </div>
        )}
      </div>
      
      <button type="submit">제출</button>
    </form>
  );
}
```

---

## 버튼과 링크

### 사용 기준

**버튼 vs 링크 구분은 명확해야 한다**

```tsx
// ✅ 링크: 페이지 이동
<a href="/about">소개 페이지</a>
<Link href="/posts">포스트 목록</Link>

// ✅ 버튼: 액션 실행
<button onClick={handleSubmit}>제출</button>
<button onClick={handleDelete}>삭제</button>

// ❌ 링크를 버튼처럼
<a href="#" onClick={(e) => {
  e.preventDefault();
  handleClick();
}}>클릭</a>

// ✅ 수정: 버튼 사용
<button onClick={handleClick}>클릭</button>
```

**원칙:**
- **링크**: 다른 페이지나 위치로 이동
- **버튼**: 폼 제출, 모달 열기, 데이터 변경 등 액션

### 링크 접근성

```tsx
// ✅ 명확한 링크 텍스트
<a href="/privacy">개인정보처리방침</a>

// ❌ 불명확한 링크 텍스트
<a href="/privacy">여기</a>
<a href="/privacy">더 보기</a>

// ✅ 새 창 열기 시 알림
<a 
  href="https://example.com" 
  target="_blank" 
  rel="noopener noreferrer"
  aria-label="예시 사이트 (새 창)"
>
  예시 사이트
  <span aria-hidden="true"> ↗</span>
</a>

// ✅ 현재 페이지 표시
<nav>
  <a href="/" aria-current="page">홈</a>
  <a href="/about">소개</a>
</nav>

// ✅ 아이콘 링크
<a href="/settings" aria-label="설정">
  <SettingsIcon aria-hidden="true" />
</a>
```

### 버튼 접근성

```tsx
// ✅ 명확한 버튼 텍스트
<button type="submit">제출</button>
<button type="button" onClick={handleCancel}>취소</button>

// ✅ 아이콘 버튼
<button aria-label="메뉴 열기">
  <MenuIcon aria-hidden="true" />
</button>

// ✅ 토글 버튼
<button
  aria-pressed={isMuted}
  aria-label={isMuted ? '음소거 해제' : '음소거'}
  onClick={toggleMute}
>
  {isMuted ? <MuteIcon /> : <VolumeIcon />}
</button>

// ✅ 로딩 상태
<button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? (
    <>
      <Spinner aria-hidden="true" />
      <span>처리 중...</span>
    </>
  ) : (
    '제출'
  )}
</button>

// ✅ 비활성화 이유 설명
<button
  disabled={!isValid}
  aria-describedby={!isValid ? 'submit-hint' : undefined}
>
  제출
</button>
{!isValid && (
  <div id="submit-hint" className="text-sm text-gray-600">
    모든 필수 항목을 입력해주세요
  </div>
)}
```

---

## 이미지와 미디어

### 이미지 alt 텍스트

```tsx
// ✅ 의미 있는 이미지
<Image
  src="/profile.jpg"
  alt="홍길동 프로필 사진"
  width={200}
  height={200}
/>

// ✅ 장식용 이미지 (alt 빈 문자열)
<Image
  src="/decoration.svg"
  alt=""
  aria-hidden="true"
  width={100}
  height={100}
/>

// ✅ 복잡한 이미지 (차트, 그래프)
<figure>
  <Image
    src="/sales-chart.png"
    alt="2024년 월별 매출 그래프"
    width={800}
    height={400}
  />
  <figcaption id="chart-details">
    1월부터 12월까지 매출이 꾸준히 증가하여 
    12월에는 전년 대비 150% 성장을 기록했습니다.
  </figcaption>
</figure>

// ✅ 링크된 이미지
<a href="/product/123">
  <Image
    src="/product.jpg"
    alt="나이키 에어맥스 운동화 상세 보기"
    width={300}
    height={300}
  />
</a>

// ❌ alt 누락
<Image src="/photo.jpg" width={200} height={200} />

// ❌ 불필요한 "이미지" 명시
<Image src="/logo.png" alt="로고 이미지" /> {/* "이미지" 불필요 */}
<Image src="/logo.png" alt="회사 로고" /> {/* ✅ */}
```

**alt 텍스트 가이드:**
- 이미지가 전달하는 **정보/기능** 설명
- "이미지", "사진" 등 불필요한 단어 제거
- 장식용이면 `alt=""` + `aria-hidden="true"`
- 링크 이미지면 링크 목적지 설명

### 비디오 접근성

```tsx
// ✅ 자막과 설명 제공
<video controls>
  <source src="/video.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="/captions-ko.vtt"
    srclang="ko"
    label="한국어 자막"
    default
  />
  <track
    kind="descriptions"
    src="/descriptions-ko.vtt"
    srclang="ko"
    label="한국어 화면 해설"
  />
  <p>
    브라우저가 비디오를 지원하지 않습니다.
    <a href="/video.mp4">비디오 다운로드</a>
  </p>
</video>

// ✅ 자동재생 비디오 (접근성 고려)
<video
  autoPlay
  muted // 자동재생은 반드시 음소거
  loop
  playsInline
  aria-label="배경 비디오"
>
  <source src="/background.mp4" type="video/mp4" />
</video>

// ✅ 커스텀 비디오 플레이어
export function AccessibleVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <div>
      <video ref={videoRef} src={src} />
      
      <div role="group" aria-label="비디오 컨트롤">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? '일시정지' : '재생'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        
        <button
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.muted = !isMuted;
              setIsMuted(!isMuted);
            }
          }}
          aria-label={isMuted ? '음소거 해제' : '음소거'}
          aria-pressed={isMuted}
        >
          {isMuted ? <MuteIcon /> : <VolumeIcon />}
        </button>
      </div>
    </div>
  );
}
```

---

## 색상과 대비

### WCAG 대비 기준

**Level AA (권장):**
- 일반 텍스트: 4.5:1
- 큰 텍스트 (18pt+ 또는 14pt+ bold): 3:1
- UI 컴포넌트: 3:1

**Level AAA (이상적):**
- 일반 텍스트: 7:1
- 큰 텍스트: 4.5:1

```css
/* ✅ 충분한 대비 */
.text-primary {
  color: #1a1a1a; /* 검정에 가까움 */
  background: #ffffff; /* 흰색 */
  /* 대비: 19:1 ✅ */
}

.text-secondary {
  color: #595959; /* 중간 회색 */
  background: #ffffff;
  /* 대비: 7:1 ✅ */
}

/* ❌ 불충분한 대비 */
.text-low-contrast {
  color: #cccccc; /* 밝은 회색 */
  background: #ffffff;
  /* 대비: 1.6:1 ❌ (4.5:1 필요) */
}
```

### 색상에만 의존하지 않기

```tsx
// ❌ 색상으로만 상태 표시
<div className="text-red-500">오류</div>
<div className="text-green-500">성공</div>

// ✅ 아이콘 + 텍스트 + 색상
<div className="text-red-600">
  <ErrorIcon aria-hidden="true" />
  <span>오류가 발생했습니다</span>
</div>

<div className="text-green-600">
  <CheckIcon aria-hidden="true" />
  <span>성공적으로 저장되었습니다</span>
</div>

// ✅ 필수 필드 표시
<label htmlFor="email">
  이메일
  <span className="text-red-600" aria-label="필수">*</span>
</label>
<input id="email" required aria-required="true" />
```

### Tailwind 색상 팔레트 (접근성 고려)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        // ✅ WCAG AA 이상 대비율 색상
        primary: {
          DEFAULT: '#0066cc', // 4.5:1 on white
          dark: '#004080',    // 7:1 on white
        },
        success: {
          DEFAULT: '#008000', // 4.5:1 on white
          dark: '#006600',    // 7:1 on white
        },
        error: {
          DEFAULT: '#c00000', // 7:1 on white
          dark: '#900000',    // 10:1 on white
        },
      },
    },
  },
};

export default config;
```

---

## 스크린 리더 최적화

### Screen Reader Only 클래스

```css
/* globals.css */

/* 시각적으로 숨기되 스크린 리더에는 노출 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* 포커스 시에는 표시 (skip link용) */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

```tsx
// 사용 예시
<button>
  <TrashIcon aria-hidden="true" />
  <span className="sr-only">삭제</span>
</button>

// Skip to main content
<a href="#main-content" className="sr-only sr-only-focusable">
  본문으로 건너뛰기
</a>
```

### 스크린 리더 친화적 텍스트

```tsx
// ✅ 날짜/시간
<time dateTime="2024-11-29">
  <span aria-hidden="true">11/29</span>
  <span className="sr-only">2024년 11월 29일</span>
</time>

// ✅ 숫자
<span>
  <span aria-hidden="true">1.2K</span>
  <span className="sr-only">1,200</span>
  명
</span>

// ✅ 진행 상태
<div
  role="progressbar"
  aria-valuenow={75}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="파일 업로드 진행률"
>
  <div style={{ width: '75%' }} />
  <span className="sr-only">75% 완료</span>
</div>

// ✅ 페이지네이션
<nav aria-label="페이지 네비게이션">
  <ul>
    <li>
      <a href="?page=1" aria-label="1페이지로 이동">1</a>
    </li>
    <li>
      <a 
        href="?page=2" 
        aria-label="2페이지로 이동"
        aria-current="page"
      >
        2
      </a>
    </li>
  </ul>
</nav>
```

---

## 인터랙티브 컴포넌트

### 모달 (Dialog)

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      // 이전 포커스 저장
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // body 스크롤 방지
      document.body.style.overflow = 'hidden';
      
      // 모달로 포커스 이동
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
      
      return () => {
        // 정리
        document.body.style.overflow = '';
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="bg-white rounded-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="p-2"
          >
            <CloseIcon />
          </button>
        </div>
        
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
```

### 드롭다운 (Combobox)

```tsx
'use client';

import { useState, useRef, useId } from 'react';

export function Combobox({ 
  options, 
  onChange 
}: { 
  options: string[]; 
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  
  const handleSelect = (option: string) => {
    setSelected(option);
    onChange(option);
    setIsOpen(false);
    buttonRef.current?.focus();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => 
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => 
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0) {
          handleSelect(options[activeIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };
  
  return (
    <div>
      <button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={listboxId}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || '선택하세요'}
      </button>
      
      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="옵션 목록"
          onKeyDown={handleKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={selected === option}
              className={activeIndex === index ? 'active' : ''}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### 탭 (Tabs)

```tsx
'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    
    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    setActiveTab(tabs[newIndex].id);
    document.getElementById(`tab-${tabs[newIndex].id}`)?.focus();
  };
  
  return (
    <div>
      <div role="tablist" aria-label="탭 네비게이션">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

---

## 테스팅

### 자동화 테스트

```typescript
// __tests__/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@/components/Button';

expect.extend(toHaveNoViolations);

test('버튼 접근성', async () => {
  const { container } = render(<Button>클릭</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('폼 접근성', async () => {
  const { container } = render(
    <form>
      <label htmlFor="email">이메일</label>
      <input id="email" type="email" required />
      <button type="submit">제출</button>
    </form>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 수동 테스트 체크리스트

**1. 키보드 테스트**
- [ ] Tab으로 모든 인터랙티브 요소 접근 가능
- [ ] Enter/Space로 버튼 활성화
- [ ] Escape로 모달/드롭다운 닫기
- [ ] 화살표 키로 라디오/탭 네비게이션
- [ ] 포커스 표시가 명확함

**2. 스크린 리더 테스트**
- [ ] macOS: VoiceOver (Cmd+F5)
- [ ] Windows: NVDA (무료)
- [ ] 모든 이미지에 alt 텍스트
- [ ] 폼 필드에 레이블 연결
- [ ] 랜드마크 요소로 네비게이션 가능
- [ ] 에러 메시지 읽힘

**3. 확대/축소 테스트**
- [ ] 200% 확대 시 레이아웃 깨지지 않음
- [ ] 텍스트가 잘리지 않음
- [ ] 가로 스크롤 발생하지 않음

**4. 색상 대비 테스트**
- [ ] Lighthouse 접근성 점수 90점 이상
- [ ] Chrome DevTools: Contrast Ratio 확인
- [ ] 색맹 시뮬레이션 테스트

### 도구

```bash
# Lighthouse CI
npm install -D @lhci/cli

# axe-core
npm install -D @axe-core/react

# eslint-plugin-jsx-a11y
npm install -D eslint-plugin-jsx-a11y
```

```javascript
// eslint.config.mjs
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },
];
```

---

## 프로덕션 체크리스트

### 필수 (Critical)

- [ ] **모든 이미지에 alt 텍스트**
- [ ] **모든 폼 필드에 레이블 연결**
- [ ] **키보드로 모든 기능 사용 가능**
- [ ] **포커스 표시 명확**
- [ ] **색상 대비 4.5:1 이상**
- [ ] **Heading 계층 순차적**
- [ ] **페이지당 h1 단 하나**
- [ ] **랜드마크 요소 사용**
- [ ] **버튼/링크 올바르게 구분**
- [ ] **ARIA 과용하지 않기**

### 권장 (Recommended)

- [ ] Skip to main content 링크
- [ ] 라이브 리전으로 동적 업데이트 알림
- [ ] 에러 메시지 role="alert"
- [ ] 모달 포커스 트랩
- [ ] 비활성화 이유 설명
- [ ] 새 창 열기 알림
- [ ] 페이지 제목 동적 업데이트
- [ ] 로딩 상태 aria-busy
- [ ] 진행 상태 progressbar

### 고급 (Advanced)

- [ ] 다크모드 접근성 (충분한 대비)
- [ ] 애니메이션 줄이기 (prefers-reduced-motion)
- [ ] 터치 타겟 크기 44x44px 이상
- [ ] 타임아웃 경고 및 연장 옵션
- [ ] 복잡한 위젯 ARIA 패턴 준수

### 테스트

- [ ] Lighthouse 접근성 90점 이상
- [ ] axe DevTools 위반 사항 0개
- [ ] 스크린 리더 테스트 (VoiceOver/NVDA)
- [ ] 키보드 전용 네비게이션 테스트
- [ ] 200% 확대 테스트
- [ ] eslint-plugin-jsx-a11y 경고 0개

---

## 실전 패턴

### 1. 접근 가능한 네비게이션

```tsx
// components/Navigation.tsx
export function Navigation() {
  return (
    <nav aria-label="메인 네비게이션">
      <ul>
        <li>
          <a href="/" aria-current="page">
            홈
          </a>
        </li>
        <li>
          <a href="/products">제품</a>
        </li>
        <li>
          <a href="/about">소개</a>
        </li>
        <li>
          <a href="/contact">문의</a>
        </li>
      </ul>
    </nav>
  );
}

// Breadcrumb
export function Breadcrumb({ items }: { items: Array<{ label: string; href: string }> }) {
  return (
    <nav aria-label="breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.href}>
            {index === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <a href={item.href}>{item.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

### 2. 접근 가능한 데이터 테이블

```tsx
export function DataTable({ 
  data 
}: { 
  data: Array<{ id: string; name: string; email: string; role: string }> 
}) {
  return (
    <table>
      <caption className="sr-only">사용자 목록</caption>
      <thead>
        <tr>
          <th scope="col">이름</th>
          <th scope="col">이메일</th>
          <th scope="col">역할</th>
          <th scope="col">액션</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button aria-label={`${user.name} 편집`}>
                <EditIcon aria-hidden="true" />
              </button>
              <button aria-label={`${user.name} 삭제`}>
                <DeleteIcon aria-hidden="true" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### 3. 접근 가능한 알림 (Toast)

```tsx
'use client';

import { createContext, useContext, useState } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const ToastContext = createContext<{
  addToast: (message: string, type: Toast['type']) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const addToast = (message: string, type: Toast['type']) => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };
  
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 space-y-2"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`p-4 rounded ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
            } text-white`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
```

---

## 참고 자료

### 공식 문서
- [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)

### 테스팅 도구
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE](https://wave.webaim.org/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### 회사 접근성 가이드
- [Spotify Accessibility](https://developer.spotify.com/documentation/web-api/concepts/accessibility)
- [GitHub Accessibility](https://github.com/github/accessibility)
- [Microsoft Inclusive Design](https://www.microsoft.com/design/inclusive/)

### 연관 문서
- [frontend-design.md](./frontend-design.md)
- [nextjs-guide.md](./nextjs-guide.md)

---

**마지막 업데이트:** 2025-11-29  
**준수 표준:** WCAG 2.1 Level AA  
**Framework:** Next.js 15 + React 19

