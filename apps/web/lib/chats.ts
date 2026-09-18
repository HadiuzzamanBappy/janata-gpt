export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string; // ISO string for serialization
};

export type Chat = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
};

// ─── Demo data ────────────────────────────────────────────────

export const demoChats: Chat[] = [
  // ── Today ──
  {
    id: "chat-001",
    title: "Debug Next.js Hydration Error",
    createdAt: "2026-09-18T07:12:00Z",
    updatedAt: "2026-09-18T07:28:00Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content:
          "I'm getting a hydration error in Next.js 15: 'Text content does not match server-rendered HTML'. How do I fix it?",
        timestamp: "2026-09-18T07:12:00Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Hydration errors happen when the HTML rendered on the server doesn't match what React tries to render on the client. Common causes:\n\n1. **Random values at render time** — `Math.random()`, `Date.now()`, `crypto.randomUUID()` called during render will differ between server and client.\n2. **Browser-only APIs** — Accessing `window`, `localStorage`, or `navigator` during render crashes SSR.\n3. **Conditionals based on `typeof window`** — If server skips a branch that client renders, they diverge.\n\nThe quickest fix is to wrap the problematic component in a `useEffect` + mounted state:\n\n```tsx\nconst [mounted, setMounted] = useState(false);\nuseEffect(() => setMounted(true), []);\nif (!mounted) return null;\n```\n\nOr use `suppressHydrationWarning` on the element if the mismatch is intentional (e.g. timestamps).",
        timestamp: "2026-09-18T07:13:00Z",
      },
      {
        id: "m3",
        role: "user",
        content:
          "It's happening because I'm using `new Date().toLocaleString()` in a component. What's the cleanest fix?",
        timestamp: "2026-09-18T07:18:00Z",
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "For date formatting, the cleanest approach is to format on the client only:\n\n```tsx\nfunction FormattedDate({ date }: { date: Date }) {\n  const [formatted, setFormatted] = useState('');\n  \n  useEffect(() => {\n    setFormatted(date.toLocaleString());\n  }, [date]);\n  \n  return <time dateTime={date.toISOString()}>{formatted || '...'}</time>;\n}\n```\n\nAlternatively, pass a pre-formatted string from the server, or use a library like `date-fns` with a consistent locale so server and client always agree.",
        timestamp: "2026-09-18T07:20:00Z",
      },
    ],
  },
  {
    id: "chat-002",
    title: "Regex for email validation",
    createdAt: "2026-09-18T09:44:00Z",
    updatedAt: "2026-09-18T09:52:00Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Write me a regex to validate email addresses",
        timestamp: "2026-09-18T09:44:00Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Here's a robust email regex that covers the vast majority of real-world addresses:\n\n```js\nconst emailRegex = /^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$/;\n```\n\n**What it matches:**\n- Local part: letters, numbers, `._%+-`\n- `@` symbol\n- Domain: letters, numbers, `.` and `-`\n- TLD: 2+ letters\n\n**Usage:**\n```js\nfunction isValidEmail(email: string): boolean {\n  return emailRegex.test(email.trim().toLowerCase());\n}\n```\n\n> Note: Full RFC 5321 compliance is extremely complex. For production, pair this with a verification email step rather than relying on regex alone.",
        timestamp: "2026-09-18T09:45:00Z",
      },
    ],
  },

  // ── Yesterday ──
  {
    id: "chat-003",
    title: "Turborepo monorepo setup",
    createdAt: "2026-09-17T10:30:00Z",
    updatedAt: "2026-09-17T11:15:00Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "How do I share UI components between apps in a Turborepo monorepo?",
        timestamp: "2026-09-17T10:30:00Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "The standard pattern is to create a `packages/ui` workspace that your apps import from:\n\n**1. Create the package:**\n```\npackages/\n  ui/\n    src/\n      components/\n        Button.tsx\n      index.ts       ← barrel export\n    package.json\n    tsconfig.json\n```\n\n**2. `packages/ui/package.json`:**\n```json\n{\n  \"name\": \"@repo/ui\",\n  \"exports\": {\n    \".\": \"./src/index.ts\"\n  }\n}\n```\n\n**3. Add as dependency in your app:**\n```json\n{\n  \"dependencies\": {\n    \"@repo/ui\": \"*\"\n  }\n}\n```\n\n**4. Import in your app:**\n```tsx\nimport { Button } from '@repo/ui';\n```\n\nTurborepo's `paths` in `tsconfig.json` handles the TypeScript resolution automatically.",
        timestamp: "2026-09-17T10:32:00Z",
      },
      {
        id: "m3",
        role: "user",
        content: "What about sharing Tailwind config?",
        timestamp: "2026-09-17T11:00:00Z",
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "Create a `packages/tailwind-config` package:\n\n```js\n// packages/tailwind-config/tailwind.config.ts\nexport default {\n  theme: {\n    extend: {\n      colors: { brand: '#6366f1' }\n    }\n  }\n};\n```\n\nThen extend it in each app:\n```js\n// apps/web/tailwind.config.ts\nimport sharedConfig from '@repo/tailwind-config';\nexport default { ...sharedConfig, content: ['./src/**/*.{ts,tsx}'] };\n```",
        timestamp: "2026-09-17T11:02:00Z",
      },
    ],
  },
  {
    id: "chat-004",
    title: "Tailwind CSS grid layout tips",
    createdAt: "2026-09-17T15:20:00Z",
    updatedAt: "2026-09-17T15:45:00Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "What's the best way to make a responsive card grid with Tailwind?",
        timestamp: "2026-09-17T15:20:00Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Use `grid` with `auto-fill` and `minmax` for a truly responsive grid that doesn't need breakpoint classes:\n\n```html\n<div class=\"grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4\">\n  <div class=\"rounded-xl border p-4\">Card</div>\n  <!-- ... -->\n</div>\n```\n\nThis automatically fits as many columns as possible at ≥280px wide. Alternatively with breakpoints:\n\n```html\n<div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4\">\n```\n\nFor a masonry-style layout, try `columns-2 md:columns-3 gap-4` with `break-inside-avoid` on each card.",
        timestamp: "2026-09-17T15:22:00Z",
      },
    ],
  },

  // ── Previous 7 Days ──
  {
    id: "chat-005",
    title: "Server Components vs Client Components",
    createdAt: "2026-09-15T08:00:00Z",
    updatedAt: "2026-09-15T08:35:00Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "When should I use Server Components vs Client Components in Next.js?",
        timestamp: "2026-09-15T08:00:00Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "**Use Server Components (default) when:**\n- Fetching data directly (no `useEffect` needed)\n- Accessing backend resources (DB, filesystem, secrets)\n- Rendering large dependencies you don't want in the JS bundle\n- No interactivity needed\n\n**Use Client Components (`'use client'`) when:**\n- You need React hooks (`useState`, `useEffect`, `useContext`)\n- Browser APIs (`window`, `localStorage`, event listeners)\n- Interactive UI (forms, buttons with handlers, animations)\n- Third-party libraries that depend on browser APIs\n\n**The golden rule:** Push `'use client'` as far down the tree as possible. Keep data-fetching parents as Server Components and only mark the interactive leaf nodes as Client Components.",
        timestamp: "2026-09-15T08:02:00Z",
      },
    ],
  },
  {
    id: "chat-006",
    title: "Refactoring React context to Zustand",
    createdAt: "2026-09-14T14:00:00Z",
    updatedAt: "2026-09-14T14:50:00Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content:
          "My React context is causing too many re-renders. Should I move to Zustand?",
        timestamp: "2026-09-14T14:00:00Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Yes, Zustand is an excellent choice. Context re-renders every consumer whenever any value changes — Zustand uses fine-grained subscriptions so components only re-render when the slice they subscribe to changes.\n\n**Quick migration:**\n\n```ts\n// Before (Context)\nconst ThemeContext = createContext({ theme: 'dark', setTheme: () => {} });\n\n// After (Zustand)\nimport { create } from 'zustand';\n\nconst useThemeStore = create<{ theme: string; setTheme: (t: string) => void }>((set) => ({\n  theme: 'dark',\n  setTheme: (theme) => set({ theme }),\n}));\n\n// In component — only re-renders when `theme` changes\nconst theme = useThemeStore((s) => s.theme);\n```\n\nZustand also has great devtools support and works outside React components.",
        timestamp: "2026-09-14T14:03:00Z",
      },
    ],
  },
  {
    id: "chat-007",
    title: "Python CSV parser script",
    createdAt: "2026-09-13T11:30:00Z",
    updatedAt: "2026-09-13T11:45:00Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content:
          "Write me a Python script to parse a CSV file and output a summary of each column",
        timestamp: "2026-09-13T11:30:00Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "```python\nimport csv\nfrom collections import defaultdict\nfrom statistics import mean, median\n\ndef summarize_csv(filepath: str):\n    rows = []\n    with open(filepath, newline='', encoding='utf-8') as f:\n        reader = csv.DictReader(f)\n        for row in reader:\n            rows.append(row)\n\n    if not rows:\n        print('No data found.')\n        return\n\n    headers = rows[0].keys()\n    print(f'Rows: {len(rows)}\\n')\n\n    for col in headers:\n        values = [row[col] for row in rows]\n        print(f'── {col} ──')\n        print(f'  Non-empty: {sum(1 for v in values if v.strip())}')\n\n        # Try numeric summary\n        try:\n            nums = [float(v) for v in values if v.strip()]\n            if nums:\n                print(f'  Min: {min(nums):.2f}')\n                print(f'  Max: {max(nums):.2f}')\n                print(f'  Mean: {mean(nums):.2f}')\n                print(f'  Median: {median(nums):.2f}')\n        except ValueError:\n            unique = set(values)\n            print(f'  Unique values: {len(unique)}')\n            if len(unique) <= 10:\n                print(f'  Values: {\", \".join(sorted(unique))}')\n        print()\n\nif __name__ == '__main__':\n    import sys\n    summarize_csv(sys.argv[1])\n```\n\nRun it with: `python summarize.py data.csv`",
        timestamp: "2026-09-13T11:32:00Z",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────

export function getChatById(id: string): Chat | undefined {
  return demoChats.find((c) => c.id === id);
}

/** Group chats by relative date bucket */
export function groupChatsByDate(chats: Chat[]): {
  today: Chat[];
  yesterday: Chat[];
  previous7Days: Chat[];
  older: Chat[];
} {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday.getTime() - 86_400_000);
  const startOf7DaysAgo = new Date(startOfToday.getTime() - 7 * 86_400_000);

  const today: Chat[] = [];
  const yesterday: Chat[] = [];
  const previous7Days: Chat[] = [];
  const older: Chat[] = [];

  for (const chat of chats) {
    const d = new Date(chat.updatedAt);
    if (d >= startOfToday) today.push(chat);
    else if (d >= startOfYesterday) yesterday.push(chat);
    else if (d >= startOf7DaysAgo) previous7Days.push(chat);
    else older.push(chat);
  }

  return { today, yesterday, previous7Days, older };
}
