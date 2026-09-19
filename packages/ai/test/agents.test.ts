import { describe, it, expect } from 'vitest';
import { runAgentLoop } from '../src/index';

describe('@repo/ai Autonomous Agent Loop', () => {
  it('should run multi-step agent loop and return response', async () => {
    const result = await runAgentLoop('Explain in one short sentence what an agent is.');

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  }, 20000);
});
