import { createOpenAI, openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';
import { mistral } from '@ai-sdk/mistral';

// Create a custom OpenAI instance pointing to OpenRouter
export const openRouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '',
});

// Create a custom OpenAI instance pointing to DeepSeek
export const deepSeek = createOpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.DEEPSEEK_API_KEY || '',
});

// Create a custom OpenAI instance pointing to ZAI (xAI / Groq etc)
export const zai = createOpenAI({
  baseURL: 'https://api.zai.com/v1', // Update this to actual ZAI baseURL
  apiKey: process.env.ZAI_API_KEY || '',
});

// Unified providers object
export const providers = {
  openai,
  anthropic,
  gemini: google,
  mistral,
  deepseek: deepSeek,
  zai,
  openrouter: openRouter,
};

export { openai };
