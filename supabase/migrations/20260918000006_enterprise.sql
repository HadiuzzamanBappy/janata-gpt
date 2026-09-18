-- ==============================================================================
-- 1. SCHEMA
-- ==============================================================================

-- LLM Provider Registry
CREATE TABLE public.ai_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  config_json jsonb DEFAULT '{}'::jsonb,
  enabled boolean DEFAULT true
);

-- Granular Token & Cost Tracking
CREATE TABLE public.ai_model_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  chatbot_id uuid REFERENCES public.bot_chatbots(id) ON DELETE SET NULL,
  conversation_id uuid REFERENCES public.chat_conversations(id) ON DELETE SET NULL,
  message_id uuid REFERENCES public.chat_messages(id) ON DELETE SET NULL,
  provider text,
  model text,
  input_tokens int DEFAULT 0,
  output_tokens int DEFAULT 0,
  cached_tokens int DEFAULT 0,
  estimated_cost numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Aggregated Daily Usage for Fast Dashboards
CREATE TABLE public.ai_usage_daily (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  date date NOT NULL,
  messages_count int DEFAULT 0,
  input_tokens int DEFAULT 0,
  output_tokens int DEFAULT 0,
  storage_bytes bigint DEFAULT 0,
  estimated_cost numeric DEFAULT 0,
  UNIQUE(organization_id, date)
);

-- API Keys
CREATE TABLE public.api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  key_prefix text NOT NULL,
  key_hash text UNIQUE NOT NULL,
  last_used_at timestamptz,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Webhooks
CREATE TABLE public.api_webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  url text NOT NULL,
  secret_hash text NOT NULL,
  events_json jsonb NOT NULL,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Webhook Deliveries / Audit
CREATE TABLE public.api_webhook_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id uuid REFERENCES public.api_webhooks(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  payload_json jsonb NOT NULL,
  status_code int,
  response_body text,
  attempts int DEFAULT 1,
  next_retry_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- General Audit Logs
CREATE TABLE public.sys_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  metadata_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.ai_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_model_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_webhook_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sys_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read providers" ON public.ai_providers FOR SELECT TO authenticated USING (true);

-- Org Members
CREATE POLICY "Org members can read usage_daily" ON public.ai_usage_daily FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = ai_usage_daily.organization_id AND pm.user_id = auth.uid())
);
CREATE POLICY "Org members can read model_usage" ON public.ai_model_usage FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = ai_model_usage.organization_id AND pm.user_id = auth.uid())
);
CREATE POLICY "Org members can read audit_logs" ON public.sys_audit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = sys_audit_logs.organization_id AND pm.user_id = auth.uid())
);

-- Org Admins only for keys/webhooks
CREATE POLICY "Org admins can manage api_keys" ON public.api_keys FOR ALL USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = api_keys.organization_id AND pm.user_id = auth.uid() AND pm.role IN ('owner', 'admin'))
);
CREATE POLICY "Org admins can manage webhooks" ON public.api_webhooks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = api_webhooks.organization_id AND pm.user_id = auth.uid() AND pm.role IN ('owner', 'admin'))
);
