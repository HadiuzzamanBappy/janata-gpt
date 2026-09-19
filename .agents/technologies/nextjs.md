# Technology Guide: Next.js 16 App Router & React 19

## 1. App Router Conventions
- All routes reside inside `apps/web/app/` (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).
- Route Handlers reside in `app/api/<route>/route.ts`. Extend tsconfig from `@repo/typescript-config/nextjs.json`.

## 2. Server Components (RSC) vs Client Directives
- Server Components are default in App Router. Access database & API endpoints directly in RSC using `@repo/auth` server client (`createDailyServerClient`).
- Add `'use client';` strictly at top of files requiring state, hooks (`useState`, `useEffect`), Radix primitives, or DOM events.
- Pass JSON-serializable props across RSC/Client boundaries.

## 3. Rendering & Hydration Safety
- Keep initial server render identical to initial client render to avoid hydration errors.
- Wrap browser APIs (`window`, `localStorage`, dynamic timestamps) inside `useEffect` state guards or dynamic imports (`next/dynamic` with `ssr: false`).

## 4. Caching & Revalidation
- Use `revalidatePath('/path')` or `revalidateTag('tag')` in Server Actions to purge stale cache.
- Set `export const dynamic = 'force-dynamic'` for live un-cached route handlers.
