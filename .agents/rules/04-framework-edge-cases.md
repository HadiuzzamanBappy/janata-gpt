---
trigger:
  files:
    - "apps/web/**/*"
    - "apps/admin/**/*"
    - "apps/dashboard/**/*"
    - "packages/ui/**/*"
---

# 04. Multi-Framework Edge Cases (Next.js, Astro, Vite)

## 1. Next.js 16 (SSR / RSC Edge Cases)
- **Directives**: Add `'use client';` at top of files using React hooks, Radix primitives, or DOM events.
- **Hydration Guards**: For browser-only data (`window`, `localStorage`, dynamic dates), use mounted state guards (`useEffect`) or dynamic imports (`ssr: false`).
- **Props**: Only pass JSON-serializable primitives from Server Components to Client Components.

## 2. Astro 7 (React Islands Edge Cases)
- **Directives**: Hydrate React components explicitly (`client:load`, `client:visible`, `client:only="react"`).
- **FOUC Prevention**: Import global CSS `@repo/ui/styles.css` in root Astro layouts.
- **Props**: Do not pass functions from Astro frontmatter to React island props.

## 3. Vite + React (SPA Edge Cases)
- **Environment**: Access client variables via `import.meta.env.VITE_*` (never `process.env`).
- **Routing**: Ensure development and production hosting rewrite non-asset routes to `index.html`.
