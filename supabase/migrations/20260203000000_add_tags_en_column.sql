-- Migration: Add tags_en column to posts table
-- Date: 2026-02-03
-- Description: Add English tags column for multilingual support

-- 1. Add tags_en column
ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS tags_en TEXT[];

-- 2. Add comment
COMMENT ON COLUMN posts.tags_en IS 'English tags (AI translated)';
