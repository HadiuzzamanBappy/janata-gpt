---
name: database-migration
description: Runbook for creating Supabase database migrations, syncing types to packages/types, and applying RLS policies.
---

# Skill: Database Migration & Schema Sync Runbook

## Step 1: Create Migration File
```bash
pnpm supabase migration new <migration_name>
```

## Step 2: Write SQL Schema & RLS Security Policies
Edit `supabase/migrations/*.sql`:
- Define table schema, primary keys, foreign keys, and indexes.
- Enable RLS: `ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;`.
- Add explicit RLS policies for SELECT, INSERT, UPDATE, DELETE restricting access by `auth.uid()`.

## Step 3: Apply & Sync TypeScript Types
```bash
pnpm supabase db reset
pnpm supabase gen types typescript --local > packages/types/src/database.types.ts
pnpm turbo run check-types
```
