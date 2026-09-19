# Database: Supabase Postgres Schema & Security Model

## 1. Migration Topology
Migrations reside under `supabase/migrations/` and are named `<timestamp>_<description>.sql`.

## 2. Row Level Security (RLS) Policy Architecture
All tables MUST enforce Row Level Security:
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

## 3. TypeScript Type Generation (`@repo/types`)
Database interface definitions are auto-generated to `packages/types/src/database.types.ts`:
```bash
pnpm supabase gen types typescript --local > packages/types/src/database.types.ts
```
