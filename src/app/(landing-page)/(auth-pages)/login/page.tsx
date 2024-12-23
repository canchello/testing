'use client'
import React from 'react'

import Image from 'next/image'
import LoginForm from './login_form'
import AppLogo from '@/components/common/Logo'
import Link from 'next/link'
import loginImg from '@/assets/images/login.jpg'

const Login = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 px-2'>
      <LoginForm />
      <div className='hidden md:flex justify-center flex-col md:flex-row md:min-h-screen w-full'>
        <div className='flex justify-center w-full md:h-screen md:max-h-screen relative p-2 rounded-xl'>
          {/* h-full w-full max-h-[60vh] */}
          <Link href={'/'} className='flex absolute justify-center top-2 right-8 ml-8 z-50 mt-4 cursor-pointer'>
            <AppLogo />
          </Link>
          <Image
            src={loginImg}
            alt='logo'
            className='object-cover w-full max-h-full max-w-none rounded-xl'
            style={{ backgroundColor: '#15253B66' }}
          />
          <div className='absolute rounded-xl bg-custom-blue p-2 inset-2' />
        </div>
      </div>
    </div>
  )
}

export default Login
