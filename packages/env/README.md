# `@repo/env`

Type-safe environment variable validation for the monorepo, powered by [`@t3-oss/env-core`](https://github.com/t3-oss/t3-env) and [`zod`](https://zod.dev).

## Features

- **Strict Type Safety**: Full autocomplete and runtime type checking for all environment variables across applications.
- **Client/Server Security Boundary**: Enforces explicit distinction between server-only secrets (e.g. `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) and browser-exposed public variables (`NEXT_PUBLIC_*`).
- **Unified Monorepo Schema**: Standardized configuration for Database, Supabase, AI providers, Payment gateways, Rate limiting, and App URLs.
- **Build Bypass**: Supports `SKIP_ENV_VALIDATION=1` for Docker builds or CI pipelines where runtime secrets are injected later.

---

## Quick Start

### 1. Installation

In any package or application `package.json`:

```json
{
  "dependencies": {
    "@repo/env": "workspace:*"
  }
}
```

### 2. Usage in Code

Import `env` directly anywhere in server code or client components:

```typescript
import { env } from '@repo/env';

// Server-side (Type-safe & validated)
const dbUrl = env.DATABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

// Client-side (Public variables)
const appUrl = env.NEXT_PUBLIC_APP_URL;
const supabasePublicUrl = env.NEXT_PUBLIC_SUPABASE_URL;
```

> [!WARNING]
> Accessing a server-only environment variable (like `DATABASE_URL`) from browser code will trigger a runtime error, preventing secret leaks.

---

## Schema Overview

### Server Variables (Secret)

| Variable | Schema | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `z.string().url()` | PostgreSQL database connection string |
| `NODE_ENV` | `'development' \| 'test' \| 'production'` | Runtime environment (Default: `development`) |
| `SUPABASE_SERVICE_ROLE_KEY` | `z.string().min(1)` | Supabase admin secret key |
| `OPENAI_API_KEY` | `z.string().optional()` | OpenAI API Key |
| `ANTHROPIC_API_KEY` | `z.string().optional()` | Anthropic Claude API Key |
| `GEMINI_API_KEY` | `z.string().optional()` | Google Gemini API Key |
| `RESEND_API_KEY` | `z.string().optional()` | Resend email provider key |
| `UPSTASH_REDIS_REST_URL` | `z.string().url().optional()` | Upstash Redis URL |
| `LEMONSQUEEZY_LIVE_API_KEY` | `z.string().optional()` | LemonSqueezy live secret key |

### Client Variables (Public)

| Variable | Schema | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `z.string().url()` | Main App URL (Default: `http://localhost:3000`) |
| `NEXT_PUBLIC_SUPABASE_URL` | `z.string().url()` | Supabase API endpoint URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `z.string().min(1)` | Supabase public anonymous API key |
| `NEXT_PUBLIC_WEB_URL` | `z.string().url()` | Web application base URL |
| `NEXT_PUBLIC_DOCS_URL` | `z.string().url()` | Documentation site URL |

---

## Development & Testing

### Running Tests

```bash
pnpm --filter @repo/env test
```

### Type Checking

```bash
pnpm --filter @repo/env check-types
```
