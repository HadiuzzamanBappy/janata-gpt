import { type LanguageModel, streamText, convertToModelMessages, type UIMessage } from "ai";
import { type AIModelConfig, defaultModels } from "./registry";
import { redis, generateCacheKey } from "./cache";
import { providers } from "./providers";
import { aiTools } from "../tools";

/**
 * Retrieves the specific LanguageModel from the requested provider.
 * Uses .chat() for OpenAI-compatible providers to enforce standard /v1/chat/completions endpoints.
 */
export function getModel(config: AIModelConfig): LanguageModel {
  const providerInstance = providers[config.provider];

  if (!providerInstance) {
    throw new Error(`Unsupported AI provider: ${config.provider}`);
  }

  // For OpenAI-compatible endpoints (DeepSeek, OpenRouter, ZAI, etc.), .chat() uses /chat/completions
  if ('chat' in providerInstance && typeof (providerInstance as { chat?: unknown }).chat === 'function') {
    return (providerInstance as { chat: (model: string) => LanguageModel }).chat(config.model);
  }

  return providerInstance(config.model) as unknown as LanguageModel;
}

/**
 * A simple helper to check Redis before running an expensive AI call.
 */
export async function getCachedAIResponse(modelName: string, prompt: string): Promise<string | null> {
  if (!redis) return null;
  const key = generateCacheKey(modelName, prompt);
  return await redis.get<string>(key);
}

/**
 * A simple helper to cache the response of an AI call.
 */
export async function setCachedAIResponse(modelName: string, prompt: string, response: string): Promise<void> {
  if (!redis) return;
  const key = generateCacheKey(modelName, prompt);
  // Cache for 24 hours
  await redis.set(key, response, { ex: 60 * 60 * 24 });
}

/**
 * Universal Chat Streamer.
 * Converts UI messages to Model messages and streams responses to the frontend.
 * Defaults to DeepSeek model (`deepseek-chat`).
 */
export async function streamChatResponse(
  messages: UIMessage[],
  systemPrompt?: string,
  model: LanguageModel = getModel(defaultModels.deepseekChat),
  onFinish?: Parameters<typeof streamText>[0]["onFinish"]
): Promise<Response> {
  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model,
    messages: modelMessages,
    system: systemPrompt,
    tools: aiTools,
    onFinish,
  });

  return result.toUIMessageStreamResponse();
}
