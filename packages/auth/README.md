# `@repo/auth` - Universal Supabase Authentication SDK

A clean, enterprise-grade authentication package built on top of **`@supabase/ssr`** and **`@supabase/supabase-js`**. This package acts as the centralized auth layer for the monorepo, handling client, server, and middleware authentication cleanly across Next.js apps and packages.

---

## 🚀 Key Features & Highlights

- ⚡ **Zero-Config Browser Client**: `createSupabaseBrowserClient()` automatically reads environment variables from `@repo/env` with no parameters needed.
- 🛡️ **Server SSR Client**: `createSupabaseServerClient(cookieStore)` seamlessly reads and sets HTTP-only cookies in Next.js Server Components, Actions, and Route Handlers.
- 🔐 **Admin Client**: `createSupabaseAdminClient()` for server-side admin operations that bypass RLS using `SUPABASE_SERVICE_ROLE_KEY`.
- 🔄 **Session Refresh Middleware**: `createMiddlewareClient(request, response)` keeps user sessions alive on every request.
- 🧪 **Automated Vitest Suite**: 100% test coverage with automated unit tests (`pnpm --filter @repo/auth test`).

---

## 🛠️ Environment Configuration

Ensure your monorepo root `.env` file contains your Supabase credentials:

```bash
# Public Client Keys (Accessible in Browser & Server)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."

# Private Admin Key (Server-Side ONLY)
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."
```

---

## 📖 Usage Manual

### 1. Client Components (`'use client'`)

In React Client Components, use `createSupabaseBrowserClient()`. It automatically configures cookie handling and reads credentials from `@repo/env`.

```tsx
'use client';

import { createSupabaseBrowserClient } from '@repo/auth/client';

export function LoginButton() {
  const supabase = createSupabaseBrowserClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  return <button onClick={handleSignIn}>Sign In with GitHub</button>;
}
```

---

### 2. Server Components & Page Route Guards

In Next.js Server Components, pass the `cookies()` store from `next/headers` to check user sessions on the server.

```tsx
// apps/web/app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@repo/auth/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <div>Welcome to Dashboard, {user.email}!</div>;
}
```

---

### 3. API Route Handlers & Server Actions

Secure API endpoints by authenticating requests using the server client.

```typescript
// apps/web/app/api/user/route.ts
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@repo/auth/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ id: user.id, email: user.email });
}
```

---

### 4. Next.js Middleware Session Refresh

Keep Supabase sessions alive across user requests in Next.js middleware.

```typescript
// apps/web/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@repo/auth/middleware';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const supabase = createMiddlewareClient(request, response);

  // Refresh auth token if expired
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

---

### 5. Server-Side Admin Client (Bypassing RLS)

Use the admin client for backend background tasks or admin endpoints that require bypassing Row Level Security.

> ⚠️ **CAUTION**: Never import or run `createSupabaseAdminClient()` on the client side.

```typescript
import { createSupabaseAdminClient } from '@repo/auth/server';

export async function deleteUserAccount(userId: string) {
  const admin = createSupabaseAdminClient();

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) throw error;
}
```

---

## 🧪 Testing

Run automated Vitest unit tests for `@repo/auth`:

```bash
pnpm --filter @repo/auth test
```
