---
trigger:
  files:
    - "package.json"
    - "pnpm-workspace.yaml"
    - "turbo.json"
    - "apps/**/*"
    - "packages/**/*"
---

# Rule: Monorepo Architecture, Packages & Dependencies

## 1. Package Manager & Dependencies
- Use `pnpm` exclusively. Never run `npm` or `yarn`.
- Declare workspace dependencies using `"@repo/<name>": "workspace:*"` syntax in `package.json`.
- Keep core shared dependencies (React, Lucide icons, Tailwind) locked to matching major versions across all `apps/*` and `packages/*`.

## 2. Package Directionality & Isolation
- `apps/*` may import from `packages/*`.
- `packages/*` may import from other `packages/*` (acyclic only).
- `packages/*` MUST NEVER import from `apps/*`.

## 3. Turborepo Pipelines (`turbo.json`)
- All apps/packages MUST implement standard npm scripts: `dev`, `build`, `lint`, `check-types`.
- Task `build` must declare `dependsOn: ["^build"]`.
