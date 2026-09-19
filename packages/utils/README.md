# `@repo/utils`

Shared utility library for class merging, date formatting, number/currency formatting, async helpers, array operations, and string manipulation across the monorepo.

## Modules Overview

| Export | Source | Description |
| :--- | :--- | :--- |
| `cn(...inputs)` | [`src/cn.ts`](file:///d:/Work/React/turbo-monorepo-template/packages/utils/src/cn.ts) | Tailwind CSS class merging (`clsx` + `tailwind-merge`). |
| `formatDate`, `formatTime`, `formatRelativeTime` | [`src/dates.ts`](file:///d:/Work/React/turbo-monorepo-template/packages/utils/src/dates.ts) | Zero-dependency date & relative time formatting using native `Intl`. |
| `capitalize`, `truncate`, `generateInitials`, `slugify` | [`src/strings.ts`](file:///d:/Work/React/turbo-monorepo-template/packages/utils/src/strings.ts) | String formatting, initials generation, and URL slugification. |
| `formatCurrency`, `formatNumber`, `formatBytes` | [`src/numbers.ts`](file:///d:/Work/React/turbo-monorepo-template/packages/utils/src/numbers.ts) | Currency formatting, compact number notation (`15.4K`), and byte sizing. |
| `delay`, `generateId` | [`src/async.ts`](file:///d:/Work/React/turbo-monorepo-template/packages/utils/src/async.ts) | Async pause promises and client-side entity ID generation. |
| `groupBy`, `chunk`, `sample` | [`src/array.ts`](file:///d:/Work/React/turbo-monorepo-template/packages/utils/src/array.ts) | Collection grouping, pagination chunking, and array sampling. |

---

## API & Usage Examples

### 1. Class Name Merging (`cn`)

```tsx
import { cn } from '@repo/utils';

<button className={cn('px-2 py-1 bg-blue-500 text-white', isActive && 'bg-blue-700', 'p-4')}>
  Click Me
</button>
```

### 2. Number & Currency Formatting

```typescript
import { formatCurrency, formatNumber, formatBytes } from '@repo/utils';

formatCurrency(29.99);      // "$29.99"
formatNumber(15400);        // "15.4K"
formatBytes(1572864);       // "1.5 MB"
```

### 3. Async & ID Helpers

```typescript
import { delay, generateId } from '@repo/utils';

await delay(500);           // Pauses execution for 500ms
const id = generateId('chat'); // "chat_m3k8a2b..."
```

### 4. Array & Grouping Operations

```typescript
import { groupBy, chunk, sample } from '@repo/utils';

const grouped = groupBy(items, (item) => item.category);
const pages = chunk(items, 10);
const randomItems = sample(items, 3);
```

---

## Testing

Run unit tests for `@repo/utils` using Vitest:

```bash
pnpm --filter @repo/utils test
```
