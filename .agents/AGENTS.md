# Enterprise Monorepo AI Agent Operating System (`AGENTS.md`)

Welcome to the **Turbo Monorepo** project. As an AI coding agent operating in this codebase, you MUST strictly adhere to the architecture, rules, governance, workflows, technology standards, templates, and checklists defined in `.agents/`.

---

## 1. Master System Index

```text
.agents/
├── AGENTS.md                          # Master Operating System Guide (this file)
│
├── governance/                        # SYSTEM BOUNDARIES & CHANGE POLICIES
│   ├── architecture.md                # Layer map, dependency flow, package directionality
│   ├── boundaries.md                  # Non-negotiable app vs package responsibilities
│   ├── change-policy.md               # Refactoring, deprecation, and versioning rules
│   └── definition-of-done.md          # Strict completion gate & verification standards
│
├── rules/                             # DOMAIN CONSTRAINTS & STANDARDS
│   ├── core.md                        # Zero bloat, DRY principles, minimal code
│   ├── monorepo.md                    # PNPM workspace, Turbo task graph, package directionality
│   ├── coding-standards.md            # Clean code, TypeScript strictness, empirical debugging
│   ├── security-and-auth.md           # Supabase SSR cookie auth, session refresh, RBAC & RLS
│   ├── environment.md                 # @repo/env schema validation & type safety
│   ├── database.md                    # Supabase Postgres, migration & typegen rules
│   ├── api.md                         # Next.js Route Handlers & AI SDK streaming formats
│   ├── ui-and-a11y.md                 # Design tokens, CVA styling, Radix primitives & WCAG AA
│   ├── testing.md                     # Vitest, component testing, mock guidelines
│   └── performance.md                 # SSR hydration safety, Astro islands, bundle size
│
├── workflows/                         # STEP-BY-STEP OPERATIONAL RUNBOOKS
│   ├── scaffold-app/SKILL.md          # Application onboarding runbook
│   ├── create-package/SKILL.md        # Shared workspace package creation runbook
│   ├── create-feature/SKILL.md        # Full-stack feature implementation runbook
│   ├── create-api/SKILL.md            # API endpoint & AI stream creation runbook
│   ├── create-ui/SKILL.md             # Shared UI components, pages & forms runbook
│   ├── database-migration/SKILL.md    # Supabase schema migration & type sync runbook
│   └── verify-and-deploy/SKILL.md     # Quality gate verification & release runbook
│
├── technologies/                      # FRAMEWORK & LIBRARY GUIDELINES
│   ├── nextjs.md                      # Next.js 16 (App Router, RSC, Caching, Hydration)
│   ├── vite-react.md                  # Vite SPA (import.meta.env, Routing, Tree-shaking)
│   ├── supabase.md                    # Supabase (@supabase/ssr, Auth, RLS, Migrations)
│   └── ai.md                          # Vercel AI SDK (streamText, useChat, Safety)
│
└── checklists/                        # VERIFICATION CHECKLISTS
    ├── new-app.md                     # Checklist for onboarding new apps
    ├── new-package.md                 # Checklist for onboarding new packages
    ├── new-feature.md                 # Checklist for feature completion
    ├── database-change.md             # Checklist for DB migrations
    ├── api-change.md                  # Checklist for API endpoint changes
    ├── security-review.md             # Checklist for RLS & security audit
    └── production-release.md          # Pre-release checklist
```

---

## 2. Core Non-Negotiable Directives

1. **Package Manager Lock**: Use `pnpm` exclusively. Never run `npm` or `yarn`. Use `pnpm workspace:*` for internal package dependencies.
2. **Never Duplicate Code Across Apps**: UI components belong in `packages/ui`, types in `packages/types`, environment schemas in `packages/env`, auth logic in `packages/auth`, AI SDK logic in `packages/ai`, and helpers in `packages/utils`.
3. **Empirical Verification Gate**: Run `pnpm turbo run build lint check-types` before marking any task resolved.
4. **Zero Ad-hoc Hacks**: Always use theme tokens from `@repo/tailwind-config` / `packages/ui`. Do not hardcode magic numbers, hex colors, or raw `process.env`.
