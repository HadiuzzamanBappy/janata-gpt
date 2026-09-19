# Setup: Local Development Guide

## 1. Prerequisites
- **Node.js**: `>= 22.12.0`
- **Package Manager**: `pnpm` (v9 or v10)
- **Supabase CLI**: Installed globally or via pnpm

## 2. Quickstart Runbook

```bash
# 1. Clone repository & install dependencies
git clone <repository-url>
cd turbo-monorepo-template
pnpm install

# 2. Start local Supabase instance (Optional if using Supabase Cloud)
pnpm supabase start

# 3. Start dev servers across monorepo apps
pnpm dev
```

## 3. Standard Workspace Commands

- **Start Dev Server**: `pnpm dev` (Runs `@apps/web` on http://localhost:3000 and `@apps/marketting` on http://localhost:4321)
- **Typecheck Workspace**: `pnpm turbo run check-types`
- **Lint Workspace**: `pnpm turbo run lint`
- **Run Component Tests**: `pnpm --filter @repo/ui test`
- **Production Build**: `pnpm turbo run build`
