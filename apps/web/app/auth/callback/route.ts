import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@repo/auth/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createSupabaseServerClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Successful login
      return NextResponse.redirect(new URL(next, request.url));
    } else {
      console.error('Error exchanging code for session:', error.message);
    }
  }

  // Fallback if code is missing or invalid
  return NextResponse.redirect(new URL('/login?error=auth-failed', request.url));
}
