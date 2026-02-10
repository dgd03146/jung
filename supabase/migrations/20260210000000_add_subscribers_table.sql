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

-- Allow anonymous subscribe (insert) with restricted column values
CREATE POLICY "Allow anonymous subscribe"
  ON public.subscribers FOR INSERT TO anon
  WITH CHECK (
    is_active = true
    AND created_at = now()
    AND updated_at = now()
    AND unsubscribed_at IS NULL
  );

-- Allow anonymous unsubscribe (update): only permit setting is_active = false
CREATE POLICY "Allow anonymous unsubscribe"
  ON public.subscribers FOR UPDATE TO anon
  USING (is_active = true)
  WITH CHECK (is_active = false);

-- Prevent anon from modifying immutable columns (email, category, created_at)
-- RLS WITH CHECK cannot compare OLD vs NEW, so we use a trigger instead.
CREATE OR REPLACE FUNCTION public.subscribers_immutable_columns()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS DISTINCT FROM OLD.email THEN
    RAISE EXCEPTION 'Cannot modify email';
  END IF;
  IF NEW.category IS DISTINCT FROM OLD.category THEN
    RAISE EXCEPTION 'Cannot modify category';
  END IF;
  IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'Cannot modify created_at';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER subscribers_protect_columns
  BEFORE UPDATE ON public.subscribers
  FOR EACH ROW
  WHEN (current_setting('request.jwt.claim.role', true) = 'anon')
  EXECUTE FUNCTION public.subscribers_immutable_columns();

-- Server functions use service_role key which bypasses RLS.
-- No SELECT policy for anon to prevent email enumeration.
