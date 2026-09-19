# Checklist: Database Schema Change

- [ ] Idempotent SQL migration generated under `supabase/migrations/*.sql`.
- [ ] Table definitions specify primary keys, foreign keys, and indexes.
- [ ] Row Level Security (RLS) explicitly enabled (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).
- [ ] RLS policies created for SELECT, INSERT, UPDATE, DELETE restricting access by `auth.uid()`.
- [ ] Local migration reset executed (`pnpm supabase db reset`).
- [ ] TypeScript types generated to `packages/types/src/database.types.ts` (`pnpm supabase gen types typescript --local`).
- [ ] Monorepo typecheck passes (`pnpm turbo run check-types`).
