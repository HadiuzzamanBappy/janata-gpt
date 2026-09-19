/**
 * List Models Script (TypeScript)
 * Lists available models per provider.
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const DEEPSEEK_API_KEY = env.DEEPSEEK_API_KEY || '';
const OPENROUTER_API_KEY = env.OPENROUTER_API_KEY || '';
const ZAI_API_KEY = env.VITE_ZAI_API_KEY || env.ZAI_API_KEY || '';
const GEMINI_API_KEY = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';

const SEP = '─'.repeat(80);

interface SimpleModelItem {
  id: string;
  name?: string;
  created?: number;
  owned_by?: string;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  supportedGenerationMethods?: string[];
}

interface ApiListResponse {
  data?: SimpleModelItem[];
  models?: SimpleModelItem[];
}

// ─── DEEPSEEK ─────────────────────────────────────────────────────────────────

async function fetchDeepSeekModels(): Promise<SimpleModelItem[]> {
  console.log('\n🐳 DEEPSEEK MODELS\n' + SEP);

  const res = await fetch('https://api.deepseek.com/v1/models', {
    headers: { Authorization: `Bearer ${DEEPSEEK_API_KEY}` },
  });

  if (!res.ok) throw new Error(`DeepSeek models error ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as ApiListResponse;
  const models = Array.isArray(data.data) ? data.data : [];

  models.forEach((m, i) => {
    console.log(`  ${i + 1}. ${m.id.padEnd(30)} owned_by: ${m.owned_by || 'deepseek'}`);
  });

  console.log(`\n  Total available: ${models.length}\n`);
  return models;
}

// ─── OPENROUTER ───────────────────────────────────────────────────────────────

async function fetchOpenRouterModels(): Promise<SimpleModelItem[]> {
  console.log('\n🌐 OPENROUTER MODELS\n' + SEP);

  const res = await fetch('https://openrouter.ai/api/v1/models', {
    headers: { Authorization: `Bearer ${OPENROUTER_API_KEY}` },
  });

  if (!res.ok) throw new Error(`OpenRouter models error ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as ApiListResponse;
  const models = Array.isArray(data.data) ? data.data : [];
  const top = models.slice(0, 10);

  top.forEach((m, i) => {
    const id = m.id.padEnd(40);
    const name = m.name || m.id;
    console.log(`  ${i + 1}. ${id} ${name}`);
  });

  console.log(`\n  Total available: ${models.length} · Showing 10 sample models\n`);
  return top;
}

// ─── Z.AI ─────────────────────────────────────────────────────────────────────

async function fetchZaiModels(): Promise<SimpleModelItem[]> {
  console.log('\n🤖 Z.AI MODELS\n' + SEP);

  const res = await fetch('https://api.z.ai/api/coding/paas/v4/models', {
    headers: { Authorization: `Bearer ${ZAI_API_KEY}` },
  });

  if (!res.ok) throw new Error(`Z.AI models error ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as ApiListResponse;
  const models = Array.isArray(data.data) ? data.data : [];

  const latest = [...models]
    .sort((a, b) => (b.created || 0) - (a.created || 0))
    .slice(0, 10);

  latest.forEach((m, i) => {
    const date = m.created ? new Date(m.created * 1000).toISOString().slice(0, 10) : 'n/a';
    console.log(`  ${i + 1}. ${m.id.padEnd(30)} created: ${date}   owned_by: ${m.owned_by || '—'}`);
  });

  console.log(`\n  Total available: ${models.length} · Showing ${latest.length} latest\n`);
  return latest;
}

// ─── GEMINI ───────────────────────────────────────────────────────────────────

async function fetchGeminiModels(): Promise<SimpleModelItem[]> {
  console.log('\n✨ GEMINI MODELS\n' + SEP);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
  );

  if (!res.ok) throw new Error(`Gemini models error ${res.status}: ${await res.text()}`);

  const data = (await res.json()) as ApiListResponse;
  const all = Array.isArray(data.models) ? data.models : [];

  const chat = all.filter(
    (m) =>
      Array.isArray(m.supportedGenerationMethods) &&
      m.supportedGenerationMethods.includes('generateContent')
  );

  const latest = chat.slice(0, 10);

  latest.forEach((m, i) => {
    const id = (m.name || '').replace('models/', '');
    const inputK = Math.round((m.inputTokenLimit || 0) / 1000);
    const outputK = Math.round((m.outputTokenLimit || 0) / 1000);
    console.log(`  ${i + 1}. 🆓 ${id.padEnd(45)} in: ${String(inputK).padStart(5)}K  out: ${String(outputK).padStart(5)}K`);
  });

  console.log(`\n  Total available: ${chat.length} · Showing ${latest.length} latest\n`);
  return latest;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('🚀 AI MODELS LIST PER PROVIDER (TS)\n' + '═'.repeat(80));

  const results = await Promise.allSettled([
    DEEPSEEK_API_KEY ? fetchDeepSeekModels() : Promise.resolve([]),
    OPENROUTER_API_KEY ? fetchOpenRouterModels() : Promise.resolve([]),
    ZAI_API_KEY ? fetchZaiModels() : Promise.resolve([]),
    GEMINI_API_KEY ? fetchGeminiModels() : Promise.resolve([]),
  ]);

  results.forEach((r, idx) => {
    const names = ['DeepSeek', 'OpenRouter', 'Z.AI', 'Gemini'];
    if (r.status === 'rejected') {
      const err = r.reason as Error;
      console.error(`❌ ${names[idx]} fetch failed:`, err?.message || String(r.reason));
    }
  });

  console.log('\n' + '═'.repeat(80));
  console.log(`✅ Model listing completed successfully.`);
}

main().catch((err: unknown) => {
  const error = err as Error;
  console.error('Fatal:', error?.message || String(err));
  process.exit(1);
});
