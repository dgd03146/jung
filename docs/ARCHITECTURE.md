# Architecture

Jung Archive는 Feature-Sliced Design (FSD) 패턴을 따르는 모노레포 프로젝트입니다.

---

## FSD Layer Structure

```
apps/web/src/
├── app/           # Next.js App Router
├── views/         # 페이지 레벨 조합
├── features/      # 비즈니스 로직 (20개 모듈)
├── entities/      # 도메인 모델
└── shared/        # 재사용 유틸리티
```

### Layer Rules

**의존성 방향**: app → views → features → entities → shared

- `features/`: 비즈니스 로직, mutations, UI 액션
- `entities/`: 데이터 모델, queries, 타입
- `shared/`: API 클라이언트, UI 컴포넌트, 유틸리티

---

## Monorepo Structure

```
apps/
  web/        # Next.js 16 (사용자 페이지)
  admin/      # Vite + TanStack Router
  workshop/   # Storybook
packages/
  api/        # tRPC 라우터 13개
  shared/     # 공통 훅, 유틸, Zod 스키마
  design-system/  # Vanilla Extract 컴포넌트 19개
```

### tRPC Routers (13개)

1. `blog` - 블로그 포스트 CRUD
2. `comment` - 댓글/대댓글 관리
3. `category` - 카테고리 관리
4. `guestbook` - 방명록 CRUD
5. `place` - 장소 기록
6. `gallery` - 갤러리 이미지
7. `article` - 아티클 관리
8. `tag` - 태그 관리
9. `auth` - 인증/인가
10. `upload` - 파일 업로드
11. `like` - 좋아요 토글
12. `chat` - AI 챗봇 RAG
13. `search` - 하이브리드 검색

---

## Type Safety

### E2E Type Safety (tRPC + Zod)

```typescript
// 서버 (packages/api/)
export const blogRouter = router({
  getPost: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => db.post.find(input.id))
});

// 클라이언트 (apps/web/)
const { data } = trpc.blog.getPost.useQuery({ id: '123' });
// ✅ data 타입이 자동 추론됨
```

### Zero Runtime Styling (Vanilla Extract)

```typescript
// Button.css.ts
export const button = style({
  padding: '8px 16px',
  borderRadius: 4,
});

// Button.tsx
import * as styles from './Button.css';
export const Button = () => <button className={styles.button} />;
```

---

## AI/ML Integration

### RAG Chatbot (Gemini + pgvector)

1. **Embedding 생성**: Gemini Embedding 001로 벡터화
2. **Vector Search**: pgvector로 유사도 검색
3. **Reranking**: RRF (Reciprocal Rank Fusion) 알고리즘
4. **Answer Generation**: Gemini 2.5 Flash로 응답 생성

### Hybrid Search (Vector + Keyword)

```typescript
const vectorResults = await supabase.rpc('vector_search', { query_embedding });
const keywordResults = await supabase.from('posts').textSearch('title', query);
const hybrid = rrf([vectorResults, keywordResults], k=60);
```
