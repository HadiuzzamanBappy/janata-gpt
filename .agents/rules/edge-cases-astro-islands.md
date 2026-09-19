---
trigger:
  files:
    - "apps/admin/**/*"
    - "apps/**/*.astro"
---

# Rule: Astro 7 Islands & React Integration Edge Cases

## 1. Astro Hydration Directives

In Astro apps (`apps/admin`), React components imported from `@repo/ui` are inert HTML by default unless hydrated with a `client:*` directive:

- **`client:load`**: Use for high-priority interactive components above the fold (navbars, search inputs).
- **`client:visible`**: Use for components lower down the page (footers, lazy charts, accordions).
- **`client:idle`**: Use for low-priority background widgets (analytics, chatbots).
- **`client:only="react"`**: Mandatory for components that rely on browser globals (`window`, `localStorage`, `canvas`) during initialization and cannot render on the server.

```astro
---
import { Button } from '@repo/ui';
import { InteractiveChart } from '@repo/ui';
---

<!-- Static render (No JS sent to browser) -->
<Button variant="outline">Static Link</Button>

<!-- Hydrated interactive island -->
<InteractiveChart client:visible data={chartData} />
```

---

## 2. Flash of Unstyled Content (FOUC) Prevention

- Astro components render isolated styles. To ensure React components from `@repo/ui` render correctly in Astro:
  1. Import shared stylesheet `@repo/ui/styles.css` in the root Astro layout (`src/layouts/Layout.astro`).
  2. Ensure Astro's Tailwind integration scans package paths inside `astro.config.mjs` / `tailwind.config.mjs`:
     ```js
     content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}']
     ```

---

## 3. Prop Serialization in Astro Islands

- Astro serializes props passed to React islands into HTML attributes (`props="..."`).
- **Allowed Props**: JSON-serializable primitives, arrays, plain objects.
- **Disallowed Props**: Functions (e.g. `onClick={(e) => ...}` defined in Astro frontmatter), class instances, React nodes (`children` as Astro slots must use slot syntax).

```astro
---
import { Modal } from '@repo/ui';
---

<!-- ✅ CORRECT: Pass simple props -->
<Modal client:load title="Settings" isOpen={true} />

<!-- ❌ WRONG: Cannot pass Astro functions into React component props -->
<Modal client:load onClose={() => console.log('closed')} />
```
