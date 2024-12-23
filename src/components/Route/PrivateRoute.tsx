import { useEffect } from 'react'
import userStore from '@/stores/userStore'
import { useRouter } from 'next/navigation'
import localstorage from '@/constants/localstorage'

const PrivateRoute = ({ children }: any) => {
  const { user, fetchingUser }: any = userStore()
  const router = useRouter()

  useEffect(() => {
    if (!user && !localStorage.getItem(localstorage.AUTH_TOKEN)) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    if (fetchingUser) {
      return (
        <div className='flex flex-col gap-2 items-center justify-center min-h-96'>
          <span className='loading loading-spinner loading-lg'></span>
          <p>Please wait...</p>
        </div>
      )
    }
    return null
  }

  return children
}

export default PrivateRoute
