---
trigger:
  files:
    - "supabase/**/*"
    - "packages/ai/**/*"
    - "packages/types/**/*"
    - "apps/web/app/api/**/*"
---

# 06. Database & API Integration Standards

## 1. Supabase Database & Security
- Write idempotent SQL migrations in `supabase/migrations/`.
- **Row Level Security (RLS)**: Mandatory `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;` on all tables with explicit policies.
- Automatically generate TypeScript types to `packages/types/src/database.types.ts`.

## 2. AI SDK & Streaming API Standards (`packages/ai` & `apps/web`)
- Centralize LLM providers in `packages/ai`.
- Return `streamText(...).toDataStreamResponse()` in streaming Next.js Route Handlers.
- Handle loading, error, and streaming UI states cleanly on the frontend.
