'use client'
import React, { useState } from 'react'
import Link from 'next/link'

import { Controller, useForm } from 'react-hook-form'

import TextField from '@/components/form/TextField'
import CustomButton from '@/components/common/CustomButton'
import Axios from '@/libs/axios'
import { forgotPasswordURL } from '@/services/APIs/user'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface FormData {
  status?: number
  email: string
}

const ForgotPasswordForm = ({ onSentEmail = () => {} }) => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const { data: res }: any = await Axios({ ...forgotPasswordURL, data })
      // toast.success("")
      // router.push(`/verify-email${res.data}`)
      onSentEmail()
    } catch (error) {
      console.error(error)
      setLoading(false)
    } finally {
    }
  }

  return (
    <div className='flex items-center md:max-h-screen overflow-auto'>
      <div className='p-4 md:px-8'>
        <div className='lg:p-8 flex flex-col justify-center items-center gap-4 text-black text-center'>
          <div className='text-2xl md:text-4xl font-bold font-carmine'>
            <p className='mb-2 text-center text-wrap'>Forgot Password!</p>
          </div>
          <h2 className='text-lg mb-2 text-center text-wrap'>
            Enter your registered email address to get a link for resetting the password.
          </h2>
          {/* <Modal
        title="Password Changed Successfully!"
        message="Your password has been updated. Please log in with your new password to continue."
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      /> */}

          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <div className='flex flex-col gap-4 w-full'>
              {/* Company Name */}
              <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='email'
                    placeholder='Email Address'
                    className='border-2 border-gray-400'
                    error={errors.email?.message}
                  />
                )}
              />

              {/* Submit Button */}
              <CustomButton
                variant='secondary'
                isLoading={isLoading}
                title='Continue'
                type='submit'
                className='w-full'
              />
            </div>
          </form>

          {/* Login Link */}
          <p className='text-base mt-2 text-center text-black'>
            Go back to{' '}
            <Link href='/login' className='font-bold text-primary'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
