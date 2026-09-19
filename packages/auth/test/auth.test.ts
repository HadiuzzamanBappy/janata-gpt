import { describe, it, expect } from 'vitest';
import { createSupabaseBrowserClient } from '../src/client';
import { createSupabaseAdminClient, createSupabaseServerClient } from '../src/server';
import { createMiddlewareClient } from '../src/middleware';

describe('@repo/auth Supabase Auth SDK', () => {
  it('should initialize browser Supabase client without arguments (zero-config)', () => {
    const client = createSupabaseBrowserClient();
    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
  });

  it('should initialize admin Supabase client with service role key', () => {
    const adminClient = createSupabaseAdminClient();
    expect(adminClient).toBeDefined();
    expect(adminClient.auth).toBeDefined();
  });

  it('should initialize server client with a mock cookieStore', () => {
    const mockCookieStore = {
      getAll: () => [{ name: 'sb-access-token', value: 'mock-token' }],
      set: () => {},
    };

    const serverClient = createSupabaseServerClient(mockCookieStore);
    expect(serverClient).toBeDefined();
    expect(serverClient.auth).toBeDefined();
  });

  it('should initialize middleware client with mock request and response', () => {
    const mockRequest = {
      cookies: {
        getAll: () => [{ name: 'sb-access-token', value: 'mock-token' }],
        set: () => {},
      },
    };

    const mockResponse = {
      cookies: {
        set: () => {},
      },
    };

    const middlewareClient = createMiddlewareClient(mockRequest, mockResponse);
    expect(middlewareClient).toBeDefined();
    expect(middlewareClient.auth).toBeDefined();
  });
});
