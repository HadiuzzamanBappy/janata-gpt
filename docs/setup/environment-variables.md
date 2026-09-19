# Setup: Environment Variables Reference (`@repo/env`)

All environment variables used across applications and packages are centrally schema-validated in `packages/env/src/index.ts`.

---

## Environment Variables Matrix

| Variable Name | Scope | Required? | Description & Purpose |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public (Client + Server) | **Yes** | Public Supabase project API URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public (Client + Server) | **Yes** | Public Supabase anonymous client key. |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret (Server Only) | **Yes** | Privileged Supabase service role key (Bypasses RLS). |
| `NEXT_PUBLIC_SITE_URL` | Public (Client + Server) | **Yes** | Application canonical URL (e.g. `http://localhost:3000`). |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Secret (Server Only) | Optional | Google Gemini LLM API key for `@repo/ai` streaming endpoints. |
| `DATABASE_URL` | Secret (Server Only) | **Yes** | Direct Postgres connection string for migrations/typegen. |

---

## Usage Rule
Never access `process.env` directly in code. Always import `{ env }` from `@repo/env`:

```typescript
import { env } from "@repo/env";

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
```
