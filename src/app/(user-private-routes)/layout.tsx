'use client'
// Type Imports
import type { ChildrenType } from '@/types'

// Component Imports
import { AppProgressBar } from 'next-nprogress-bar'
import { Suspense } from 'react'
import HomeLayout from '@/layouts/HomeLayout'
import PrivateRoute from '@/components/Route/PrivateRoute'

const Layout = ({ children }: ChildrenType) => {
  return (
    <Suspense fallback={<></>}>
      <HomeLayout>
        <PrivateRoute>
          {children}
          <AppProgressBar color='#C7763E' options={{ showSpinner: false }} shallowRouting />
        </PrivateRoute>
      </HomeLayout>
    </Suspense>
  )
}

export default Layout
