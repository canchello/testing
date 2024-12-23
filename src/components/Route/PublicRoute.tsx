import { useEffect } from 'react'
import userStore from '@/stores/userStore'
import { useRouter } from 'next/navigation'

const PublicRoute = ({ children }: any) => {
  const { user }: any = userStore()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  if (user) return null

  return children
}

export default PublicRoute
