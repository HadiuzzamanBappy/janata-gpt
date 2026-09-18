-- ==========================================================
-- 1. AUTHENTICATION & USERS
-- ==========================================================
-- Insert into auth.users. The trigger 'handle_new_user' (from 000001_rbac.sql) 
-- will automatically create the public.user, public.org_organizations, and public.org_members rows.
INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, raw_user_meta_data, created_at, updated_at
) VALUES (
  '11111111-1111-1111-1111-111111111111', 
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'demo@janatagpt.com',
  extensions.crypt('password123', extensions.gen_salt('bf')),
  '{"full_name": "Demo User", "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo"}',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

-- Let's use an anonymous DO block to grab the generated Org ID and seed the rest securely
DO $$
DECLARE
  v_user_id uuid := '11111111-1111-1111-1111-111111111111';
  v_org_id uuid;
  v_project_id uuid;
  v_session_id uuid;
  v_plugin_search_id uuid := gen_random_uuid();
  v_plugin_dalle_id uuid := gen_random_uuid();
BEGIN
  -- Get the Personal Workspace Org ID that the trigger just created
  SELECT id INTO v_org_id FROM public.org_organizations WHERE owner_id = v_user_id LIMIT 1;

  -- ==========================================================
  -- 2. PLUGINS
  -- ==========================================================
  INSERT INTO public.plugins (id, name, description, logo_url, is_public) VALUES
  (v_plugin_search_id, 'Web Search', 'Search the live web in real-time', 'https://lucide.dev/icons/globe.svg', true),
  (v_plugin_dalle_id, 'DALL-E 3', 'Generate incredible AI images directly in chat', 'https://lucide.dev/icons/image.svg', true)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_plugins (user_id, plugin_id, is_active) VALUES
  (v_user_id, v_plugin_search_id, true),
  (v_user_id, v_plugin_dalle_id, true)
  ON CONFLICT DO NOTHING;

  -- ==========================================================
  -- 3. PROJECTS
  -- ==========================================================
  v_project_id := gen_random_uuid();
  INSERT INTO public.projects (id, organization_id, owner_id, name, description, emoji, color) VALUES
  (v_project_id, v_org_id, v_user_id, 'Next.js 14 Build', 'All chats related to building my SaaS app', '🚀', 'blue');

  -- ==========================================================
  -- 4. CHAT SESSIONS & MESSAGES
  -- ==========================================================
  -- Chat 1: Inside the Project
  v_session_id := gen_random_uuid();
  INSERT INTO public.chat_sessions (id, organization_id, user_id, project_id, title, is_pinned) VALUES
  (v_session_id, v_org_id, v_user_id, v_project_id, 'How to use Server Actions', true);

  INSERT INTO public.chat_messages (session_id, role, content, model, finish_reason) VALUES
  (v_session_id, 'user', 'How do I mutate data in Next.js 14?', null, null),
  (v_session_id, 'assistant', 'You should use Server Actions! They allow you to mutate data directly from server components without needing API routes. It integrates perfectly with your `actions.ts` files.', 'gpt-4o', 'stop');

  -- Chat 2: Standalone Chat (Un-projected)
  v_session_id := gen_random_uuid();
  INSERT INTO public.chat_sessions (id, organization_id, user_id, title) VALUES
  (v_session_id, v_org_id, v_user_id, 'Dinner Ideas');

  INSERT INTO public.chat_messages (session_id, role, content, model, finish_reason, feedback_rating) VALUES
  (v_session_id, 'user', 'What should I eat tonight?', null, null, null),
  (v_session_id, 'assistant', 'How about making a quick pasta with garlic, oil, and chili flakes (Aglio e Olio)? It takes 15 minutes!', 'gpt-4o', 'stop', 'upvote');

  -- ==========================================================
  -- 5. SCHEDULED TASKS
  -- ==========================================================
  INSERT INTO public.scheduled_tasks (user_id, title, prompt_content, cron_expression, status) VALUES
  (v_user_id, 'Daily Tech News Summary', 'Search the web for the top 5 tech news headlines today and summarize them for me.', '0 9 * * *', 'active');

END $$;
