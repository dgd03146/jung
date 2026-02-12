# Next.js 15 종합 가이드

> **Target:** Zalando/Spotify/Revolut 수준의 프로덕션 애플리케이션  
> **Version:** Next.js 15.5.6 (App Router) + React 19 + TypeScript

---

## 목차

1. [아키텍처 개요](#아키텍처-개요)
2. [라우팅 시스템](#라우팅-시스템)
3. [렌더링 전략](#렌더링-전략)
4. [데이터 페칭](#데이터-페칭)
5. [메타데이터 & SEO](#메타데이터--seo)
6. [성능 최적화](#성능-최적화)
7. [캐싱 전략](#캐싱-전략)
8. [에러 핸들링](#에러-핸들링)
9. [미들웨어](#미들웨어)
10. [서버 액션](#서버-액션)
11. [프로덕션 체크리스트](#프로덕션-체크리스트)

---

## 아키텍처 개요

### App Router vs Pages Router

**App Router (권장)**는 Next.js 13+의 새로운 라우팅 시스템:

```
app/
├── layout.tsx          # 루트 레이아웃 (필수)
├── page.tsx            # 홈페이지 (/)
├── loading.tsx         # 로딩 UI
├── error.tsx           # 에러 UI
├── not-found.tsx       # 404 UI
├── global-error.tsx    # 글로벌 에러 (루트 레이아웃 포함)
└── dashboard/
    ├── layout.tsx      # 중첩 레이아웃
    ├── page.tsx        # /dashboard
    ├── loading.tsx     # 대시보드 로딩
    └── settings/
        └── page.tsx    # /dashboard/settings
```

**핵심 원칙:**
- **기본은 Server Component** (클라이언트 상호작용 필요 시만 `'use client'`)
- **파일 기반 라우팅** (`page.tsx`만 라우트가 됨)
- **레이아웃 중첩** (상위 레이아웃은 자동 유지)

---

## 라우팅 시스템

### 1. 기본 라우팅

```typescript
// app/page.tsx → 홈페이지 (/)
export default function HomePage() {
  return <h1>Home</h1>;
}

// app/about/page.tsx → /about
export default function AboutPage() {
  return <h1>About</h1>;
}
```

**규칙:**
- 폴더명이 URL 세그먼트
- `page.tsx`만 공개 라우트 (다른 파일은 비공개)
- `layout.tsx`는 하위 라우트를 감쌈

### 2. 동적 라우트

```typescript
// app/posts/[slug]/page.tsx → /posts/hello-world
export default function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  return <h1>Post: {params.slug}</h1>;
}

// Static params 생성 (빌드 타임 SSG)
export async function generateStaticParams() {
  const posts = await getPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 메타데이터 생성
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

**패턴:**
- `[slug]` → 단일 동적 세그먼트
- `[...slug]` → catch-all (모든 하위 경로)
- `[[...slug]]` → optional catch-all

### 3. 라우트 그룹

폴더를 라우트에서 제외 (조직화 목적):

```
app/
├── (marketing)/
│   ├── layout.tsx      # 마케팅 전용 레이아웃
│   ├── page.tsx        # / (홈)
│   └── about/
│       └── page.tsx    # /about
└── (dashboard)/
    ├── layout.tsx      # 대시보드 전용 레이아웃
    └── analytics/
        └── page.tsx    # /analytics
```

**용도:**
- 서로 다른 레이아웃 적용
- 코드 조직화 (URL에 영향 없음)

### 4. 병렬 라우트 (Parallel Routes)

같은 레이아웃에서 동시에 여러 페이지 렌더링:

```
app/
└── dashboard/
    ├── layout.tsx
    ├── @analytics/
    │   └── page.tsx
    └── @team/
        └── page.tsx
```

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-2 gap-4">
        {analytics}
        {team}
      </div>
    </div>
  );
}
```

**사용 사례:**
- 대시보드 여러 섹션 동시 렌더링
- 조건부 렌더링 (A/B 테스트)
- 독립적인 로딩/에러 상태

### 5. 인터셉팅 라우트 (Intercepting Routes)

현재 레이아웃 유지하면서 다른 라우트 표시:

```
app/
├── feed/
│   └── page.tsx
└── photo/
    ├── [id]/
    │   └── page.tsx          # 직접 접근 시
    └── (..)photo/
        └── [id]/
            └── page.tsx      # 피드에서 접근 시 모달
```

```typescript
// app/feed/page.tsx
import Link from 'next/link';

export default function FeedPage() {
  return (
    <div>
      <Link href="/photo/123">
        <img src="/photo-123.jpg" alt="Photo" />
      </Link>
    </div>
  );
}

// app/photo/(..)photo/[id]/page.tsx (모달)
export default function PhotoModal({ 
  params 
}: { 
  params: { id: string } 
}) {
  return (
    <dialog open>
      <img src={`/photo-${params.id}.jpg`} alt="Photo" />
    </dialog>
  );
}
```

**인터셉팅 규칙:**
- `(.)` → 같은 레벨
- `(..)` → 한 단계 상위
- `(..)(..)` → 두 단계 상위
- `(...)` → 루트부터

---

## 렌더링 전략

### 1. Server Components (기본)

**특징:**
- 서버에서만 실행 (번들 크기 0)
- DB 직접 접근 가능
- 비공개 정보 안전하게 처리

```typescript
// app/posts/page.tsx (Server Component)
import { db } from '@/lib/db';

export default async function PostsPage() {
  // 서버에서 직접 DB 쿼리
  const posts = await db.post.findMany();
  
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}
```

**제약:**
- `useState`, `useEffect` 등 훅 사용 불가
- 브라우저 API 사용 불가
- 이벤트 핸들러 불가

### 2. Client Components

인터랙션 필요 시 사용:

```typescript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**사용 기준:**
- `useState`, `useEffect` 등 훅 필요
- 브라우저 API (`window`, `localStorage`) 필요
- 이벤트 핸들러 필요
- 클라이언트 전용 라이브러리

### 3. 렌더링 전략 결정

```typescript
// 정적 생성 (SSG) - 빌드 타임 렌더링
export default async function StaticPage() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* ... */}</div>;
}

// 동적 렌더링 (SSR) - 요청마다 렌더링
export const dynamic = 'force-dynamic';

export default async function DynamicPage() {
  const session = await getSession();
  return <div>Hello {session.user.name}</div>;
}

// 증분 정적 재생성 (ISR)
export const revalidate = 3600; // 1시간마다 재검증

export default async function ISRPage() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* ... */}</div>;
}
```

**선택 가이드:**

| 케이스 | 전략 | 설정 |
|--------|------|------|
| 마케팅 페이지 | SSG | 기본 (정적 데이터) |
| 블로그 포스트 | ISR | `revalidate: 3600` |
| 대시보드 | SSR | `dynamic: 'force-dynamic'` |
| 실시간 데이터 | CSR | Client Component + SWR/TanStack Query |

---

## 데이터 페칭

### 1. Server Component 데이터 페칭

```typescript
// app/posts/page.tsx
export default async function PostsPage() {
  // fetch는 자동으로 캐시됨
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // ISR
  });
  const posts = await res.json();
  
  return <PostList posts={posts} />;
}
```

**fetch 옵션:**

```typescript
// 캐시 안 함 (항상 새로 가져옴)
fetch('...', { cache: 'no-store' });

// 재검증 시간 설정
fetch('...', { next: { revalidate: 60 } });

// 특정 태그로 재검증
fetch('...', { next: { tags: ['posts'] } });
```

### 2. 병렬 데이터 페칭

```typescript
// ❌ 순차 실행 (느림)
export default async function Page() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  return <div>{/* ... */}</div>;
}

// ✅ 병렬 실행
export default async function Page() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts(),
  ]);
  return <div>{/* ... */}</div>;
}
```

### 3. Streaming & Suspense

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* 즉시 렌더링 */}
      <UserGreeting />
      
      {/* 느린 데이터는 Suspense로 감싸기 */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />
      </Suspense>
      
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}

// 느린 컴포넌트 (독립적으로 스트리밍)
async function Analytics() {
  const data = await fetchAnalytics(); // 느린 쿼리
  return <AnalyticsChart data={data} />;
}
```

**이점:**
- 빠른 콘텐츠 먼저 표시
- TTFB (Time To First Byte) 개선
- 사용자 인지 성능 향상

### 4. Client Component 데이터 페칭

TanStack Query 사용 (frontend-design.md 참고):

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';

export default function PostsClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(res => res.json()),
    staleTime: 60_000,
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <PostList posts={data} />;
}
```

---

## 메타데이터 & SEO

### 1. 정적 메타데이터

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '사이트명',
    template: '%s | 사이트명', // 하위 페이지: "페이지명 | 사이트명"
  },
  description: '사이트 설명',
  keywords: ['키워드1', '키워드2'],
  authors: [{ name: '작성자명' }],
  creator: '크리에이터명',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://example.com',
    siteName: '사이트명',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OG 이미지 설명',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '트위터 타이틀',
    description: '트위터 설명',
    images: ['https://example.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
};
```

