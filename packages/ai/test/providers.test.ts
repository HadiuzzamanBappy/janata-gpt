import { describe, it, expect } from 'vitest';
import { getModel, defaultModels, providers } from '../src/index';

describe('@repo/ai Providers & Models', () => {
  it('should export all 4 configured providers', () => {
    expect(providers.deepseek).toBeDefined();
    expect(providers.openrouter).toBeDefined();
    expect(providers.gemini).toBeDefined();
    expect(providers.zai).toBeDefined();
  });

  it('should resolve DeepSeek model instance correctly', () => {
    const model = getModel(defaultModels.deepseekChat);
    expect(model).toBeDefined();
    expect(typeof model).toBe('object');
  });

  it('should resolve OpenRouter model instance correctly', () => {
    const model = getModel(defaultModels.openRouterDeepseek);
    expect(model).toBeDefined();
    expect(typeof model).toBe('object');
  });

  it('should resolve Gemini model instance correctly', () => {
    const model = getModel(defaultModels.geminiFlash);
    expect(model).toBeDefined();
  });
});
