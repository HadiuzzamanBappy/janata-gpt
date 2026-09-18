/**
 * @repo/auth — Barrel export
 *
 * Consumers should import from the specific sub-paths:
 *   - Server components / Route handlers → '@repo/auth/server'
 *   - Middleware                          → '@repo/auth/middleware'
 *   - Shared types                        → '@repo/auth' (this file)
 */
export type { User, Session } from '@supabase/supabase-js';

/**
 * Supabase user roles stored in app_metadata (set server-side only).
 * Used to gate access via RLS and server-side guards.
 */
export type AppRole = 'admin' | 'user' | 'moderator';

export type AuthUser = {
  id: string;
  email: string | undefined;
  role: AppRole;
};
