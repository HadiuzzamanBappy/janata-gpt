/**
 * Local Test for Z.AI API (TypeScript)
 * Tests Z.AI API streaming and non-streaming responses.
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadEnv(): Record<string, string> {
  const candidates = [
    join(__dirname, '..', '..', '.env.local'),
    join(__dirname, '..', '..', '.env'),
  ];
  for (const p of candidates) {
    try {
      if (existsSync(p)) {
        const envContent = readFileSync(p, 'utf-8');
        const envVars: Record<string, string> = {};
        const lines = envContent.replace(/\r\n/g, '\n').split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const match = trimmed.match(/^([A-Z_]+)=(.*)$/);
          if (match && match[1] && match[2]) {
            envVars[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
          }
        }
        return envVars;
      }
    } catch { continue; }
  }
  return {};
}

const env = loadEnv();

const ZAI_API_KEY = env.ZAI_API_KEY;
const ZAI_MODEL = env.ZAI_MODEL || 'glm-4.7';

if (!ZAI_API_KEY) {
  console.error('❌ ZAI_API_KEY not found in .env file');
  process.exit(1);
}

console.log('🧪 Testing Z.AI API locally (TS)...');
console.log(`API Key: ${ZAI_API_KEY.substring(0, 20)}...`);
console.log(`Model: ${ZAI_MODEL}`);
console.log('');

interface ZAIResponse {
  choices?: Array<{
    message?: { content?: string };
    delta?: { content?: string };
  }>;
  usage?: Record<string, unknown>;
}

async function testZAINonStreaming(): Promise<string | null> {
  try {
    const endpoint = 'https://api.z.ai/api/coding/paas/v4/chat/completions';

    console.log(`Sending non-streaming request to: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: ZAI_MODEL,
        messages: [
          {
            role: 'user',
            content: 'Say hello in one sentence and then explain what Z.AI is in another sentence.'
          }
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error Body:', errorText);
      process.exit(1);
    }

    const data = (await response.json()) as ZAIResponse;

    console.log('\n✅ Non-streaming request successful!\n');

    const content = data.choices?.[0]?.message?.content;
    if (content) {
      console.log('AI Response:');
      console.log(content);

      if (data.usage) {
        console.log('\nToken Usage:', JSON.stringify(data.usage));
      }

      return content;
    }
    return null;

  } catch (error: unknown) {
    const err = error as Error;
    console.error('❌ Error with non-streaming request:', err.message || String(error));
    process.exit(1);
  }
}

async function testZAI(): Promise<string | null> {
  try {
    const endpoint = 'https://api.z.ai/api/coding/paas/v4/chat/completions';

    console.log(`Sending request to: ${endpoint}`);
    console.log(`Using model: ${ZAI_MODEL}\n`);

    console.log('🔄 Testing with streaming enabled...');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: ZAI_MODEL,
        messages: [
          {
            role: 'user',
            content: 'Say hello in one sentence and then explain what Z.AI is in another sentence.'
          }
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error Body:', errorText);
      return testZAINonStreaming();
    }

    if (response.body) {
      console.log('✅ Streaming response received!\n');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6)) as ZAIResponse;
              const content = data.choices?.[0]?.delta?.content;
              if (content) {
                fullContent += content;
                process.stdout.write(content);
              }
            } catch {
              // Ignore invalid JSON
            }
          }
        }
      }

      console.log('\n\n✅ Streaming complete!');
      console.log(`Full response length: ${fullContent.length} characters`);

      return fullContent;
    }
    return null;

  } catch (error: unknown) {
    const err = error as Error;
    console.error('❌ Error with streaming:', err.message || String(error));
    return testZAINonStreaming();
  }
}

async function runAllTests(): Promise<void> {
  console.log('\n=============================================');
  console.log('🧪 TEST 1: Streaming Mode');
  console.log('=============================================');
  const streamResult = await testZAI();

  console.log('\n=============================================');
  console.log('🧪 TEST 2: Boolean/Normal Mode (Non-Streaming)');
  console.log('=============================================');
  const normalResult = await testZAINonStreaming();

  if (streamResult && normalResult) {
    console.log('\n=============================================');
    console.log('✅ ALL TESTS COMPLETED SUCCESSFULLY');
    console.log('=============================================');
  } else {
    console.log('\n⚠️ Some tests may have failed or returned empty');
    process.exit(1);
  }
}

runAllTests().catch((error: unknown) => {
  const err = error as Error;
  console.error('\n❌ Fatal error:', err.message || String(error));
  process.exit(1);
});
