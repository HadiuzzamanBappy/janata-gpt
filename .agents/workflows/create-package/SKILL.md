---
name: create-package
description: Runbook to create a new shared workspace package under packages/<package-name>.
---

# Skill: Shared Workspace Package Creation

## Step 1: Initialize Package Folder
Create `packages/<package-name>` with `src/index.ts` and `package.json`:
```json
{
  "name": "@repo/<package-name>",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "lint": "eslint .",
    "check-types": "tsc --noEmit"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "typescript": "^5.7.0"
  }
}
```

## Step 2: Add Package `AGENTS.md`
Create `packages/<package-name>/AGENTS.md` documenting package responsibilities and test commands.

## Step 3: Install & Wire Monorepo
Run `pnpm install` from root and add `"@repo/<package-name>": "workspace:*"` to consuming applications.
