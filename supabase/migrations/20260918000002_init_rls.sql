-- Enable RLS on all tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile and update it
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- RBAC tables are generally read-only for authenticated users (admins would have bypass via service role)
CREATE POLICY "Anyone can read roles" ON public.roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can read permissions" ON public.permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Documents: Users can only CRUD their own documents
CREATE POLICY "Users can view own docs" ON public.documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own docs" ON public.documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own docs" ON public.documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own docs" ON public.documents FOR DELETE USING (auth.uid() = user_id);

-- Document Chunks: Inherit access from parent document
CREATE POLICY "Users can view own chunks" ON public.document_chunks FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_id AND d.user_id = auth.uid())
);

-- Chats: Users can only CRUD their own chats
CREATE POLICY "Users can view own chats" ON public.chats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own chats" ON public.chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own chats" ON public.chats FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own chats" ON public.chats FOR DELETE USING (auth.uid() = user_id);

-- Messages: Inherit access from parent chat
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chats c WHERE c.id = chat_id AND c.user_id = auth.uid())
);
CREATE POLICY "Users can insert own messages" ON public.messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.chats c WHERE c.id = chat_id AND c.user_id = auth.uid())
);
