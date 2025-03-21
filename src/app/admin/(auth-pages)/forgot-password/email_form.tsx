'use client'
import React from 'react'
import Link from 'next/link'
import CustomButton from '@/components/common/CustomButton'

const EmailSentForm = () => {
  const onSubmit = () => {
    // console.log(data)
    // toast.error("Please fill all necessary fields!");
  }

  return (
    <div className='md:w-1/2 md:p-4 h-full md:max-h-screen overflow-auto z-20'>
      <div className='lg:p-8 h-full flex flex-col justify-center items-center gap-4 text-black text-center bg-white rounded-lg'>
        <div className='text-2xl md:text-4xl font-bold font-carmine'>
          <p className='mb-2 text-center text-wrap'>Check Your Email!</p>
        </div>
        <h2 className='text-lg mb-2 text-center text-wrap'>
          A reset password link has been sent to your registered email address,
        </h2>

        <div className='flex flex-col gap-4 w-full'>
          {/* Submit Button */}
          <CustomButton variant='secondary' title='Resend Email' type='submit' className='w-full' />
        </div>

        {/* Login Link */}
        <p className='text-base mt-2 text-center text-black'>
          Go back to{' '}
          <Link href='/admin/login' className='font-bold text-primary'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default EmailSentForm
