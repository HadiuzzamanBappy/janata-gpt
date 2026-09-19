# Technology Guide: Vercel AI SDK Integration (`@repo/ai`)

## 1. Streaming Route Handlers
- Centralize model provider instances in `@repo/ai`.
- Return `streamText(...).toDataStreamResponse()` in streaming API route handlers (`apps/web/app/api/chat/route.ts`).

## 2. Frontend Hook Consumption
- Use `@ai-sdk/react` `useChat` and `useCompletion` hooks for streaming UI rendering.
- Render streaming responses with syntax highlighters (`react-syntax-highlighter`) and Markdown parsers (`react-markdown` with `remark-gfm`).

## 3. Safety & Sanitization
- Redact API keys, tokens, or PII from AI log traces.
- Sanitize user inputs before passing to LLM prompts to prevent prompt injection.
