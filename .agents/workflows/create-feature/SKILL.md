---
name: create-feature
description: End-to-end runbook to implement a full-stack feature across database, shared packages, and applications.
---

# Skill: Full-Stack Feature Implementation Runbook

## Step 1: Database & Schema Layer
- Create database migration if new tables/columns are needed (`pnpm supabase migration new <name>`).
- Apply RLS security policies and sync TypeScript definitions to `@repo/types`.

## Step 2: Shared Business Logic & UI Primitives
- Add reusable UI components to `packages/ui` using CVA and Radix primitives.
- Add shared environment variables to `packages/env` or auth logic to `packages/auth`.

## Step 3: Application Integration
- Integrate feature in target applications (`@apps/web`, `@apps/marketting`).
- Add API route handlers if server endpoints are required.

## Step 4: Verification Gate
```bash
pnpm turbo run check-types lint build
```
