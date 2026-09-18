-- ==============================================================================
-- 1. SCHEMA
-- ==============================================================================
CREATE TABLE public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  locale text,
  timezone text,
  preferences_json jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Organizations (Tenants/Workspaces)
CREATE TABLE public.org_organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text,
  settings_json jsonb DEFAULT '{}'::jsonb,
  owner_id uuid REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Organization Members
CREATE TABLE public.org_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

-- Invitations
CREATE TABLE public.org_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  token_hash text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Organizations
CREATE POLICY "Org members can read organizations" ON public.org_organizations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = id AND pm.user_id = auth.uid())
);
CREATE POLICY "Org owners can update organizations" ON public.org_organizations FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = id AND pm.user_id = auth.uid() AND pm.role = 'owner')
);
CREATE POLICY "Org owners can delete organizations" ON public.org_organizations FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = id AND pm.user_id = auth.uid() AND pm.role = 'owner')
);

-- Org Members
CREATE POLICY "Org members can read members" ON public.org_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = org_members.organization_id AND pm.user_id = auth.uid())
);
CREATE POLICY "Org admins can manage members" ON public.org_members FOR ALL USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = org_members.organization_id AND pm.user_id = auth.uid() AND pm.role IN ('owner', 'admin'))
);

-- Invitations
CREATE POLICY "Org members can read invitations" ON public.org_invitations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = org_invitations.organization_id AND pm.user_id = auth.uid())
);
CREATE POLICY "Org admins can manage invitations" ON public.org_invitations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = org_invitations.organization_id AND pm.user_id = auth.uid() AND pm.role IN ('owner', 'admin'))
);

-- ==============================================================================
-- 3. RPC & TRIGGERS
-- ==============================================================================

-- When a user signs up, create their profile and a "Personal Workspace"
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_org_id uuid;
  v_slug text;
BEGIN
  -- 1. Insert user profile
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );

  v_slug := 'personal-' || substr(md5(random()::text), 1, 8);

  -- 2. Create their Personal Workspace
  INSERT INTO public.org_organizations (name, slug, owner_id) 
  VALUES ('Personal Workspace', v_slug, NEW.id)
  RETURNING id INTO v_org_id;

  -- 3. Make them the owner of the workspace
  INSERT INTO public.org_members (organization_id, user_id, role)
  VALUES (v_org_id, NEW.id, 'owner');

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
