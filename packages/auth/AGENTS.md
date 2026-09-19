# Shared Auth Utilities (`packages/auth`)

## 1. Purpose & Responsibilities
- Centralized Supabase authentication helpers and cookie management (`@supabase/ssr`).

## 2. Rules & Directives
- **Server Client**: Use `createDailyServerClient()` for RSC, Server Actions, Route Handlers, and Astro middleware.
- **Browser Client**: Use `createBrowserClient()` for client components (`'use client'`).
- **Session Refresh**: Use auth middleware helper to keep tokens refreshed before rendering protected routes.
