import { generateText, type LanguageModel } from 'ai';
import { getModel } from './client';
import { defaultModels } from './registry';
import { aiTools } from './tools';

/**
 * Universal Multi-Step Agent Boilerplate
 * This loop allows the AI to use tools multiple times in a row before returning a final answer.
 */
export async function runAgentLoop(
  prompt: string,
  model: LanguageModel = getModel(defaultModels.deepseekChat)
): Promise<string> {
  const result = await generateText({
    model,
    prompt,
    tools: aiTools,
  });
  
  return result.text;
}
