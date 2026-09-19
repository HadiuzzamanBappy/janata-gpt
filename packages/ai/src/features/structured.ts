import { generateObject, streamObject, type LanguageModel } from 'ai';
import { z } from 'zod';
import { getModel } from '../core/client';
import { FEATURE_ROUTES } from '../core/registry';

/**
 * Universal Structured Data Extractor
 * Forces the AI to output exactly the JSON structure you define using DeepSeek by default.
 */
export async function extractStructuredData<T>(
  prompt: string,
  schema: z.ZodSchema<T>,
  model: LanguageModel = getModel(FEATURE_ROUTES.structured)
): Promise<T> {
  const { object } = await generateObject({
    model,
    schema,
    mode: 'json',
    system: 'You are a strict JSON data extractor. Output ONLY valid JSON matching the schema with no extra conversational text, markdown formatting, or explanations.',
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
  model: LanguageModel = getModel(FEATURE_ROUTES.structured)
) {
  const { partialObjectStream } = await streamObject({
    model,
    schema,
    mode: 'json',
    system: 'You are a strict JSON data extractor. Output ONLY valid JSON matching the schema with no extra conversational text, markdown formatting, or explanations.',
    prompt,
  });
  return partialObjectStream;
}
