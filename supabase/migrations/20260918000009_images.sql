-- ==============================================================================
-- 1. SCHEMA: IMAGE GENERATIONS
-- ==============================================================================
CREATE TABLE public.image_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  file_id uuid REFERENCES public.sys_files(id) ON DELETE SET NULL, -- Where it was saved
  message_id uuid REFERENCES public.chat_messages(id) ON DELETE SET NULL, -- Where it was generated
  prompt text NOT NULL,
  revised_prompt text,
  negative_prompt text,
  seed bigint,
  aspect_ratio text DEFAULT '1:1',
  model_used text,
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.image_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access images" ON public.image_generations FOR ALL USING (user_id = auth.uid());
