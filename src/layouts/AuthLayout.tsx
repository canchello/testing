// Type Imports
import AppLogo from '@/components/common/Logo'
import type { ChildrenType } from '@/types'
import Link from 'next/link'

const AuthLayout = ({ children }: ChildrenType) => {
  return (
    <div className='h-screen flex flex-col items-center overflow-auto'>
      <div className='md:hidden bg-custom-dark-blue w-full flex justify-center items-center py-2'>
        <Link href={'/'}>
          <AppLogo />
        </Link>
      </div>
      <div className='flex flex-1'>{children}</div>
    </div>
  )
}

export default AuthLayout
