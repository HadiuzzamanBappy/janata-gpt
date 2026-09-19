import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

/**
 * 1. Google Gemini Provider (GEMINI_API_KEY)
 */
export const gemini = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '',
});

/**
 * 2. OpenRouter Provider (OPENROUTER_API_KEY)
 */
export const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '',
});

/**
 * 3. DeepSeek Provider (DEEPSEEK_API_KEY)
 */
export const deepseek = createOpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.DEEPSEEK_API_KEY || '',
});

/**
 * 4. Z.AI Provider (ZAI_API_KEY)
 */
export const zai = createOpenAI({
  baseURL: 'https://api.z.ai/api/coding/paas/v4',
  apiKey: process.env.ZAI_API_KEY || '',
});

/**
 * Unified Provider Registry for the 4 configured AI keys
 */
export const providers = {
  gemini,
  openrouter,
  deepseek,
  zai,
};
