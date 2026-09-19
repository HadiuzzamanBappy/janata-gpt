# Governance: Definition of Done (DoD)

Before declaring any feature, fix, or task complete, the AI agent MUST verify all items on this checklist:

## 1. Automated Verification Gate
- [ ] **Typecheck**: `pnpm turbo run check-types` exits with code 0 (zero TypeScript errors).
- [ ] **Linting**: `pnpm turbo run lint` exits with code 0 (zero ESLint errors/warnings).
- [ ] **Build Verification**: `pnpm turbo run build` passes with clean build output.
- [ ] **Unit Tests**: `pnpm --filter @repo/ui test` passes all Vitest test suites.

## 2. Code Quality & Standards
- [ ] **No Hardcoded Magic Values**: All styles use `@repo/tailwind-config` tokens and `cn()`.
- [ ] **No Unused Imports / Dead Code**: Cleaned up all unused variables, unused imports, and temporary debug code.
- [ ] **Type Safety**: Zero `any` casts or un-typed function parameters.
- [ ] **Hydration Safety**: SSR/RSC browser API accesses are properly guarded (`useEffect` or `ssr: false`).

## 3. Documentation & Verification
- [ ] **Public Exports**: All newly created components or functions are exported in package `index.ts`.
- [ ] **Working Execution**: Empirical test or dev check verified the code works as expected.
