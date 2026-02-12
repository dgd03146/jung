# TanStack Query v5 베스트 프랙티스 가이드

> **Target:** Zalando/Spotify/Revolut 수준의 프로덕션 애플리케이션  
> **Version:** TanStack Query v5 (React Query) + Next.js 15 App Router  
> **Source:** 공식 문서 + TkDodo 블로그 인사이트

---

## 목차

1. [왜 TanStack Query인가?](#왜-tanstack-query인가)
2. [설치 및 초기 설정](#설치-및-초기-설정)
3. [Query Key 설계 원칙](#query-key-설계-원칙)
4. [Server Component vs Client Component](#server-component-vs-client-component)
5. [데이터 페칭 패턴](#데이터-페칭-패턴)
6. [에러 핸들링](#에러-핸들링)
7. [Mutation 패턴](#mutation-패턴)
8. [캐싱 전략](#캐싱-전략)
9. [성능 최적화](#성능-최적화)
10. [테스팅](#테스팅)
11. [안티패턴](#안티패턴)
12. [실전 레시피](#실전-레시피)

---

## 왜 TanStack Query인가?

### 문제: useEffect로 데이터 페칭하지 마라

```typescript
// ❌ 안티패턴: useEffect로 데이터 페칭
function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    fetch('/api/posts')
      .then(res => res.json())
      .then(setPosts)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);
  
  // 캐싱 없음
  // 재시도 없음
  // 백그라운드 업데이트 없음
  // 중복 제거 없음
  // 경쟁 조건 처리 없음
}
```

### 해결: TanStack Query가 모든 걸 처리

```typescript
// ✅ TanStack Query
function Posts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(res => res.json()),
  });
  
  // 자동 캐싱
  // 자동 재시도
  // 백그라운드 업데이트
  // 중복 제거
  // 경쟁 조건 자동 해결
}
```

**TkDodo 명언:**
> "React Query는 **서버 상태를 위한 라이브러리**다. 클라이언트 상태 관리 도구가 아니다. HTTP 클라이언트가 페칭 레이어라면, React Query는 오케스트레이션 레이어다."

---

## 설치 및 초기 설정

### 1. 설치

```bash
yarn add @tanstack/react-query @tanstack/react-query-devtools
```

### 2. Provider 설정 (App Router)

```typescript
// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // ⚠️ 중요: useState로 생성 (매 렌더마다 새 인스턴스 방지)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // SSR에서 클라이언트로 전환 시 즉시 재페칭 방지
            staleTime: 60 * 1000, // 1분
            gcTime: 5 * 60 * 1000, // 5분 (v5에서 cacheTime → gcTime)
            retry: 3,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false, // 프로덕션에서는 보통 false
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

```typescript
// app/layout.tsx
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 3. DevTools 설정

프로덕션에서는 자동으로 제외됨. 개발 중에만 표시:

```typescript
// providers.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 개발 모드에서만 표시
{process.env.NODE_ENV === 'development' && (
  <ReactQueryDevtools 
    initialIsOpen={false} 
    position="bottom-right"
  />
)}
```

---

## Query Key 설계 원칙

### 핵심 원칙 (TkDodo)

> **"Query Key는 데이터의 의존성 배열이다. 모든 파라미터를 포함하라."**

### 1. 배열 구조로 계층화

```typescript
// ✅ 좋은 예: 계층적 구조
['posts']                          // 모든 포스트
['posts', 'list']                  // 포스트 목록
['posts', 'list', { status: 'published' }] // 필터링된 목록
['posts', 'detail', postId]        // 특정 포스트
['posts', 'detail', postId, 'comments'] // 포스트의 댓글

// ❌ 나쁜 예: 평면 구조
['allPosts']
['publishedPosts']
['postDetail123']
```

**이유:** 계층 구조면 패턴 매칭으로 무효화 가능:

```typescript
// 모든 posts 관련 쿼리 무효화
queryClient.invalidateQueries({ queryKey: ['posts'] });

// detail만 무효화
queryClient.invalidateQueries({ queryKey: ['posts', 'detail'] });
```

### 2. 모든 파라미터를 Key에 포함

```typescript
// ❌ 나쁜 예: 파라미터 누락
export function usePosts() {
  const [status, setStatus] = useState('published');
  
  return useQuery({
    queryKey: ['posts'], // status가 없음!
    queryFn: () => fetchPosts(status),
  });
}
// 문제: status가 변경돼도 캐시가 업데이트 안 됨

// ✅ 좋은 예: 파라미터 포함
export function usePosts(status: string) {
  return useQuery({
    queryKey: ['posts', 'list', { status }],
    queryFn: () => fetchPosts(status),
  });
}
```

### 3. queryOptions로 재사용성 확보

```typescript
// lib/queries/post.ts
import { queryOptions } from '@tanstack/react-query';
import type { Post } from '@/types/post';

// ✅ 옵션 공통화 (타입 추론 자동)
export const postQueries = {
  all: () => ['posts'] as const,
  
  lists: () => [...postQueries.all(), 'list'] as const,
  
  list: (filters: { status?: string; page?: number }) =>
    queryOptions({
      queryKey: [...postQueries.lists(), filters] as const,
      queryFn: () => fetchPosts(filters),
      staleTime: 60_000,
    }),
  
  details: () => [...postQueries.all(), 'detail'] as const,
  
  detail: (id: string) =>
    queryOptions({
      queryKey: [...postQueries.details(), id] as const,
      queryFn: () => fetchPost(id),
      staleTime: 5 * 60_000,
    }),
};

// 사용
import { useQuery } from '@tanstack/react-query';
import { postQueries } from '@/lib/queries/post';

export function usePost(id: string) {
  return useQuery(postQueries.detail(id));
}

export function usePosts(filters: { status?: string }) {
  return useQuery(postQueries.list(filters));
}
```

**이점:**
- 타입 추론 자동
- Key 중복 방지
- 무효화 로직 간결
- 테스트 용이

---

## Server Component vs Client Component

### Next.js 15 App Router에서의 전략

```text
┌─────────────────────────────────────────┐
│ Server Component (RSC)                  │
│ - 초기 데이터 페칭 (SSR/SSG)            │
│ - SEO 중요 데이터                       │
│ - 빠른 초기 렌더링                      │
└─────────────────────────────────────────┘
              │
              ▼ Hydration
┌─────────────────────────────────────────┐
│ Client Component + TanStack Query       │
│ - 인터랙티브 데이터                     │
│ - 실시간 업데이트                       │
│ - 사용자별 데이터                       │
└─────────────────────────────────────────┘
```

### 1. Server Component에서 Prefetch (권장)

```typescript
// app/posts/page.tsx (Server Component)
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { postQueries } from '@/lib/queries/post';
import PostList from './PostList';

export default async function PostsPage() {
  const queryClient = new QueryClient();
  
  // 서버에서 prefetch
  await queryClient.prefetchQuery(postQueries.list({ status: 'published' }));
  
  return (
    // dehydrate로 클라이언트에 전달
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostList />
    </HydrationBoundary>
  );
}
```

```typescript
// app/posts/PostList.tsx (Client Component)
'use client';

import { useQuery } from '@tanstack/react-query';
import { postQueries } from '@/lib/queries/post';

export default function PostList() {
  // 이미 prefetch된 데이터 사용 (캐시 히트)
  const { data, isLoading } = useQuery(postQueries.list({ status: 'published' }));
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <ul>
      {data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

**플로우:**
1. Server Component에서 `prefetchQuery` 실행
2. `dehydrate`로 캐시 직렬화
3. `HydrationBoundary`로 클라이언트에 전달
4. Client Component에서 캐시된 데이터 즉시 사용

### 2. 단순 클라이언트 전용 페칭

SEO 불필요한 데이터:

```typescript
// app/dashboard/page.tsx (Client Component)
'use client';

import { useQuery } from '@tanstack/react-query';

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => fetch('/api/dashboard/stats').then(res => res.json()),
  });
  
  if (isLoading) return <DashboardSkeleton />;
  
  return <DashboardChart data={data} />;
}
```

### 3. Streaming with Server Components (v5.40.0+)

> **핵심**: `shouldDehydrateQuery`에 pending 상태 포함 시 await 없이도 스트리밍 가능

```typescript
// QueryClient 설정 (필수!)
new QueryClient({
  defaultOptions: {
    dehydrate: {
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) ||
        query.state.status === 'pending',  // ← 핵심 설정
    },
  },
});
```

#### 두 가지 패턴 비교

| 패턴 | 코드 | 결과 | TTFB | SEO |
|------|------|------|------|-----|
| **await** | `await prefetchQuery(...)` | 데이터가 HTML에 포함 | 느림 | ✅ 좋음 |
| **no await** | `prefetchQuery(...)` | Promise가 스트리밍 | 빠름 | ❌ 크롤러 못 봄 |

#### 혼합 패턴 (권장)

```typescript
// app/posts/[slug]/page.tsx
import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';
import { postQueries } from '@/lib/queries/post';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const queryClient = getQueryClient();

  // SEO 중요한 본문: await (HTML에 포함)
  await queryClient.prefetchQuery(postQueries.detail(params.slug));

  // 덜 중요한 관련 포스트: 스트리밍 (await 없음)
  queryClient.prefetchQuery(postQueries.related(params.slug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <article>
        {/* 본문은 바로 표시 (데이터 HTML에 있음) */}
        <PostContent slug={params.slug} />
      </article>

      {/* 관련 포스트는 스트리밍으로 나중에 도착 */}
      <Suspense fallback={<RelatedPostsSkeleton />}>
        <RelatedPosts slug={params.slug} />
      </Suspense>
    </HydrationBoundary>
  );
}
```

#### 선택 기준

| 상황 | 패턴 | 이유 |
|------|------|------|
| SEO 중요 (블로그 본문, 제품 정보) | await | 크롤러가 데이터 볼 수 있음 |
| TTFB 최적화 필요 | no await + Suspense | 껍데기 먼저 전송, 스트리밍 |
| 댓글, 추천, 통계 등 | no await + Suspense | 페이지 로드 막지 않음 |

#### 동작 원리

1. `shouldDehydrateQuery`에 pending 상태 포함 설정
2. await 없이 prefetch 시 Promise 자체가 dehydrate됨
3. React가 Promise를 클라이언트로 직렬화
4. 클라이언트의 `useSuspenseQuery`가 Promise를 "use"
5. 서버에서 resolve되면 **스트리밍**으로 결과 전달

> **참고**: [TanStack Query Advanced SSR - Streaming](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#streaming-with-server-components)

---

## 데이터 페칭 패턴

### 1. 기본 Query

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';

export default function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5분간 fresh
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
  });
  
  // isLoading: 캐시 없고 페칭 중
  // isFetching: 백그라운드 페칭 중 (캐시 있을 수도)
  
  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  
  return <div>{data.name}</div>;
}
```

### 2. 의존적 Query (Dependent Queries)

```typescript
export function UserPosts({ userId }: { userId: string }) {
  // 1단계: 사용자 정보
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
  
  // 2단계: 사용자의 포스트 (user가 있을 때만 실행)
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', 'user', user?.id],
    queryFn: () => fetchUserPosts(user!.id),
    enabled: !!user, // 의존성 제어
  });
  
  if (isLoading) return <div>Loading posts...</div>;
  
  return <PostList posts={posts} />;
}
```

**TkDodo 인사이트:**
> "`enabled` 옵션은 v5의 정석 패턴. 직렬 의존성은 enabled로 처리하라."

### 3. 병렬 Queries

```typescript
export function Dashboard() {
  // 동시에 여러 쿼리 실행
  const { data: user } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: fetchCurrentUser,
  });
  
  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });
  
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
  });
  
  // 모두 병렬로 실행됨 (자동 최적화)
}

// 또는 useQueries로 동적 병렬 실행
export function MultiUserProfiles({ userIds }: { userIds: string[] }) {
  const results = useQueries({
    queries: userIds.map((id) => ({
      queryKey: ['user', id],
      queryFn: () => fetchUser(id),
      staleTime: 5 * 60 * 1000,
    })),
  });
  
  const isLoading = results.some((r) => r.isLoading);
  const users = results.map((r) => r.data).filter(Boolean);
  
  return <UserList users={users} />;
}
```

### 4. 무한 스크롤 (Infinite Query)

```typescript
import { useInfiniteQuery } from '@tanstack/react-query';

export function InfinitePostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    queryFn: ({ pageParam }) => fetchPosts({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });
  
  return (
    <div>
      {data?.pages.map((page) =>
        page.posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
      
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}

// Intersection Observer로 자동 로딩
import { useInView } from 'react-intersection-observer';

export function AutoInfiniteList() {
  const { ref, inView } = useInView();
  
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    // ... 위와 동일
  });
  
  // 뷰포트 진입 시 자동 로드
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  
  return (
    <div>
      {/* posts */}
      {hasNextPage && <div ref={ref}>Loading...</div>}
    </div>
  );
}
```

### 5. Suspense 모드

```typescript
// ⚠️ TanStack Query v5에서는 전역 suspense 옵션이 제거됨
// useSuspenseQuery를 직접 사용해야 함

// Component
import { useSuspenseQuery } from '@tanstack/react-query';

export function PostList() {
  // Suspense 경계에서 자동으로 fallback 표시
  const { data } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  
  // data는 항상 존재 (undefined 체크 불필요)
  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// 사용
export default function Page() {
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <PostList />
    </Suspense>
  );
}
```

---

## 에러 핸들링

### 1. 컴포넌트 레벨

```typescript
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function PostList() {
  const queryClient = useQueryClient();
  const { data, error, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    retry: 3, // 3번 재시도
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
  
  if (isError) {
    return (
      <ErrorState 
        message={error.message}
        onRetry={() => queryClient.refetchQueries({ queryKey: ['posts'] })}
      />
    );
  }
  
  return <div>{/* ... */}</div>;
}
```

### 2. Error Boundary 통합

```typescript
// components/QueryErrorBoundary.tsx
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

export function QueryErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              <h2>문제가 발생했습니다</h2>
              <pre>{error.message}</pre>
              <button onClick={resetErrorBoundary}>다시 시도</button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

// 사용
export default function Page() {
  return (
    <QueryErrorBoundary>
      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </QueryErrorBoundary>
  );
}
```

### 3. 전역 에러 핸들러

```typescript
// providers.tsx
// ⚠️ TanStack Query v5에서는 defaultOptions.queries.onError가 제거됨
// QueryCache/MutationCache의 onError 콜백을 사용해야 함
import { QueryCache, MutationCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const [queryClient] = useState(
  () =>
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          console.error('Query error:', error);
          // Sentry 등에 로깅
        },
      }),
      mutationCache: new MutationCache({
        onError: (error) => {
          toast.error(error.message || '작업 실패');
        },
      }),
    })
);
```

### 4. 타입 안전한 에러 처리

```typescript
// lib/errors.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// lib/api.ts
export async function fetchApi<T>(url: string): Promise<T> {
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new ApiError(
      res.status,
      res.statusText,
      await res.json().catch(() => null)
    );
  }
  
  return res.json();
}

// Component
export function PostList() {
  const { error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchApi<Post[]>('/api/posts'),
  });
  
  if (error instanceof ApiError) {
    if (error.statusCode === 404) {
      return <NotFoundState />;
    }
    if (error.statusCode === 403) {
      return <UnauthorizedState />;
    }
  }
  
  // ...
}
```

---

## Mutation 패턴

### 1. 기본 Mutation

```typescript
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export function CreatePostForm() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (data: { title: string; content: string }) => 
      fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then(res => res.json()),
    
    onSuccess: () => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('포스트 생성 완료!');
    },
    
    onError: (error) => {
      toast.error(error.message);
    },
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? '작성 중...' : '작성'}
      </button>
    </form>
  );
}
```

### 2. 낙관적 업데이트 (Optimistic Update)

```typescript
export function ToggleLikeButton({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (liked: boolean) => 
      fetch(`/api/posts/${postId}/like`, {
        method: liked ? 'POST' : 'DELETE',
      }),
    
    // 낙관적 업데이트
    onMutate: async (liked) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: ['post', postId] });
      
      // 이전 값 백업
      const previousPost = queryClient.getQueryData<Post>(['post', postId]);
      
      // 낙관적 업데이트
      queryClient.setQueryData<Post>(['post', postId], (old) => 
        old ? { 
          ...old, 
          liked, 
          likeCount: old.likeCount + (liked ? 1 : -1) 
        } : old
      );
      
      // 롤백용 컨텍스트 반환
      return { previousPost };
    },
    
    // 에러 시 롤백
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
      toast.error('좋아요 실패');
    },
    
    // 성공 시 서버 데이터로 재검증
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
  
  const { data: post } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });
  
  return (
    <button onClick={() => mutation.mutate(!post?.liked)}>
      {post?.liked ? '❤️' : '🤍'} {post?.likeCount}
    </button>
  );
}
```

**TkDodo 인사이트:**
> "낙관적 업데이트는 `onMutate`에서 하고, `onSettled`에서 반드시 재검증하라. 서버가 source of truth다."

### 3. Mutation에서 자동 무효화

```typescript
// lib/queries/post.ts
export const createPostMutation = () => ({
  mutationFn: (data: CreatePostInput) => 
    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(res => res.json()),
  
  onSuccess: (data, variables, context) => {
    // ⚠️ useQueryClient()는 React hook이므로 여기서 호출 불가
    // 컴포넌트/hook 내에서 queryClient를 받아 클로저로 전달해야 함
    // 예: const queryClient = useQueryClient(); 를 컴포넌트 최상위에서 호출 후 사용
    queryClient.invalidateQueries({ queryKey: postQueries.lists() });
    
    // 새 포스트 캐시에 추가 (refetch 스킵)
    queryClient.setQueryData(
      postQueries.detail(data.id).queryKey, 
      data
    );
  },
});

// 사용
export function useCreatePost() {
  return useMutation(createPostMutation());
}
```

### 4. 동시 Mutation 처리 (TkDodo)

```typescript
// ⚠️ 문제: 동시 좋아요 클릭 시 경쟁 조건
export function ConcurrentLikes({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (liked: boolean) => toggleLike(postId, liked),
    
    onMutate: async (liked) => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] });
      
      const previous = queryClient.getQueryData(['post', postId]);
      
      // ✅ 해결: 함수형 업데이트로 최신 상태 기반 업데이트
      queryClient.setQueryData(['post', postId], (old: Post) => ({
        ...old,
        liked,
        likeCount: old.likeCount + (liked ? 1 : -1),
      }));
      
      return { previous };
    },
    
    onError: (err, variables, context) => {
      queryClient.setQueryData(['post', postId], context.previous);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
  
  // ...
}
```

---

## 캐싱 전략

### 1. staleTime vs gcTime (v5 용어)

```typescript
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  
  // staleTime: 데이터가 "fresh"한 시간
  // 이 시간 내엔 refetch 안 함
  staleTime: 5 * 60 * 1000, // 5분
  
  // gcTime: 가비지 컬렉션 시간 (v4의 cacheTime)
  // 사용하지 않는 캐시를 메모리에 유지하는 시간
  gcTime: 10 * 60 * 1000, // 10분
});
```

**설정 가이드:**

| 데이터 특성 | staleTime | gcTime | 예시 |
|------------|-----------|--------|------|
| 정적 데이터 | `Infinity` | `Infinity` | 앱 설정, 약관 |
| 자주 변경 | `0` | `5분` | 실시간 채팅 |
| 가끔 변경 | `5분` | `10분` | 포스트 목록 |
| 사용자 정보 | `1분` | `5분` | 프로필 |

### 2. 선택적 무효화 (Invalidation)

```typescript
const queryClient = useQueryClient();

// 1. 모든 posts 쿼리 무효화
queryClient.invalidateQueries({ queryKey: ['posts'] });

// 2. 특정 필터만
queryClient.invalidateQueries({ 
  queryKey: ['posts', 'list', { status: 'published' }] 
});

// 3. exact 매칭
queryClient.invalidateQueries({ 
  queryKey: ['posts'],
  exact: true, // ['posts']만, ['posts', 'detail', 1]은 제외
});

// 4. predicate로 조건부 무효화
queryClient.invalidateQueries({
  predicate: (query) => 
    query.queryKey[0] === 'posts' && 
    query.state.data?.length > 10,
});
```

### 3. 캐시 직접 조작

```typescript
// 캐시 읽기
const post = queryClient.getQueryData<Post>(['post', postId]);

// 캐시 쓰기
queryClient.setQueryData<Post>(['post', postId], (old) => ({
  ...old!,
  title: 'New Title',
}));

// 캐시 제거
queryClient.removeQueries({ queryKey: ['posts'] });

// 캐시 초기화 (로그아웃 시)
queryClient.clear();
```

### 4. Prefetching

```typescript
// 호버 시 미리 로드
export function PostLink({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  
  const prefetch = () => {
    queryClient.prefetchQuery(postQueries.detail(postId));
  };
  
  return (
    <Link 
      href={`/posts/${postId}`}
      onMouseEnter={prefetch}
      onFocus={prefetch} // 키보드 접근성
    >
      Post #{postId}
    </Link>
  );
}

// 라우터 통합
import { useRouter } from 'next/navigation';

export function usePrefetchRoute() {
  const queryClient = useQueryClient();
  const router = useRouter();
  
  return (href: string, queryKey: unknown[], queryFn: () => Promise<unknown>) => {
    queryClient.prefetchQuery({ queryKey, queryFn });
    router.prefetch(href);
  };
}
```

---

## 성능 최적화

### 1. select로 데이터 변환

```typescript
// ❌ 안티패턴: 컴포넌트에서 변환
export function PostTitles() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  
  // 매 렌더마다 map 실행
  const titles = data?.map(p => p.title);
  
  return <div>{titles?.join(', ')}</div>;
}

// ✅ 최적화: select로 변환
export function PostTitles() {
  const { data: titles } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    select: (data) => data.map(p => p.title), // 메모이제이션됨
  });
  
  return <div>{titles?.join(', ')}</div>;
}
```

**TkDodo 인사이트:**
> "`select`는 자동으로 메모이제이션된다. 동일 입력이면 이전 결과를 재사용한다."

### 2. structuralSharing 활용

```typescript
// TanStack Query는 기본적으로 구조적 공유 활성화
// 변경되지 않은 부분은 재사용 → 불필요한 리렌더 방지

const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  // structuralSharing: true (기본값)
});

// 예: 포스트 1개만 변경돼도 나머지는 동일 참조 유지
// → React.memo로 감싼 자식 컴포넌트는 리렌더 안 됨
```

### 3. notifyOnChangeProps로 구독 최적화

```typescript
// ❌ 안티패턴: data만 필요한데 모든 상태 변경에 리렌더
export function PostTitle({ postId }: { postId: string }) {
  const { data } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });
  
  return <h1>{data?.title}</h1>;
}
// isFetching, isLoading 등 변경 시에도 리렌더됨

// ✅ 최적화: 필요한 프로퍼티만 구독
export function PostTitle({ postId }: { postId: string }) {
  const { data } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
    notifyOnChangeProps: ['data'], // data 변경 시만 리렌더
  });
  
  return <h1>{data?.title}</h1>;
}
```

### 4. 중복 제거 (Deduplication)

```typescript
// 자동으로 중복 요청 제거
export function Parent() {
  return (
    <>
      <PostView postId="1" />
      <PostView postId="1" />
      <PostView postId="1" />
    </>
  );
}

function PostView({ postId }: { postId: string }) {
  // 3번 호출돼도 실제 fetch는 1번만 실행됨
  const { data } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });
  
  return <div>{data?.title}</div>;
}
```

---

## 테스팅

### 1. Mock Server 설정

```typescript
// __tests__/mocks/server.ts
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(
  http.get('/api/posts', () => {
    return HttpResponse.json([
      { id: '1', title: 'Post 1' },
      { id: '2', title: 'Post 2' },
    ]);
  })
);

// __tests__/setup.ts
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### 2. 컴포넌트 테스트

```typescript
// __tests__/PostList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PostList } from '@/components/PostList';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트에서는 재시도 끄기
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

test('포스트 목록 렌더링', async () => {
  render(<PostList />, { wrapper });
  
  // 로딩 상태 확인
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // 데이터 로드 대기
  await waitFor(() => {
    expect(screen.getByText('Post 1')).toBeInTheDocument();
  });
  
  expect(screen.getByText('Post 2')).toBeInTheDocument();
});
```

### 3. Hook 테스트

```typescript
// __tests__/usePost.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePost } from '@/hooks/usePost';

test('포스트 데이터 페칭', async () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
  
  const { result } = renderHook(() => usePost('1'), { wrapper });
  
  // 초기 로딩 상태
  expect(result.current.isLoading).toBe(true);
  
  // 데이터 로드 완료
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
  expect(result.current.data).toEqual({
    id: '1',
    title: 'Post 1',
  });
});
```

### 4. Mutation 테스트

```typescript
test('포스트 생성', async () => {
  const { result } = renderHook(() => useCreatePost(), { wrapper });
  
  act(() => {
    result.current.mutate({
      title: 'New Post',
      content: 'Content',
    });
  });
  
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
  expect(result.current.data).toEqual({
    id: '3',
    title: 'New Post',
  });
});
```

---

## 안티패턴

### 1. ❌ Query Key에 파라미터 누락

```typescript
// ❌ 나쁜 예
function usePosts(status: string) {
  return useQuery({
    queryKey: ['posts'], // status 누락!
    queryFn: () => fetchPosts(status),
  });
}

// ✅ 좋은 예
function usePosts(status: string) {
  return useQuery({
    queryKey: ['posts', { status }],
    queryFn: () => fetchPosts(status),
  });
}
```

### 2. ❌ useEffect로 refetch

```typescript
// ❌ 나쁜 예
function Posts({ status }: { status: string }) {
  const { data, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(status),
  });
  
  useEffect(() => {
    refetch();
  }, [status]); // 안티패턴!
}

// ✅ 좋은 예
function Posts({ status }: { status: string }) {
  const { data } = useQuery({
    queryKey: ['posts', { status }], // 자동 refetch
    queryFn: () => fetchPosts(status),
  });
}
```

**TkDodo 명언:**
> "Query Key가 변경되면 React Query가 알아서 refetch한다. useEffect 쓰지 마라."

### 3. ❌ 전역 상태로 서버 상태 저장

```typescript
// ❌ 나쁜 예: Zustand/Redux에 서버 데이터
const useStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));

function Posts() {
  const { posts, setPosts } = useStore();
  
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(setPosts);
  }, []);
  
  // 캐싱, 재검증, 에러 처리 모두 직접 구현해야 함
}

// ✅ 좋은 예: TanStack Query 사용
function Posts() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  // 모든 게 자동 처리됨
}
```

### 4. ❌ queryFn에서 queryKey 파라미터 안 씀

```typescript
// ❌ 나쁜 예: queryKey와 queryFn 파라미터 불일치
function usePost(id: string) {
  const [localId, setLocalId] = useState(id);
  
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(localId), // 다른 변수!
  });
}

