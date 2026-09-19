import { describe, it, expect } from 'vitest';
import { env } from '../src/index';

describe('@repo/env Environment Variables Validator', () => {
  it('should validate and expose public client Supabase variables', () => {
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
    expect(typeof env.NEXT_PUBLIC_SUPABASE_URL).toBe('string');
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
  });

  it('should validate and expose server database URL', () => {
    expect(env.DATABASE_URL).toBeDefined();
    expect(typeof env.DATABASE_URL).toBe('string');
    expect(env.DATABASE_URL).toContain('postgres');
  });

  it('should provide default values for optional app URLs', () => {
    expect(env.NEXT_PUBLIC_WEB_URL).toBeDefined();
    expect(env.NODE_ENV).toBeDefined();
  });
});
