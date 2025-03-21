// Type Imports
import Sidebar from '@/components/layout/admin/Sidebar'
import UserHeader from '@/components/layout/admin/UserHeader'
import { ROUTES } from '@/libs/constants'
import { cn } from '@/libs/tailwind'
import userStore from '@/stores/userStore'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const AdminLayout = ({ children }) => {
  const pathname = usePathname()
  const { user } = userStore()

  if (!user) {
    redirect(ROUTES.ADMIN.LOGIN)
  }
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
        <main className={cn('flex-1', pathname.includes("cms/blog") || pathname.includes("platform-analytics") ? "" : "bg-white p-4 rounded-lg")}>
          {children}
        </main>
      </div>
    </div>
  )

}

export default AdminLayout
