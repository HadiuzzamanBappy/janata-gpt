-- ==============================================================================
-- 1. SCHEMA
-- ==============================================================================
CREATE TABLE public.chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chatbot_id uuid REFERENCES public.bot_chatbots(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  external_user_id text, -- For embedded bots
  title text,
  status text DEFAULT 'active',
  metadata_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.chat_messages(id) ON DELETE CASCADE, -- Branching history
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system', 'tool')),
  content text NOT NULL,
  model text,
  input_tokens int,
  output_tokens int,
  finish_reason text,
  metadata_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Streaming / Multimodal parts
CREATE TABLE public.chat_message_parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  part_type text NOT NULL,
  content text,
  tool_call_id text,
  metadata_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Tool execution records
CREATE TABLE public.chat_tool_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  tool_definition_id uuid REFERENCES public.bot_tools(id) ON DELETE SET NULL,
  arguments_json jsonb,
  result_json jsonb,
  status text,
  latency_ms int,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.chat_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  conversation_id uuid REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  message_id uuid REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  rating int CHECK (rating IN (1, -1)), -- Thumbs up / down
  comment text,
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_message_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_tool_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_feedback ENABLE ROW LEVEL SECURITY;

-- Note: In a true B2B embedded bot architecture, you might bypass these with a Service Role key
-- for the external API, but for dashboard users we enforce org membership.

CREATE POLICY "Org members can read conversations" ON public.chat_conversations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = chat_conversations.organization_id AND pm.user_id = auth.uid())
);
CREATE POLICY "Org members can read messages" ON public.chat_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chat_conversations c JOIN public.org_members pm ON c.organization_id = pm.organization_id WHERE c.id = chat_messages.conversation_id AND pm.user_id = auth.uid())
);
CREATE POLICY "Org members can read message_parts" ON public.chat_message_parts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chat_messages m JOIN public.chat_conversations c ON m.conversation_id = c.id JOIN public.org_members pm ON c.organization_id = pm.organization_id WHERE m.id = chat_message_parts.message_id AND pm.user_id = auth.uid())
);
CREATE POLICY "Org members can read tool_calls" ON public.chat_tool_calls FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chat_messages m JOIN public.chat_conversations c ON m.conversation_id = c.id JOIN public.org_members pm ON c.organization_id = pm.organization_id WHERE m.id = chat_tool_calls.message_id AND pm.user_id = auth.uid())
);
CREATE POLICY "Org members can read feedback" ON public.chat_feedback FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = chat_feedback.organization_id AND pm.user_id = auth.uid())
);
