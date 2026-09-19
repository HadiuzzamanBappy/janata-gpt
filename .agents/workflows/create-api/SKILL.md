---
name: create-api
description: Runbook to build secure API route handlers and Vercel AI SDK streaming endpoints.
---

# Skill: API Endpoint & AI Stream Creation Runbook

## Step 1: Security & Request Validation
- Validate request bodies and query parameters using Zod schemas.
- Authenticate user session using `@repo/auth` (`createDailyServerClient`).

## Step 2: Route Handler Implementation (`app/api/<route>/route.ts`)
```typescript
import { env } from "@repo/env";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages,
  });
  return result.toDataStreamResponse();
}
```

## Step 3: Frontend Integration
- Consume streaming endpoints in Client Components using `@ai-sdk/react` `useChat` hook.
- Handle loading, error, and streaming chunk UI states cleanly.
