---
name: create-package
description: Step-by-step procedure to create a new shared workspace package under packages/<package-name>.
---

# Skill: Create Shared Package (`packages/<package-name>`)

## Step 1: Create Folder Structure
Create directory `packages/<package-name>` with `src/index.ts` and `package.json`.

## Step 2: Write `package.json`
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

## Step 3: Install & Wire Monorepo
Run from root:
```bash
pnpm install
```

Import `@repo/<package-name>` inside target apps via `"@repo/<package-name>": "workspace:*"`.
