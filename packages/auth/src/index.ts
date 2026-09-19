/**
 * @repo/auth — Universal Supabase Authentication SDK
 */

export type { User, Session, AuthError } from '@supabase/supabase-js';

export * from './client';
export * from './server';
export * from './middleware';

export type AppRole = 'admin' | 'user' | 'moderator';

export type AuthUser = {
  id: string;
  email: string | undefined;
  role: AppRole;
};
