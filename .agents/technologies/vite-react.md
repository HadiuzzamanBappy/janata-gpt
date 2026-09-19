# Technology Guide: Vite + React SPA

## 1. Environment Variables & Rules
- Access public client variables strictly via `import.meta.env.VITE_*`. Never use `process.env`.
- Ensure `vite-env.d.ts` is present in app root to provide TypeScript auto-completion.

## 2. SPA Bundling & Tree-Shaking
- Vite processes assets via ES modules and outputs to `dist/`.
- Ensure tree-shakable ES imports from `@repo/ui` and `@repo/utils`.

## 3. SPA Routing & Fallbacks
- Use `react-router-dom` or `@tanstack/react-router`.
- Production hosting (Nginx, Cloudflare Pages, Vercel) MUST rewrite all non-asset paths to `index.html`.

## 4. Data Fetching
- Use TanStack Query (`@tanstack/react-query`) or SWR for client-side data caching and revalidation.
- Consume Supabase auth browser client (`@repo/auth`).
