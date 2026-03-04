-- Migration: Add RSS pipeline columns to articles table
-- Adds source tracking, quality scoring, and author fields for automated curation

ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS source_feed   TEXT,
  ADD COLUMN IF NOT EXISTS quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  ADD COLUMN IF NOT EXISTS score_reason  TEXT,
  ADD COLUMN IF NOT EXISTS author        TEXT;

-- Deduplication: prevent duplicate articles by URL (also used for upsert ON CONFLICT)
-- Guard: remove duplicates before creating unique index
DELETE FROM articles a
  USING articles b
  WHERE a.id > b.id
    AND a.original_url = b.original_url;

CREATE UNIQUE INDEX IF NOT EXISTS articles_original_url_unique
  ON articles (original_url);

-- Fast lookup for pipeline-created drafts sorted by quality
CREATE INDEX IF NOT EXISTS articles_quality_score_idx
  ON articles (quality_score DESC NULLS LAST)
  WHERE status = 'draft';
