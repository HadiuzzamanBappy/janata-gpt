---
always_on: true
---

# Rule: Coding Standards & TypeScript Strictness

## 1. Strict TypeScript Safety
- Enable `"strict": true` across all packages via `@repo/typescript-config`.
- Explicitly type function parameters, return values, and exported component props.
- Avoid `any` type casts. Use `unknown` with type guards or Zod schema parsing.

## 2. Error Handling & Root-Cause Debugging
- Inspect un-truncated build logs and stack traces BEFORE forming diagnostic hypotheses.
- Fix underlying data contracts at the schema/provider level. Never mask errors with silent `try/catch` or dummy fallbacks.
