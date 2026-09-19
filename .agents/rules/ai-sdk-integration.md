# Rule: AI SDK & LLM Streaming Integration

## 1. Vercel AI SDK Standard (`packages/ai` & `apps/web`)

- **Centralized Model Providers**: Define LLM provider instances (OpenAI, Anthropic, Google Gemini) in `packages/ai`.
- **Streaming Response**: Use `streamText` or `streamUI` from `ai` package in Next.js Route Handlers (`app/api/chat/route.ts`).
- **Response Utility**: Return `result.toDataStreamResponse()` for standardized frontend stream consumption.

```typescript
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages,
  });

  return result.toDataStreamResponse();
}
```

---

## 2. Frontend Chat Hook Consumption (`@ai-sdk/react`)

- Use `useChat` or `useCompletion` in Client Components (`'use client'`).
- Always handle error states (`error`), loading states (`isLoading`), and streaming chunk renders smoothly in UI.
- Provide auto-scrolling containers and syntax highlighting for code blocks using `react-markdown` and `remark-gfm`.
