import { generateText, type LanguageModel } from 'ai';
import { getModel } from '../core/client';
import { defaultModels } from '../core/registry';

/**
 * Universal Vision / Multimodal Helper
 */
export async function analyzeImage(
  instruction: string,
  imageUrl: URL | string | Uint8Array | Buffer,
  model: LanguageModel = getModel(defaultModels.deepseekChat)
): Promise<string> {
  
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
