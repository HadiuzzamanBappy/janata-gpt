import { describe, it, expect } from 'vitest';
import { extractStructuredData, getModel, defaultModels } from '../src/index';
import { z } from 'zod';

describe('@repo/ai Structured Output', () => {
  it('should extract structured JSON matching Zod schema', async () => {
    const PersonSchema = z.object({
      name: z.string(),
      age: z.number(),
    });

    const result = await extractStructuredData(
      'Extract: Alice is 30 years old',
      PersonSchema,
      getModel(defaultModels.geminiFlash)
    );

    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('age');
    expect(result.name).toContain('Alice');
    expect(result.age).toBe(30);
  }, 20000);
});
