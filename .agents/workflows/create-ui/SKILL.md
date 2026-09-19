---
name: create-ui
description: Comprehensive runbook to build accessible CVA UI primitives, page layouts, and Zod forms inside packages/ui.
---

# Skill: UI Construction Runbook (`packages/ui`)

## 1. Shared UI Component Creation
- Place component file at `packages/ui/src/components/<component-name>.tsx`.
- Use `'use client';` if interactive or using hooks/Radix primitives.
- Define variants with `cva`, wrap with `React.forwardRef`, and merge `className` with `cn()`.
- Export component in `packages/ui/src/index.ts`.

## 2. Accessible Form Construction
- Combine `react-hook-form` with `@hookform/resolvers/zod`.
- Use Radix UI primitives (`@radix-ui/react-slot`, Input, Label, Select, Checkbox).
- Render field errors with accessible `aria-invalid` and `role="alert"` hints.

## 3. Page Layout Construction
- Compose layout using `@repo/ui` primitives (Grid, Flex, Card, Button).
- Wrap interactive islands with `'use client';` in Next.js or pass `client:load` / `client:visible` directives in Astro.

## 4. Vitest Unit Testing
Add unit test in `packages/ui/test/<component-name>.test.tsx` and run:
```bash
pnpm --filter @repo/ui test
```
