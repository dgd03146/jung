-- Add articles table for newsletter subscription service
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  original_url TEXT NOT NULL,
  summary TEXT NOT NULL,
  my_thoughts TEXT,
  category TEXT NOT NULL CHECK (category IN ('frontend', 'ai')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add index for category filtering
CREATE INDEX idx_articles_category ON articles(category);

-- Add index for sorting by published_at
CREATE INDEX idx_articles_published_at ON articles(published_at DESC NULLS LAST);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT
  USING (true);

-- Policy for authenticated users to manage articles
CREATE POLICY "Allow authenticated users to manage articles" ON articles
  FOR ALL
  USING (auth.role() = 'authenticated');
