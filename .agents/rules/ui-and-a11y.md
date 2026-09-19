---
trigger:
  files:
    - "packages/ui/**/*"
    - "apps/**/*"
---

# Rule: UI Design System, Components & Accessibility (a11y)

## 1. Token Hierarchy & Styling Rules
- All colors, typography, spacing, border radii, and shadows must originate from `@repo/tailwind-config` / `packages/ui`.
- Zero arbitrary hex codes (`bg-[#123456]`) or hardcoded pixel values (`w-[327px]`).
- Support light/dark mode via Tailwind `dark:` variants and semantic CSS variable tokens (`bg-background text-foreground`).

## 2. Component Construction (`packages/ui`)
- Use `class-variance-authority` (CVA) for component variants.
- Merge class names with `cn(...)` (`clsx` + `tailwind-merge`).
- Build complex interactive controls on Radix UI headless primitives (`@radix-ui/react-*`).
- Wrap shared components with `React.forwardRef` and accept `className` prop.

## 3. Accessibility & Keyboard Navigation
- Ensure interactive elements support full keyboard navigation (`Tab`, `Space`, `Enter`, `Esc`).
- Provide explicit `aria-label` or `aria-labelledby` for icon buttons and un-labeled inputs.
