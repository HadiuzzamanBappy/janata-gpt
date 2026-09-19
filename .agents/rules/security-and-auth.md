---
trigger:
  files:
    - "supabase/**/*"
    - "packages/auth/**/*"
    - "packages/env/**/*"
    - "apps/**/middleware.ts"
    - "apps/**/proxy.ts"
---

# Rule: Security, Authentication & Row Level Security (RLS)

## 1. Authentication & Cookie Sessions (`@supabase/ssr`)
- **Server Context**: Use `createDailyServerClient()` for RSC, Server Actions, Route Handlers, and Astro middleware.
- **Browser Context**: Use `createBrowserClient()` in Client Components (`'use client'`).
- Always refresh auth session tokens in middleware (`proxy.ts` / `middleware.ts`).

## 2. Authorization & Supabase RLS
- RLS MUST be enabled on every database table (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).
- Write explicit SELECT, INSERT, UPDATE, DELETE policies restricting user access based on `auth.uid()`.

## 3. Secret Protection
- Secret environment variables (`SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`) MUST remain in server scope (`packages/env`).
- Never prefix secret keys with `NEXT_PUBLIC_` or `VITE_`.
