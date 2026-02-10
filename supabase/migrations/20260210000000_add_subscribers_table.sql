-- Create subscribers table for newsletter subscription
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'both'
    CHECK (category IN ('frontend', 'ai', 'both')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

-- Unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS subscribers_email_unique
  ON public.subscribers (email);

-- Partial index for active subscriber queries
CREATE INDEX IF NOT EXISTS subscribers_active_category_idx
  ON public.subscribers (is_active, category)
  WHERE is_active = true;

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous subscribe (insert)
CREATE POLICY "Allow anonymous subscribe"
  ON public.subscribers FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anonymous unsubscribe (update)
CREATE POLICY "Allow anonymous unsubscribe"
  ON public.subscribers FOR UPDATE TO anon
  USING (true) WITH CHECK (true);

-- Allow anonymous select (check existing email)
CREATE POLICY "Allow anonymous select"
  ON public.subscribers FOR SELECT TO anon
  USING (true);
