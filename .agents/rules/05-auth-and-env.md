---
trigger:
  files:
    - "packages/auth/**/*"
    - "packages/env/**/*"
    - "supabase/**/*"
    - "apps/**/*"
---

# 05. Auth & Type-Safe Environment Variables

## 1. Environment Variable Safety (`@repo/env`)
- Centralize all variable schemas in `packages/env` using Zod / `@t3-oss/env-nextjs`.
- Never access raw `process.env` or `import.meta.env` directly in application code. Import `env` from `@repo/env`.
- Missing environment variables must trigger early build-time or startup errors.

## 2. Supabase Authentication (`@repo/auth`)
- **Server Context**: Use `@supabase/ssr` with cookie handling (`createDailyServerClient`) in Next.js RSC, Server Actions, Route Handlers, and Astro middleware.
- **Browser Context**: Use `@supabase/ssr` browser client in Client Components.
- **Middleware**: Refresh auth session tokens in proxy/middleware before rendering protected routes.
