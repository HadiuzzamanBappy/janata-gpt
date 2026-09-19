# `@repo/ai` - Feature-Based Monorepo AI SDK

A modular, enterprise-grade AI package built on top of the **Vercel AI SDK (ai@7)**. This package serves as the central intelligence engine for the monorepo, providing cost-optimized, feature-driven routing across **Gemini**, **DeepSeek**, **Z.AI**, and **OpenRouter**.

---

## 🚀 Key Features & Highlights

- 🎯 **Feature-Based Routing**: Zero hardcoded model strings in app code. Features automatically route to their cost-optimized provider via `FEATURE_ROUTES`.
- 💰 **Cost-Optimized Vector Embeddings**: Uses Google Gemini `gemini-embedding-2` for 100% free 3072-dimension RAG embeddings.
- ⚡ **Ultra-Fast & Cheap Chat**: Default chat powered by DeepSeek (`deepseek-chat` @ $0.14 / 1M tokens).
- 🧬 **Type-Safe JSON Extraction**: Extract structured data matching Zod schemas using Z.AI (`glm-5.3`).
- 🤖 **Autonomous Tool Loops**: Multi-step agent execution powered by DeepSeek + Zod schema tools (`aiTools`).
- ⚡ **Upstash Redis Caching**: Built-in caching helpers to eliminate duplicate API requests.

---

## 🛠️ Environment Configuration

Ensure your monorepo root `.env` file contains keys for the 4 active providers:

```bash
# 1. Google Gemini (Embeddings - $0.00 Cost)
GEMINI_API_KEY="AIzaSy..."

# 2. DeepSeek Direct API (Fast Chat & Reasoning)
DEEPSEEK_API_KEY="sk-f96f..."

# 3. Z.AI Coding PAAS API (Structured Data & Creative)
ZAI_API_KEY="482781699..."

# 4. OpenRouter Gateway (Fallback)
OPENROUTER_API_KEY="sk-or-v1-..."

# Optional: Upstash Redis Caching
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

---

## 📖 Feature Usage Guide

### 1. Real-Time Chat Streaming (Next.js API Routes)

Stream AI chat responses directly to your UI using `streamChatResponse`.

```typescript
// apps/web/app/api/chat/route.ts
import { streamChatResponse } from '@repo/ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  return await streamChatResponse(messages, {
    mode: 'fast', // Uses DeepSeek ($0.14/1M) automatically
    systemPrompt: 'You are a helpful assistant.',
    onFinish: async ({ text }) => {
      // Save AI response to DB silently when stream completes
    },
  });
}
```

---

### 2. Vector Embeddings (RAG / Semantic Search)

Generate 3072-dimension embeddings for single strings or batch arrays.

```typescript
import { generateVector, generateBatchVectors } from '@repo/ai';

// Single embedding ($0.00 Gemini)
const vector = await generateVector('Semantic search query');

// Batch embeddings ($0.00 Gemini)
const vectors = await generateBatchVectors(['First document', 'Second document']);
```

---

### 3. Type-Safe Structured Data Extraction (JSON)

Force the AI to parse unstructured text into a strictly typed Zod schema.

```typescript
import { extractStructuredData, z } from '@repo/ai';

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
  role: z.string(),
});

export async function parseUserBio(bioText: string) {
  const user = await extractStructuredData(
    'Extract: John Doe is a 30 year old Software Engineer',
    UserSchema
  );

  console.log(user.name); // 'John Doe' (Type-Safe!)
}
```

---

### 4. Autonomous Agent Loop with Tools

Run multi-step reasoning loops where the AI executes tools before returning a final response.

```typescript
import { runAgentLoop } from '@repo/ai';

export async function calculateAndCheckWeather() {
  const answer = await runAgentLoop(
    'What is 45 * 12 + 89 and what is the weather in San Francisco?'
  );

  return answer;
}
```

---

### 5. Upstash Redis Response Caching

Cache expensive AI prompts in Redis to save API costs.

```typescript
import { getCachedAIResponse, setCachedAIResponse } from '@repo/ai';

export async function getCachedResponse(modelName: string, prompt: string) {
  // Check cache
  const cached = await getCachedAIResponse(modelName, prompt);
  if (cached) return cached;

  // Save to cache after generating...
  await setCachedAIResponse(modelName, prompt, newResponse);
}
```

---

## 🏛️ Architecture & Registry Mapping

Feature routing is controlled centrally in `packages/ai/src/core/registry.ts`:

```typescript
export const FEATURE_ROUTES = {
  // Chat Modes (DeepSeek & Z.AI)
  fast:      { provider: 'deepseek',   model: 'deepseek-chat' },
  reasoning: { provider: 'deepseek',   model: 'deepseek-reasoner' },
  coder:     { provider: 'deepseek',   model: 'deepseek-coder' },
  creative:  { provider: 'zai',        model: 'glm-5.3' },
  fallback:  { provider: 'openrouter', model: 'auto' },

  // Vector Embeddings (Gemini $0.00 Cost)
  embedding: { provider: 'gemini',     model: 'gemini-embedding-2' },

  // Structured Data (Z.AI PAAS API)
  structured: { provider: 'zai',       model: 'glm-5.3' },

  // Autonomous Agents (DeepSeek Chat)
  agent:      { provider: 'deepseek',  model: 'deepseek-chat' },
} satisfies Record<string, AIModelConfig>;
```

---

## 🧪 Testing

Run automated Vitest test suites across all AI features:

```bash
pnpm --filter @repo/ai test
```
