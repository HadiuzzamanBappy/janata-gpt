import { generateObject, streamObject, LanguageModel } from 'ai';
import { z } from 'zod';
import { getModel } from './client.js';

/**
 * Universal Structured Data Extractor
 * Forces the AI to output exactly the JSON structure you define.
 */
export async function extractStructuredData<T>(
  prompt: string,
  schema: z.ZodSchema<T>,
  model: LanguageModel = getModel({ provider: 'anthropic', model: 'claude-3-5-sonnet-latest' })
): Promise<T> {
  const { object } = await generateObject({
    model,
    schema,
    prompt,
  });
  return object as T;
}

/**
 * Universal Structured Data Streamer
 * Useful for building UIs where partial JSON is rendered as it streams in.
 */
export async function streamStructuredData<T>(
  prompt: string,
  schema: z.ZodSchema<T>,
  model: LanguageModel = getModel({ provider: 'gemini', model: 'gemini-1.5-flash' })
) {
  const { partialObjectStream } = await streamObject({
    model,
    schema,
    prompt,
  });
  return partialObjectStream;
}
