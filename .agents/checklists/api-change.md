# Checklist: API Endpoint Change

- [ ] Route Handler implemented inside `apps/**/app/api/<route>/route.ts`.
- [ ] Session authentication verified using `@repo/auth` (`createDailyServerClient`).
- [ ] Request body and query parameters validated using Zod schemas (`packages/env` or local DTO).
- [ ] Streaming endpoints return `streamText(...).toDataStreamResponse()`.
- [ ] Error status codes returned (`400`, `401`, `403`, `500`) with structured JSON error messages.
- [ ] Frontend integration verified with `@ai-sdk/react` or `fetch`.
- [ ] Monorepo typecheck passes (`pnpm turbo run check-types`).
