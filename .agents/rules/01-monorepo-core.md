---
trigger:
  files:
    - "package.json"
    - "pnpm-workspace.yaml"
    - "turbo.json"
    - "apps/**/*"
    - "packages/**/*"
---

# 01. Monorepo Core Architecture & Boundaries

## 1. Package Dependencies & Imports
- **Package Manager**: Use `pnpm` exclusively. Never run `npm` or `yarn`.
- **Internal Dependencies**: Use `"@repo/<name>": "workspace:*"` syntax in `package.json`.
- **Strict Directionality**:
  - `apps/*` may import from `packages/*`.
  - `packages/*` may import from other `packages/*` (acyclic only).
  - `packages/*` MUST NEVER import from `apps/*`.

## 2. Standardized Configuration
- **TypeScript**: Extend `@repo/typescript-config` (`base.json`, `nextjs.json`, `astro.json`, `react-library.json`).
- **ESLint**: Extend `@repo/eslint-config`.

## 3. Turbo Pipeline & Task Graph
- All apps/packages MUST implement standard npm scripts: `dev`, `build`, `lint`, `check-types`.
- Task `build` must declare `dependsOn: ["^build"]`.
