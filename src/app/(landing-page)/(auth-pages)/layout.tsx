'use client'
// Type Imports
import type { ChildrenType } from '@/types'

// Component Imports
import AuthLayout from '@/layouts/AuthLayout'
import { AppProgressBar } from 'next-nprogress-bar'
import { Suspense } from 'react'

const Layout = ({ children }: ChildrenType) => {
  return (
    <Suspense fallback={<></>}>
      <AuthLayout>
        {children}
        <AppProgressBar color='#C7763E' options={{ showSpinner: false }} shallowRouting />
      </AuthLayout>
    </Suspense>
  )
}

export default Layout
