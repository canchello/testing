// Type Imports
import Footer from '@/components/layout/vendor/Footer'
import Header from '@/components/layout/vendor/Header'
import Sidebar from '@/components/layout/vendor/Sidebar'
import UserHeader from '@/components/layout/vendor/UserHeader'
import { ROUTES } from '@/libs/constants'
import { cn } from '@/libs/tailwind'
import userStore from '@/stores/userStore'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const VendorLayout = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = userStore()

  const onBoardingNotDone = useMemo(() => {
    const userComplete = !user.firstName || !user.lastName || !user.email || !user.phoneNumber || !user.gender || !user.designationId
    const noProperty = !user.primaryProperty
    const propertyInComplete = (user.primaryProperty) && (!user.primaryProperty?.roomType?.length || !user.primaryProperty?.attachment?.length || !user?.bankDetail)
    return userComplete || noProperty || propertyInComplete
  })

  useEffect(() => {
    if (!user) return;
    if (onBoardingNotDone)
      router.push(ROUTES.VENDOR.ONBOARD)
  }, [user?.primaryProperty, user?.bankDetail])

  if (!user) {
    redirect(ROUTES.VENDOR.LOGIN)
  }
  if (!onBoardingNotDone) {
    // layout for logged in vendor - modify change accordingly
    return (
      <div className='flex h-screen overflow-auto'>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content (Navbar + Page Content) */}
        <div className='flex flex-col bg-gray-200 flex-1 px-4 py-2 gap-2 overflow-auto'>
          {/* Navbar */}
          <UserHeader />

          {/* Page Content */}
          <main className={cn('flex-1', pathname.includes("reviews") ? "" : "bg-white p-3 rounded-lg")}>
            {children}
          </main>
        </div>
      </div>
    )
  }

  // layout for non loggedin vendor
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex justify-center flex-1'>
        <main className='w-full'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default VendorLayout