// ✅ 좋은 예: queryKey의 파라미터 사용
function usePost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id), // 동일 변수
  });
}

// 🚀 더 좋은 예: queryOptions 사용
export const postQueries = {
  detail: (id: string) =>
    queryOptions({
      queryKey: ['post', id] as const,
      queryFn: () => fetchPost(id),
    }),
};
```

### 5. ❌ enabled로 조건부 렌더링 대신 사용

```typescript
// ❌ 나쁜 예: enabled를 조건부 렌더링 대신
function UserProfile() {
  const [showPosts, setShowPosts] = useState(false);
  
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    enabled: showPosts, // 안티패턴!
  });
  
  return (
    <div>
      <button onClick={() => setShowPosts(true)}>포스트 보기</button>
      {showPosts && <PostList posts={data} />}
    </div>
  );
}

// ✅ 좋은 예: 컴포넌트 분리
function UserProfile() {
  const [showPosts, setShowPosts] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowPosts(true)}>포스트 보기</button>
      {showPosts && <PostList />}
    </div>
  );
}

function PostList() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
  
  return <div>{/* ... */}</div>;
}
```

**TkDodo 인사이트:**
> "`enabled`는 의존적 쿼리나 사용자 권한 체크에만 쓰라. UI 조건부 렌더링은 컴포넌트 레벨에서 처리하라."

---

## 실전 레시피

### 1. 사용자 인증 상태 관리

```typescript
// lib/queries/auth.ts
import { queryOptions } from '@tanstack/react-query';

