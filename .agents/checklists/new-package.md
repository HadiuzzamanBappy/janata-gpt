# Checklist: New Shared Package Onboarding

- [ ] Folder created under `packages/<package-name>`.
- [ ] `package.json` initialized with name `@repo/<package-name>`.
- [ ] Subpath exports defined in `exports` field (e.g. `".": "./src/index.ts"`).
- [ ] Standard scripts implemented: `lint`, `check-types`.
- [ ] Local `AGENTS.md` created in `packages/<package-name>/AGENTS.md`.
- [ ] Dependency installed via `pnpm install`.
- [ ] Added to target app `package.json` via `"@repo/<package-name>": "workspace:*"`.
- [ ] Verification command executed: `pnpm turbo run check-types lint`.
