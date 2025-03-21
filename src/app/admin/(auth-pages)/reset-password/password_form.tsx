'use client'
import React, { useState } from 'react'
import Link from 'next/link'

import { Controller, useForm } from 'react-hook-form'

import TextField from '@/components/form/TextField'
import CustomButton from '@/components/common/CustomButton'
import { useSearchParams, useRouter } from 'next/navigation'
import { resetPasswordURL } from '@/services/APIs/user'
import { toast } from 'sonner'
import Axios from '@/libs/axios'
// import { toast } from "sonner";

interface FormData {
  password: string
  confirmPassword: string
}
// import { CustomTextWithO } from "@components/common/CustomO";

const SetNewPasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const { data: res }: any = await Axios({ ...resetPasswordURL(userId, token), data })
      if (res.status === 1) {
        router.push('/login')
        setLoading(false)
        toast.success(res.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
    // toast.error("Please fill all necessary fields!");
  }

  return (
    <div className='md:w-1/2 h-full md:p-4 md:max-h-screen overflow-auto z-20'>
      <div className='lg:p-8 h-full flex flex-col justify-center items-center gap-4 text-black text-center bg-white rounded-lg'>
        <div className='text-2xl md:text-4xl font-bold font-carmine'>
          <p className='mb-2 text-center text-wrap'>Set your new password!</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='flex flex-col gap-4 w-full'>
            {/* Company Name */}
            <Controller
              name='password'
              control={control}
              defaultValue=''
              // rules={{
              //   required: "Email is required",
              //   pattern: {
              //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              //     message: "Invalid email address",
              //   },
              // }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='password'
                  placeholder='New Password'
                  className='border-2 border-gray-400'
                  error={errors.password?.message}
                />
              )}
            />
            {/* Company Name */}
            <Controller
              name='confirmPassword'
              control={control}
              defaultValue=''
              // rules={{
              //   required: "Email is required",
              //   pattern: {
              //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              //     message: "Invalid email address",
              //   },
              // }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='password'
                  placeholder='Confirm Password'
                  className='border-2 border-gray-400'
                  error={errors.confirmPassword?.message}
                />
              )}
            />

            {/* Submit Button */}
            <CustomButton
              variant='secondary'
              isLoading={loading}
              title='Set Password'
              type='submit'
              className='w-full'
            />
          </div>
        </form>

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

export default SetNewPasswordForm
