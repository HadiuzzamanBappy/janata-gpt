import { generateText, LanguageModel } from 'ai';
import { getModel } from './client.js';
import { defaultModels } from './registry.js';

/**
 * Universal Vision / Multimodal Helper
 * Allows the AI to read, analyze, and extract information from images.
 */
export async function analyzeImage(
  instruction: string,
  imageUrl: URL | string | Uint8Array | Buffer,
  model: LanguageModel = getModel(defaultModels.claude) // Claude 3.5 Sonnet has state-of-the-art vision
): Promise<string> {
  
  // Format the image url correctly if it's a string
  const image = typeof imageUrl === 'string' && imageUrl.startsWith('http') 
    ? new URL(imageUrl) 
    : imageUrl;

  const messages = [
    {
      role: 'user' as const,
      content: [
        { type: 'text' as const, text: instruction },
        { type: 'image' as const, image },
      ],
    },
  ];

  const { text } = await generateText({
    model,
    messages,
  });

  return text;
}
