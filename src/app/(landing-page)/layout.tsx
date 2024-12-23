'use client'

import { ROUTES } from '@/libs/constants'
import userStore from '@/stores/userStore'
// Type Imports
import type { ChildrenType } from '@/types'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Layout = ({ children }: ChildrenType) => {
  const router = useRouter()
  const pathname = usePathname()
  const { user }: any = userStore()

  const isCommonRoute = pathname.startsWith(ROUTES.STAYS + '/')

  useEffect(() => {
    if (isCommonRoute) return
    if (user) router.replace(ROUTES.HOTEL.STAYS)
  }, [user, isCommonRoute])

  if (!user || isCommonRoute) return children
}

export default Layout
