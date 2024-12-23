'use client'
import CustomButton from '@/components/common/CustomButton'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@/components/form/TextField'
import Axios from '@/libs/axios'
import { changeUserPasswordURL, logoutFromAllDevicesURL } from '@/services/APIs/user'
import { toast } from 'sonner'

interface FormData {
  password: string
  newPassword: string
  confirmPassword: string
}

const Security = () => {
  const [isLoading, setLoading] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const changeUserPassword = async (data: any) => {
    setLoading(true)
    try {
      const response: any = await Axios({ ...changeUserPasswordURL, data: data })
      toast.success('Password successfully changed!')
      setLoading(false)
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  const onSubmit = (data: any) => {
    changeUserPassword(data)
  }

  const signOutFromAllDevices = async () => {
    try {
      setLogoutLoading(true)
      const { data: res }: any = await Axios({ ...logoutFromAllDevicesURL, data: {} })
      toast.success(res?.message || 'logout from other device successfully')
    } catch (error) {
      console.log('error', error)
    } finally {
      setLogoutLoading(false)
    }
  }

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-2'>Security</h2>
      <p className='mb-6 text-lg'>
        Take control of your account's security. Adjust your settings to match your preferences and enhance your
        protection.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <h2 className='text-xl font-bold mb-2'>Reset Password</h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <Controller
            name='password'
            control={control}
            rules={{ required: 'Old Password is required' }}
            render={({ field }) => (
              <div className='flex flex-col gap-2'>
                <label className='text-base font-semibold'>
                  Enter Current Password
                  <span className='text-error'>*</span>
                </label>
                <TextField
                  {...field}
                  type='password'
                  placeholder='Enter Current Password'
                  className='border-gray-400'
                  isDisabled={isLoading}
                  error={errors.password?.message}
                />
              </div>
            )}
          />
          <Controller
            name='newPassword'
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <div className='flex flex-col gap-2'>
                <label className='text-base font-semibold'>
                  Enter new Password
                  <span className='text-error'>*</span>
                </label>
                <TextField
                  {...field}
                  type='password'
                  placeholder='Enter New Password'
                  className='border-gray-400'
                  isDisabled={isLoading}
                  error={errors.newPassword?.message}
                />
              </div>
            )}
          />
          <Controller
            name='confirmPassword'
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: value => value === watch('newPassword') || 'Passwords do not match'
            }}
            render={({ field }) => (
              <div className='flex flex-col gap-2'>
                <label className='text-base font-semibold'>
                  Confirm new Password
                  <span className='text-error'>*</span>
                </label>
                <TextField
                  {...field}
                  type='password'
                  placeholder='Confirm new Password'
                  className='border-gray-400'
                  isDisabled={isLoading}
                  error={errors.confirmPassword?.message}
                />
              </div>
            )}
          />
        </div>

        <div>
          <CustomButton
            isLoading={isLoading}
            type='submit'
            title='Save Password'
            variant='primary'
            className='mt-3 min-w-44 w-full md:w-auto'
          />
        </div>
      </form>

      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0 my-8'>
        <p>Sign out from all the devices except this one. This process will take approx. 10 minutes.</p>
        <CustomButton
          title='Sign Out'
          isLoading={logoutLoading}
          onClick={() => signOutFromAllDevices()}
          variant='secondary'
          className='min-w-40 self-end md:self-auto'
        />
      </div>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0 my-8'>
        <p>Permanently delete your Booking.com account?</p>
        <CustomButton title='Delete Account' variant='error' className='min-w-40 self-end md:self-auto ' />
      </div>
    </div>
  )
}

export default Security
