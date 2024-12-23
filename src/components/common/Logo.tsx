import React from 'react'
import Image from 'next/image'
import logoName from '@/assets/Canchello.svg'
import logo from '@/assets/Canchello-logo.svg'
import { cn } from '@/libs/tailwind'
// import logoDark from '@/assets/images/logo-light.png'

interface AppProps {
  mode?: 'light' | 'dark'
  logoClass?: string
  className?: string
}

const AppLogo: React.FC<AppProps> = ({ mode = 'light', logoClass = '', className = '' }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <Image src={mode === 'dark' ? logo : logo} alt='logo' className={cn('h-10 max-w-fit mx-2', logoClass)} />
      <Image src={logoName} alt='logo' className='h-10 max-w-fit mx-2' />
    </div>
  )
  // return 'Logo'
}

export default AppLogo
