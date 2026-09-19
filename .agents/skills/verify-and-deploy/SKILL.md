---
name: verify-and-deploy
description: Complete verification gate and production deployment workflow across Next.js, Astro, and Vite apps.
---

# Skill: Verification & Deployment Runbook

Perform these steps before pushing code or triggering production deployments:

## Phase 1: Pre-Commit Verification Gate
Run full monorepo build, linting, and typecheck:
```bash
pnpm turbo run check-types lint test build
```

If any task fails:
1. Inspect the exact error log in terminal.
2. Fix root cause without bypassing lint or ignoring type errors.
3. Re-run verification until all tasks exit with status code 0.

---

## Phase 2: Changeset Versioning (If applicable)
If shared `@repo/*` packages were updated:
```bash
pnpm changeset
```

---

## Phase 3: Multi-App Production Deployment

### 1. Next.js App (`apps/web`) -> Vercel / Docker
- **Vercel**: Trigger deployment via Git push or CLI: `npx vercel --prod`.
- **Docker**: Build standalone image:
  ```bash
  docker build -f apps/web/Dockerfile -t repo-web:latest .
  ```

### 2. Astro App (`apps/admin`) -> Static / Cloudflare Pages / Netlify
- Build static bundle: `pnpm --filter admin build`.
- Deploy output directory `apps/admin/dist/`.

### 3. Vite React SPA -> S3 / Cloudflare / Netlify
- Build SPA bundle: `pnpm --filter <vite-app> build`.
- Deploy output directory `apps/<vite-app>/dist/`.
