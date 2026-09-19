# Shared Env Schema (`packages/env`)

## 1. Purpose & Responsibilities
- Type-safe environment variable validation using `@t3-oss/env-nextjs` and Zod schemas.
- Exports validated `env` object consumed across `apps/*` and `packages/*`.

## 2. Rules & Directives
- **Server Variables**: Define secret keys (`SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`) under `server` schema.
- **Client Variables**: Define public variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SITE_URL`) under `client` schema.
- **Zero Raw Access**: Never use `process.env` directly in application code. Always import `{ env }` from `@repo/env`.
