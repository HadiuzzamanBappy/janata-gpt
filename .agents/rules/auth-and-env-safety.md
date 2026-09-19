---
trigger:
  files:
    - "packages/auth/**/*"
    - "packages/env/**/*"
    - "supabase/**/*"
---

# Rule: Auth & Type-Safe Environment Variables

## 1. Type-Safe Environment Variables (`@repo/env`)

- **Centralized Schema**: All environment variables used across `apps/*` and `packages/*` must be defined and validated in `packages/env` using Zod / `@t3-oss/env-nextjs` or `@t3-oss/env-core`.
- **Zero Raw `process.env` / `import.meta.env` Direct Usage**:
  Import validated environment variables from `@repo/env` instead of accessing raw process strings.

```typescript
import { env } from "@repo/env";

// env.SUPABASE_URL and env.NEXT_PUBLIC_SITE_URL are guaranteed to exist and be validated
const client = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
```

- **Runtime Error Early Exit**: If a required env variable is missing, `@repo/env` throws an explicit build-time or startup error with the exact missing keys.

---

## 2. Supabase Auth Integration (`@repo/auth`)

- **Server vs Client Clients**:
  - Next.js Server Components / Actions / Route Handlers MUST use `@supabase/ssr` with cookie handling (`createDailyServerClient`).
  - Next.js Client Components use `@supabase/ssr` browser client (`createBrowserClient`).
  - Astro apps use Astro cookie middleware with `@supabase/ssr`.
- **Session Middleware**: Place session refreshing middleware in `apps/web/proxy.ts` or `middleware.ts` to ensure access tokens are refreshed before rendering protected routes.
- **Role-Based Access Control (RBAC)**: Store user roles in JWT user_metadata or Supabase `profiles` table. Check permissions on the server before completing sensitive actions.
