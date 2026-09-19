import { providers } from './providers';

export type AIProvider = keyof typeof providers;

export interface AIModelConfig {
  provider: AIProvider;
  model: string;
}

/**
 * Pre-configured model presets for the 4 active AI providers:
 * 1. DeepSeek (DEEPSEEK_API_KEY)
 * 2. OpenRouter (OPENROUTER_API_KEY)
 * 3. Gemini (GEMINI_API_KEY)
 * 4. Z.AI (ZAI_API_KEY)
 */
export const defaultModels = {
  // DeepSeek Models
  deepseek: { provider: 'deepseek', model: 'deepseek-chat' } as AIModelConfig,
  deepseekChat: { provider: 'deepseek', model: 'deepseek-chat' } as AIModelConfig,
  deepseekReasoner: { provider: 'deepseek', model: 'deepseek-reasoner' } as AIModelConfig,
  deepseekCoder: { provider: 'deepseek', model: 'deepseek-coder' } as AIModelConfig,

  // OpenRouter Models
  openRouterAuto: { provider: 'openrouter', model: 'auto' } as AIModelConfig,
  openRouterDeepseek: { provider: 'openrouter', model: 'deepseek/deepseek-chat' } as AIModelConfig,

  // Gemini Models
  geminiFlash: { provider: 'gemini', model: 'gemini-2.5-flash' } as AIModelConfig,
  geminiPro: { provider: 'gemini', model: 'gemini-2.5-pro' } as AIModelConfig,

  // Z.AI Models
  zaiGlm: { provider: 'zai', model: 'glm-5' } as AIModelConfig,
};
