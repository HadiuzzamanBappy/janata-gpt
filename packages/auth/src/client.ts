import { createBrowserClient } from '@supabase/ssr';
import { env } from '@repo/env';

/**
 * Creates a Supabase client for use in browser / Client Components.
 * Defaults automatically to env.NEXT_PUBLIC_SUPABASE_URL and env.NEXT_PUBLIC_SUPABASE_ANON_KEY.
 *
 * Usage:
 *   import { createSupabaseBrowserClient } from '@repo/auth/client';
 *   const supabase = createSupabaseBrowserClient();
 */
export function createSupabaseBrowserClient(
  supabaseUrl: string = env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: string = env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
