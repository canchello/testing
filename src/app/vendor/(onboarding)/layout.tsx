'use client'
// Type Imports
import type { ChildrenType } from '@/types'

// Component Imports
import AuthLayout from '@/layouts/AuthLayout'
import { AppProgressBar } from 'next-nprogress-bar'
import appStore from '@/stores/appStore'
import { Suspense } from 'react'
import VendorLayout from '@/layouts/VendorLayout'

const Layout = ({ children }: ChildrenType) => {
  const { messageModal }: any = appStore()

  return (
    <Suspense fallback={<></>}>
      <VendorLayout>{children}</VendorLayout>
      <AppProgressBar color='#C7763E' options={{ showSpinner: false }} shallowRouting />
    </Suspense>
  )
}

export default Layout
