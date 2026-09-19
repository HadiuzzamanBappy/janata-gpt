# `@repo/typescript-config`

Shared TypeScript compiler configurations (`tsconfig.json`) across the monorepo.

## Available Presets

| File Path | Intended Target | Module System & Key Compiler Options |
| :--- | :--- | :--- |
| `@repo/typescript-config/base.json` | Node.js & pure TS packages (`packages/auth`, `packages/db`, `packages/ai`, `packages/env`) | `target: ES2022`, `module: NodeNext`, `moduleResolution: NodeNext`, `strict: true`, `noUncheckedIndexedAccess: true` |
| `@repo/typescript-config/nextjs.json` | Next.js App Router applications (`apps/web`) | Extends `base.json`, `moduleResolution: Bundler`, `jsx: preserve`, `noEmit: true`, Next plugin |
| `@repo/typescript-config/react-library.json` | React component packages (`packages/ui`) | Extends `base.json`, `jsx: react-jsx` |

---

## Usage

### 1. In standard TypeScript / Node packages

In your `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

### 2. In Next.js Applications

In `apps/web/tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

### 3. In React Component Libraries

In `packages/ui/tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

---

## Workspace Integration

Add `@repo/typescript-config` as a `devDependency` in your package's `package.json`:

```json
{
  "devDependencies": {
    "@repo/typescript-config": "workspace:*"
  }
}
```
