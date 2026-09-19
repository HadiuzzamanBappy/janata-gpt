# Checklist: New Application Onboarding

- [ ] Folder created under `apps/<app-name>`.
- [ ] `package.json` initialized with name `@apps/<app-name>`.
- [ ] Workspace packages imported: `"@repo/ui": "workspace:*"`, `"@repo/env": "workspace:*"`, `"@repo/types": "workspace:*"`.
- [ ] TypeScript config extends `@repo/typescript-config/<framework>.json`.
- [ ] Tailwind CSS scans `../../packages/ui/src/**/*.{js,ts,jsx,tsx}`.
- [ ] Local `AGENTS.md` created in `apps/<app-name>/AGENTS.md`.
- [ ] Standard scripts implemented: `dev`, `build`, `lint`, `check-types`.
- [ ] Verification command executed: `pnpm turbo run build --filter=@apps/<app-name>`.
