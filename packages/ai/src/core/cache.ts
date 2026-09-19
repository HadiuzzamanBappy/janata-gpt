import { Redis } from '@upstash/redis';

// Only initialize Redis if the URL and Token are provided
export const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

/**
 * Helper to generate a deterministic cache key based on model and prompt
 */
export function generateCacheKey(modelName: string, prompt: string): string {
  const base64Prompt = Buffer.from(prompt).toString('base64').slice(0, 50);
  return `ai:cache:${modelName}:${base64Prompt}`;
}
