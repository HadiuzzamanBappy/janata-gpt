import { type LanguageModel } from "ai";
import { type AIModelConfig } from "./registry";
import { redis, generateCacheKey } from "./cache";
import { providers } from "./providers";

/**
 * Low-level engine helper: Retrieves a LanguageModel instance for any provider config.
 */
export function getModel(config: AIModelConfig): LanguageModel {
  const providerInstance = providers[config.provider];

  if (!providerInstance) {
    throw new Error(`Unsupported AI provider: ${config.provider}`);
  }

  // Force OpenAI-compatible providers to use standard /v1/chat/completions endpoint
  if ('chat' in providerInstance && typeof (providerInstance as { chat?: unknown }).chat === 'function') {
    return (providerInstance as { chat: (model: string) => LanguageModel }).chat(config.model);
  }

  return providerInstance(config.model) as unknown as LanguageModel;
}

/**
 * Cache check helper (Upstash Redis)
 */
export async function getCachedAIResponse(modelName: string, prompt: string): Promise<string | null> {
  if (!redis) return null;
  const key = generateCacheKey(modelName, prompt);
  return await redis.get<string>(key);
}

/**
 * Cache store helper (Upstash Redis)
 */
export async function setCachedAIResponse(modelName: string, prompt: string, response: string): Promise<void> {
  if (!redis) return;
  const key = generateCacheKey(modelName, prompt);
  await redis.set(key, response, { ex: 60 * 60 * 24 });
}
