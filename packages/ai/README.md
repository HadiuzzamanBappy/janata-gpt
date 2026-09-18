# `@repo/ai` - Universal AI SDK

A robust, enterprise-grade AI boilerplate built on top of the **Vercel AI SDK**. This package acts as the central intelligence layer for your entire monorepo. It abstracts away specific AI providers (OpenAI, Anthropic, Mistral, Google, etc.) behind a unified, capability-based interface.

## 🚀 Features

- **Provider Agnostic**: Switch from Claude to Gemini in one line of code without touching your frontend.
- **Upstash Redis Caching**: Built-in caching to save money on duplicate queries.
- **Zod Tooling**: Type-safe function calling for autonomous AI agents.
- **Structured Data**: Force the AI to output strictly typed JSON objects.
- **Embeddings**: Ready-to-use helpers for RAG and semantic vector search.

---

## 🛠️ Configuration

Before using the package, ensure your `.env` file at the root of the monorepo contains your API keys:

```bash
# Required for Vercel AI SDK standard connections
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-..."
GEMINI_API_KEY="AIza..."

# Custom OpenAI-compatible providers
OPENROUTER_API_KEY="sk-or-..."
DEEPSEEK_API_KEY="sk-..."

# Redis Caching
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

---

## 📖 Usage Manual

### 1. Basic Chat & Text Generation
Always use the `getModel()` helper. You can pass any provider and model combination!

```typescript
import { generateText } from 'ai';
import { getModel, defaultModels } from '@repo/ai';

export async function askQuestion(prompt: string) {
  // You can use a predefined model...
  const model = getModel(defaultModels.claude); 
  
  // OR pass your own dynamically:
  // const model = getModel({ provider: 'deepseek', model: 'deepseek-coder' });

  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
}
```

### 2. Next.js API Streaming (The Chat Endpoint)
Plugging `@repo/ai` into your Next.js `/api/chat/route.ts` is exactly 1 line of code thanks to the built-in `streamChatResponse` helper. It automatically intercepts tools, handles looping, and formats the stream.

```typescript
// apps/web/app/api/chat/route.ts
import { streamChatResponse } from '@repo/ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  return streamChatResponse(
    messages,
    "You are a helpful assistant.", // System prompt
    // getModel(defaultModels.claude) // Optional: override model
  );
}
```

### 3. Caching (Save API Costs)
Before doing a heavy AI generation, check if the exact same question was asked recently.

```typescript
import { getModel, defaultModels, getCachedAIResponse, setCachedAIResponse } from '@repo/ai';
import { generateText } from 'ai';

export async function getAnswerCached(prompt: string) {
  const modelConfig = defaultModels.geminiFlash;
  const cacheKeyStr = `${modelConfig.provider}:${modelConfig.model}`;
  
  // 1. Check Redis Cache
  const cached = await getCachedAIResponse(cacheKeyStr, prompt);
  if (cached) return cached;

  // 2. Generate if not found
  const { text } = await generateText({
    model: getModel(modelConfig),
    prompt,
  });

  // 3. Save to Redis
  await setCachedAIResponse(cacheKeyStr, prompt, text);

  return text;
}
```

### 3. Structured Data Extraction (JSON)
Force the AI to output data that perfectly matches a Zod schema. Perfect for extracting data from unstructured text or receipts.

```typescript
import { extractStructuredData, defaultModels } from '@repo/ai';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
  hobbies: z.array(z.string()),
});

export async function parseUserProfile(bio: string) {
  // Returns a strictly typed object, bypassing raw text!
  const user = await extractStructuredData(
    bio,
    userSchema, 
    getModel(defaultModels.claude)
  );
  
  console.log(user.name); // Type-safe!
}
```

### 4. Autonomous Agents & Tools
Allow the AI to execute code or fetch real-world data before answering.

```typescript
import { runAgentLoop } from '@repo/ai';

export async function solveMathAndWeather() {
  // The AI will automatically use the `calculator` and `getWeather` tools 
  // behind the scenes to arrive at this answer!
  const answer = await runAgentLoop(
    "What is the weather in Tokyo, and multiply the temperature by 5?"
  );
  
  return answer;
}
```

### 5. Multimodal / Vision (Image Reading)
Pass images to models like Claude 3.5 Sonnet or GPT-4o to analyze receipts, documents, or screenshots.

```typescript
import { analyzeImage, defaultModels } from '@repo/ai';

export async function readReceipt(imageUrl: string) {
  const analysis = await analyzeImage(
    "Extract all the line items and the total price from this receipt.",
    imageUrl,
    // By default it uses Claude, but you can explicitly pass GPT-4o!
    // getModel(defaultModels.gpt4o) 
  );
  
  console.log(analysis);
}
```

### 6. Vector Embeddings (RAG)
Convert text into numbers for semantic search in databases like Supabase `pgvector`.

```typescript
import { generateTextEmbedding } from '@repo/ai';

export async function saveDocument(content: string) {
  const vector = await generateTextEmbedding(content);
  
  // Save `content` and `vector` to your database...
}
```

---

## 🏗️ Adding New Providers
If you want to add a new provider (like Groq or local LLMs via Ollama), you **only** need to edit `packages/ai/src/registry.ts` and `packages/ai/src/providers.ts`. Your frontend apps will instantly benefit from the new models without any code changes!
