-- ==============================================================================
-- 1. SCHEMA
-- ==============================================================================
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- General files (profile pictures, images for prompts, etc)
CREATE TABLE public.sys_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  storage_key text,
  filename text NOT NULL,
  mime_type text,
  size_bytes int,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- RAG Knowledge Bases
CREATE TABLE public.rag_knowledge_bases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  chatbot_id uuid, -- Defined in next migration, nullable if global to org
  name text NOT NULL,
  description text,
  embedding_model text DEFAULT 'text-embedding-ada-002',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.rag_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_base_id uuid REFERENCES public.rag_knowledge_bases(id) ON DELETE CASCADE,
  name text NOT NULL,
  source_type text,
  source_url text,
  storage_key text,
  mime_type text,
  size_bytes int,
  checksum text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.rag_document_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES public.rag_documents(id) ON DELETE CASCADE,
  knowledge_base_id uuid REFERENCES public.rag_knowledge_bases(id) ON DELETE CASCADE,
  content text NOT NULL,
  embedding extensions.vector(1536) NOT NULL,
  token_count int,
  metadata_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX ON public.rag_document_chunks USING hnsw (embedding extensions.vector_cosine_ops);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.sys_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rag_knowledge_bases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rag_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rag_document_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Org members can manage files" ON public.sys_files FOR ALL USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = sys_files.organization_id AND pm.user_id = auth.uid())
);

CREATE POLICY "Org members can manage knowledge_bases" ON public.rag_knowledge_bases FOR ALL USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = rag_knowledge_bases.organization_id AND pm.user_id = auth.uid())
);

CREATE POLICY "Org members can manage documents" ON public.rag_documents FOR ALL USING (
  EXISTS (SELECT 1 FROM public.rag_knowledge_bases kb JOIN public.org_members pm ON kb.organization_id = pm.organization_id WHERE kb.id = rag_documents.knowledge_base_id AND pm.user_id = auth.uid())
);

CREATE POLICY "Org members can read chunks" ON public.rag_document_chunks FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.rag_knowledge_bases kb JOIN public.org_members pm ON kb.organization_id = pm.organization_id WHERE kb.id = rag_document_chunks.knowledge_base_id AND pm.user_id = auth.uid())
);
