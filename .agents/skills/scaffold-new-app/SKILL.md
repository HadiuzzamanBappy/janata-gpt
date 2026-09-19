---
name: scaffold-new-app
description: Runbook to scaffold and integrate a new application (Next.js, Astro, or Vite React) into the Turborepo monorepo with full package wiring.
---

# Skill: Scaffold New App into Turborepo

Follow these steps to integrate a new app under `apps/<app-name>`:

## Step 1: Initialize App Folder
Create folder `apps/<app-name>` and initialize `package.json`:
```json
{
  "name": "<app-name>",
  "version": "0.1.0",
  "private": true,
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

## Step 2: Configure TypeScript & Tailwind
- Extend tsconfig: `"extends": "@repo/typescript-config/<framework>.json"`.
- Configure Tailwind content paths to scan `../../packages/ui/src/**/*.{js,ts,jsx,tsx}`.

## Step 3: Install Dependencies
Run from monorepo root:
```bash
pnpm install
```

## Step 4: Verify Turbo Integration
Run dev server and test build:
```bash
pnpm turbo run build --filter=<app-name>
```
