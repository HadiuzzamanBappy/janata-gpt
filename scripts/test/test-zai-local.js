/**
 * Local Test for Z.AI API
 * This tests the Z.AI API using your local .env file
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadEnv() {
    try {
        const envPath = join(__dirname, '..', '..', '..', 'supabase', '.env.local');
        const envContent = readFileSync(envPath, 'utf-8');
        const envVars = {};
        const lines = envContent.replace(/\r\n/g, '\n').split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const match = trimmed.match(/^([A-Z_]+)=(.*)$/);
            if (match) envVars[match[1]] = match[2];
        }
        return envVars;
    } catch { return {}; }
}

const env = loadEnv();

const ZAI_API_KEY = env.ZAI_API_KEY;
const ZAI_MODEL = env.ZAI_MODEL || 'glm-4.7';

if (!ZAI_API_KEY) {
    console.error('❌ ZAI_API_KEY not found in .env file');
    process.exit(1);
}

console.log('🧪 Testing Z.AI API locally...');
console.log(`API Key: ${ZAI_API_KEY.substring(0, 20)}...`);
console.log(`Model: ${ZAI_MODEL}`);
console.log('');

async function testZAI() {
    try {
        // Use the correct endpoint
        const endpoint = 'https://api.z.ai/api/coding/paas/v4/chat/completions';

        console.log(`Sending request to: ${endpoint}`);
        console.log(`Using model: ${ZAI_MODEL}`);
        console.log('');

        // Test with streaming enabled
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
                stream: true, // Enable streaming
                temperature: 0.7,
                max_tokens: 4096,
            }),
        });

        console.log(`Response Status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.log('❌ API Error Body:', errorText);

            // Try non-streaming request as fallback
            console.log('\n🔄 Trying non-streaming request as fallback...');
            return testZAINonStreaming();
        }

        if (response.body) {
            console.log('✅ Streaming response received!');
            console.log('');

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
                            const data = JSON.parse(line.slice(6));
                            if (data.choices && data.choices[0] && data.choices[0].delta && data.choices[0].delta.content) {
                                const content = data.choices[0].delta.content;
                                fullContent += content;
                                process.stdout.write(content); // Write directly to stdout for streaming effect
                            }
                        } catch (e) {
                            // Ignore parsing errors
                        }
                    }
                }
            }

            console.log('\n'); // Add a newline at the end
            console.log('✅ Streaming complete!');
            console.log(`Full response length: ${fullContent.length} characters`);

            return fullContent;
        } else {
            console.log('❌ No response body received');
            return null;
        }

    } catch (error) {
        console.error('❌ Error with streaming:', error);
        if (error.cause) console.error('Caused by:', error.cause);

        // Try non-streaming request as fallback
        console.log('\n🔄 Trying non-streaming request as fallback...');
        return testZAINonStreaming();
    }
}

async function testZAINonStreaming() {
    try {
        // Use the correct endpoint
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
                stream: false, // Disable streaming
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

        const data = await response.json();

        console.log('');
        console.log('✅ Non-streaming request successful!');
        console.log('');

        if (data.choices && data.choices[0] && data.choices[0].message) {
            const content = data.choices[0].message.content;
            console.log('AI Response:');
            console.log(content);

            if (data.usage) {
                console.log('');
                console.log('Token Usage:', data.usage);
            }

            return content;
        } else {
            console.log('Full Response:');
            console.log(JSON.stringify(data, null, 2));
            return data;
        }

    } catch (error) {
        console.error('❌ Error with non-streaming request:', error);
        if (error.cause) console.error('Caused by:', error.cause);
        process.exit(1);
    }
}

// Run the test and handle the result
// Run the tests sequentially
async function runAllTests() {
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

runAllTests().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
});
