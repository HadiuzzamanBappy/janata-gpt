import { providers } from './providers';

export type AIProvider = keyof typeof providers;

export interface AIModelConfig {
  provider: AIProvider;
  model: string;
}

export type ChatMode = 'fast' | 'reasoning' | 'coder' | 'creative' | 'fallback';

/**
 * Feature-Based AI Registry:
 * Maps every application feature (chat modes, embedding, structured, agent)
 * to its designated provider & model.
 */
export const FEATURE_ROUTES = {
  // 1. Chat Modes (Matches ChatMode type directly 1:1)
  fast: { provider: 'deepseek', model: 'deepseek-chat' },
  reasoning: { provider: 'deepseek', model: 'deepseek-reasoner' },
  coder: { provider: 'deepseek', model: 'deepseek-coder' },
  creative: { provider: 'zai', model: 'glm-5.3' },
  fallback: { provider: 'openrouter', model: 'auto' },

  // 2. Vector Embeddings Feature (Gemini Only - $0.00 Cost)
  embedding: { provider: 'gemini', model: 'gemini-embedding-2' },

  // 3. Structured Data Feature (Z.AI PAAS API)
  structured: { provider: 'zai', model: 'glm-5.3' },

  // 4. Autonomous Agents Feature (DeepSeek Chat)
  agent: { provider: 'deepseek', model: 'deepseek-chat' },
} satisfies Record<string, AIModelConfig>;
