-- ==============================================================================
-- 1. SCHEMA: SCHEDULED TASKS
-- ==============================================================================
CREATE TABLE public.scheduled_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  prompt_content text NOT NULL,
  cron_expression text NOT NULL,
  target_plugin_id uuid REFERENCES public.plugins(id) ON DELETE SET NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  next_run_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.scheduled_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES public.scheduled_tasks(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('success', 'failed')),
  output_content text,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.scheduled_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access tasks" ON public.scheduled_tasks FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users access runs" ON public.scheduled_runs FOR ALL USING (EXISTS (SELECT 1 FROM public.scheduled_tasks t WHERE t.id = task_id AND t.user_id = auth.uid()));
