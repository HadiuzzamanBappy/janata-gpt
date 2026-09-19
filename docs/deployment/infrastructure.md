# Deployment: Infrastructure & Hosting Topology

## 1. Hosting Target Matrix

```text
               ┌──────────────────────────────────────────────┐
               │              TURBO MONOREPO                  │
               └──────┬────────────────┬───────────────┬──────┘
                      │                │               │
                      ▼                ▼               ▼
              ┌───────────────┐ ┌─────────────┐ ┌─────────────┐
              │ @apps/web     │ │@apps/market │ │ Supabase    │
              │ Next.js 16    │ │ Astro 7 SSG │ │ Postgres    │
              └───────┬───────┘ └──────┬──────┘ └──────┬──────┘
                      │                │               │
                      ▼                ▼               ▼
              ┌───────────────┐ ┌─────────────┐ ┌─────────────┐
              │ Vercel App    │ │ Cloudflare  │ │ Supabase    │
              │ Server / Edge │ │ Pages / CDN │ │ Cloud / RLS │
              └───────────────┘ └─────────────┘ └─────────────┘
```

## 2. Deployment Configurations

### A. Next.js Application (`@apps/web`)
- **Hosting Platform**: Vercel (or Docker standalone container).
- **Build Command**: `pnpm turbo run build --filter=@apps/web`
- **Output Artifact**: `.next/`

### B. Astro Marketing Site (`@apps/marketting`)
- **Hosting Platform**: Cloudflare Pages / Netlify / Vercel Static.
- **Build Command**: `pnpm turbo run build --filter=@apps/marketting`
- **Output Artifact**: `apps/marketting/dist/`
