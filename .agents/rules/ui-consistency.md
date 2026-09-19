---
trigger:
  files:
    - "packages/ui/**/*"
    - "apps/**/*"
---

# Rule: UI Consistency & Design System Standards

## 1. Zero Ad-Hoc Styling

- **Single Source of Truth**: All colors, typography, spacing, border radii, shadows, and z-indices must originate from the design tokens configured in `packages/ui` / `@repo/tailwind-config`.
- **No Hardcoded Hex/RGB**: Avoid inline `style={{ color: '#1a2b3c' }}` or arbitrary Tailwind utilities like `bg-[#123456]` unless specifically requested for dynamic runtime colors.
- **Dark Mode**: Every component must explicitly support light and dark mode using Tailwind `dark:` variants or CSS variable themes (`bg-background text-foreground`).

---

## 2. Component Construction Standard

All shared UI components in `packages/ui` MUST adhere to this architecture:

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils"; // Uses clsx + tailwind-merge

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

---

## 3. Cross-App UI Rules (Next.js, Astro, Vite)

1. **Shared Utility `cn()`**: Always combine class names using `cn(...)` (`clsx` + `tailwind-merge`) so consuming apps can pass custom `className` props without class priority conflicts.
2. **Icons**: Use `lucide-react` across all apps. Never import raw SVGs directly if a Lucide icon exists.
3. **Accessibility (a11y)**:
   - Use Radix UI primitives (`@radix-ui/react-*`) for complex accessible components (dialogs, dropdowns, popovers, tooltips).
   - Ensure interactive elements have accessible labels (`aria-label`) and keyboard navigation support (`focus-visible`).
4. **Font Loading**: Standardize on Google Fonts (e.g. `Inter` or `Outfit`) loaded via Next.js `next/font` or global CSS in Astro/Vite.
