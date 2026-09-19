# `web` — Next.js 16 AI SaaS Application

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss)
![Turbo](https://img.shields.io/badge/Turborepo-2.10-EF4444?style=for-the-badge&logo=turborepo)
![Supabase](https://img.shields.io/badge/Supabase-SSR-3ECF8E?style=for-the-badge&logo=supabase)

The primary web frontend for the monorepo, providing an AI SaaS platform built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Vercel AI SDK**.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16.3 (App Router, Server Actions, Route Handlers) |
| **UI & Styling** | React 19, Base UI, Shadcn, Tailwind CSS v4, Lucide Icons |
| **AI Integration** | Vercel AI SDK (`ai`, `@ai-sdk/react`), DeepSeek, Z.AI, Gemini |
| **Authentication** | Supabase SSR (`@supabase/ssr`), `@repo/auth` |
| **State & Utilities** | `@repo/utils`, `@repo/types`, `@repo/env` |
| **Monorepo Build System** | Turborepo 2.10, pnpm |

---

## 🌟 Core UI Features & Routes

```
apps/web/app/
├── (auth)/             ── Authentication pages (Login, Register)
│   ├── login/
│   └── register/
└── (main)/             ── Main SaaS Dashboard & Application Shell
    ├── chat/[id]/      ── Multi-mode AI Chat interface & streaming
    ├── images/         ── Generative AI Image Studio
    ├── library/        ── Prompt templates & saved snippets repository
    ├── plugins/        ── Integrations & tools hub (Search, Scraper, DB)
    ├── pricing/        ── LemonSqueezy subscription & pricing plans
    ├── projects/       ── Isolated workspace project management
    └── scheduled/      ── Background cron automations & task logs
```

### Feature Overview

1. **🤖 Multi-Mode AI Chat (`/chat/[id]`)**:
   - **Mode Selector**: Fast, Reasoning (DeepSeek R1/Reasoning), Coder, Creative (Z.AI GLM 5.3), and Fallback.
   - **Real-Time Streaming**: Code syntax highlighting, Markdown tables, copy buttons, and auto-scroll.
   - **Global Search Modal**: Fast search across all chat threads and projects.

2. **🎨 AI Image Studio (`/images`)**:
   - Prompt-based AI image generation with aspect ratio controls and preset gallery grid.

3. **📚 Prompt Library (`/library`)**:
   - Curated prompt templates, system instructions, and category search.

4. **🧩 Plugins Ecosystem (`/plugins`)**:
   - Tool integrations for Web Search, Firecrawl scraping, Supabase, Redis, and Resend.

5. **📁 Workspace Projects (`/projects`)**:
   - Scoped project environments with custom system prompts and isolated message histories.

6. **⏰ Scheduled Automations (`/scheduled`)**:
   - Cron-based background AI workflows, status toggles, and execution logs.

7. **💳 Pricing & Billing (`/pricing`)**:
   - Tiered plans (Free, Pro, Enterprise) integrated with LemonSqueezy checkout.

---

## 🏗️ Monorepo Package Integration

This app relies on internal workspace packages:

| Package | Purpose in `web` |
| :--- | :--- |
| [`@repo/ai`](file:///d:/Work/React/turbo-monorepo-template/packages/ai) | Provider registry, model routing, structured extraction & agent execution |
| [`@repo/auth`](file:///d:/Work/React/turbo-monorepo-template/packages/auth) | SSR authentication context, server client, and session management |
| [`@repo/ui`](file:///d:/Work/React/turbo-monorepo-template/packages/ui) | Shared component library (Sidebar, Modals, Buttons, Tooltips, Toasts) |
| [`@repo/utils`](file:///d:/Work/React/turbo-monorepo-template/packages/utils) | Class merging (`cn`), date/time, number/currency formatting, async helpers |
| [`@repo/env`](file:///d:/Work/React/turbo-monorepo-template/packages/env) | Validated environment variables schema |
| [`@repo/types`](file:///d:/Work/React/turbo-monorepo-template/packages/types) | Centralized TypeScript interfaces |

---

## ⚙️ Environment Variables

Ensure `.env` in the workspace root includes:

```env
# Client-Exposed (Public)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Server-Only (Secret)
DATABASE_URL=postgresql://...
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DEEPSEEK_API_KEY=your-deepseek-key
ZAI_API_KEY=your-zai-key
GEMINI_API_KEY=your-gemini-key
```

---

## 🚀 Development & Scripts

### Run Development Server

```bash
# From monorepo root (runs web on http://localhost:3000)
pnpm dev

# Or run specifically for web
pnpm --filter web dev
```

### Available Package Scripts

```bash
# Build production bundle
pnpm --filter web build

# Start production server
pnpm --filter web start

# Lint codebase
pnpm --filter web lint

# Type-check TypeScript code
pnpm --filter web check-types
```
