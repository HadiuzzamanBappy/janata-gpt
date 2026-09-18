-- ==============================================================================
-- 1. SCHEMA: PLUGINS & MCP
-- ==============================================================================
CREATE TABLE public.plugins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  logo_url text,
  mcp_endpoint_url text,
  auth_schema_json jsonb,
  is_public boolean DEFAULT false,
  created_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.user_plugins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  plugin_id uuid REFERENCES public.plugins(id) ON DELETE CASCADE,
  credentials_json jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, plugin_id)
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_plugins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads plugins" ON public.plugins FOR SELECT USING (true);
CREATE POLICY "Users manage own plugins" ON public.user_plugins FOR ALL USING (user_id = auth.uid());
