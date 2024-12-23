'use client'
import CustomButton from '@/components/common/CustomButton'
import TextField from '@/components/form/TextField'
import { Controller, useForm } from 'react-hook-form'
import appStore from '@/stores/appStore'

type FormData = {
  email: string
}

export default function SubscribeUs() {
  const { subscribeEmail, subscribing }: any = appStore()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    subscribeEmail(data)
    setValue('email', '')
  }

  return (
    <div className='flex justify-center items-center bg-custom-orange'>
      <div className='px-4 py-10 w-full max-w-lg'>
        <h2 className='text-center text-2xl font-bold mb-2'>Stay Informed with Our Latest Deals & Travel Tips</h2>
        <p className='text-center mb-4 text-base-content'>Subscribe to get the latest deals and travel tips.</p>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
                isDisabled={subscribing}
                error={errors.email?.message}
              />
            )}
          />
          <CustomButton
            type='submit'
            variant='secondary'
            title='Subscribe'
            className='w-full'
            isLoading={subscribing}
            // isDisabled={subscribing}
          />
        </form>
      </div>
    </div>
  )
}
