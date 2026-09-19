# Shared Types & DB Schemas (`packages/types`)

## 1. Purpose & Responsibilities
- Centralized TypeScript interfaces, Supabase database definitions, and shared DTOs.

## 2. Rules & Directives
- **DB Types**: `database.types.ts` is auto-generated via `pnpm supabase gen types`. Never edit generated database types directly.
- **Public Exports**: Re-export all domain interfaces in `src/index.ts`.
