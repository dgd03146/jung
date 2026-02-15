-- =====================================================
-- Vector Search Migration for Photos & Spots
-- =====================================================
-- 목적: Gallery(photos)와 Places(spots)에 시맨틱 검색 추가
--
-- 구성:
--   1. photos 테이블에 embedding 컬럼 추가
--   2. spots 테이블에 embedding 컬럼 추가
--   3. HNSW 인덱스 생성
--   4. 벡터 검색 함수 생성
-- =====================================================

-- 1. photos 테이블에 embedding 컬럼 추가
ALTER TABLE photos
ADD COLUMN IF NOT EXISTS embedding vector(768);

-- 2. spots 테이블에 embedding 컬럼 추가
ALTER TABLE spots
ADD COLUMN IF NOT EXISTS embedding vector(768);

-- 3. HNSW 인덱스 생성
CREATE INDEX IF NOT EXISTS photos_embedding_hnsw_idx
ON photos USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS spots_embedding_hnsw_idx
ON spots USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 4. Photos 벡터 검색 함수
CREATE OR REPLACE FUNCTION match_photos(
  query_embedding vector(768),
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

-- 5. Spots 벡터 검색 함수
-- spots.id가 uuid인 경우를 고려
CREATE OR REPLACE FUNCTION match_spots(
  query_embedding vector(768),
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

-- 6. 통합 검색 함수 (선택적) - 모든 컨텐츠에서 검색
CREATE OR REPLACE FUNCTION match_all_content(
  query_embedding vector(768),
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

-- =====================================================
-- 참고 사항:
--
-- 임베딩 생성은 scripts/generate-embeddings.ts에서 처리
-- photos: description + tags 기반
-- spots: title + description + address + tags 기반
-- =====================================================
