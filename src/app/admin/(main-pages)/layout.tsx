'use client'
// Type Imports
import type { ChildrenType } from '@/types'

// Component Imports
import { AppProgressBar } from 'next-nprogress-bar'
import { Suspense } from 'react'
import userStore from '@/stores/userStore'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/libs/constants'
import AdminLayout from '@/layouts/AdminLayout'

const Layout = ({ children }: ChildrenType) => {
  const { user }: any = userStore()

  if (!user) {
    redirect(ROUTES.VENDOR.LOGIN)
  }

  return (
    <Suspense fallback={<></>}>
      <AdminLayout>{children}</AdminLayout>
      <AppProgressBar color='#C7763E' options={{ showSpinner: false }} shallowRouting />
    </Suspense>
  )
}

export default Layout
