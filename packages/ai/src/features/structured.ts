import { generateObject, streamObject, type LanguageModel } from 'ai';
import { z } from 'zod';
import { getModel } from '../core/client';
import { defaultModels } from '../core/registry';

/**
 * Universal Structured Data Extractor
 * Forces the AI to output exactly the JSON structure you define using DeepSeek by default.
 */
export async function extractStructuredData<T>(
  prompt: string,
  schema: z.ZodSchema<T>,
  model: LanguageModel = getModel(defaultModels.geminiFlash)
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
  model: LanguageModel = getModel(defaultModels.geminiFlash)
) {
  const { partialObjectStream } = await streamObject({
    model,
    schema,
    prompt,
  });
  return partialObjectStream;
}
