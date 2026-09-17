import { providers } from './providers.js';

export type AIProvider = keyof typeof providers;

export interface AIModelConfig {
  provider: AIProvider;
  model: string;
}

/**
 * Common pre-configured models for convenience.
 * You can still use any model by passing { provider: '...', model: '...' } directly.
 */
export const defaultModels = {
  claude: { provider: 'anthropic', model: 'claude-3-5-sonnet-latest' } as AIModelConfig,
  gpt4o: { provider: 'openai', model: 'gpt-4o' } as AIModelConfig,
  geminiFlash: { provider: 'gemini', model: 'gemini-1.5-flash' } as AIModelConfig,
  deepseekCoder: { provider: 'deepseek', model: 'deepseek-coder' } as AIModelConfig,
  mistralLarge: { provider: 'mistral', model: 'mistral-large-latest' } as AIModelConfig,
  zaiDefault: { provider: 'zai', model: 'zai-v1' } as AIModelConfig,
  openRouterAuto: { provider: 'openrouter', model: 'auto' } as AIModelConfig,
};
