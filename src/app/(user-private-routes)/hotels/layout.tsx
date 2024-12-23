'use client'
// Type Imports
import type { ChildrenType } from '@/types'

// Component Imports
import { AppProgressBar } from 'next-nprogress-bar'
import UserLayout from '@/layouts/UserLayout'

const Layout = ({ children }: ChildrenType) => {
  return (
    <UserLayout>
      {children}
      <AppProgressBar color='#C7763E' options={{ showSpinner: false }} shallowRouting />
    </UserLayout>
  )
}

export default Layout
