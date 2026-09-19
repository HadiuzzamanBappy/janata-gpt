# Rule: Monorepo Architecture & Workspace Boundaries

## 1. Package Dependencies & Imports

- **Internal Dependencies**: Declare internal workspace dependencies using `"@repo/<name>": "workspace:*"` in `package.json`.
- **Subpath Exports**: When consuming shared packages like `@repo/ui` or `@repo/utils`, ensure `package.json` contains proper `exports` mappings.
- **No Circular Dependencies**:
  - `apps/*` can import from `packages/*`.
  - `packages/*` can import from other `packages/*` ONLY if the dependency graph is acyclic (e.g. `@repo/ui` -> `@repo/utils`, `@repo/auth` -> `@repo/env`).
  - `packages/*` must NEVER import from `apps/*`.

---

## 2. Shared Config Packages

- **TypeScript Configuration**:
  - Extend shared configs from `@repo/typescript-config` (`base.json`, `nextjs.json`, `astro.json`, `react-library.json`).
  - Never override essential `compilerOptions` (like `strict: true`, `moduleResolution: "bundler"`) in app-level `tsconfig.json`.

- **ESLint Configuration**:
  - Extend shared config from `@repo/eslint-config`.
  - Run linting via `pnpm turbo run lint`.

---

## 3. Scripts & Task Graph Conventions

- **Command Consistency**: Every app and package MUST define standard npm script targets:
  - `dev`: Start local development server or watcher.
  - `build`: Production build compiled output.
  - `lint`: Run ESLint check.
  - `check-types`: Typecheck without emitting code (`tsc --noEmit`).
- **Turbo Pipeline Dependency**:
  - Ensure `build` tasks list `dependsOn: ["^build"]` so package dependencies compile prior to consuming applications.
