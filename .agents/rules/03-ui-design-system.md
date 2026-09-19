---
trigger:
  files:
    - "packages/ui/**/*"
    - "apps/**/*"
---

# 03. UI Design System & Component Architecture

## 1. Token Hierarchy & Styling Rules
- **Token Source of Truth**: All colors, typography, spacing, border radii, and shadows must originate from `@repo/tailwind-config` / `packages/ui`.
- **No Ad-hoc Hacks**: Avoid inline `style={{ ... }}` or hardcoded hex colors (`#1a2b3c`) and arbitrary Tailwind utilities (`bg-[#123456]`).
- **Dark Mode**: Support light/dark mode via Tailwind `dark:` variants and semantic CSS variable tokens (`bg-background text-foreground`).

## 2. Component Construction Standard (`packages/ui`)
- Use `class-variance-authority` (CVA) for component variants.
- Merge class names with `cn(...)` (`clsx` + `tailwind-merge`).
- Build complex interactive elements on Radix UI primitives (`@radix-ui/react-*`).
- Wrap shared components with `React.forwardRef` and accept `className` prop.
