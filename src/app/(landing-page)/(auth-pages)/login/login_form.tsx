'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Controller, useForm, FieldValues } from 'react-hook-form'
import googleIcon from '@/assets/svg/googleIcon.svg'
import TextField from '@/components/form/TextField'
import CustomCheckbox from '@/components/form/CheckBox'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import Axios from '@/libs/axios'
import { loginURL } from '@/services/APIs/user'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import Cookies from 'js-cookie'

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  const { setUser, fetchUserProfile }: any = userStore()
  const [isLoading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const { data: res }: any = await Axios({ ...loginURL, data })
      if (res.status === 1) {
        setUser(res.data)
        toast.success(`Welcome! ${res.data.firstName || res.data.email}` || `Welcome! You've logged In.`)
        Cookies.set('token', res.data.token, {})
        router.push('/')
      } else if (res.status === 2) {
        setUser({ email: data.email })
        toast.success(res.message)
        router.push('/verify-email')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserProfile(token, () => {
        router.push('/')
      })
    }
  }, [token])

  const onGoogleClick = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_ENDPOINT}/authentication/google`
  }

  return (
    <div className='flex items-center md:max-h-screen overflow-auto'>
      <div className='p-4 md:py-0 md:px-8 my-8 lg:my-0'>
        <div className='lg:p-8 flex flex-col justify-center items-center gap-2 lg:gap-4 text-black text-center'>
          <div className='text-2xl md:text-4xl font-bold font-carmine'>
            <p className='mb-2 text-center text-wrap'>Welcome Back!</p>
          </div>
          <h2 className='text-lg mb-2 text-center text-wrap'>
            Sign in for quick access to your bookings and personalized hotel offers.
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <div className='flex flex-col gap-2 lg:gap-4 w-full'>
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
                    isDisabled={isLoading}
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                name='password'
                control={control}
                rules={{
                  required: 'Password is required'
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='password'
                    placeholder='Password'
                    className='border-2 border-gray-400'
                    isDisabled={isLoading}
                    error={errors.password?.message}
                  />
                )}
              />

              <div>
                <div className='flex flex-wrap gap-3 justify-between items-center mb-4'>
                  <Controller
                    name='rememberMe'
                    control={control}
                    render={({ field }) => (
                      <CustomCheckbox
                        {...field}
                        checked={field.value}
                        className='items-center'
                        labelClassName='!text-sm !font-medium mt-1'
                        label={<div>Keep me signed in.</div>}
                        isDisabled={isLoading}
                        error={errors.rememberMe?.message}
                      />
                    )}
                  />
                  <Link href='/forgot-password'>
                    <div className='text-sm font-bold text-primary'>Forgot Password?</div>
                  </Link>
                </div>

                <CustomButton
                  variant='secondary'
                  title='Login'
                  type='submit'
                  className='w-full'
                  isLoading={isLoading}
                />
              </div>

              <div className='divider text-gray-500 my-1'>OR</div>

              <CustomButton
                icon={googleIcon}
                iconPosition='left'
                title='Login with Google'
                variant='light'
                isDisabled={isLoading}
                onClick={onGoogleClick}
              />
            </div>
          </form>

          <p className='text-sm mt-2 text-center text-black'>
            New User?{' '}
            <Link href='/register' className='font-bold text-primary'>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
