// Type Imports
import Footer from '@/components/layout/vendor/Footer'
import Header from '@/components/layout/vendor/Header'
import Sidebar from '@/components/layout/vendor/Sidebar'
import UserHeader from '@/components/layout/vendor/UserHeader'
import { cn } from '@/libs/tailwind'
import userStore from '@/stores/userStore'
import { usePathname } from 'next/navigation'

const VendorLayout = ({ children }) => {
  const pathname = usePathname()
  const { user } = userStore()

  if (user) {
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
