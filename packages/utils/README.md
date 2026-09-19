# `@repo/utils`

Shared utility functions for class merging, date formatting, and string manipulation across the monorepo.

## Features

- **Class Merging (`cn`)**: Combines `clsx` and `tailwind-merge` for intelligent, conflict-free Tailwind CSS class merging.
- **Date Formatting (`formatDate`, `formatTime`, `formatRelativeTime`)**: Zero-dependency date utilities powered by the native `Intl` browser API.
- **String Helpers (`capitalize`, `truncate`, `generateInitials`)**: Pure TypeScript string manipulation methods.

---

## Installation & Setup

In any application or package `package.json`:

```json
{
  "dependencies": {
    "@repo/utils": "workspace:*"
  }
}
```

---

## API & Usage Examples

### 1. Class Name Merging (`cn`)

```tsx
import { cn } from '@repo/utils';

// Solves Tailwind specificity conflicts (e.g. 'px-2' vs 'p-4')
<button className={cn('px-2 py-1 bg-blue-500 text-white', isActive && 'bg-blue-700', 'p-4')}>
  Click Me
</button>
```

### 2. Date Utilities

```typescript
import { formatDate, formatTime, formatRelativeTime } from '@repo/utils';

// Standard Date Formatting ("Jan 15, 2026")
const formattedDate = formatDate(new Date());

// Time Formatting ("2:30 PM")
const formattedTime = formatTime(new Date());

// Relative Time ("5 minutes ago", "in 2 hours", "yesterday")
const relativeStr = formatRelativeTime(new Date(Date.now() - 300000));
```

### 3. String Utilities

```typescript
import { capitalize, truncate, generateInitials } from '@repo/utils';

capitalize('hello world'); // "Hello world"
truncate('Long text summary', 10); // "Long text..."
generateInitials('Hadi Bappy'); // "HB"
```

---

## Testing

Run unit tests for `@repo/utils` using Vitest:

```bash
pnpm --filter @repo/utils test
```
