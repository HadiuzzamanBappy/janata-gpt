import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { env } from '@repo/env';

type CookieItem = { name: string; value: string; options: CookieOptions };

type CookieStore = {
  getAll(): { name: string; value: string }[];
  set(name: string, value: string, options?: CookieOptions): void;
};

/**
 * Creates a Supabase client for Server Components, Route Handlers, and
 * Server Actions. Pass in the Next.js `cookies()` store (or equivalent).
 *
 * Usage in Next.js:
 *   import { cookies } from 'next/headers';
 *   import { createSupabaseServerClient } from '@repo/auth/server';
 *   const supabase = createSupabaseServerClient(await cookies());
 *   const { data: { user } } = await supabase.auth.getUser();
 */
export function createSupabaseServerClient(cookieStore: CookieStore) {
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieItem[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — cookies can only be set in
            // Middleware or Route Handlers; ignore the error here.
          }
        },
      },
    }
  );
}

/**
 * Creates a Supabase Admin client using the service role key.
 * ONLY use this on the server — never expose the service role key to the client.
 */
export function createSupabaseAdminClient() {
  const { createClient } = require('@supabase/supabase-js') as typeof import('@supabase/supabase-js');

  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
