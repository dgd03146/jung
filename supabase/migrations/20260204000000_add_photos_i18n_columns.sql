-- Migration: Add i18n columns to photos table
-- Date: 2026-02-04
-- Description: Add English columns for multilingual support in gallery

-- 1. Add i18n columns
ALTER TABLE photos
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS tags_en TEXT[];

-- 2. Add comments
COMMENT ON COLUMN photos.title_en IS 'English title (AI translated)';
COMMENT ON COLUMN photos.description_en IS 'English description (AI translated)';
COMMENT ON COLUMN photos.tags_en IS 'English tags (AI translated)';
