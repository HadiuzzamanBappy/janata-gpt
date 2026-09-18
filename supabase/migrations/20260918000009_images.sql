-- ==============================================================================
-- 1. SCHEMA: IMAGE GENERATIONS
-- ==============================================================================
CREATE TABLE public.image_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  file_id uuid REFERENCES public.sys_files(id) ON DELETE SET NULL, -- Where it was saved
  prompt text NOT NULL,
  aspect_ratio text DEFAULT '1:1',
  model_used text,
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.image_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access images" ON public.image_generations FOR ALL USING (user_id = auth.uid());
