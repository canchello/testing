'use client'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomSelect from '@/components/form/SelectField'
import ToggleInput from '@/components/UI/ToggleInput'
import Axios from '@/libs/axios'
import { updateUserProfileURL } from '@/services/APIs/userDetails'
import { toast } from 'sonner'

interface FormData {
  preferred_language: string
  preferred_currency: string
}

const Preferences = () => {
  const { user, setUser }: any = userStore()
  const [isLoading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    getValues
  } = useForm<FormData>({
    defaultValues: {
      preferred_language: user?.preferred_language || '',
      preferred_currency: user?.preferred_currency || ''
    }
  })

  const updateUserPreferences = async (data: any) => {
    setLoading(true)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })
    try {
      const { data: res }: any = await Axios({
        ...updateUserProfileURL,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast.success('Preferences Successfully Updated!')
      setLoading(false)
      setUser(res.data)
      return res.data
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  const onSubmit = () => {
    const updatedPreferenceFields = {} as any
    const formValues = getValues() as any
    Object.keys(dirtyFields || {}).forEach(field => {
      updatedPreferenceFields[field] = formValues[field] || ''
    })
    updateUserPreferences(updatedPreferenceFields)
  }

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-2'>Preferences</h2>
      <p className='mb-6 text-lg'>
        Personalize your account to fit your preferences and enhance your experience with us.
      </p>
      <div>
        <ToggleInput
          label={<h1 className='text-lg font-semibold'>Receive Notification from us?</h1>}
          isChecked
          onChange={() => {}}
        />
        <span className='text-base font-normal text-muted'>
          Stay Informed about the latest updates, offers, and news directly to your email and registered phone number.
        </span>
      </div>

      <div className='divider'></div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Controller
            name='preferred_language'
            control={control}
            rules={{ required: 'Language is required' }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label='Language'
                options={[
                  { label: 'Arabic', value: 'arabic' },
                  { label: 'English', value: 'english' }
                ]}
                error={errors.preferred_language?.message}
                required
              />
            )}
          />
          <Controller
            name='preferred_currency'
            control={control}
            rules={{ required: 'Currency is required' }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label='Currency'
                options={[
                  { label: 'American Dollar', value: 'us_dollar' },
                  { label: 'Libyan Dinar', value: 'libyan_dinar' }
                ]}
                error={errors.preferred_currency?.message}
                required
              />
            )}
          />
        </div>

        <div>
          <CustomButton
            type='submit'
            isDisabled={!isDirty}
            isLoading={isLoading}
            title='Save Details'
            variant='primary'
            className='mt-3 min-w-44 w-full md:w-auto'
          />
        </div>
      </form>
    </div>
  )
}

export default Preferences
