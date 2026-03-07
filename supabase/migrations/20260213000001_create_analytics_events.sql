CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL CHECK (char_length(event_name) <= 100),
  event_category TEXT NOT NULL,
  page_path TEXT,
  page_title TEXT,
  referrer TEXT,
  resource_type TEXT,
  resource_id TEXT,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  locale TEXT,
  user_agent TEXT,
  properties JSONB DEFAULT '{}' CHECK (octet_length(properties::text) <= 4096),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_page_path ON analytics_events(page_path);
CREATE INDEX idx_analytics_events_resource ON analytics_events(resource_type, resource_id);
CREATE INDEX idx_analytics_events_session ON analytics_events(session_id);

-- RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Anyone can insert analytics events
CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

-- Only service role can read analytics
CREATE POLICY "Service role can read analytics"
  ON analytics_events FOR SELECT
  USING (auth.role() = 'service_role');

-- Explicitly deny update and delete
CREATE POLICY "No one can update analytics events"
  ON analytics_events FOR UPDATE
  USING (false);

CREATE POLICY "No one can delete analytics events"
  ON analytics_events FOR DELETE
  USING (false);
