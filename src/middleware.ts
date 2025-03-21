'use client'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { Router } from 'next/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Bind events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// Customize nprogress
NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.25 })

// Define protected routes
const protectedRoutes = ['/dashboard', '/profile', '/settings', '/profile']

export function middleware(req: NextRequest) {
  // Allow non-protected routes
  return NextResponse.next()
}

// Apply the middleware to all routes by exporting a config object
export const config = {
  // matcher: ['/*'] // Define the routes to protect
}