### 2. 동적 메타데이터

```typescript
// app/posts/[slug]/page.tsx
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    alternates: {
      canonical: `https://example.com/posts/${params.slug}`,
    },
  };
}
```

### 3. JSON-LD (구조화된 데이터)

```typescript
// app/posts/[slug]/page.tsx
export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPost(params.slug);
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <h1>{post.title}</h1>
        {/* ... */}
      </article>
    </>
  );
}
```

### 4. Sitemap & Robots.txt

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://example.com/posts/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...postEntries,
  ];
}

// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

---

## 성능 최적화

### 1. 이미지 최적화

```typescript
import Image from 'next/image';

// 정적 import (자동 최적화)
import profilePic from './profile.jpg';

export default function Profile() {
  return (
    <Image
      src={profilePic}
      alt="프로필"
      placeholder="blur" // 자동 블러 처리
    />
  );
}

// 외부 이미지
export default function Avatar({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="아바타"
      width={40}
      height={40}
      loading="lazy"
      quality={85}
    />
  );
}

// 반응형 이미지
export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="히어로"
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority // LCP 개선 (above-the-fold)
    />
  );
}
```

**next.config.ts 설정:**

```typescript
import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default config;
```

### 2. 폰트 최적화

```typescript
// app/layout.tsx
import { Inter, Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';

// Google Fonts (자동 서브셋팅)
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

// 로컬 폰트
const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html 
      lang="ko" 
      className={`${inter.variable} ${notoSansKR.variable} ${pretendard.variable}`}
    >
      <body className="font-pretendard">{children}</body>
    </html>
  );
}
```

**Tailwind CSS 설정:**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)', 'system-ui'],
        inter: ['var(--font-inter)'],
      },
    },
  },
};
```

