-- =====================================================
-- Rename spots to places for consistency
-- =====================================================
-- Admin과 API에서 모두 'places' 테이블명 사용으로 통일
-- =====================================================

-- 1. spots 테이블을 places로 rename
ALTER TABLE IF EXISTS spots RENAME TO places;

-- 2. 기존 spots 관련 함수 삭제
DROP FUNCTION IF EXISTS match_spots(vector(3072), float, int);

-- 3. places 테이블에 embedding 컬럼 추가 (없는 경우)
ALTER TABLE places
ADD COLUMN IF NOT EXISTS embedding vector(3072);

-- 3. match_places 함수 생성
CREATE OR REPLACE FUNCTION match_places(
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
    p.id,
    p.title,
    p.description,
    p.address,
    1 - (p.embedding <=> query_embedding) as similarity
  FROM places p
  WHERE p.embedding IS NOT NULL
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- 4. match_all_content 함수 업데이트 (places 사용)
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
      'place' as content_type,
      id::text as content_id,
      title,
      description,
      1 - (embedding <=> query_embedding) as similarity
    FROM places
    WHERE embedding IS NOT NULL
      AND 1 - (embedding <=> query_embedding) > match_threshold
  )
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
