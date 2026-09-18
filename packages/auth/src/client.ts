import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a Supabase client for use in the browser (Client Components).
 * It automatically handles reading and writing the session cookie.
 */
export function createSupabaseBrowserClient(supabaseUrl: string, supabaseAnonKey: string) {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
