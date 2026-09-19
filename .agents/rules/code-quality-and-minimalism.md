# Rule: Code Quality, Minimalism & UI Philosophy

## 1. Minimalist Coding Standards (Zero Bloat)

- **Solve the Exact Problem**: Write lean, focused code that directly addresses the task. Avoid over-engineering, speculative abstractions, or adding unused helper methods "just in case".
- **No Redundant Code**: Before writing a custom utility or UI primitive, check if it already exists in `packages/ui` or `packages/utils`. Never duplicate logic across files.
- **Remove Dead Code**: Clean up unused imports, commented-out code blocks, and orphaned variables before finalizing any change.

---

## 2. Minimal & Compact UI Philosophy

- **Raw Component Primitives**: Stick to low-level, headless, unstyled primitives (Radix UI) styled with direct Tailwind utility classes and `CVA`. Avoid adding heavy multi-layer UI wrapper bloat.
- **Clutter-Free Interfaces**: Keep UI compact, modern, and readable. Use subtle borders, well-calibrated spacing, and curated theme tokens (`bg-muted`, `text-muted-foreground`, `border-border`) rather than noisy decorations.
- **Performance-First Rendering**: Do not nest unnecessary `<div>` containers. Use React fragments (`<>...</>`) or standard HTML semantics (`<main>`, `<nav>`, `<article>`, `<header>`).

---

## 3. Strict Folder & Package Architecture

### Package Structure (`packages/<name>/`)
```text
packages/ui/
├── src/
│   ├── components/      # Pure React components (Button.tsx, Card.tsx)
│   ├── primitives/      # Lower-level Radix primitive wrappers
│   ├── lib/             # Internal package utilities (cn.ts)
│   └── index.ts         # Clean public export boundary
├── test/                # Component unit tests
├── package.json
└── tsconfig.json
```

### Component File Conventions
1. **Single Responsibility**: One primary component per file.
2. **Colocated Helpers**: If a sub-component or helper is used ONLY by `<Card />`, keep it inside `Card.tsx` or a subfolder `card/card-header.tsx`.
3. **Explicit Exports**: Export only necessary components and types in `index.ts`. Keep package internals hidden.
