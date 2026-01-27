-- Migration: Add i18n columns to posts table
-- Date: 2026-01-25
-- Description: Add Korean/English columns for multilingual support

-- 1. Add i18n columns
ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS title_ko TEXT,
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_ko TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS content_ko JSONB,
  ADD COLUMN IF NOT EXISTS content_en JSONB;

-- 2. Copy existing data to Korean columns
-- Use COALESCE to fill missing per-column values
UPDATE posts
SET
  title_ko = COALESCE(title_ko, title),
  description_ko = COALESCE(description_ko, description),
  content_ko = COALESCE(content_ko, content)
WHERE title_ko IS NULL OR description_ko IS NULL OR content_ko IS NULL;

-- 3. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_title_ko ON posts(title_ko);
CREATE INDEX IF NOT EXISTS idx_posts_title_en ON posts(title_en);

-- 4. Add comments
COMMENT ON COLUMN posts.title_ko IS 'Korean title';
COMMENT ON COLUMN posts.title_en IS 'English title (AI translated)';
COMMENT ON COLUMN posts.description_ko IS 'Korean description';
COMMENT ON COLUMN posts.description_en IS 'English description (AI translated)';
COMMENT ON COLUMN posts.content_ko IS 'Korean content (Tiptap JSON)';
COMMENT ON COLUMN posts.content_en IS 'English content (Tiptap JSON, AI translated)';

-- 5. (Optional) Keep original columns for backward compatibility
-- DROP COLUMN title, description, content; -- DO NOT run this yet
