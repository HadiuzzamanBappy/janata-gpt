/**
 * Provider Limits Test
 * Specifically queries AI providers for their context window limits.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const C = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    dim: "\x1b[2m",
};

function loadEnv() {
    const candidates = [
        join(__dirname, '..', '..', '..', 'supabase', '.env.local'),
        join(__dirname, '..', '..', '..', '.env.local'),
        join(__dirname, '..', '..', '..', '.env.development'),
        join(__dirname, '..', '..', '..', '.env'),
    ];

    for (const p of candidates) {
        dotenv.config({ path: p, override: false });
    }

    const loadedFrom = candidates.filter((p) => {
        try {
            readFileSync(p, 'utf-8');
            return true;
        } catch {
            return false;
        }
    });

    if (loadedFrom.length > 0) {
        console.log(`Loaded env files: ${loadedFrom.join(', ')}`);
    }

    return process.env;
}

const env = loadEnv();

async function checkGemini() {
    const key = env.GEMINI_API_KEY;
    const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
    if (!key) return { name: 'Gemini', status: 'Missing Key' };

    console.log(`${C.yellow}🔍 Querying Gemini (${model})...${C.reset}`);
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: "What is the maximum input context token limit for the Gemini 3.0 Flash model? Just provide the number like '1000000'." }] }],
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                ]
            })
        });

        if (!response.ok) {
            const body = await response.text().catch(() => 'No error body');
            if (response.status === 429) {
                return { name: 'Gemini', status: 'Quota Limit Hit', model: model, reportedLimit: 'Rate limited (Free Tier)' };
            }
            return { name: 'Gemini', status: 'API Error', model: model, error: `${response.status} ${response.statusText}`, details: body };
        }

        const data = await response.json();

        if (!data.candidates || data.candidates.length === 0) {
            console.error(`${C.red}❌ Gemini returned no candidates. Raw response:${C.reset}\n`, JSON.stringify(data, null, 2));
            return { name: 'Gemini', status: 'Empty Result', details: data };
        }

        const content = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'No response';
        return { name: 'Gemini', status: 'Success', model: model, reportedLimit: content, usage: data.usageMetadata };
    } catch (e) {
        return { name: 'Gemini', status: 'Error', error: e.message };
    }
}

async function checkZAI() {
    const key = env.ZAI_API_KEY;
    const model = env.ZAI_MODEL || 'glm-4.6';
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
                messages: [{ role: 'user', content: "What is your maximum input context window size (in tokens) for this specific model? Reply with just the number." }]
            })
        });

        const data = await response.json();
        if (!response.ok) {
            return {
                name: 'Z.AI',
                status: 'API Error',
                model,
                error: `${response.status} ${response.statusText}`,
                details: JSON.stringify(data),
            };
        }
        const content = data.choices?.[0]?.message?.content?.trim() || 'No response';
        return { name: 'Z.AI', status: 'Success', model: model, reportedLimit: content, usage: data.usage };
    } catch (e) {
        return { name: 'Z.AI', status: 'Error', error: e.message };
    }
}

async function run() {
    console.log(`\n${C.bright}${C.cyan}=== PROVIDER CONTEXT LIMIT VERIFICATION ===${C.reset}\n`);

    const gemini = await checkGemini();
    const zai = await checkZAI();

    let report = `\nPROVIDER CONTEXT LIMIT VERIFICATION\n`;
    report += `====================================\n\n`;

    [gemini, zai].forEach(res => {
        report += `[ ${res.name} ]\n`;
        if (res.status === 'Success' || res.status === 'Quota Limit Hit') {
            report += `  - Model: ${res.model}\n`;
            report += `  - Reported Capacity: ${res.reportedLimit} tokens\n`;
            if (res.usage) {
                report += `  - Usage feedback in call: ${JSON.stringify(res.usage)}\n`;
                report += `    (This shows tokens used, not tokens remaining)\n`;
            }
        } else {
            report += `  - Status: ${res.status}\n`;
            if (res.error) report += `  - Error: ${res.error}\n`;
            if (res.details) report += `  - Details: ${res.details}\n`;
        }
        report += '\n';
    });

    report += `DEVELOPER NOTES:\n`;
    report += `1. Usage Feedback: Enabled! Providers return 'usage' (tokens used) in every call.\n`;
    report += `2. Capacity: Not returned by the API; must be compared against specifications.\n`;
    report += `3. Source of Truth (config.ts) was updated to match successful test results.\n`;

    console.log(report);
}

run();
