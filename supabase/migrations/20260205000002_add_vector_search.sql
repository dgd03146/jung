-- =====================================================
-- Vector Search Migration for Blog Posts
-- =====================================================
-- 목적: Supabase pgvector를 사용한 시맨틱 검색 기능 추가
--
-- 구성:
--   1. pgvector 확장 활성화
--   2. posts 테이블에 embedding 컬럼 추가
--   3. HNSW 인덱스 생성 (빠른 ANN 검색)
--   4. 벡터 검색 함수 생성
-- =====================================================

-- 1. pgvector 확장 활성화
-- Supabase에서 기본 제공됨 (Dashboard > Database > Extensions)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. posts 테이블에 embedding 컬럼 추가
-- Gemini embedding-001 모델: 768차원
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS embedding vector(768);

-- 3. HNSW 인덱스 생성
-- HNSW (Hierarchical Navigable Small World): 빠른 근사 최근접 이웃 검색
-- vector_cosine_ops: 코사인 유사도 사용 (정규화된 임베딩에 적합)
CREATE INDEX IF NOT EXISTS posts_embedding_hnsw_idx
ON posts USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 4. 벡터 검색 함수
-- 코사인 유사도 기반 검색 (1 - distance = similarity)
CREATE OR REPLACE FUNCTION match_posts(
  query_embedding vector(768),
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

-- 5. 임베딩 업데이트 함수 (옵션)
-- 포스트 생성/수정 시 임베딩 업데이트를 위한 헬퍼
CREATE OR REPLACE FUNCTION update_post_embedding(
  post_id bigint,
  new_embedding vector(768)
)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE posts
  SET embedding = new_embedding
  WHERE id = post_id;
$$;

-- =====================================================
-- 참고 사항:
--
-- 1. 임베딩 생성은 애플리케이션 레벨에서 처리
--    (Gemini API 호출 후 update_post_embedding 사용)
--
-- 2. 검색 임계값(match_threshold) 조정:
--    - 0.7 이상: 높은 정확도, 낮은 재현율
--    - 0.5 정도: 균형
--    - 0.3 이하: 낮은 정확도, 높은 재현율
--
-- 3. HNSW 파라미터:
--    - m = 16: 그래프 연결 수 (높을수록 정확, 느림)
--    - ef_construction = 64: 인덱스 빌드 품질
-- =====================================================
