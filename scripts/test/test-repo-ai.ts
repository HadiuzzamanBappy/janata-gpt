/**
 * @repo/ai Package Test Script (TypeScript)
 * Verifies @repo/ai module exports and model resolution locally.
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadEnv(): void {
  const candidates = [
    join(__dirname, '..', '..', '.env.local'),
    join(__dirname, '..', '..', '.env'),
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      const content = readFileSync(p, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [k, ...v] = trimmed.split('=');
          const key = k ? k.trim() : '';
          const val = v.join('=').trim().replace(/^["']|["']$/g, '');
          if (key && !process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

async function testAll(): Promise<void> {
  const { 
    generateText, 
    getModel, 
    defaultModels, 
    runAgentLoop, 
    extractStructuredData, 
    generateVector 
  } = await import('../../packages/ai/src/index');

  console.log('--------------------------------------------------');
  console.log('1. Testing DeepSeek API via @repo/ai...');
  try {
    const model = getModel(defaultModels.deepseekChat);
    const { text } = await generateText({
      model,
      prompt: 'Hello! Respond in one sentence: DeepSeek API via @repo/ai is working!',
    });
    console.log('✅ SUCCESS DeepSeek Response:', text.trim());
  } catch (error: unknown) {
    const err = error as Error;
    console.error('❌ DeepSeek Failed:', err?.message || String(error));
  }

  console.log('--------------------------------------------------');
  console.log('2. Testing OpenRouter API via @repo/ai...');
  try {
    const model = getModel(defaultModels.openRouterDeepseek);
    const { text } = await generateText({
      model,
      prompt: 'Hello! Respond in one sentence: OpenRouter API via @repo/ai is working!',
    });
    console.log('✅ SUCCESS OpenRouter Response:', text.trim());
  } catch (error: unknown) {
    const err = error as Error;
    console.error('❌ OpenRouter Failed:', err?.message || String(error));
  }

  console.log('--------------------------------------------------');
  console.log('3. Testing runAgentLoop via @repo/ai...');
  try {
    const answer = await runAgentLoop('Explain in one sentence what AI agents are.');
    console.log('✅ SUCCESS Agent Loop Response:', answer.trim());
  } catch (error: unknown) {
    const err = error as Error;
    console.error('❌ Agent Loop Failed:', err?.message || String(error));
  }

  console.log('--------------------------------------------------');
  console.log('4. Testing Gemini Embeddings via @repo/ai...');
  try {
    const vector = await generateVector('Hello world');
    console.log(`✅ SUCCESS Embedding Vector Generated: Array of length ${vector.length}`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error('❌ Embedding Vector Failed:', err?.message || String(error));
  }
  console.log('--------------------------------------------------');
}

void testAll();
