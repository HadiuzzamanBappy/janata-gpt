---
trigger:
  files:
    - "apps/**/api/**/*"
    - "packages/ai/**/*"
---

# Rule: API Design & Streaming Standards

## 1. Route Handlers & REST Standards
- Validate request bodies and query parameters using Zod schemas (`packages/env` or local DTOs).
- Return standard JSON responses with structured status codes (`200 OK`, `400 Bad Request`, `401 Unauthorized`, `500 Server Error`).

## 2. Vercel AI SDK & LLM Streaming
- Stream text/UI responses using `streamText` from `ai` package.
- Return `result.toDataStreamResponse()` in streaming Next.js Route Handlers.
- Handle frontend stream rendering, chunk concatenation, and error fallbacks cleanly.
