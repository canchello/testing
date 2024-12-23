'use client'
import { redirect } from 'next/navigation'

import userStore from '@/stores/userStore'
import { ROUTES } from '@/libs/constants'

export default function Home() {
  const { user }: any = userStore()

  return redirect(user ? ROUTES.HOTEL.STAYS : ROUTES.STAYS)
}
