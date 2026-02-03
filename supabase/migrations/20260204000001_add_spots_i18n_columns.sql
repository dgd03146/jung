-- Migration: Add i18n columns to spots table
-- Date: 2026-02-04
-- Description: Add English columns for multilingual support in places/spots

-- 1. Add i18n columns
ALTER TABLE spots
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS address_en TEXT,
  ADD COLUMN IF NOT EXISTS tags_en TEXT[],
  ADD COLUMN IF NOT EXISTS tips_en TEXT[];

-- 2. Add comments
COMMENT ON COLUMN spots.title_en IS 'English title';
COMMENT ON COLUMN spots.description_en IS 'English description';
COMMENT ON COLUMN spots.address_en IS 'English address';
COMMENT ON COLUMN spots.tags_en IS 'English tags';
COMMENT ON COLUMN spots.tips_en IS 'English tips';
