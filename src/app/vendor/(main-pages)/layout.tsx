'use client'
// Type Imports
import type { ChildrenType } from '@/types'

// Component Imports
import { AppProgressBar } from 'next-nprogress-bar'
import { Suspense } from 'react'
import VendorLayout from '@/layouts/VendorLayout'
import userStore from '@/stores/userStore'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/libs/constants'

const Layout = ({ children }: ChildrenType) => {
  const { user }: any = userStore()

  if (!user) {
    redirect(ROUTES.VENDOR.LOGIN)
  }

  return (
    <Suspense fallback={<></>}>
      <VendorLayout>{children}</VendorLayout>
      <AppProgressBar color='#C7763E' options={{ showSpinner: false }} shallowRouting />
    </Suspense>
  )
}

export default Layout
