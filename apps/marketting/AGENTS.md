# Astro Marketting App (`apps/marketting`)

## 1. Local Commands
- **Dev Server**: `pnpm --filter @apps/marketting dev` (Runs Astro dev server)
- **Production Build**: `pnpm --filter @apps/marketting build`
- **Preview Output**: `pnpm --filter @apps/marketting preview`

## 2. Architecture & Framework Guidelines
- **Framework**: Astro 7 (SSG / Static Site Generator with React 19 Islands).
- **UI Components**: Imports shared React primitives from `@repo/ui`.
- **Hydration Directives**: Always specify `client:load`, `client:visible`, or `client:only="react"` on `@repo/ui` React components rendered inside `.astro` templates.
- **Global Styles**: Import `@repo/ui/styles.css` in root layout (`src/layouts/Layout.astro`) to prevent unstyled island flashes (FOUC).

## 3. Useful Astro Documentation
- [Astro Routing Guide](https://docs.astro.build/en/guides/routing/)
- [Astro Framework Components (React)](https://docs.astro.build/en/guides/framework-components/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
