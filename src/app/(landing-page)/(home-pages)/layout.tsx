'use client'

// Type Imports
import type { ChildrenType } from '@/types'

// Component Imports
import HomeLayout from '@/layouts/HomeLayout'
import { AppProgressBar } from 'next-nprogress-bar'

const Layout = ({ children }: ChildrenType) => {
  return (
    <HomeLayout>
      {children}
      <AppProgressBar color='#C7763E' options={{ showSpinner: false }} shallowRouting />
    </HomeLayout>
  )
}

export default Layout
