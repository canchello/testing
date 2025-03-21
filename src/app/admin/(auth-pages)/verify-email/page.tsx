'use client'
import React from 'react'

import Image from 'next/image'
import AppLogo from '@/components/common/Logo'
import Link from 'next/link'
import VerifyEmailImg from '@/assets/svg/VerifyEmail.svg'
import VerifyEmailForm from './verify_email_form'
import { cn } from '@/libs/tailwind'

const VerifyEmail = () => {
  return (
    <div
      className={cn(
        'relative flex flex-col-reverse md:flex-row items-center justify-center',
        "bg-[url('https://libya-booking-app.s3.ap-south-1.amazonaws.com/application/bg4.jpg')] bg-no-repeat bg-cover bg-center",
        'h-screen w-screen'
      )}
    >
      <div className='bg-black/35 absolute top-0 left-0 w-full h-full z-10' />
      <div className='md:w-1/2 flex justify-center flex-col md:flex-row min-h-screen w-full z-20'>
        <div className='flex justify-center w-full md:h-screen md:max-h-screen relative p-2 rounded-xl'>
          <Link href={'/'} className='flex absolute justify-center top-2 left-8 z-50 mt-4 cursor-pointer'>
            <AppLogo />
          </Link>
        </div>
      </div>
      <VerifyEmailForm />
    </div>
  )
}

export default VerifyEmail