### 3. 스크립트 최적화

```typescript
import Script from 'next/script';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 페이지 로드 후 실행 (비차단) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js"
        strategy="afterInteractive"
      />
      
      {/* 페이지 유휴 시 실행 (최저 우선순위) */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
      />
      
      {/* 인라인 스크립트 */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
      
      {children}
    </>
  );
}
```

### 4. 코드 분할 & Dynamic Import

```typescript
import dynamic from 'next/dynamic';

// 클라이언트 전용 컴포넌트 (SSR 스킵)
const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

// 지연 로딩
const Modal = dynamic(() => import('./Modal'), {
  loading: () => <div>Loading...</div>,
});

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Chart data={data} />
    </div>
  );
}
```

### 5. 번들 분석

```bash
# 번들 분석 도구 설치
yarn add -D @next/bundle-analyzer

# next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  // ...
};

export default withBundleAnalyzer(config);

# 실행
ANALYZE=true yarn build
```

---

## 캐싱 전략

### 1. 캐싱 레이어

Next.js는 4단계 캐싱:

```
Request → [1. Request Memoization] → [2. Data Cache] → [3. Full Route Cache] → [4. Router Cache]
```

### 2. Data Cache 제어

```typescript
// 재검증 시간 설정
fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // 1시간
});

// 캐시 안 함
fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// 태그 기반 재검증
fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] }
});

// 서버 액션에서 재검증
import { revalidateTag } from 'next/cache';

export async function createPost() {
  // 포스트 생성 로직
  revalidateTag('posts'); // 'posts' 태그 캐시 무효화
}
```

### 3. 라우트 캐싱 제어

```typescript
// app/dashboard/page.tsx

// 동적 렌더링 강제 (캐시 안 함)
export const dynamic = 'force-dynamic';

// 정적 렌더링 강제
export const dynamic = 'force-static';

// 재검증 시간
export const revalidate = 3600; // 1시간

// 런타임 설정
export const runtime = 'edge'; // 'nodejs' (기본) | 'edge'
```

