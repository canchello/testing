'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import AppLogo from '@/components/common/Logo'
import Link from 'next/link'
import ForgotPasswordImg from '@/assets/svg/ForgotPassword.svg'
import EmailSentImg from '@/assets/svg/EmailSent.svg'
import ForgotPasswordForm from './password_form'
import EmailSentForm from './email_form'

const ForgotPassword = () => {
  const [isMailSent, setMailSent] = useState(false)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      {isMailSent ? (
        <EmailSentForm email={isMailSent} />
      ) : (
        <ForgotPasswordForm onSentEmail={email => setMailSent(email)} />
      )}
      <div className='hidden md:flex justify-center flex-col md:flex-row min-h-screen w-full'>
        <div className='flex justify-center w-full md:h-screen md:max-h-screen relative p-2 rounded-xl'>
          <Link href={'/'} className='flex absolute justify-center top-2 right-8 ml-8 z-50 mt-4 cursor-pointer'>
            <AppLogo />
          </Link>
          <div
            className={`flex justify-center items-center w-full max-h-full max-w-none rounded-xl bg-custom-dark-blue ${
              isMailSent ? 'p-12' : 'p-4'
            }`}
          >
            <Image src={isMailSent ? EmailSentImg : ForgotPasswordImg} alt='logo' className={`h-4/5`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
