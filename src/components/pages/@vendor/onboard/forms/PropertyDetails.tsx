'use client'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomTextArea from '@/components/form/TextareaInput'
import Axios from '@/libs/axios'
import { updateUserProfileURL } from '@/services/APIs/userDetails'
import { toast } from 'sonner'
import PhoneInput from '@/components/form/PhoneInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import FileUpload from '@/components/form/FileUpload'

interface FormData {
  propertyName: string
  email: string
  helpdeskNumber: string
  address: string
  city: string
  registerationDocument: object
}

const PropertyDetails = ({ onNext = () => {}, onPrev = () => {} }) => {
  const { user = {}, setUser, property = {} }: any = userStore()
  const [loading, setLoading] = useState<Boolean>(false)
  const [formLoading, setFormLoading] = useState<Boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    reset, // To reset the form with updated values
    getValues
  } = useForm<FormData>({
    defaultValues: {
      propertyName: property.name || '',
      email: property.email || '',
      helpdeskNumber: property.helpdeskNumber || '',
      address: property.address || '',
      city: property.city || '',
      registerationDocument: property.registerationDocument || ''
    }
  })

  const updateUserProfile = async (data: any) => {
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
      toast.success('Profile Successfully Updated!')
      setUser(res.data)
      return res.data
    } catch (error) {
      console.log('error', error)
    }
  }

  const onSubmit = async (data: any) => {
    setFormLoading(true)
    const updatedPersonalDetailsFields = {} as any
    // Extract the values from getValues
    const formValues = getValues() as any
    Object.keys(dirtyFields || {}).forEach(field => {
      updatedPersonalDetailsFields[field] = formValues?.[field] || ''
    })

    const userDetails = { ...updatedPersonalDetailsFields }

    try {
      if (Object.keys(updatedPersonalDetailsFields).length > 0) {
        await updateUserProfile(userDetails)
      }
      setFormLoading(false)
      onNext()
    } catch (error) {
      console.log('error', error)
      setFormLoading(false)
    }
  }

  // if () {
  //   return <Loader />
  // }
  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-2'>
        Property Details<span className='text-red-600'>*</span>
      </h2>
      <p className='mb-6 text-lg'>
        Please fill in the essential property details to help us showcase your listing effectively to potential guests.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Controller
            name='propertyName'
            control={control}
            rules={{ required: 'Property name is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label='Property Name'
                placeholder='Enter First Name'
                error={errors?.propertyName?.message}
                required
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <TextInput {...field} label='Email' placeholder='Enter email' error={errors?.email?.message} required />
            )}
          />
          <Controller
            name='helpdeskNumber'
            control={control}
            rules={{ required: 'Help-desk Number is required' }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                label='Hotel Help-desk Number'
                placeholder='Enter Help-desk Number'
                error={errors.helpdeskNumber?.message}
                required
              />
            )}
          />
        </div>
        <Controller
          name='address'
          control={control}
          rules={{ required: 'Address is required' }}
          render={({ field }) => (
            <CustomTextArea
              {...field}
              label='Address'
              placeholder='Enter Address'
              error={errors?.address?.message}
              required
            />
          )}
        />
        <Controller
          name='city'
          control={control}
          rules={{ required: 'City is required' }}
          render={({ field }) => (
            <CustomSelect
              {...field}
              label='City'
              options={[
                { label: 'City 1', value: '1' },
                { label: 'City 2', value: '2' }
              ]}
              error={errors?.city?.message}
              required
            />
          )}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-3'>
            <p className='font-bold'>
              Upload Document<span className='text-red-500'>*</span>
            </p>
            <p>Please upload your property registration document to complete your listing verification.</p>
            <div className='flex justify-between'>
              <span className='text-muted'>Only support .jpg, .png files</span>
              <CustomButton
                variant='default'
                title='Delete'
                className='text-red-500'
                icon={<FontAwesomeIcon icon={faTrash} />}
                ImageIcon={false}
              />
            </div>
          </div>
          <div>
            <FileUpload />
          </div>
        </div>

        <div className='flex items-center space-x-2'>
          <CustomButton
            title='Back'
            variant='default'
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            ImageIcon={false}
            iconPosition='left'
            className='mt-6'
            onClick={onPrev}
          />
          <CustomButton
            // isDisabled={!isDirty && !photoUpdated} // Enable if form is dirty or photo updated
            type='submit'
            isLoading={Boolean(loading || formLoading)}
            title='Continue'
            variant='primary'
            className='mt-6 min-w-44'
          />
        </div>
      </form>
    </div>
  )
}

export default PropertyDetails
