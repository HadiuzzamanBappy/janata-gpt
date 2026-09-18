-- ==============================================================================
-- 1. SCHEMA: CHAT ENGINE
-- ==============================================================================
CREATE TABLE public.chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  title text,
  share_token uuid UNIQUE,
  is_pinned boolean DEFAULT false,
  is_archived boolean DEFAULT false,
  metadata_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.chat_messages(id) ON DELETE CASCADE, -- Branching history
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system', 'tool')),
  content text NOT NULL,
  model text,
  input_tokens int,
  output_tokens int,
  finish_reason text,
  feedback_rating text CHECK (feedback_rating IN ('upvote', 'downvote')),
  feedback_comment text,
  tool_calls_json jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.chat_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  file_id uuid REFERENCES public.sys_files(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own sessions" ON public.chat_sessions FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users access own messages" ON public.chat_messages FOR ALL USING (EXISTS (SELECT 1 FROM public.chat_sessions c WHERE c.id = session_id AND c.user_id = auth.uid()));
CREATE POLICY "Users access attachments" ON public.chat_attachments FOR ALL USING (EXISTS (SELECT 1 FROM public.chat_messages m JOIN public.chat_sessions c ON m.session_id = c.id WHERE m.id = message_id AND c.user_id = auth.uid()));
