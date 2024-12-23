import TextInput from '@/components/form/LabelInput'
import CustomTextArea from '@/components/form/TextareaInput'
import React from 'react'
import { Controller } from 'react-hook-form'

export default function UserForm({ control, errors }: any) {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Controller
          name='user.firstName'
          control={control}
          rules={{ required: 'First Name is required' }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='First name'
              placeholder='Enter First Name'
              error={errors?.user?.firstName?.message}
              required
            />
          )}
        />
        <Controller
          name='user.lastName'
          control={control}
          rules={{ required: 'Last Name is required' }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='Last name'
              placeholder='Enter Last Name'
              error={errors?.user?.lastName?.message}
              required
            />
          )}
        />
        <Controller
          name='user.email'
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              // value={user.email}
              label='Email Address'
              error={errors?.user?.email?.message}
              placeholder='Enter Email Address'
              required
            />
          )}
        />
        <Controller
          name='user.contact'
          control={control}
          rules={{ required: 'Contact number is required' }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='Contact Number'
              placeholder='Enter Contact Number'
              error={errors?.user?.contact?.message}
              required
            />
          )}
        />
        <div className='md:col-span-2'>
          <Controller
            name='specialRequest'
            control={control}
            render={({ field }) => (
              <CustomTextArea
                {...field}
                label='Special Request'
                placeholder='Tell us more about your request...'
                error={errors?.specialRequest?.message}
                required
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
