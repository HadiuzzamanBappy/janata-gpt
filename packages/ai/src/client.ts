import { LanguageModel } from 'ai';
import { AIModelConfig } from './registry.js';
import { redis, generateCacheKey } from './cache.js';
import { providers } from './providers.js';

/**
 * Retrieves the specific LanguageModel from the requested provider.
 * @example
 * getModel({ provider: 'anthropic', model: 'claude-3-5-sonnet-latest' })
 */
export function getModel(config: AIModelConfig): LanguageModel {
  const providerInstance = providers[config.provider];
  
  if (!providerInstance) {
    throw new Error(`Unsupported AI provider: ${config.provider}`);
  }
  
  return providerInstance(config.model);
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
