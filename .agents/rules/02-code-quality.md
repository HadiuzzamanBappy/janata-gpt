---
always_on: true
---

# 02. Code Quality, Minimalism & Root-Cause Debugging

## 1. Minimalist Coding (Zero Bloat)
- **Direct Execution**: Write lean code that directly solves the requested task. Avoid over-engineering, speculative abstractions, or unused helpers.
- **No Redundant Code**: Check `packages/ui` and `packages/utils` before creating new utilities or components.
- **Dead Code Clean**: Remove unused imports, dead variables, and commented-out code before completing any task.

## 2. Root-Cause Debugging (No Symptom Patching)
- **Empirical Log Reading**: Inspect un-truncated build logs and stack traces BEFORE forming diagnostic hypotheses.
- **No Symptom Patches**: Never mask errors with silent `try/catch`, `any` type casts, dummy default fallbacks, or by deleting failing unit tests.
- **Direct Fix**: Resolve underlying contract breakages at the data provider or schema layer.
