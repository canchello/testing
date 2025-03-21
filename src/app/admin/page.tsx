'use client'
import { redirect } from 'next/navigation'

import userStore from '@/stores/userStore'
import { ROUTES } from '@/libs/constants'
import { getSubdomain } from '@/utils/helper'

export default function Home() {
  const { user }: any = userStore()
  const subdomain = getSubdomain()

  if (subdomain === 'admin') {
    return redirect(user ? ROUTES.ADMIN.USER_MANAGEMENT : ROUTES.ADMIN.LOGIN)
  }
  return redirect('/')
}
