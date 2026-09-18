-- ==============================================================================
-- 1. SCHEMA: FILES & LIBRARY
-- ==============================================================================
CREATE TABLE public.sys_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  uploader_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  storage_path text NOT NULL,
  file_name text NOT NULL,
  mime_type text,
  size_bytes bigint,
  visibility text DEFAULT 'private' CHECK (visibility IN ('public', 'private')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.library_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  file_id uuid REFERENCES public.sys_files(id) ON DELETE CASCADE, -- Optional if it's a file
  content text, -- Optional if it's just a text snippet
  type text NOT NULL CHECK (type IN ('file', 'snippet', 'prompt')),
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.sys_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own files" ON public.sys_files FOR ALL USING (uploader_id = auth.uid());
CREATE POLICY "Users access own library" ON public.library_items FOR ALL USING (user_id = auth.uid());
