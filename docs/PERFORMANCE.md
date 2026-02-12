# Performance Optimizations

Jung Archive는 "작은 단위의 개선이 누적되어 큰 성능 향상을 만든다"는 철학으로 최적화되었습니다.

---

## Initial Loading Optimization

| 지표 | Before | After | 개선율 |
|------|--------|-------|--------|
| FCP | 2.7s | 0.4s | **85%** |
| 번들 크기 | 2.6MB | 29KB | **89%** |
| TBT | 150ms | 50ms | **67%** |
| Lighthouse | 69점 | 99점 | **+30점** |

### 개선 방법

#### 1. Sprinkles Tree-shaking
```json
// package.json
"sideEffects": false
```

#### 2. Vanilla Extract Zero Runtime
- 빌드 타임에 CSS 추출
- 73개 `.css.ts` 파일로 분할
- 런타임 CSS-in-JS 오버헤드 제거

#### 3. Image Optimization
```typescript
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200],
  minimumCacheTTL: 604800, // 7일
}
```

---

## Page Transition Optimization (2026.02)

### 문제
- 블로그 목록 페이지 전환 시 1-2초 블로킹
- 페이지 이동 중 스켈레톤이 즉시 표시되지 않음

### 해결

#### 1. Prefetch await → void

**파일**: `apps/web/app/[locale]/(main)/blog/page.tsx:78`

```typescript
// Before: await blocks SPA navigation
await queryClient.prefetchInfiniteQuery(trpc.blog.getAllPosts.infiniteQueryOptions({...}));

// After: void enables streaming
void queryClient.prefetchInfiniteQuery(trpc.blog.getAllPosts.infiniteQueryOptions({...}));
```

#### 2. DB Response 크기 90% 감소

**파일**: `packages/api/services/blog.ts:56-80`

```typescript
// Before: content 포함 (10개 포스트 × 수십KB = 300-500KB)
const contentCol = locale === 'en' ? 'content_en' : 'content_ko';
let query = supabase.from('posts').select(`
  id, ${titleCol}, ${descCol}, ${contentCol}, ...
`)

// After: content 제거 (10개 포스트 × 3-5KB = 30-50KB)
let query = supabase.from('posts').select(`
  id, ${titleCol}, ${descCol}, date, views, likes, liked_by,
  category_id, tags, tags_en, imagesrc,
  categories!inner(name).name as category
`)
```

응답의 locale 매핑에서도 content 관련 코드 제거 (line 180-214).

#### 3. 카테고리 + 커서 쿼리 병렬화

**파일**: `packages/api/services/blog.ts:81-148`

```typescript
// Before: 순차 실행 (4번 왕복)
const selectedCategory = await supabase...  // 1번
const childCategories = await supabase...   // 2번
const cursorPost = await supabase...        // 3번
const posts = await query...                // 4번

// After: 카테고리 2개를 병렬 + 커서 조회도 병렬
const [selectedCategory, cursorPost] = await Promise.all([
  cat !== 'all' ? supabase.from('categories')... : null,
  cursor ? supabase.from('posts').select('date')... : null,
]);

// 자식 카테고리는 parent_id가 필요하므로 순차 (하지만 cursor와는 병렬)
if (selectedCategory) {
  const childCategories = await supabase...
}
```

### 측정 결과

| 지표 | Before | After | 개선율 |
|------|--------|-------|--------|
| API 응답 크기 | ~300-500KB | ~30-50KB | **~90% 감소** |
| DB 쿼리 왕복 | 최대 4회 순차 | 최대 2회 (병렬) | **~50% 감소** |
| 페이지 전환 체감 | 1-2초 블로킹 | 즉시 스켈레톤 | **즉시 반응** |

---

## Best Practices

1. **Prefetch 패턴**: `await` → `void` (HydrationBoundary 전달용)
2. **Parallel Queries**: `Promise.all()` 적극 활용
3. **Payload 최소화**: 목록 조회 시 content 제외
4. **Tree-shaking**: `sideEffects: false` 설정
