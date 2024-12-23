'use client'
import React from 'react'

import Image from 'next/image'
import AppLogo from '@/components/common/Logo'
import Link from 'next/link'
import VerifyEmailImg from '@/assets/svg/VerifyEmail.svg'
import VerifyEmailForm from './verify_email_form'

const VerifyEmail = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <VerifyEmailForm />
      <div className='hidden md:flex justify-center flex-col md:flex-row min-h-screen w-full'>
        <div className='flex justify-center w-full md:h-screen md:max-h-screen relative p-2 rounded-xl'>
          <Link href={'/'} className='flex absolute justify-center top-2 right-8 ml-8 z-50 mt-4 cursor-pointer'>
            <AppLogo />
          </Link>
          <div className='flex items-center justify-center w-full max-h-full max-w-none rounded-xl bg-custom-dark-blue p-4'>
            <Image src={VerifyEmailImg} alt='logo' className={`h-4/5`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
