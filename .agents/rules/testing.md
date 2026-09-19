---
trigger:
  files:
    - "packages/ui/**/*"
    - "**/*.test.ts"
    - "**/*.test.tsx"
---

# Rule: Testing & Verification Standards

## 1. Unit & Component Testing
- Write component unit tests inside `packages/ui/test/` using Vitest and `@testing-library/react`.
- Test user interactions, ARIA role accessibility, variant rendering, and edge cases.

## 2. Mocking & Execution
- Mock external network requests and third-party SDK calls; do not make real network calls during automated test suites.
- Run tests via `pnpm --filter @repo/ui test`.
