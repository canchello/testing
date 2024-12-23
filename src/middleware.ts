'use client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { Router } from 'next/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import LOCAL_STORAGE from '@/constants/localstorage'

// Bind events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// Customize nprogress
NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.25 })

// Define protected routes
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/profile']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  if (protectedRoutes.includes(pathname)) {
    // const token = request.cookies.get('token') // Retrieve auth token from cookies
    const token = localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN) // Retrieve auth token from cookies

    // If no auth token, redirect to login page
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname) // Pass the intended page for after login
      return NextResponse.redirect(loginUrl)
    }

    // If the token exists, you might want to validate it here (optional)
    // You can do something like a token validation call or JWT verification

    // Allow the request to proceed
    return NextResponse.next()
  }

  // Allow non-protected routes
  return NextResponse.next()
}

// Apply the middleware to all routes by exporting a config object
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'] // Define the routes to protect
}
