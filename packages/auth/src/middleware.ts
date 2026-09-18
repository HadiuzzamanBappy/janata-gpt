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
 * Call this inside your middleware to keep Supabase sessions alive by
 * refreshing the auth token on every request.
 *
 * Usage in apps/web/middleware.ts:
 *   import { NextResponse, type NextRequest } from 'next/server';
 *   import { createMiddlewareClient } from '@repo/auth/middleware';
 *
 *   export async function middleware(request: NextRequest) {
 *     const response = NextResponse.next({ request });
 *     const supabase = createMiddlewareClient(request, response);
 *     await supabase.auth.getUser(); // refreshes session
 *     return response;
 *   }
 *   export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
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
