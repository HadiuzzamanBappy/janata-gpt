/**
 * Provider Limits Test (TypeScript)
 * Queries AI providers for their context window limits.
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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
      const envVars: Record<string, string> = {};
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const match = trimmed.match(/^([A-Z_]+)=(.*)$/);
        if (match && match[1] && match[2]) {
          envVars[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
        }
      }
      return envVars;
    }
  }
  return {};
}

const env = loadEnv();

interface LimitResult {
  name: string;
  status: string;
  model?: string;
  reportedLimit?: string;
  usage?: unknown;
  error?: string;
  details?: string;
}

interface OpenAICompletionResponse {
  choices?: Array<{
    message?: { content?: string };
  }>;
  usage?: unknown;
}

interface GeminiContentResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  usageMetadata?: unknown;
}

async function checkGemini(): Promise<LimitResult> {
  const key = env.GEMINI_API_KEY;
  const model = env.GEMINI_MODEL || 'gemini-3.6-flash';
  if (!key) return { name: 'Gemini', status: 'Missing Key' };

  console.log(`${C.yellow}🔍 Querying Gemini (${model})...${C.reset}`);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: "What is your maximum input context token limit? Reply with just the number." }] }]
      })
    });

    if (!response.ok) {
      const body = await response.text().catch(() => 'No error body');
      if (response.status === 429) {
        return { name: 'Gemini', status: 'Quota Limit Hit', model: model, reportedLimit: 'Rate limited (Free Tier)' };
      }
      return { name: 'Gemini', status: 'API Error', model: model, error: `${response.status} ${response.statusText}`, details: body };
    }

    const data = (await response.json()) as GeminiContentResponse;
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'No response';
    return { name: 'Gemini', status: 'Success', model: model, reportedLimit: content, usage: data.usageMetadata };
  } catch (e: unknown) {
    const err = e as Error;
    return { name: 'Gemini', status: 'Error', error: err.message || String(e) };
  }
}

async function checkZAI(): Promise<LimitResult> {
  const key = env.ZAI_API_KEY;
  const model = env.ZAI_MODEL || 'glm-4.7';
  if (!key) return { name: 'Z.AI', status: 'Missing Key' };

  console.log(`${C.yellow}🔍 Querying Z.AI (${model})...${C.reset}`);
  try {
    const response = await fetch('https://api.z.ai/api/coding/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: "What is your maximum input context window size (in tokens)? Reply with just the number." }]
      })
    });

    const data = (await response.json()) as OpenAICompletionResponse;
    if (!response.ok) {
      return { name: 'Z.AI', status: 'API Error', model, error: `${response.status} ${response.statusText}`, details: JSON.stringify(data) };
    }
    const content = data.choices?.[0]?.message?.content?.trim() || 'No response';
    return { name: 'Z.AI', status: 'Success', model: model, reportedLimit: content, usage: data.usage };
  } catch (e: unknown) {
    const err = e as Error;
    return { name: 'Z.AI', status: 'Error', error: err.message || String(e) };
  }
}

async function checkDeepSeek(): Promise<LimitResult> {
  const key = env.DEEPSEEK_API_KEY;
  const model = env.DEEPSEEK_MODEL || 'deepseek-chat';
  if (!key) return { name: 'DeepSeek', status: 'Missing Key' };

  console.log(`${C.yellow}🔍 Querying DeepSeek (${model})...${C.reset}`);
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: "What is the maximum context window size (in tokens) for deepseek-chat? Reply with just the number." }]
      })
    });

    const data = (await response.json()) as OpenAICompletionResponse;
    if (!response.ok) {
      return { name: 'DeepSeek', status: 'API Error', model, error: `${response.status} ${response.statusText}`, details: JSON.stringify(data) };
    }
    const content = data.choices?.[0]?.message?.content?.trim() || 'No response';
    return { name: 'DeepSeek', status: 'Success', model: model, reportedLimit: content, usage: data.usage };
  } catch (e: unknown) {
    const err = e as Error;
    return { name: 'DeepSeek', status: 'Error', error: err.message || String(e) };
  }
}

async function checkOpenRouter(): Promise<LimitResult> {
  const key = env.OPENROUTER_API_KEY;
  const model = env.OPENROUTER_MODEL || 'deepseek/deepseek-chat';
  if (!key) return { name: 'OpenRouter', status: 'Missing Key' };

  console.log(`${C.yellow}🔍 Querying OpenRouter (${model})...${C.reset}`);
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: "What is your maximum input context window size? Reply with just the number." }]
      })
    });

    const data = (await response.json()) as OpenAICompletionResponse;
    if (!response.ok) {
      return { name: 'OpenRouter', status: 'API Error', model, error: `${response.status} ${response.statusText}`, details: JSON.stringify(data) };
    }
    const content = data.choices?.[0]?.message?.content?.trim() || 'No response';
    return { name: 'OpenRouter', status: 'Success', model: model, reportedLimit: content, usage: data.usage };
  } catch (e: unknown) {
    const err = e as Error;
    return { name: 'OpenRouter', status: 'Error', error: err.message || String(e) };
  }
}

async function run(): Promise<void> {
  console.log(`\n${C.bright}${C.cyan}=== PROVIDER CONTEXT LIMIT VERIFICATION (TS) ===${C.reset}\n`);

  const gemini = await checkGemini();
  const zai = await checkZAI();
  const deepseek = await checkDeepSeek();
  const openrouter = await checkOpenRouter();

  let report = `\nPROVIDER CONTEXT LIMIT VERIFICATION\n`;
  report += `====================================\n\n`;

  [deepseek, openrouter, gemini, zai].forEach(res => {
    report += `[ ${res.name} ]\n`;
    if (res.status === 'Success' || res.status === 'Quota Limit Hit') {
      report += `  - Model: ${res.model}\n`;
      report += `  - Reported Capacity: ${res.reportedLimit} tokens\n`;
      if (res.usage) {
        report += `  - Usage feedback in call: ${JSON.stringify(res.usage)}\n`;
      }
    } else {
      report += `  - Status: ${res.status}\n`;
      if (res.error) report += `  - Error: ${res.error}\n`;
      if (res.details) report += `  - Details: ${res.details}\n`;
    }
    report += '\n';
  });

  console.log(report);
}

void run();
