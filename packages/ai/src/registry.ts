import { providers } from './providers';

export type AIProvider = keyof typeof providers;

export interface AIModelConfig {
  provider: AIProvider;
  model: string;
}

/**
 * Pre-configured models.
 */
export const defaultModels = {
  deepseek: { provider: 'deepseek', model: 'deepseek-chat' } as AIModelConfig,
  deepseekChat: { provider: 'deepseek', model: 'deepseek-chat' } as AIModelConfig,
  deepseekReasoner: { provider: 'deepseek', model: 'deepseek-reasoner' } as AIModelConfig,
  deepseekCoder: { provider: 'deepseek', model: 'deepseek-coder' } as AIModelConfig,
  openRouterAuto: { provider: 'openrouter', model: 'auto' } as AIModelConfig,
  openRouterDeepseek: { provider: 'openrouter', model: 'deepseek/deepseek-chat' } as AIModelConfig,
  geminiFlash: { provider: 'gemini', model: 'gemini-3.6-flash' } as AIModelConfig,
  gpt4o: { provider: 'openai', model: 'gpt-4o' } as AIModelConfig,
};
