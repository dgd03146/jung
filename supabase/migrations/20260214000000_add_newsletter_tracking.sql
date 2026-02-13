-- Add newsletter tracking columns to articles table
ALTER TABLE public.articles
ADD COLUMN IF NOT EXISTS newsletter_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS newsletter_sent_count INTEGER DEFAULT 0;

-- Index for filtering unsent published articles
CREATE INDEX IF NOT EXISTS idx_articles_newsletter_unsent
ON public.articles(newsletter_sent_at)
WHERE newsletter_sent_at IS NULL AND published_at IS NOT NULL;

-- Create newsletter_logs table for send history
CREATE TABLE IF NOT EXISTS public.newsletter_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  subscriber_count INTEGER NOT NULL DEFAULT 0,
  sent_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'sending', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for querying logs by article
CREATE INDEX IF NOT EXISTS idx_newsletter_logs_article_id
ON public.newsletter_logs(article_id);

-- Index for querying logs by date
CREATE INDEX IF NOT EXISTS idx_newsletter_logs_created_at
ON public.newsletter_logs(created_at DESC);

-- Enable RLS
ALTER TABLE public.newsletter_logs ENABLE ROW LEVEL SECURITY;

-- Policy: only authenticated users can read logs (admin)
CREATE POLICY "Allow authenticated read access on newsletter_logs"
ON public.newsletter_logs FOR SELECT
TO authenticated
USING (true);

-- Policy: only authenticated users can insert logs (server operations via tRPC)
CREATE POLICY "Allow authenticated insert on newsletter_logs"
ON public.newsletter_logs FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: only authenticated users can update logs (server operations via tRPC)
CREATE POLICY "Allow authenticated update on newsletter_logs"
ON public.newsletter_logs FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
