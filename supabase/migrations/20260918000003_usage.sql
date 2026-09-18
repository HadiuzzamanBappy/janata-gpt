-- ==============================================================================
-- 1. SCHEMA: USAGE LOGS
-- ==============================================================================
CREATE TABLE public.usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  action_type text NOT NULL CHECK (action_type IN ('chat_message', 'image_generation', 'plugin_run')),
  amount int DEFAULT 1,
  metadata_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users access own usage" ON public.usage_logs FOR ALL USING (user_id = auth.uid());

CREATE INDEX idx_usage_logs_user_date ON public.usage_logs(user_id, created_at);
