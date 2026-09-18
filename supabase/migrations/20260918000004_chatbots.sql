-- ==============================================================================
-- 1. SCHEMA
-- ==============================================================================
CREATE TABLE public.bot_chatbots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text,
  description text,
  system_prompt text,
  model text DEFAULT 'gpt-4o',
  settings_json jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Versioned configurations (published snapshots)
CREATE TABLE public.bot_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chatbot_id uuid REFERENCES public.bot_chatbots(id) ON DELETE CASCADE,
  version int NOT NULL,
  config_json jsonb NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Tools / Function Calling
CREATE TABLE public.bot_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chatbot_id uuid REFERENCES public.bot_chatbots(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  schema_json jsonb NOT NULL,
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.bot_chatbots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can manage chatbots" ON public.bot_chatbots FOR ALL USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = bot_chatbots.organization_id AND pm.user_id = auth.uid())
);

CREATE POLICY "Org members can manage chatbot_versions" ON public.bot_versions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.bot_chatbots c JOIN public.org_members pm ON c.organization_id = pm.organization_id WHERE c.id = bot_versions.chatbot_id AND pm.user_id = auth.uid())
);

CREATE POLICY "Org members can manage tool_definitions" ON public.bot_tools FOR ALL USING (
  EXISTS (SELECT 1 FROM public.bot_chatbots c JOIN public.org_members pm ON c.organization_id = pm.organization_id WHERE c.id = bot_tools.chatbot_id AND pm.user_id = auth.uid())
);
