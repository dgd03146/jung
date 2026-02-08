-- Fix RLS policy to be more restrictive
-- Only admin users can modify articles

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Allow authenticated users to manage articles" ON articles;

-- Create separate policies for admin-only CUD operations
-- Note: Using a service role key or checking user metadata for admin role
-- For now, we'll use the app_metadata.role check

CREATE POLICY "Allow admin to insert articles" ON articles
  FOR INSERT
  WITH CHECK (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Allow admin to update articles" ON articles
  FOR UPDATE
  USING (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
    OR auth.jwt() ->> 'role' = 'service_role'
  );

CREATE POLICY "Allow admin to delete articles" ON articles
  FOR DELETE
  USING (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
    OR auth.jwt() ->> 'role' = 'service_role'
  );
