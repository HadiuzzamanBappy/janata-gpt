---
name: verify-and-deploy
description: Complete verification gate and production deployment workflow across Next.js, Astro, and Vite apps.
---

# Skill: Verification Gate & Production Deployment Runbook

## Step 1: Pre-Commit Quality Gate
Run full monorepo typecheck, linting, unit tests, and production build:
```bash
pnpm turbo run check-types lint test build
```

## Step 2: Package Versioning (If packages changed)
```bash
pnpm changeset
```

## Step 3: Multi-App Production Deployment
- **Next.js (`@apps/web`)**: Deploy to Vercel or Docker standalone output.
- **Astro (`@apps/marketting`)**: Deploy static `dist/` bundle to Cloudflare Pages or Netlify.
- **Post-Deploy Smoke Test**: Verify production URL HTTP 200 response and check live error logs.
