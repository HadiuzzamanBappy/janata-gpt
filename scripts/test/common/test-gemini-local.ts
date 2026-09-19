/**
 * Local Test for Gemini API (TypeScript)
 * Tests Gemini API streaming and non-streaming responses.
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

const GEMINI_API_KEY = env.GEMINI_API_KEY;
const GEMINI_MODEL = env.GEMINI_MODEL || 'gemini-3.6-flash';

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in .env file');
  process.exit(1);
}

console.log('🧪 Testing Gemini API locally (TS)...');
console.log(`API Key: ${GEMINI_API_KEY.substring(0, 20)}...`);
console.log(`Model: ${GEMINI_MODEL}`);
console.log('');

interface GeminiPart {
  text?: string;
}

interface GeminiCandidate {
  content?: {
    parts?: GeminiPart[];
  };
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
}

async function testGeminiStreaming(): Promise<string | null> {
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?key=${GEMINI_API_KEY}&alt=sse`;

    console.log('🔄 Testing Gemini with streaming...');
    console.log(`Endpoint: ${endpoint.split('?')[0]}`);
    console.log('');

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Say hello in one sentence and then explain what Google Gemini is in another sentence.' }
          ]
        }
      ],
      systemInstruction: {
        parts: [{ text: 'You are a helpful AI assistant.' }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error Body:', errorText);
      return null;
    }

    if (response.body) {
      console.log('✅ Streaming response received!');
      console.log('');
      console.log('📝 AI Response:');
      console.log('─────────────────────────────────────────');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6)) as GeminiResponse;
              const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text;
              if (textPart) {
                fullContent += textPart;
                process.stdout.write(textPart);
              }
            } catch {
              // Ignore non-JSON
            }
          }
        }
      }

      console.log('\n─────────────────────────────────────────');
      console.log('✅ Streaming complete!');
      console.log(`📊 Full response length: ${fullContent.length} characters`);

      return fullContent;
    }
    return null;
  } catch (error: unknown) {
    const err = error as Error;
    console.error('❌ Error with streaming:', err.message || String(error));
    return null;
  }
}

async function testGeminiNonStreaming(): Promise<string | null> {
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    console.log('🔄 Testing Gemini without streaming...');
    console.log(`Endpoint: ${endpoint.split('?')[0]}`);
    console.log('');

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Say hello in one sentence and then explain what Google Gemini is in another sentence.' }
          ]
        }
      ],
      systemInstruction: {
        parts: [{ text: 'You are a helpful AI assistant.' }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error Body:', errorText);
      return null;
    }

    const data = (await response.json()) as GeminiResponse;
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (content) {
      console.log('✅ Non-streaming request successful!');
      console.log('');
      console.log('📝 AI Response:');
      console.log('─────────────────────────────────────────');
      console.log(content);
      console.log('─────────────────────────────────────────');

      if (data.usageMetadata) {
        console.log('\n📊 Token Usage:');
        console.log('   Prompt Tokens:', data.usageMetadata.promptTokenCount);
        console.log('   Completion Tokens:', data.usageMetadata.candidatesTokenCount);
        console.log('   Total Tokens:', data.usageMetadata.totalTokenCount);
      }

      return content;
    }

    return null;
  } catch (error: unknown) {
    const err = error as Error;
    console.error('❌ Error with non-streaming request:', err.message || String(error));
    return null;
  }
}

async function runAllTests(): Promise<void> {
  console.log('\n=============================================');
  console.log('🧪 TEST 1: Streaming Mode');
  console.log('=============================================\n');
  const streamResult = await testGeminiStreaming();

  console.log('\n\n=============================================');
  console.log('🧪 TEST 2: Non-Streaming Mode');
  console.log('=============================================\n');
  const normalResult = await testGeminiNonStreaming();

  console.log('\n\n=============================================');
  if (streamResult && normalResult) {
    console.log('✅ ALL TESTS COMPLETED SUCCESSFULLY');
  } else {
    console.log('⚠️ Some tests may have failed or returned empty');
    console.log(`   Streaming test: ${streamResult ? '✅ Passed' : '❌ Failed'}`);
    console.log(`   Non-streaming test: ${normalResult ? '✅ Passed' : '❌ Failed'}`);
  }
  console.log('=============================================\n');
}

runAllTests().catch((error: unknown) => {
  const err = error as Error;
  console.error('\n❌ Fatal error:', err.message || String(error));
  process.exit(1);
});
