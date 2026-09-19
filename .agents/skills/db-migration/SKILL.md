---
name: db-migration
description: Step-by-step workflow for creating Supabase database migrations, syncing types to packages/types, and applying RLS policies.
---

# Skill: Database Migration & Schema Sync Workflow

Follow this runbook whenever modifying database schemas or Supabase tables:

## Step 1: Create Migration File
Run Supabase CLI command from root or `supabase/` folder:
```bash
pnpm supabase migration new <migration-name>
```

## Step 2: Write Schema & RLS Policies
Edit the generated migration file under `supabase/migrations/*.sql`:
- Define table structure, primary keys, foreign keys, and indexes.
- Enable Row Level Security (RLS): `ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;`.
- Write explicit SELECT, INSERT, UPDATE, DELETE policies for authenticated and anon roles.

## Step 3: Apply Migration & Generate Types
Generate TypeScript definitions directly into `@repo/types`:
```bash
pnpm supabase db reset # Apply locally
pnpm supabase gen types typescript --local > packages/types/src/database.types.ts
```

## Step 4: Verify Type Check Across Monorepo
Run typecheck across consuming apps (`apps/web`, `apps/admin`):
```bash
pnpm turbo run check-types
```
