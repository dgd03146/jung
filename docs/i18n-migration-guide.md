# i18n Migration Guide

Supabase 다국어 지원 마이그레이션 가이드 (한국어 → 영어 AI 번역)

## 준비 사항

### 1. Gemini API 키 발급

1. [Google AI Studio](https://aistudio.google.com/apikey) 접속
2. "Create API Key" 클릭
3. 프로젝트 선택 or 새로 생성
4. API 키 복사

**무료 티어**:
- 15 RPM (분당 15개 요청)
- 1M tokens/day
- 블로그 글 번역에 충분

### 2. 환경 변수 설정

`.env` 파일에 추가:
```bash
# AI Translation
GEMINI_API_KEY=your-api-key-here

# Supabase (기존)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**보안 주의**:
- ✅ `.env` 파일은 `.gitignore`에 포함됨
- ❌ GEMINI_API_KEY를 코드에 하드코딩하지 말 것

---

## 마이그레이션 실행

### Step 1: Supabase 스키마 변경

```bash
# Supabase SQL Editor에서 실행
psql -U postgres -h your-db.supabase.co -d postgres -f supabase/migrations/add_i18n_columns.sql
```

또는 Supabase Dashboard → SQL Editor에서 `supabase/migrations/add_i18n_columns.sql` 내용 복사 후 실행.

**변경 사항**:
- `title_ko`, `title_en` 컬럼 추가
- `description_ko`, `description_en` 컬럼 추가
- `content_ko`, `content_en` 컬럼 추가
- 기존 데이터를 `_ko` 컬럼으로 복사

### Step 2: 번역 스크립트 실행

```bash
# 환경 변수 확인
echo $GEMINI_API_KEY  # 값이 있어야 함

# 스크립트 실행
pnpm tsx scripts/migrate-translate-posts.ts
```

**예상 실행 시간**:
- 포스트 1개당 ~5초 (번역 + Rate limit)
- 10개 포스트 = 약 50초
- 50개 포스트 = 약 4분

**출력 예시**:
```
🚀 Starting post translation migration...

📊 Found 15 posts to translate

🔄 [1/15] Translating: next-intl 마이그레이션
   ✅ Success: "next-intl Migration - From Context to Framework"
   ⏳ Waiting 4s (rate limit)...

🔄 [2/15] Translating: TanStack Query 사용법
   ✅ Success: "TanStack Query Usage Guide"
   ⏳ Waiting 4s (rate limit)...

...

═══════════════════════════════════════════════════════════
🎉 Migration Complete!

📈 Summary:
   ✅ Successfully translated: 13
   ⏭️  Skipped (already done): 2
   ❌ Errors: 0
   📊 Total: 15
═══════════════════════════════════════════════════════════
```

### Step 3: 검증

```sql
-- Supabase SQL Editor에서 확인
SELECT
  id,
  title_ko,
  title_en,
  CASE
    WHEN title_en IS NULL THEN '❌ Missing'
    ELSE '✅ Translated'
  END as status
FROM posts
ORDER BY created_at DESC;
```

---

## 에러 발생 시

### 1. "GEMINI_API_KEY is not defined"

```bash
# .env 파일 확인
cat .env | grep GEMINI

# 없으면 추가
echo "GEMINI_API_KEY=your-key" >> .env
```

### 2. "429 Too Many Requests"

Rate limit 초과. 스크립트는 자동으로 4초 대기하지만, 그래도 발생하면:

```typescript
// scripts/migrate-translate-posts.ts
// Line 82: 대기 시간 증가
await new Promise(resolve => setTimeout(resolve, 6000)); // 4초 → 6초
```

### 3. "Translation failed: 500 Internal Server Error"

Gemini API 일시적 장애. 잠시 후 재시도:

```bash
pnpm tsx scripts/migrate-translate-posts.ts
```

스크립트는 이미 번역된 포스트를 건너뛰므로 안전하게 재실행 가능.

### 4. JSON 파싱 에러

Tiptap content 번역 실패. 수동으로 확인:

```sql
SELECT id, title_ko, content_en
FROM posts
WHERE content_en IS NULL OR content_en::text = 'null';
```

---

## 번역 품질 검증

### 1. 샘플 확인

```sql
-- 번역 전후 비교
SELECT
  title_ko,
  title_en,
  description_ko,
  description_en
FROM posts
LIMIT 3;
```

### 2. 번역 품질 개선

번역이 부자연스럽다면 프롬프트 수정:

```typescript
// packages/ai-translator/src/prompts.ts
export const BLOG_TRANSLATION_PROMPT = `...
**추가 가이드라인:**
- 기술 블로그 톤앤매너 유지
- 친근하지만 전문적인 표현 사용
...`;
```

수정 후 재번역:

```sql
-- 특정 포스트 영어 번역 삭제
UPDATE posts
SET title_en = NULL, description_en = NULL, content_en = NULL
WHERE id = 'post-id-here';
```

```bash
# 재번역 (NULL인 것만 번역)
pnpm tsx scripts/migrate-translate-posts.ts
```

---

## 수동 번역 (선택)

AI 번역이 마음에 안 들면 수동으로:

```sql
UPDATE posts
SET
  title_en = 'Your Manual Translation',
  description_en = 'Your Description',
  content_en = '{"type": "doc", "content": [...]}'
WHERE id = 'post-id';
```

---

## 향후 작업 (New Posts)

### Option 1: Admin UI에 번역 버튼 추가 (추천)

```tsx
// apps/admin: Create Post Form
<Button onClick={async () => {
  const translated = await translatePost(formData);
  setFormData({ ...formData, ...translated });
}}>
  🤖 AI 번역 생성
</Button>
```

### Option 2: tRPC Mutation에서 자동 번역

```typescript
// packages/api/routes/blog.ts
create: publicProcedure
  .input(z.object({
    title_ko: z.string(),
    auto_translate: z.boolean().default(true),
  }))
  .mutation(async ({ input }) => {
    const title_en = input.auto_translate
      ? await translator.translate(input.title_ko, 'ko', 'en')
      : null;

    return await supabase.from('posts').insert({
      title_ko: input.title_ko,
      title_en,
    });
  }),
```

---

## 비용 예상

**Gemini 2.0 Flash (무료 티어)**:
- 입력: 무료
- 출력: 무료
- 제한: 15 RPM, 1M tokens/day

**예상 토큰 사용**:
- 블로그 글 1개 (제목 + 설명 + 본문): ~5000 tokens
- 50개 포스트: ~250k tokens
- **비용**: $0 (무료 티어 내)

**유료 전환 필요 시**:
- Claude 3.5 Sonnet: $3/1M tokens
- GPT-4o: $2.5/1M tokens

---

## 체크리스트

마이그레이션 전:
- [ ] Gemini API 키 발급 완료
- [ ] `.env`에 `GEMINI_API_KEY` 추가
- [ ] Supabase 백업 (선택)

마이그레이션 중:
- [ ] SQL 스키마 변경 실행
- [ ] 번역 스크립트 실행
- [ ] 에러 없이 완료 확인

마이그레이션 후:
- [ ] 번역 결과 샘플 확인
- [ ] Frontend에서 locale 전달 확인
- [ ] 영어 페이지 정상 작동 확인

---

**문제 발생 시**: GitHub Issues 또는 Claude Code로 문의
