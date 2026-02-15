-- 1. 이미지 배열 (R2 key 목록)
ALTER TABLE articles ADD COLUMN images TEXT[] DEFAULT '{}';

-- 2. 발행 상태
ALTER TABLE articles ADD COLUMN status TEXT NOT NULL DEFAULT 'draft'
  CHECK (status IN ('draft', 'published'));

-- 3. 기존 아티클 중 published_at이 있는 것은 published로
UPDATE articles SET status = 'published' WHERE published_at IS NOT NULL;

-- 4. 발행 상태 인덱스
CREATE INDEX idx_articles_status ON articles(status);
