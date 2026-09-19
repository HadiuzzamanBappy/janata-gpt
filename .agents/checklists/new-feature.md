# Checklist: New Feature Completion

- [ ] Technical implementation plan drafted and verified (`implementation_plan.md`).
- [ ] Database migrations executed and RLS policies verified (if applicable).
- [ ] Shared UI components added to `packages/ui` using CVA and Radix primitives.
- [ ] Environment variables validated in `packages/env`.
- [ ] Feature integrated in `@apps/web` or `@apps/marketting`.
- [ ] Zero TypeScript errors (`pnpm turbo run check-types`).
- [ ] Zero ESLint errors (`pnpm turbo run lint`).
- [ ] Component unit tests pass (`pnpm --filter @repo/ui test`).
- [ ] Clean build verification (`pnpm turbo run build`).