### 4. 클라이언트 라우터 캐시

```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function RefreshButton() {
  const router = useRouter();
  
  const handleRefresh = () => {
    // 현재 라우트 재검증
    router.refresh();
  };
  
  return <button onClick={handleRefresh}>새로고침</button>;
}
```

---

## 에러 핸들링

### 1. Error Boundary (error.tsx)

```typescript
// app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 (Sentry 등)
    console.error('Dashboard error:', error);
  }, [error]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">문제가 발생했습니다</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        다시 시도
      </button>
    </div>
  );
}
```

### 2. 글로벌 에러 (global-error.tsx)

```typescript
// app/global-error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>전역 오류 발생</h2>
        <button onClick={() => reset()}>다시 시도</button>
      </body>
    </html>
  );
}
```

### 3. Not Found (not-found.tsx)

```typescript
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-gray-600 mb-4">페이지를 찾을 수 없습니다</p>
      <Link 
        href="/" 
        className="text-blue-500 hover:underline"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

// 동적 라우트에서 notFound 트리거
import { notFound } from 'next/navigation';

export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound(); // not-found.tsx 렌더링
  }
  
  return <article>{/* ... */}</article>;
}
```

---

## 미들웨어

### 1. 기본 미들웨어

```typescript
// middleware.ts (프로젝트 루트)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 인증 체크
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 헤더 추가
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

// 미들웨어 적용 경로
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### 2. A/B 테스팅

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const bucket = request.cookies.get('bucket');
  
  if (!bucket) {
    // 랜덤 배정
    const variant = Math.random() < 0.5 ? 'a' : 'b';
    const response = NextResponse.rewrite(
      new URL(`/experiments/${variant}${request.nextUrl.pathname}`, request.url)
    );
    response.cookies.set('bucket', variant);
    return response;
  }
  
  return NextResponse.rewrite(
    new URL(`/experiments/${bucket.value}${request.nextUrl.pathname}`, request.url)
  );
}
```

### 3. 지역 기반 리디렉션

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US';
  const locale = getLocaleFromCountry(country);
  
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  
  return NextResponse.next();
}

const getLocaleFromCountry = (country: string): string => {
  const countryToLocale: Record<string, string> = {
    US: 'en',
    KR: 'ko',
    JP: 'ja',
  };
  return countryToLocale[country] || 'en';
};
```

---

## 서버 액션

### 1. 기본 서버 액션

```typescript
// app/actions/post.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  // 검증
  if (!title || !content) {
    return { error: '제목과 내용을 입력해주세요' };
  }
  
  // DB 저장
  const post = await db.post.create({
    data: { title, content },
  });
  
  // 캐시 무효화
  revalidatePath('/posts');
  
  // 리디렉션
  redirect(`/posts/${post.id}`);
}
```

```typescript
// app/posts/new/page.tsx
import { createPost } from '@/app/actions/post';

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input type="text" name="title" required />
      <textarea name="content" required />
      <button type="submit">작성</button>
    </form>
  );
}
```

### 2. 클라이언트에서 서버 액션 사용

```typescript
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createPost } from '@/app/actions/post';

