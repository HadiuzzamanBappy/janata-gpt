---
trigger:
  files:
    - "packages/env/**/*"
    - "apps/**/*"
---

# Rule: Environment Variable Validation (`@repo/env`)

## 1. Schema Validation
- All environment variables consumed across `apps/*` and `packages/*` MUST be defined in `packages/env` schema using Zod / `@t3-oss/env-nextjs`.
- Never access `process.env` directly in application logic. Import `{ env }` from `@repo/env`.

## 2. Server vs Client Security
- Secret environment variables belong in `server` schema.
- Public variables belong in `client` schema (`NEXT_PUBLIC_*` or `VITE_*`).
