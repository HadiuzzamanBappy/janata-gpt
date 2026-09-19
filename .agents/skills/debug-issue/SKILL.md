---
name: debug-issue
description: Systematic root-cause debugging workflow for runtime crashes, build failures, or test regressions.
---

# Skill: Structured Debugging & Root Cause Analysis

Follow this process whenever investigating a bug or build failure:

## Step 1: Read Complete Log Output
- Do NOT guess the failure cause.
- Read full terminal / build stack traces before modifying any code.

## Step 2: Reproduce & Isolate
- Run the failing command in isolation (e.g. `pnpm --filter web check-types` or `pnpm --filter ui test`).
- Identify if the failure is caused by:
  - TypeScript type mismatch.
  - Runtime browser/Node environment discrepancy (`window is undefined`, missing env var).
  - Outdated build cache (`.turbo` or `.next` cache staleness).

## Step 3: Implement Direct Fix
- Fix the root cause directly at the provider level.
- **NEVER** patch symptoms by adding empty try-catches, wrapping calls in `any` types, or deleting failing unit tests.

## Step 4: Verify Fix Across Monorepo
Run verification gate:
```bash
pnpm turbo run check-types lint test
```
