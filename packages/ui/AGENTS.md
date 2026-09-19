# Shared UI Library (`packages/ui`)

## 1. Local Commands
- **Unit Tests**: `pnpm --filter @repo/ui test` (Vitest)
- **Typecheck**: `pnpm --filter @repo/ui check-types`
- **Build Output**: `pnpm --filter @repo/ui build`

## 2. Component Development Rules
- **Exports**: All public primitives must be re-exported in `src/index.ts`.
- **Styling**: Style exclusively using `@repo/tailwind-config` tokens and `cva`.
- **Class Merging**: Always use `cn(...)` (`clsx` + `tailwind-merge`) on component root elements.
