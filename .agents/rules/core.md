---
always_on: true
---

# Rule: Core System Principles & Minimalism

## 1. Minimalist & Purposeful Code
- Write lean, focused code that directly solves the requested task. Avoid over-engineering, unnecessary wrapper layers, or speculative helpers.
- DRY (Don't Repeat Yourself): Check `@repo/ui` and `@repo/utils` before writing new utility functions or components.
- Prune unused imports, dead variables, and temporary debug statements before completing a task.

## 2. Strict Rule Execution
- Obey explicit constraints in `.agents/governance/` and `.agents/rules/`.
- Never use inline style hacks, un-typed `any` fallbacks, or bypass linter rules without explicit justification.
