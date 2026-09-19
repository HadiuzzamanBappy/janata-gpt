import { describe, it, expect } from 'vitest';
import { analyzeImage } from '../src/index';

describe('@repo/ai Vision & Multimodal Analysis', () => {
  it('should analyze an image URL and describe its contents with Gemini Flash', async () => {
    // A small 1x1 red pixel PNG image hosted publicly
    const sampleImageUrl = 'https://raw.githubusercontent.com/mathiasbynens/small/master/png-transparent.png';

    const result = await analyzeImage(
      'Describe what you see in this image in one brief sentence.',
      sampleImageUrl
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  }, 20000);
});
