import { describe, it, expect } from 'vitest';
import { generateVector, generateBatchVectors } from '../src/index';

describe('@repo/ai Vector Embeddings', () => {
  it('should generate a 3072-dimension vector embedding with Gemini', async () => {
    const vector = await generateVector('Hello world');
    expect(Array.isArray(vector)).toBe(true);
    expect(vector.length).toBe(3072);
  }, 15000);

  it('should batch generate vector embeddings', async () => {
    const vectors = await generateBatchVectors(['First sentence', 'Second sentence']);
    expect(Array.isArray(vectors)).toBe(true);
    expect(vectors.length).toBe(2);
    expect(vectors[0]?.length).toBe(3072);
  }, 15000);
});
