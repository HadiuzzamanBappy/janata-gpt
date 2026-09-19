# `@repo/eslint-config`

Shared ESLint Flat Configurations for the monorepo.

## Configurations

| Export Path | Intended Target | Included Plugins & Rules |
| :--- | :--- | :--- |
| `@repo/eslint-config/base` | Node.js & TypeScript packages | `@typescript-eslint`, `eslint-plugin-turbo`, `only-warn`, Prettier integration |
| `@repo/eslint-config/next-js` | Next.js applications (`apps/web`) | Base config + `@next/next` rules + `react-hooks` |
| `@repo/eslint-config/react-internal` | Internal React UI libraries (`packages/ui`) | Base config + `react-hooks` |

---

## Usage

### 1. In standard TypeScript / Node packages (`packages/auth`, `packages/env`, etc.)

In your `eslint.config.js`:

```js
import baseConfig from '@repo/eslint-config/base';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  // Add package-specific rules here
];
```

### 2. In Next.js Applications (`apps/web`)

In `apps/web/eslint.config.js`:

```js
import nextJsConfig from '@repo/eslint-config/next-js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nextJsConfig,
];
```

### 3. In React Component Libraries (`packages/ui`)

In `packages/ui/eslint.config.js`:

```js
import reactInternalConfig from '@repo/eslint-config/react-internal';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...reactInternalConfig,
];
```

---

## Dependencies

Make sure to include `@repo/eslint-config` in your package's `devDependencies`:

```json
{
  "devDependencies": {
    "@repo/eslint-config": "workspace:*"
  }
}
```
