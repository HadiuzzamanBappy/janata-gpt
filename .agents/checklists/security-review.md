# Checklist: Security & Vulnerability Audit

- [ ] Row Level Security (RLS) enabled on all Supabase tables (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).
- [ ] RLS policies created for SELECT, INSERT, UPDATE, DELETE restricting access based on `auth.uid()`.
- [ ] Secret environment variables (`SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`) restricted to server schema in `packages/env`.
- [ ] Secret keys never exposed to client code via `NEXT_PUBLIC_` or `VITE_` prefixes.
- [ ] CORS policies and CSRF cookie flags verified.
- [ ] API routes enforce user session authentication prior to database operations.
