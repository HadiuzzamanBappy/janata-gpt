/**
 * Local OpenRouter Test Script (TypeScript)
 * Verifies OpenRouter API connection locally.
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const C = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  red: "\x1b[31m",
} as const;

function loadEnv(): Record<string, string> {
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
          const val = v.join('=').trim().replace(/^["']|["']$/g, '');
          if (k && !process.env[k.trim()]) {
            process.env[k.trim()] = val;
          }
        }
      }
    }
  }
  return process.env as Record<string, string>;
}

const env = loadEnv();

interface OpenRouterUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  cost?: number;
}

interface OpenRouterResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  usage?: OpenRouterUsage;
}

async function testOpenRouter(): Promise<void> {
  console.log(`\n${C.bright}${C.cyan}=== TESTING OPENROUTER API (TS) ===${C.reset}\n`);

  const apiKey = env.OPENROUTER_API_KEY;
  const model = env.OPENROUTER_MODEL || 'deepseek/deepseek-chat';

  if (!apiKey) {
    console.error(`${C.red}❌ OPENROUTER_API_KEY is missing in environment variables.${C.reset}`);
    process.exit(1);
  }

  console.log(`${C.yellow}🔍 Sending prompt to OpenRouter (${model})...${C.reset}`);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'user', content: 'Hello! Respond in one sentence confirming that OpenRouter is connected successfully.' },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status} ${response.statusText}: ${errorText}`);
    }

    const data = (await response.json()) as OpenRouterResponse;
    const text = data.choices?.[0]?.message?.content?.trim() || 'No text returned';

    console.log(`\n${C.green}✅ SUCCESS Response from OpenRouter:${C.reset}`);
    console.log(`"${text}"\n`);
    if (data.usage) {
      console.log(`${C.bright}Tokens Used:${C.reset}`, JSON.stringify(data.usage));
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`\n${C.red}❌ OpenRouter Test Failed:${C.reset}`, err.message || String(error));
    process.exit(1);
  }
}

void testOpenRouter();
