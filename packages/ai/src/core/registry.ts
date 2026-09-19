import { providers } from './providers';

export type AIProvider = keyof typeof providers;

export interface AIModelConfig {
  provider: AIProvider;
  model: string;
}

export type ChatMode = 'fast' | 'reasoning' | 'coder' | 'creative' | 'fallback';

/**
 * Smart Cost-Optimized Feature Routes:
 * Automatically maps user intents to the cheapest, highest-performing provider.
 */
export const FEATURE_ROUTES: Record<string, AIModelConfig> = {
  chatFast: { provider: 'deepseek', model: 'deepseek-chat' },       // DeepSeek $0.14/1M
  chatReasoning: { provider: 'deepseek', model: 'deepseek-reasoner' },// DeepSeek Reasoner
  chatCoding: { provider: 'deepseek', model: 'deepseek-coder' },   // DeepSeek Coder
  chatCreative: { provider: 'zai', model: 'glm-5' },               // Z.AI GLM-5
  chatFallback: { provider: 'openrouter', model: 'auto' },          // OpenRouter Auto
  embedding: { provider: 'gemini', model: 'gemini-embedding-2' },   // Gemini Free
  vision: { provider: 'gemini', model: 'gemini-2.5-flash' },        // Gemini Flash
  structured: { provider: 'gemini', model: 'gemini-2.5-flash' },    // Gemini Flash
} as const;

/**
 * Pre-configured model presets for explicit provider calls:
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
