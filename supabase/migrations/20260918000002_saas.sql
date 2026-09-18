-- ==============================================================================
-- 1. SCHEMA
-- ==============================================================================
CREATE TABLE public.saas_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price_label text,          -- e.g., '$20/month'
  test_id text,              -- LemonSqueezy test variant ID
  live_id text,              -- LemonSqueezy live variant ID
  monthly_price numeric,
  yearly_price numeric,
  features_json jsonb DEFAULT '[]'::jsonb, -- Array of strings for UI feature bullets
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
INSERT INTO public.saas_plans (name, price_label, test_id, live_id, monthly_price, yearly_price, features_json, limits_json) VALUES
('Free', '$0/forever', null, null, 0, 0, '["10 chats per month", "Standard models"]'::jsonb, '{"max_documents": 3, "max_chats": 10}'::jsonb),
('Starter', '$10/month', 'test_variant_123', 'live_variant_123', 10, 100, '["Unlimited chats", "Pro models"]'::jsonb, '{"max_documents": 1000, "max_chats": -1}'::jsonb),
('Pro', '$20/month', 'test_variant_456', 'live_variant_456', 20, 200, '["Everything in Starter", "API Access"]'::jsonb, '{"max_documents": 10000, "max_chats": -1}'::jsonb);
