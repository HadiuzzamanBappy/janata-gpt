import { config } from 'dotenv'
config({ path: '.env.local' })
config({ path: 'supabase/.env.local', override: true })

const ZAI_API_KEY = process.env.VITE_ZAI_API_KEY || process.env.ZAI_API_KEY || ''
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''

const SEP = '─'.repeat(80)

// ─── Z.AI ─────────────────────────────────────────────────────────────────────

async function fetchZaiModels() {
    console.log('\n🤖 Z.AI MODELS\n' + SEP)

    const res = await fetch('https://api.z.ai/api/coding/paas/v4/models', {
        headers: { Authorization: `Bearer ${ZAI_API_KEY}` },
    })

    if (!res.ok) throw new Error(`Z.AI models error ${res.status}: ${await res.text()}`)

    const data = await res.json()
    const models = Array.isArray(data.data) ? data.data : []

    // Sort by created desc → latest first, take top 10
    const latest = [...models]
        .sort((a, b) => (b.created || 0) - (a.created || 0))
        .slice(0, 10)

    latest.forEach((m, i) => {
        const date = m.created ? new Date(m.created * 1000).toISOString().slice(0, 10) : 'n/a'
        console.log(`  ${i + 1}. ${m.id.padEnd(30)} created: ${date}   owned_by: ${m.owned_by || '—'}`)
    })

    console.log(`\n  Total available: ${models.length} · Showing ${latest.length} latest\n`)
    return latest
}

// ─── GEMINI ───────────────────────────────────────────────────────────────────

async function fetchGeminiModels() {
    console.log('\n✨ GEMINI MODELS\n' + SEP)

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
    )

    if (!res.ok) throw new Error(`Gemini models error ${res.status}: ${await res.text()}`)

    const data = await res.json()
    const all = Array.isArray(data.models) ? data.models : []

    // Only models that support generateContent
    const chat = all.filter(
        (m) =>
            Array.isArray(m.supportedGenerationMethods) &&
            m.supportedGenerationMethods.includes('generateContent')
    )

    // Gemini API returns them newest-first; take top 10
    const latest = chat.slice(0, 10)

    latest.forEach((m, i) => {
        const id = (m.name || '').replace('models/', '')
        const inputK = Math.round((m.inputTokenLimit || 0) / 1000)
        const outputK = Math.round((m.outputTokenLimit || 0) / 1000)
        const tag = id.includes('flash') || id.includes('lite') ? '🆓' : '💰'
        console.log(`  ${i + 1}. ${tag} ${id.padEnd(45)} in: ${String(inputK).padStart(5)}K  out: ${String(outputK).padStart(5)}K`)
        if (m.displayName) console.log(`       ${m.displayName}`)
    })

    console.log(`\n  Total available: ${chat.length} · Showing ${latest.length} latest\n`)
    return latest
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('🚀 AI MODELS — LATEST 10 PER PROVIDER\n' + '═'.repeat(80))

    if (!ZAI_API_KEY) console.warn('⚠️  ZAI_API_KEY not set in .env — skipping Z.AI\n')
    if (!GEMINI_API_KEY) console.warn('⚠️  GEMINI_API_KEY not set in .env — skipping Gemini\n')

    const results = await Promise.allSettled([
        ZAI_API_KEY ? fetchZaiModels() : Promise.resolve([]),
        GEMINI_API_KEY ? fetchGeminiModels() : Promise.resolve([]),
    ])

    const [zaiResult, geminiResult] = results

    if (zaiResult.status === 'rejected')
        console.error('❌ Z.AI fetch failed:', zaiResult.reason?.message || zaiResult.reason)
    if (geminiResult.status === 'rejected')
        console.error('❌ Gemini fetch failed:', geminiResult.reason?.message || geminiResult.reason)

    const zaiModels = zaiResult.status === 'fulfilled' ? zaiResult.value : []
    const geminiModels = geminiResult.status === 'fulfilled' ? geminiResult.value : []

    // ── Quick copy-paste setup ──────────────────────────────────────────────────
    console.log('\n⚡ RECOMMENDED SETUP (best current models)\n' + SEP)

    const topZai = zaiModels[0]
    if (topZai) {
        console.log(`\n# Z.AI  →  ${topZai.id}`)
        console.log(`npx supabase secrets set ZAI_MODEL="${topZai.id}" --project-ref <ref>`)
        console.log(`npx supabase secrets set ZAI_API_KEY="${ZAI_API_KEY}" --project-ref <ref>`)
    }

    const geminiFlash =
        geminiModels.find((m) => {
            const id = (m.name || '').replace('models/', '')
            return (
                id.startsWith('gemini-2.5-flash') &&
                !id.includes('preview') &&
                !id.includes('tts') &&
                !id.includes('image')
            )
        }) || geminiModels[0]

    if (geminiFlash) {
        const id = (geminiFlash.name || '').replace('models/', '')
        console.log(`\n# Gemini  →  ${id}`)
        console.log(`npx supabase secrets set GEMINI_MODEL="${id}" --project-ref <ref>`)
        console.log(`npx supabase secrets set GEMINI_API_KEY="${GEMINI_API_KEY}" --project-ref <ref>`)
    }

    console.log('\n' + '═'.repeat(80))
    console.log(`✅ Done   Z.AI: ${zaiModels.length} shown   Gemini: ${geminiModels.length} shown`)
    console.log()
}

main().catch((err) => {
    console.error('Fatal:', err)
    process.exit(1)
})
