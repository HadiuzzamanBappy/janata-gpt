---
trigger:
  files:
    - "apps/web/**/*"
    - "packages/ui/**/*"
---

# Rule: Hydration, SSR & React Server Components Edge Cases

## 1. Next.js 16 / React 19 Directives

- **`'use client'` Placement**:
  - Add `'use client';` at the top of files using React hooks (`useState`, `useEffect`, `useContext`, `useRef`, `useActionState`), event handlers (`onClick`, `onChange`), browser APIs, or Radix UI primitives.
  - Server Components (default in Next.js App Router) must NOT import client-only packages without proper wrappers.

- **Passing Server Props to Client Components**:
  - Only pass serializable data (JSON-compatible objects, strings, numbers, booleans) from Server Components to Client Components.
  - Never pass functions, class instances, or database connections across the server-client boundary.

---

## 2. Preventing Hydration Mismatches

Hydration errors happen when Server HTML differs from initial Client render HTML.

### Guard Pattern 1: `useMounted` Hook / `useEffect` Sync
When rendering browser-dependent data (e.g., `localStorage`, `window.innerWidth`, dynamic dates, dynamic IDs):

```tsx
'use client';

import { useState, useEffect } from 'react';

export function ClientOnlyWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Or a matching skeleton/loader
  }

  return <>{children}</>;
}
```

### Guard Pattern 2: `suppressHydrationWarning`
For components displaying formatted timestamps or browser timestamps that vary slightly between server and client:
```tsx
<time dateTime={date.toISOString()} suppressHydrationWarning>
  {date.toLocaleDateString()}
</time>
```

### Guard Pattern 3: Dynamic Imports (`next/dynamic`)
For heavy client-only libraries (charts, code syntax highlighters, canvas):
```tsx
import dynamic from 'next/dynamic';

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  { ssr: false, loading: () => <div className="h-48 w-full animate-pulse bg-muted rounded-md" /> }
);
```

---

## 3. Safe Global Window & Document Access

Never access `window`, `document`, or `navigator` in module top-level scope or render phase.

```typescript
// ❌ WRONG - Crashes during SSR/RSC
const isMobile = window.innerWidth < 768;

// ✅ CORRECT - Guarded function
export function getWindowWidth(): number | null {
  if (typeof window === 'undefined') return null;
  return window.innerWidth;
}
```
