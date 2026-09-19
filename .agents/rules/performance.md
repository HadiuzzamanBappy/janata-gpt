---
trigger:
  files:
    - "apps/**/*"
    - "packages/ui/**/*"
---

# Rule: Performance & Framework Edge Cases

## 1. Next.js 16 SSR & Hydration Safety
- Hydration errors happen when Server HTML differs from Client initial render.
- Use `useEffect` mounted state guards or `next/dynamic` (`ssr: false`) for browser-only data (`window`, `localStorage`, dynamic dates).

## 2. Astro 7 Islands & Bundle Size
- Specify explicit hydration directives (`client:load`, `client:visible`, `client:only="react"`) on React components rendered in Astro templates.
- Import global CSS `@repo/ui/styles.css` in root Astro layout to prevent unstyled flashes (FOUC).
- Use dynamic imports for large client-only packages (syntax highlighters, chart libs).
