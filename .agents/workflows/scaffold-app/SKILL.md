---
name: scaffold-app
description: Runbook to scaffold and onboard a new application (Next.js, Astro, or Vite React) into the Turborepo monorepo with full package wiring.
---

# Skill: Application Scaffolding Runbook

## Step 1: Initialize App Directory
Create `apps/<app-name>` and initialize `package.json`:
```json
{
  "name": "@apps/<app-name>",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "<framework-dev-cmd>",
    "build": "<framework-build-cmd>",
    "lint": "eslint .",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/env": "workspace:*",
    "@repo/types": "workspace:*"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*"
  }
}
```

## Step 2: Framework Configurations
- **Next.js**: Extend `"extends": "@repo/typescript-config/nextjs.json"`. Configure Tailwind to scan `../../packages/ui/src/**/*.{js,ts,jsx,tsx}`.
- **Astro**: Extend `"extends": "@repo/typescript-config/astro.json"`. Import `@repo/ui/styles.css` in root layout.
- **Vite React**: Extend `"extends": "@repo/typescript-config/react-library.json"`. Configure `import.meta.env.VITE_*` and history fallback.

## Step 3: Add Local `AGENTS.md`
Create `apps/<app-name>/AGENTS.md` specifying port numbers, dev commands, and framework conventions.

## Step 4: Install & Verify
```bash
pnpm install
pnpm turbo run build --filter=@apps/<app-name>
```
