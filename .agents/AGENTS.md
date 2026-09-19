# Monorepo AI Agent Guidelines (`AGENTS.md`)

Welcome to the **Turbo Monorepo** project. As an AI coding agent operating in this codebase, you must follow the strict operational rules, architecture patterns, and UI guidelines defined in this document and the accompanying rules in `.agents/rules/`.

---

## 1. Core Operating Principles

1. **Package Manager Lock**: Use `pnpm` exclusively. Never run `npm` or `yarn`. Use `pnpm workspace:*` syntax for internal workspace dependencies.
2. **Never Duplicate Code across Apps**:
   - UI Primitives & Design Components belong in `packages/ui`.
   - Shared Types belong in `packages/types`.
   - Shared Utilities belong in `packages/utils`.
   - Environment Variable schemas belong in `packages/env`.
   - Authentication logic belongs in `packages/auth`.
   - AI / LLM wrappers belong in `packages/ai`.
3. **Strict Verification Gate**: Before completing any task, run `pnpm dev` check or `pnpm turbo run build lint check-types` to ensure zero regressions across all apps (`apps/web`, `apps/admin`, etc.).
4. **Zero Ad-hoc Hacks**: Maintain strict UI consistency by using theme tokens from `packages/ui` / Tailwind configuration. Do not hardcode magic numbers, random colors, or inline inline style hacks.

---

## 2. Monorepo Layout Map

```text
turbo-monorepo-template/
├── .agents/                    # Agent instructions, rules & skills
│   ├── AGENTS.md              # Master workspace guide (this file)
│   ├── rules/                 # Always-on domain & framework rules
│   └── skills/                # Task-specific step-by-step runbooks
├── apps/
│   ├── web/                   # Next.js 16 (App Router, RSC, Supabase, AI SDK)
│   └── admin/                 # Astro 7 (SSG / React Islands)
├── packages/
│   ├── ai/                    # Shared AI SDK configuration & hooks
│   ├── auth/                  # Supabase authentication helpers & middleware
│   ├── env/                   # Type-safe environment variable validation (t3-env/zod)
│   ├── eslint-config/         # Shared ESLint configurations
│   ├── types/                 # Shared TypeScript interfaces & DB schemas
│   ├── typescript-config/     # Standardized tsconfig presets
│   ├── ui/                    # Design system components, Radix primitives, Tailwind
│   └── utils/                 # General helper functions & formatters
├── pnpm-workspace.yaml        # PNPM workspace definition
└── turbo.json                 # Turborepo task graph & caching configuration
```

---

## 3. Domain Rules Reference

Refer to the specific rules in `.agents/rules/` when editing files in corresponding domains:

- **Monorepo Architecture**: [.agents/rules/monorepo-architecture.md](file:///.agents/rules/monorepo-architecture.md)
- **UI Consistency & Design System**: [.agents/rules/ui-consistency.md](file:///.agents/rules/ui-consistency.md)
- **Code Quality & Minimalism**: [.agents/rules/code-quality-and-minimalism.md](file:///.agents/rules/code-quality-and-minimalism.md)
- **SSR / RSC & Hydration Guards**: [.agents/rules/edge-cases-hydration-ssr.md](file:///.agents/rules/edge-cases-hydration-ssr.md)
- **Astro Islands Gotchas**: [.agents/rules/edge-cases-astro-islands.md](file:///.agents/rules/edge-cases-astro-islands.md)
- **Vite SPA & Bundling**: [.agents/rules/edge-cases-vite-spa.md](file:///.agents/rules/edge-cases-vite-spa.md)
- **Auth & Type-safe Env**: [.agents/rules/auth-and-env-safety.md](file:///.agents/rules/auth-and-env-safety.md)
- **AI SDK & Streaming**: [.agents/rules/ai-sdk-integration.md](file:///.agents/rules/ai-sdk-integration.md)
- **Deployment & CI**: [.agents/rules/deployment-and-ci.md](file:///.agents/rules/deployment-and-ci.md)

---

## 4. Skills Reference

When executing multi-step operations, trigger the appropriate skill:

- **Create UI Component**: `view_file` [.agents/skills/create-ui-component/SKILL.md](file:///.agents/skills/create-ui-component/SKILL.md)
- **Scaffold New App**: `view_file` [.agents/skills/scaffold-new-app/SKILL.md](file:///.agents/skills/scaffold-new-app/SKILL.md)
- **Create Shared Package**: `view_file` [.agents/skills/create-package/SKILL.md](file:///.agents/skills/create-package/SKILL.md)
- **Database Migration**: `view_file` [.agents/skills/db-migration/SKILL.md](file:///.agents/skills/db-migration/SKILL.md)
- **Debug Issue**: `view_file` [.agents/skills/debug-issue/SKILL.md](file:///.agents/skills/debug-issue/SKILL.md)
- **Verify & Deploy**: `view_file` [.agents/skills/verify-and-deploy/SKILL.md](file:///.agents/skills/verify-and-deploy/SKILL.md)
