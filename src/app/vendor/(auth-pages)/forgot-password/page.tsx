'use client'
import React, { useState } from 'react'

import AppLogo from '@/components/common/Logo'
import Link from 'next/link'
import ForgotPasswordForm from './password_form'
import EmailSentForm from './email_form'
import { cn } from '@/libs/tailwind'

const ForgotPassword = () => {
  const [isMailSent, setMailSent] = useState(false)

  return (
    <div
      className={cn(
        'relative flex flex-col-reverse md:flex-row items-center justify-center',
        "bg-[url('https://libya-booking-app.s3.ap-south-1.amazonaws.com/application/bg1.jpg')] bg-no-repeat bg-cover bg-center",
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
      {isMailSent ? (
        <EmailSentForm email={isMailSent} />
      ) : (
        <ForgotPasswordForm onSentEmail={email => setMailSent(email)} />
      )}
    </div>
  )
}

export default ForgotPassword
