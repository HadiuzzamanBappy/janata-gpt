# Rule: Deployment, Changesets & CI/CD Pipeline

## 1. Turborepo Caching & CI Matrix

- **Cache Inputs & Outputs**:
  Ensure `turbo.json` outputs accurately match build target folders:
  - Next.js (`apps/web`): `.next/**`, `!.next/cache/**`
  - Astro (`apps/admin`): `dist/**`
  - Vite SPA: `dist/**`
- **Environment Hash**:
  Declare any dynamic environment variables consumed during build in `turbo.json` under `globalEnv` or specific task `inputs` (e.g. `NEXT_PUBLIC_*`, `VITE_*`).

---

## 2. Platform Deployments

### Vercel Deployment (Next.js & Astro)
- Set **Root Directory** in Vercel to `apps/web` (or `apps/admin`).
- Set **Build Command**: `pnpm turbo run build --filter=web` (or `--filter=admin`).
- Enable Vercel Remote Caching in Turborepo setting `TURBO_TOKEN` and `TURBO_TEAM`.

### Cloudflare Pages / Netlify (Astro & Vite)
- Set **Build Command**: `pnpm build` with filter.
- Set **Output Directory**: `apps/admin/dist` or `apps/dashboard/dist`.

---

## 3. Package Versioning with Changesets

If publishing shared packages to NPM or maintaining version tags across internal apps:
1. Run `pnpm changeset` when modifying `packages/*`.
2. Select impacted packages and enter bump type (`patch`, `minor`, `major`) and release notes.
3. Commit generated `.changeset/*.md` files.
