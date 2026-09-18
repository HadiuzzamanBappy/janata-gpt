import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Server-side Environment Variables (Not accessible on the client)
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    // Supabase (server-only: service role key is secret)
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    // Management API token — needed for Edge Function management (db:reset)
    // Get from: https://app.supabase.com/account/tokens
    // NOTE: SERVICE_ROLE_KEY cannot delete Edge Functions — different API surface.
    SUPABASE_ACCESS_TOKEN: z.string().optional(),
    SUPABASE_JWT_SECRET: z.string().optional(),

    // AI Providers
    OPENAI_API_KEY: z.string().optional(),
    ANTHROPIC_API_KEY: z.string().optional(),
    GEMINI_API_KEY: z.string().optional(),
    ZAI_API_KEY: z.string().optional(),
    OPENROUTER_API_KEY: z.string().optional(),
    DEEPSEEK_API_KEY: z.string().optional(),

    FIRECRAWL_API_KEY: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),

    // Rate Limiting & Caching
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

    // Billing
    LEMONSQUEEZY_TEST_API_KEY: z.string().optional(),
    LEMONSQUEEZY_LIVE_API_KEY: z.string().optional(),
    LEMONSQUEEZY_WEBHOOK_SECRET: z.string().optional(),
    LEMONSQUEEZY_STORE_ID: z.string().optional(),
    LEMONSQUEEZY_MODE: z.enum(['test', 'live']).default('test'),
  },

  /**
   * Client-side Environment Variables (Safe to expose to the browser)
   * In Next.js, these must be prefixed with `NEXT_PUBLIC_`
   */
  clientPrefix: 'NEXT_PUBLIC_',
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
    // Supabase (safe to expose to the browser)
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

    // App URLs
    NEXT_PUBLIC_WEB_URL: z.string().url().default('http://localhost:3000'),
    NEXT_PUBLIC_WIDGET_URL: z.string().url().default('http://localhost:5174'),
    NEXT_PUBLIC_MARKETING_URL: z.string().url().default('http://localhost:4321'),
    NEXT_PUBLIC_DOCS_URL: z.string().url().default('http://localhost:4322'),

    // Feature Flags & Config
    NEXT_PUBLIC_SYSTEM_STATUS: z.string().optional(),
    NEXT_PUBLIC_SYSTEM_DOWNTIME: z.string().optional(),
    NEXT_PUBLIC_IS_TEST_MODE: z.string().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in Next.js edge runtimes.
   * You have to manually map them here.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN,
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    ZAI_API_KEY: process.env.ZAI_API_KEY,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    LEMONSQUEEZY_TEST_API_KEY: process.env.LEMONSQUEEZY_TEST_API_KEY,
    LEMONSQUEEZY_LIVE_API_KEY: process.env.LEMONSQUEEZY_LIVE_API_KEY,
    LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
    LEMONSQUEEZY_MODE: process.env.LEMONSQUEEZY_MODE,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    NEXT_PUBLIC_WIDGET_URL: process.env.NEXT_PUBLIC_WIDGET_URL,
    NEXT_PUBLIC_MARKETING_URL: process.env.NEXT_PUBLIC_MARKETING_URL,
    NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    NEXT_PUBLIC_SYSTEM_STATUS: process.env.NEXT_PUBLIC_SYSTEM_STATUS,
    NEXT_PUBLIC_SYSTEM_DOWNTIME: process.env.NEXT_PUBLIC_SYSTEM_DOWNTIME,
    NEXT_PUBLIC_IS_TEST_MODE: process.env.NEXT_PUBLIC_IS_TEST_MODE,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
