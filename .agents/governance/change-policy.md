# Governance: Change Policy & Versioning

## 1. Refactoring & Deprecation Policy
- **Non-Breaking Changes**: Adding new optional props, new components, or internal package utility updates can be committed directly.
- **Breaking Changes**: Modifying existing exported component signatures, removing type fields, or changing env schema keys requires updating ALL invocation sites across all apps and packages in the same commit.
- **Deprecation**: Mark deprecated interfaces with `@deprecated` JSDoc annotations and provide clear migration paths.

## 2. Package Versioning & Changesets
- When modifying shared packages inside `packages/*`, run `pnpm changeset` to record release notes and semver impact (`patch`, `minor`, `major`).
- Commit the generated `.changeset/*.md` files alongside code changes.

## 3. Dependency Management
- Adding new third-party dependencies MUST be executed via `pnpm --filter <target> add <dependency>`.
- Shared dependencies (React, Lucide icons, Tailwind) MUST maintain version parity across `apps/*` and `packages/*`.
