# Shared AI SDK Wrapper (`packages/ai`)

## 1. Purpose & Responsibilities
- Centralized Vercel AI SDK model providers (`@ai-sdk/google`, `@ai-sdk/openai`) and streaming configuration.

## 2. Rules & Directives
- **Model Providers**: Export configured model instances (e.g. Google Gemini 2.5 Flash).
- **Streaming Response**: Return `streamText(...).toDataStreamResponse()` in streaming API route handlers.
