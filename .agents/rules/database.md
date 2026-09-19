---
trigger:
  files:
    - "supabase/**/*"
    - "packages/types/**/*"
---

# Rule: Database Architecture & Supabase Schema Rules

## 1. Migration Management
- Write migration files under `supabase/migrations/<timestamp>_<name>.sql`.
- Migration scripts MUST be idempotent and tested locally before deployment (`pnpm supabase db reset`).

## 2. Type Generation (`@repo/types`)
- Generate TypeScript types directly into `packages/types/src/database.types.ts` via `pnpm supabase gen types`.
- Do not manually edit generated database interface files.
