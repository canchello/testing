'use client'
import React from 'react'

// import login from '@assets/images/login.png'
// import login2 from '@assets/images/login2.png'
// import login3 from '@assets/images/login3.png'
import Image from 'next/image'
import RegisterForm from './register_form'
import AppLogo from '@/components/common/Logo'
import Link from 'next/link'
import registerImg from '@/assets/images/register.jpg'
import { cn } from '@/libs/tailwind'

const Register = () => {
  return (
    <div
      className={cn(
        'relative flex flex-col-reverse md:flex-row items-center justify-center',
        "bg-[url('https://libya-booking-app.s3.ap-south-1.amazonaws.com/application/bg2.jpg')] bg-no-repeat bg-cover bg-center",
        'h-screen w-screen'
      )}
    >
      <div className='bg-black/35 absolute top-0 left-0 w-full h-full z-10' />
      <div className='md:w-1/2 hidden md:flex justify-center flex-col md:flex-row min-h-screen w-full z-20'>
        <div className='flex justify-center items-center w-full md:h-screen md:max-h-screen relative p-2 rounded-xl'>
          <Link href={'/'} className='flex absolute justify-center top-2 left-10 z-50 mt-4 cursor-pointer'>
            <AppLogo />
          </Link>
          <div className='text-white max-w-xl space-y-3'>
            <h1 className='text-4xl font-bold'>List Your Hotel and Reach a Global Audience!</h1>
            <p className='text-2xl'>Create a listing today and start welcoming guests from around the world!</p>
          </div>
        </div>
      </div>
      <RegisterForm />
    </div>
  )
}

export default Register
