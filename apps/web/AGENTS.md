# Next.js Web App (`apps/web`)

## 1. Local Commands
- **Dev Server**: `pnpm --filter @apps/web dev` (Runs on http://localhost:3000)
- **Production Build**: `pnpm --filter @apps/web build`
- **Typecheck**: `pnpm --filter @apps/web check-types`

## 2. App Architecture & Stack
- **Framework**: Next.js 16 (App Router) + React 19.
- **UI Components**: Consumes `@repo/ui` shared primitives and `@repo/tailwind-config`.
- **Database & Auth**: Supabase SSR via `@repo/auth` (`proxy.ts` middleware session refresh).
- **AI Integrations**: Vercel AI SDK routes located under `app/api/chat/route.ts`.
