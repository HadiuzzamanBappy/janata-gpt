-- ==============================================================================
-- 1. SCHEMA
-- ==============================================================================
CREATE TABLE public.saas_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  monthly_price numeric,
  yearly_price numeric,
  limits_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Subscriptions are tied to an Organization
CREATE TABLE public.saas_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.org_organizations(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES public.saas_plans(id) ON DELETE RESTRICT,
  provider text, -- e.g., 'stripe', 'lemonsqueezy'
  provider_subscription_id text UNIQUE NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'past_due', 'canceled', 'unpaid', 'trialing')),
  current_period_start timestamptz,
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 2. RLS POLICIES
-- ==============================================================================
ALTER TABLE public.saas_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saas_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read plans" ON public.saas_plans FOR SELECT TO authenticated USING (true);

CREATE POLICY "Org members can read subscriptions" ON public.saas_subscriptions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.org_members pm WHERE pm.organization_id = saas_subscriptions.organization_id AND pm.user_id = auth.uid())
);

-- ==============================================================================
-- 3. SEED PRODUCTS
-- ==============================================================================
INSERT INTO public.saas_plans (name, monthly_price, yearly_price, limits_json) VALUES
('Free', 0, 0, '{"max_documents": 3, "max_chats": 10, "max_tokens": 50000}'::jsonb),
('ChatGPT Plus', 20, 200, '{"max_documents": 1000, "max_chats": 1000, "max_tokens": 2000000}'::jsonb),
('ChatGPT Team', 30, 300, '{"max_documents": 10000, "max_chats": 10000, "max_tokens": 10000000}'::jsonb);
