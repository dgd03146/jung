-- Add admin RLS policies for subscribers table
-- Follows the same pattern as articles RLS (20260209000000_fix_articles_rls_policy.sql)

CREATE POLICY "Allow admin select subscribers"
  ON public.subscribers FOR SELECT
  USING (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Allow admin update subscribers"
  ON public.subscribers FOR UPDATE
  USING (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
    OR auth.jwt() ->> 'role' = 'service_role'
  );
