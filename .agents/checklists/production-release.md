# Checklist: Production Release Verification

- [ ] All feature tests and build gates pass (`pnpm turbo run check-types lint test build`).
- [ ] Changeset logged for shared package updates (`pnpm changeset`).
- [ ] Production environment variables configured in deployment target (Vercel / Cloudflare).
- [ ] Database migrations applied to production Supabase project.
- [ ] Next.js standalone build verified (`@apps/web`).
- [ ] Astro SSG static output verified (`@apps/marketting`).
- [ ] Error boundary fallbacks tested in staging environment.
