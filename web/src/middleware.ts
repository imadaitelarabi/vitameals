import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is signed in and the current path is /auth/login or /auth/register redirect the user to /dashboard
  if (session && (req.nextUrl.pathname === '/auth/login' || req.nextUrl.pathname === '/auth/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // If user is not signed in and the current path is /dashboard redirect the user to /auth/login
  if (!session && req.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard', '/auth/:path*']
}