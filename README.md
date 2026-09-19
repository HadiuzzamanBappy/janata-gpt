# JanataGPT 🚀

**JanataGPT** is an enterprise-grade, multi-model AI platform built on a high-performance Turborepo monorepo architecture. It features a Next.js 16 web application, Astro 7 static marketing engine, real-time Supabase authentication & Postgres database, Vercel AI SDK streaming, and a shared CVA design system.

---

## 🌟 Key Features

- 🤖 **Multi-Model LLM Streaming**: Native integration with Google Gemini, DeepSeek, OpenRouter, and ZAI via Vercel AI SDK.
- ⚡ **Next.js 16 & React 19**: Full App Router, React Server Components (RSC), and Server Actions support.
- 🚀 **Astro 7 SSG Marketing Engine**: Sub-second static page loads with interactive React 19 islands.
- 🔒 **Supabase SSR Auth & RLS**: Cookie-based authentication and Row Level Security on Postgres.
- 🎨 **Shared Design System (`@repo/ui`)**: Accessible Radix UI primitives styled with Tailwind CSS, CVA variants, and `cn()` utility.
- 🛡️ **Type-Safe Environment (`@repo/env`)**: Centralized Zod schema validation ensuring missing env vars fail build time.
- 🧠 **AI Agent Operating System (`.agents/`)**: Built-in governance, rules, workflows, technology guides, and verification checklists.

---

## 🏗️ Monorepo Topology

```text
JanataGPT/
├── apps/
│   ├── web/                   # Next.js 16 (App Router, RSC, Supabase, AI SDK) - Name: @apps/web
│   └── marketting/            # Astro 7 (SSG / React Islands) - Name: @apps/marketting
├── packages/
│   ├── ai/                    # Vercel AI SDK wrappers & LLM providers (@repo/ai)
│   ├── auth/                  # Supabase SSR authentication helpers (@repo/auth)
│   ├── env/                   # Type-safe environment variable validation (@repo/env)
│   ├── eslint-config/         # Shared ESLint configurations (@repo/eslint-config)
│   ├── types/                 # Database interfaces & global DTOs (@repo/types)
│   ├── typescript-config/     # Standardized tsconfig presets (@repo/typescript-config)
│   ├── ui/                    # Design system components, Radix primitives (@repo/ui)
│   └── utils/                 # General helper functions & formatters (@repo/utils)
├── .agents/                   # AI Agent Operating System (Governance, Rules, Workflows)
└── docs/                      # System documentation, ERDs, and API contracts
```

---

## 🚀 Quickstart

### Prerequisites

- **Node.js**: `>= 22.12.0`
- **Package Manager**: `pnpm` (v9 or v10)
- **Supabase CLI**: Required for local database migrations

### 1. Installation

```bash
git clone <repository-url>
cd JanataGPT
pnpm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

### 3. Development Server

Start all applications and package watchers concurrently:

```bash
pnpm dev
```

- **Web App (`@apps/web`)**: [http://localhost:3000](http://localhost:3000)
- **Marketing Site (`@apps/marketting`)**: [http://localhost:4321](http://localhost:4321)

---

## 🛠️ CLI Scripts & Workflows

### Monorepo Tasks

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **`pnpm dev`** | `turbo run dev` | Runs development servers for all apps. |
| **`pnpm build`** | `turbo run build` | Production build across all apps and packages. |
| **`pnpm check-types`** | `turbo run check-types` | Typecheck TypeScript across the monorepo. |
| **`pnpm lint`** | `turbo run lint` | Run ESLint across all apps and packages. |
| **`pnpm test`** | `turbo run test` | Run Vitest unit tests in `@repo/ui`. |

### Database & Supabase Management

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **`pnpm db:start`** | `supabase start` | Start local Supabase Postgres instance. |
| **`pnpm db:studio`** | `supabase start && studio` | Open local Supabase Studio UI (Port 54323). |
| **`pnpm db:new`** | `supabase migration new` | Create a new SQL migration file. |
| **`pnpm db:push`** | `supabase db push` | Push pending migrations to remote Supabase. |
| **`pnpm db:types`** | `supabase gen types` | Generate TypeScript definitions to `@repo/types`. |

### Model Testing Scripts

```bash
pnpm test:gemini      # Test local Google Gemini LLM API connection
pnpm test:deepseek    # Test DeepSeek LLM connection
pnpm test:openrouter  # Test OpenRouter LLM connection
pnpm test:models      # List active provider models
```

---

## 📚 System Documentation & AI Agent Rules

- **Project Documentation**: Explore [`docs/`](file:///d:/Work/React/turbo-monorepo-template/docs/README.md) for Architecture Diagrams, Database ERDs, and API specs.
- **AI Agent OS**: Explore [`.agents/`](file:///d:/Work/React/turbo-monorepo-template/.agents/AGENTS.md) for Monorepo Governance, 10 Domain Rules, and 7 Workflow Runbooks.

---

## 📄 License

Private & Proprietary - All rights reserved.
