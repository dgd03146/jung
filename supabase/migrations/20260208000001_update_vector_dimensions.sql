-- =====================================================
-- Vector Dimension Update: 768 -> 3072
-- =====================================================
-- gemini-embedding-001 모델은 3072차원 출력
-- 더 높은 차원 = 더 정확한 시맨틱 검색
-- =====================================================

-- 1. 기존 임베딩 삭제 (재생성 필요)
UPDATE posts SET embedding = NULL;
UPDATE photos SET embedding = NULL;
UPDATE spots SET embedding = NULL;

-- 2. 기존 인덱스 삭제
DROP INDEX IF EXISTS posts_embedding_hnsw_idx;
DROP INDEX IF EXISTS photos_embedding_hnsw_idx;
DROP INDEX IF EXISTS spots_embedding_hnsw_idx;

-- 3. 컬럼 타입 변경 (768 -> 3072)
ALTER TABLE posts ALTER COLUMN embedding TYPE vector(3072);
ALTER TABLE photos ALTER COLUMN embedding TYPE vector(3072);
ALTER TABLE spots ALTER COLUMN embedding TYPE vector(3072);

-- 4. 새 IVFFlat 인덱스 생성 (3072차원은 HNSW 2000차원 제한 초과)
-- IVFFlat: 대용량 데이터에 적합, lists 파라미터로 성능 조절
-- 소규모 데이터(100개 미만)에서는 인덱스 없이도 충분히 빠름
-- 데이터가 늘어나면 lists 값 조정 필요 (sqrt(row_count) 권장)

-- 현재 데이터가 적어서 인덱스 생성 생략
-- 나중에 데이터가 늘어나면:
-- CREATE INDEX posts_embedding_ivfflat_idx ON posts
--   USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);
-- CREATE INDEX photos_embedding_ivfflat_idx ON photos
--   USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);
-- CREATE INDEX spots_embedding_ivfflat_idx ON spots
--   USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);

-- 5. 함수 재생성 (3072차원)
CREATE OR REPLACE FUNCTION match_posts(
  query_embedding vector(3072),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE(
  id bigint,
  title_ko text,
  title_en text,
  description_ko text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    p.id,
    p.title_ko,
    p.title_en,
    p.description_ko,
    1 - (p.embedding <=> query_embedding) as similarity
  FROM posts p
  WHERE p.embedding IS NOT NULL
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION match_photos(
  query_embedding vector(3072),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE(
  id bigint,
  description text,
  tags text[],
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    p.id,
    p.description,
    p.tags,
    1 - (p.embedding <=> query_embedding) as similarity
  FROM photos p
  WHERE p.embedding IS NOT NULL
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION match_spots(
  query_embedding vector(3072),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE(
  id uuid,
  title text,
  description text,
  address text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    s.id,
    s.title,
    s.description,
    s.address,
    1 - (s.embedding <=> query_embedding) as similarity
  FROM spots s
  WHERE s.embedding IS NOT NULL
    AND 1 - (s.embedding <=> query_embedding) > match_threshold
  ORDER BY s.embedding <=> query_embedding
  LIMIT match_count;
$$;

CREATE OR REPLACE FUNCTION match_all_content(
  query_embedding vector(3072),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE(
  content_type text,
  content_id text,
  title text,
  description text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  (
    SELECT
      'post' as content_type,
      id::text as content_id,
      title_ko as title,
      description_ko as description,
      1 - (embedding <=> query_embedding) as similarity
    FROM posts
    WHERE embedding IS NOT NULL
      AND 1 - (embedding <=> query_embedding) > match_threshold
  )
  UNION ALL
  (
    SELECT
      'photo' as content_type,
      id::text as content_id,
      NULL as title,
      description,
      1 - (embedding <=> query_embedding) as similarity
    FROM photos
    WHERE embedding IS NOT NULL
      AND 1 - (embedding <=> query_embedding) > match_threshold
  )
  UNION ALL
  (
    SELECT
      'spot' as content_type,
      id::text as content_id,
      title,
      description,
      1 - (embedding <=> query_embedding) as similarity
    FROM spots
    WHERE embedding IS NOT NULL
      AND 1 - (embedding <=> query_embedding) > match_threshold
  )
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
