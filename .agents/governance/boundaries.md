# Governance: System Boundaries & Responsibilities

## 1. App Responsibilities (`apps/*`)
- App routing, page layouts, route handlers, and framework entry points.
- Framework configuration (`next.config.ts`, `astro.config.mjs`, `vite.config.ts`).
- App-specific feature compositions (combining `@repo/ui`, `@repo/auth`, `@repo/ai`).

## 2. Shared Package Responsibilities (`packages/*`)
- **`@repo/ui`**: All reusable visual elements, CVA variants, Radix primitives, icons, and CSS tokens.
- **`@repo/env`**: Single source of truth for runtime environment validation (Zod schemas).
- **`@repo/auth`**: Supabase cookie auth wrappers, server/client auth clients, session middleware.
- **`@repo/ai`**: Vercel AI SDK provider wrappers, model constants, and streaming helpers.
- **`@repo/types`**: Database interface definitions (`database.types.ts`) and global DTOs.
- **`@repo/utils`**: Pure utility functions (`cn`, date formatters, string manipulators).

## 3. Strict Boundary Rules
- **No Inline Hacks**: Apps must not redefine UI primitives or raw environment variable parsers.
- **No Shared App Code**: Apps must not cross-import code from other apps (`apps/web` cannot import from `apps/marketting`).
