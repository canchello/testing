'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
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
import LOCAL_STORAGE_CONSTANTS from '@/constants/localstorage'
import { useMount } from 'react-use'
import { getSubdomain, routeToUserDomain } from '@/utils/helper'
import { USER_ROLES } from '@/libs/constants'

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser, fetchUserProfile, getProfileMe }: any = userStore()
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
      const subdomain = getSubdomain()
      if (
        res.status === 1 &&
        ((res.data?.role === USER_ROLES.USER && subdomain) ||
          (res.data?.role === USER_ROLES.VENDOR && subdomain !== 'vendor') ||
          (res.data?.role === USER_ROLES.ADMIN && subdomain !== 'admin'))
      ) {
        return toast.error(
          `You're registered as ${res.data?.role}, Please make sure to login thorugh ${res.data?.role} portal`
        )
      }
      if (res.status === 1) {
        setUser(res.data)
        await fetchUserProfile(localStorage.getItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN))
        toast.success(`Welcome! ${res.data.firstName || res.data.email}` || `Welcome! You've logged In.`)
        Cookies.set('token', res.data.token, {})
        routeToUserDomain()
        router.push('/')
      } else if (res.status === 2) {
        toast.success(res.message)
        router.push(`/admin/verify-email?id=${res.data?.userId || ''}`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useMount(async () => {
    const token = searchParams.get('token') || ''
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN, token)
      getProfileMe()
      // fetchUserProfile(token).then(() => {
      //   router.push('/')
      // })
    }
  })

  const onGoogleClick = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_ENDPOINT}/authentication/google`
  }

  return (
    <div className='md:w-1/2 h-full md:p-4 md:max-h-screen overflow-auto z-20'>
      <div className='lg:p-8 h-full flex flex-col justify-center items-center gap-2 lg:gap-4 text-black text-center bg-white rounded-lg'>
        <div className='text-2xl md:text-4xl font-bold font-carmine'>
          <p className='mb-2 text-center text-wrap'>Welcome Back!</p>
        </div>
        <h2 className='text-lg mb-2 text-center text-wrap'>
          Log in for quick access to your listings and tailored insights for your property.
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
                <Link href='/admin/forgot-password'>
                  <div className='text-sm font-bold text-primary'>Forgot Password?</div>
                </Link>
              </div>

              <CustomButton variant='secondary' title='Login' type='submit' className='w-full' isLoading={isLoading} />
            </div>
          </div>
        </form>

        {/* <p className='text-sm mt-2 text-center text-black'>
          New User?{' '}
          <Link href='/vendor/register' className='font-bold text-primary'>
            Create Account
          </Link>
        </p> */}
      </div>
    </div>
  )
}

export default LoginForm
