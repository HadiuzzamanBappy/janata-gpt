-- ==============================================================================
-- 1. SCHEMA: PROJECTS
-- ==============================================================================
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  owner_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  emoji text,
  color text,
  is_archived boolean DEFAULT false,
  share_token uuid UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.project_collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('editor', 'viewer')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_collaborators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own projects" ON public.projects FOR ALL USING (owner_id = auth.uid());
CREATE POLICY "Collaborators access projects" ON public.project_collaborators FOR ALL USING (user_id = auth.uid());
