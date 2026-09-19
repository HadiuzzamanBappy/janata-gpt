import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { env } from '@repo/env';

type CookieItem = { name: string; value: string; options: CookieOptions };

type RequestLike = {
  cookies: {
    getAll(): { name: string; value: string }[];
    set(name: string, value: string): void;
  };
};

type ResponseLike = {
  cookies: {
    set(name: string, value: string, options?: CookieOptions): void;
  };
};

/**
 * Creates a Supabase client for Next.js Middleware.
 * Refreshes auth tokens on every request to keep sessions alive.
 *
 * Usage in middleware.ts:
 *   import { NextResponse, type NextRequest } from 'next/server';
 *   import { createMiddlewareClient } from '@repo/auth/middleware';
 *
 *   export async function middleware(request: NextRequest) {
 *     const response = NextResponse.next({ request });
 *     const supabase = createMiddlewareClient(request, response);
 *     await supabase.auth.getUser();
 *     return response;
 *   }
 */
export function createMiddlewareClient(request: RequestLike, response: ResponseLike) {
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieItem[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );
}
