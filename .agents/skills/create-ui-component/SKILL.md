---
name: create-ui-component
description: Step-by-step workflow to build an accessible, CVA-styled, typed UI component inside packages/ui and export it for apps/web, apps/admin, and other apps.
---

# Skill: Create UI Component in `packages/ui`

Follow this exact procedure when adding a new component to the shared design system:

## Step 1: Create Component File
Add the component implementation file at `packages/ui/src/components/<component-name>.tsx`.

Requirements:
- Use `'use client';` directive at the top if component uses hooks or Radix UI primitives.
- Use `class-variance-authority` (`cva`) for variants.
- Export both props interface (`<ComponentName>Props`) and the component.
- Wrap component with `React.forwardRef`.
- Apply `cn(...)` utility to merge custom `className` prop.

## Step 2: Export Component
Add component export to `packages/ui/src/index.ts`:
```typescript
export * from "./components/<component-name>";
```

## Step 3: Add Unit Test
Create a test file at `packages/ui/test/<component-name>.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { <ComponentName> } from "../src";

describe("<ComponentName>", () => {
  it("renders correctly", () => {
    render(<ComponentName />);
    expect(screen.getByRole("...")).toBeInTheDocument();
  });
});
```

## Step 4: Verify Component
Run tests and build check:
```bash
pnpm --filter @repo/ui test
pnpm --filter @repo/ui build
```
