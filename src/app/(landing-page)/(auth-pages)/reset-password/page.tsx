'use client'
import React from 'react'

import Image from 'next/image'
import AppLogo from '@/components/common/Logo'
import Link from 'next/link'
import SetPasswordImg from '@/assets/svg/ForgotPassword.svg'
import SetNewPasswordForm from './password_form'

const SetNewPassword = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center'>
      <SetNewPasswordForm />
      <div className='md:w-1/2 hidden md:flex justify-center flex-col md:flex-row min-h-screen w-full'>
        <div className='flex justify-center w-full md:h-screen md:max-h-screen relative p-2 rounded-xl'>
          <Link href={'/'} className='flex absolute justify-center top-2 right-8 ml-8 z-50 mt-4 cursor-pointer'>
            <AppLogo />
          </Link>
          <Image
            src={SetPasswordImg}
            alt='logo'
            className={`w-full max-h-full max-w-none rounded-xl bg-custom-dark-blue p-4`}
          />
        </div>
      </div>
    </div>
  )
}

export default SetNewPassword
