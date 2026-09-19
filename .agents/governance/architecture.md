# Governance: Monorepo Architecture & Layer Map

## 1. Directory Topology

```text
turbo-monorepo-template/
├── apps/
│   ├── web/                   # Next.js 16 (App Router, RSC, Supabase, AI SDK) - Name: @apps/web
│   └── marketting/            # Astro 7 (SSG / React Islands) - Name: @apps/marketting
├── packages/
│   ├── ai/                    # Shared AI SDK configuration & hooks (@repo/ai)
│   ├── auth/                  # Supabase authentication helpers & middleware (@repo/auth)
│   ├── env/                   # Type-safe environment variable validation (@repo/env)
│   ├── eslint-config/         # Shared ESLint configurations (@repo/eslint-config)
│   ├── types/                 # Shared TypeScript interfaces & DB schemas (@repo/types)
│   ├── typescript-config/     # Standardized tsconfig presets (@repo/typescript-config)
│   ├── ui/                    # Design system components, Radix primitives, Tailwind (@repo/ui)
│   └── utils/                 # General helper functions & formatters (@repo/utils)
├── pnpm-workspace.yaml        # PNPM workspace definition
└── turbo.json                 # Turborepo task graph & caching configuration
```

## 2. Dependency Flow Rules
- **Applications (`apps/*`)**: Can depend on any `@repo/*` workspace package.
- **Packages (`packages/*`)**: Can depend on other `@repo/*` packages ONLY IF the dependency graph is strictly acyclic (e.g. `@repo/ui` -> `@repo/utils`, `@repo/auth` -> `@repo/env`).
- **Strict Isolation**: `packages/*` MUST NEVER import from `apps/*`.
- **Workspace Reference**: Always use `"@repo/<name>": "workspace:*"` syntax in `package.json`.
