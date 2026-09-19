# Technology Guide: Supabase Database & Auth (`@repo/auth`)

## 1. Client Context Separation (`@supabase/ssr`)
- **Server Context**: Use `createDailyServerClient()` with cookie management in Next.js Server Components, Actions, Route Handlers, and Astro middleware.
- **Browser Context**: Use `createBrowserClient()` in React Client Components (`'use client'`).

## 2. Row Level Security (RLS)
- Enable RLS on every table (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).
- Restrict row reads/writes using `auth.uid()` checks in SQL policies.

## 3. Database Migrations & Typegen
- Store idempotent SQL scripts under `supabase/migrations/<timestamp>_<name>.sql`.
- Generate TypeScript types to `packages/types/src/database.types.ts` via `pnpm supabase gen types typescript --local`.
