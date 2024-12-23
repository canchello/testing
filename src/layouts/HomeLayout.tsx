// Type Imports
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import type { ChildrenType } from '@/types'

const HomeLayout = ({ children }: ChildrenType) => {
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

export default HomeLayout