export default function PostForm() {
  const [state, formAction] = useActionState(createPost, { error: null });
  
  return (
    <form action={formAction}>
      <input type="text" name="title" required />
      <textarea name="content" required />
      {state?.error && (
        <p className="text-red-500">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? '작성 중...' : '작성'}
    </button>
  );
}
```

### 3. 낙관적 업데이트

```typescript
'use client';

import { useOptimistic } from 'react';
import { updatePost } from '@/app/actions/post';

export default function PostEditor({ post }: { post: Post }) {
  const [optimisticPost, addOptimisticPost] = useOptimistic(
    post,
    (state, newTitle: string) => ({ ...state, title: newTitle })
  );
  
  const handleSubmit = async (formData: FormData) => {
    const newTitle = formData.get('title') as string;
    
    // 즉시 UI 업데이트
    addOptimisticPost(newTitle);
    
    // 실제 업데이트
    await updatePost(post.id, newTitle);
  };
  
  return (
    <form action={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        defaultValue={optimisticPost.title} 
      />
      <button type="submit">저장</button>
    </form>
  );
}
```

---

## 프로덕션 체크리스트

### 1. 성능

- [ ] `<Image>` 사용 (자동 최적화)
- [ ] 폰트 최적화 (`next/font`)
- [ ] 동적 import로 코드 분할
- [ ] `loading.tsx`로 즉시 로딩 상태 표시
- [ ] `<Suspense>`로 느린 컴포넌트 스트리밍
- [ ] 불필요한 클라이언트 컴포넌트 제거
- [ ] Core Web Vitals 측정 (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### 2. SEO

- [ ] 모든 페이지에 메타데이터 설정
- [ ] OG 이미지 설정
- [ ] `sitemap.xml` 생성
- [ ] `robots.txt` 설정
- [ ] JSON-LD 구조화된 데이터
- [ ] 시맨틱 HTML
- [ ] 적절한 heading 계층 (h1 → h2 → h3)

### 3. 접근성

- [ ] 모든 이미지에 `alt` 속성
- [ ] 키보드 네비게이션 지원
- [ ] ARIA 레이블 (필요 시)
- [ ] 색상 대비 4.5:1 이상
- [ ] 포커스 가시성
- [ ] Lighthouse Accessibility 90점 이상

### 4. 보안

- [ ] 환경 변수로 민감 정보 관리
- [ ] `.env.local`을 `.gitignore`에 추가
- [ ] Content Security Policy (CSP) 설정
- [ ] HTTPS 사용
- [ ] SQL Injection 방어 (ORM 사용)
- [ ] XSS 방어 (Next.js 자동 이스케이핑)

### 5. 에러 핸들링

- [ ] `error.tsx` 설정
- [ ] `not-found.tsx` 설정
- [ ] 에러 로깅 (Sentry 등)
- [ ] 사용자 친화적 에러 메시지
- [ ] 네트워크 에러 재시도 로직

### 6. 캐싱

- [ ] 정적 페이지는 SSG
- [ ] 자주 변경되는 데이터는 ISR
- [ ] 사용자별 데이터는 CSR
- [ ] `revalidate` 시간 적절히 설정
- [ ] 태그 기반 재검증 활용

### 7. 모니터링

- [ ] 분석 도구 (Google Analytics, Vercel Analytics)
- [ ] 에러 모니터링 (Sentry)
- [ ] 성능 모니터링 (Web Vitals)
- [ ] 로그 수집 (Datadog, Cloudflare)

### 8. 테스팅

- [ ] 단위 테스트 (Vitest, Jest)
- [ ] 통합 테스트 (Testing Library)
- [ ] E2E 테스트 (Playwright, Cypress)
- [ ] 시각 회귀 테스트 (Chromatic)

---

## 디렉토리 구조 권장안

```
mngc-fe-setup/
├── public/
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (marketing)/        # 라우트 그룹
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── about/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   └── analytics/
│   │   │       ├── page.tsx
│   │   │       ├── loading.tsx
│   │   │       └── error.tsx
│   │   ├── api/                # API 라우트
│   │   │   └── posts/
│   │   │       └── route.ts
│   │   ├── actions/            # 서버 액션
│   │   │   └── post.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── global-error.tsx
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/             # 공유 컴포넌트
│   │   ├── ui/                 # 기본 UI 컴포넌트
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   └── shared/             # 비즈니스 로직 포함
│   │       └── Header.tsx
│   ├── lib/                    # 유틸리티
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── hooks/                  # 공유 훅
│   │   └── useUser.ts
│   ├── types/                  # 타입 정의
│   │   └── post.ts
│   └── constants/              # 상수
│       └── config.ts
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

---

## 참고 자료

### 공식 문서
- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Vercel 가이드](https://vercel.com/docs)

### 성능 최적화
- [Web.dev Performance](https://web.dev/performance)
- [Core Web Vitals](https://web.dev/vitals)

### 회사 기술 블로그
- [Vercel Blog](https://vercel.com/blog)
- [Spotify Engineering](https://engineering.atspotify.com)
- [Zalando Engineering](https://engineering.zalando.com)

---

**마지막 업데이트:** 2025-11-29  
**Next.js 버전:** 15.5.6  
**React 버전:** 19.1.0

