# Rule: Vite + React SPA Edge Cases & Bundling

## 1. Environment Variable Scoping (`import.meta.env`)

- **Vite vs Node/Next**: Vite apps do NOT expose `process.env`.
- **Public Variables**: Access client environment variables strictly using `import.meta.env.VITE_*`.
- **Type Safety**: Ensure `vite-env.d.ts` is present in Vite app roots to provide TypeScript autocompletion for environment variables.

```typescript
// ❌ WRONG in Vite app
const apiUrl = process.env.API_URL;

// ✅ CORRECT in Vite app
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 2. SPA Client-Side Routing & Fallbacks

- When using `react-router-dom` or `@tanstack/react-router` in Vite apps:
  - Development server must have SPA fallback enabled (Vite does this automatically for single page apps).
  - Production hosting (Nginx, Vercel, Netlify, Cloudflare Pages) MUST rewrite all non-file route requests to `index.html`.

---

## 3. Dynamic Imports & Tree-Shaking Packages

- Shared packages (`@repo/ui`, `@repo/utils`) consumed by Vite apps must export ES modules (`"type": "module"`) with clean `"exports"` fields.
- Avoid importing entire icon sets or large libraries from root indexes if subpath or named exports are available.
