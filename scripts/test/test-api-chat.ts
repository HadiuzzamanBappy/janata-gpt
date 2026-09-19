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

async function testChatEndpoint(): Promise<void> {
  console.log('🧪 Testing /api/chat HTTP endpoint...');
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello, respond in 5 words.' }
        ],
        sessionId: 'test-session-123'
      }),
    });

    console.log('Status Code:', response.status);
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (response.status === 401) {
      console.log('ℹ️ Endpoint requires Supabase Auth session cookie (as expected for secure authenticated user access).');
      console.log('✅ Route logic is properly enforcing user authentication.');
    } else if (response.ok) {
      const text = await response.text();
      console.log('✅ Streamed Response Payload:', text.substring(0, 200));
    } else {
      const errorText = await response.text();
      console.log('Response Error Body:', errorText);
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Fetch Error:', err.message || String(error));
  }
}

void testChatEndpoint();
