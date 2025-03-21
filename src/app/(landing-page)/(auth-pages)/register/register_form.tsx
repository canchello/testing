'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import googleIcon from '@/assets/svg/googleIcon.svg'
import TextField from '@/components/form/TextField'
import CustomCheckbox from '@/components/form/CheckBox'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import Axios from '@/libs/axios'
import { registerURL } from '@/services/APIs/user'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSearchParam } from 'react-use'

interface FormData {
  email: string
  password: string
  confirmPassword: string
  agree: boolean
}

const RegisterForm = () => {
  const router = useRouter()
  const referralCode = useSearchParam('code')
  const [isLoading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      agree: false
    }
  })

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_ENDPOINT}/authentication/google?referralBy=${referralCode}`
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      let payload: any = data
      if (referralCode) payload.referralBy = referralCode
      const { data: res }: any = await Axios({ ...registerURL, data: payload })
      if (res.status === 1) {
        toast.success(res.message || 'User Registered successfully')
        router.push(`/verify-email?id=${res.data?._id || ''}`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const passwordField = watch('password')

  return (
    <div className='flex items-center md:max-h-screen overflow-auto'>
      <div className='p-4 md:py-0 md:px-8 my-8 lg:my-0'>
        <div className='lg:p-8 flex flex-col justify-center items-center gap-2 lg:gap-4 text-black text-center'>
          <div className='text-2xl md:text-4xl font-bold font-carmine'>
            <p className='mb-2 text-center text-wrap'>Create an Account!</p>
          </div>
          <h2 className='text-lg mb-2 text-center text-wrap'>
            Fill in the details below to create your account and start booking hotels for your next trip!
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <div className='flex flex-col gap-2 lg:gap-4 w-full'>
              {/* Email */}
              <Controller
                name='email'
                control={control}
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
              {/* Password */}
              <Controller
                name='password'
                control={control}
                rules={{
                  required: 'Password is required.',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='password'
                    placeholder='Password'
                    className='border-2 border-gray-400'
                    error={errors.password?.message}
                  />
                )}
              />
              {/* Confirm Password */}
              <Controller
                name='confirmPassword'
                control={control}
                rules={{
                  required: 'Confirm Password is required.',
                  validate: value => value === passwordField || "Passwords doesn't match"
                }}
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
              {/* Agreement Checkbox */}
              <Controller
                name='agree'
                control={control}
                rules={{
                  required: 'You must agree to the Terms and Privacy Policy'
                }}
                render={({ field }) => (
                  <CustomCheckbox
                    {...field}
                    checked={field.value}
                    onChange={field.onChange}
                    labelClassName='!text-sm !font-medium'
                    label={
                      <div className='text-left'>
                        I agree to the{' '}
                        <Link href={'/FAQs'} className='text-primary underline'>
                          Terms & Condition{' '}
                        </Link>{' '}
                        and{' '}
                        <Link href={'/policy'} className='text-primary underline'>
                          Privacy Policy
                        </Link>
                      </div>
                    }
                    error={errors.agree?.message}
                  />
                )}
              />

              {/* Submit Button */}
              <CustomButton
                variant='secondary'
                title='Sign Up'
                type='submit'
                className='w-full'
                isLoading={isLoading}
              />
            </div>

            {/* OR Divider */}
            <div className='divider text-gray-500 my-5'>OR</div>

            {/* Google Signup Button */}
            <CustomButton
              icon={googleIcon}
              iconPosition='left'
              title='Login with Google'
              className='w-full'
              variant='light'
              onClick={handleGoogleLogin}
            />
          </form>

          {/* Login Link */}
          <p className='text-sm mt-2 text-center text-black'>
            Already have an account?{' '}
            <Link href='/login' className='font-bold text-primary'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