export const authQueries = {
  me: () =>
    queryOptions({
      queryKey: ['auth', 'me'],
      queryFn: () => fetch('/api/auth/me').then(res => res.json()),
      staleTime: Infinity, // 세션 유효한 동안 계속 사용
      retry: false, // 인증 실패 시 재시도 안 함
    }),
};

// hooks/useAuth.ts
import { useQuery } from '@tanstack/react-query';
import { authQueries } from '@/lib/queries/auth';

export function useAuth() {
  const { data: user, isLoading } = useQuery(authQueries.me());
  
  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}

// components/ProtectedRoute.tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) redirect('/login');
  
  return <>{children}</>;
}
```

### 2. 폼 + Mutation 통합

```typescript
// hooks/usePostForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, '제목을 입력하세요'),
  content: z.string().min(10, '내용을 10자 이상 입력하세요'),
});

type PostFormData = z.infer<typeof postSchema>;

export function usePostForm() {
  const queryClient = useQueryClient();
  
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });
  
  const mutation = useMutation({
    mutationFn: (data: PostFormData) => createPost(data),
    onSuccess: (post) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('포스트 생성 완료!');
      form.reset();
      router.push(`/posts/${post.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  
  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });
  
  return {
    form,
    mutation,
    onSubmit,
  };
}

// components/PostForm.tsx
export function PostForm() {
  const { form, mutation, onSubmit } = usePostForm();
  
  return (
    <form onSubmit={onSubmit}>
      <input {...form.register('title')} />
      {form.formState.errors.title && (
        <span>{form.formState.errors.title.message}</span>
      )}
      
      <textarea {...form.register('content')} />
      {form.formState.errors.content && (
        <span>{form.formState.errors.content.message}</span>
      )}
      
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? '작성 중...' : '작성'}
      </button>
    </form>
  );
}
```

### 3. 검색 + Debounce

```typescript
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

export function SearchPosts() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);
  
  const { data, isLoading } = useQuery({
    queryKey: ['posts', 'search', debouncedQuery],
    queryFn: () => searchPosts(debouncedQuery),
    enabled: debouncedQuery.length > 2, // 3자 이상 검색
  });
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색..."
      />
      
      {isLoading && <Spinner />}
      
      {data && <SearchResults results={data} />}
    </div>
  );
}
```

### 4. 무한 스크롤 + 필터링

```typescript
export function FilterableInfinitePosts() {
  const [status, setStatus] = useState('published');
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite', { status }],
    queryFn: ({ pageParam }) => fetchPosts({ status, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  
  return (
    <div>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="published">게시됨</option>
        <option value="draft">초안</option>
      </select>
      
      {data?.pages.map((page) =>
        page.posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
      
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </button>
      )}
    </div>
  );
}
```

### 5. 실시간 업데이트 (Polling)

```typescript
export function RealtimeDashboard() {
  const { data } = useQuery({
    queryKey: ['dashboard', 'realtime'],
    queryFn: fetchDashboardData,
    refetchInterval: 5000, // 5초마다 폴링
    refetchIntervalInBackground: true, // 백그라운드에서도 폴링
  });
  
  return <DashboardChart data={data} />;
}

// WebSocket 연동
export function RealtimeDashboardWS() {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const ws = new WebSocket('ws://api.example.com/dashboard');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // 실시간 캐시 업데이트
      queryClient.setQueryData(['dashboard', 'realtime'], data);
    };
    
    return () => ws.close();
  }, [queryClient]);
  
  const { data } = useQuery({
    queryKey: ['dashboard', 'realtime'],
    queryFn: fetchDashboardData,
    staleTime: Infinity, // WebSocket으로만 업데이트
  });
  
  return <DashboardChart data={data} />;
}
```

---

## 프로덕션 체크리스트

### 설정

- [ ] `staleTime` 적절히 설정 (기본 0은 너무 공격적)
- [ ] `gcTime` (v5) 설정 (메모리 관리)
- [ ] DevTools는 개발 모드에서만
- [ ] 에러 로깅 (Sentry 등) 연동
- [ ] 전역 에러 핸들러 설정

### Query Key

- [ ] 모든 파라미터를 Key에 포함
- [ ] 계층적 구조 (무효화 용이)
- [ ] `queryOptions`로 재사용성 확보
- [ ] `as const`로 타입 안정성

### 성능

- [ ] `select`로 데이터 변환
- [ ] `notifyOnChangeProps`로 구독 최적화
- [ ] Prefetching 활용
- [ ] Suspense 고려

### 에러 핸들링

- [ ] Error Boundary 통합
- [ ] 타입 안전한 에러 처리
- [ ] 사용자 친화적 메시지
- [ ] 재시도 로직 설정

### Mutation

- [ ] 낙관적 업데이트 (필요 시)
- [ ] 자동 무효화
- [ ] 에러 시 롤백
- [ ] `onSettled`에서 재검증

### 테스팅

- [ ] MSW로 API 모킹
- [ ] 단위/통합 테스트
- [ ] 로딩/에러 상태 테스트

---

## TkDodo 핵심 인사이트 요약

1. **"React Query는 서버 상태 관리 도구다"**  
   클라이언트 상태(form, modal 등)는 useState/Zustand 사용

2. **"Query Key는 의존성 배열"**  
   모든 파라미터를 포함하라

3. **"enabled는 의존적 쿼리용"**  
   UI 조건부 렌더링은 컴포넌트 레벨에서

4. **"useEffect로 refetch하지 마라"**  
   Query Key가 변경되면 자동 refetch됨

5. **"낙관적 업데이트 후 반드시 재검증"**  
   서버가 source of truth

6. **"staleTime > 0 설정하라"**  
   기본값 0은 너무 공격적

7. **"structuralSharing이 기본"**  
   불필요한 리렌더 자동 방지

8. **"select는 자동 메모이제이션"**  
   변환 로직은 select에

9. **"queryOptions로 재사용하라"**  
   타입 안정성 + DRY

10. **"테스트는 실제 비동기 흐름 그대로"**  
    Mock 최소화, MSW 활용

---

## 참고 자료

### 공식 문서
- [TanStack Query v5 공식 문서](https://tanstack.com/query/v5/docs/react/overview)
- [Advanced SSR Guide](https://tanstack.com/query/v5/docs/react/guides/advanced-ssr)
- [TypeScript Guide](https://tanstack.com/query/v5/docs/react/typescript)

### TkDodo 블로그 (필독)
- [Thinking in React Query](https://tkdodo.eu/blog/thinking-in-react-query)
- [Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys)
- [React Query API Design](https://tkdodo.eu/blog/react-query-api-design-lessons-learned)
- [Why You Want React Query](https://tkdodo.eu/blog/why-you-want-react-query)
- [Automatic Query Invalidation](https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations)

### 연관 문서
- [frontend-design.md](./frontend-design.md) - 전반적인 프론트엔드 설계 원칙
- [nextjs-guide.md](./nextjs-guide.md) - Next.js 15 종합 가이드

---

**마지막 업데이트:** 2025-11-29  
**TanStack Query 버전:** v5  
**React 버전:** 19.1.0

