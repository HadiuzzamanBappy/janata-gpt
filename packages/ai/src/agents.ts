import { generateText, LanguageModel } from 'ai';
import { getModel } from './client.js';
import { defaultModels } from './registry.js';
import { aiTools } from './tools.js';

/**
 * Universal Multi-Step Agent Boilerplate
 * This loop allows the AI to use tools multiple times in a row before returning a final answer.
 * Perfect for complex reasoning tasks or autonomous data gathering.
 */
export async function runAgentLoop(
  prompt: string,
  model: LanguageModel = getModel(defaultModels.claude)
): Promise<string> {
  const result = await generateText({
    model,
    prompt,
    tools: aiTools,
  });
  
  return result.text;
}
