'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import Axios from '@/libs/axios'
import { updateUserProfileURL } from '@/services/APIs/userDetails'
import { toast } from 'sonner'
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

const PropertyImages = ({ onNext = () => {}, onPrev = () => {} }) => {
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
        Property Images<span className='text-red-600'>*</span>
      </h2>
      <p className='mb-6 text-lg'>Show us how your place look like</p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <div className='bg-custom-orange rounded-lg p-4'>
              <div className='space-y-4'>
                <div className=''>
                  <label className='text-xl font-bold'>
                    Media Upload
                    <span className='text-red-500'>*</span>
                  </label>
                  <p>Add your images here, and you can upload upto 5 images.</p>
                </div>
                <div className='bg-white rounded-lg'>
                  <FileUpload />
                </div>
                <p className='text-muted'>Only support .jpg, .png files</p>
              </div>
              <div className='divider text-muted'>OR</div>
              <div className='space-y-3'>
                <label className='text-xl font-bold'>
                  Upload from URL
                  <span className='text-red-500'>*</span>
                </label>
                <div className='bg-white p-2 rounded-lg'>https://sharefile.com/file.jpg</div>
                <CustomButton variant='secondary' title='Upload' />
              </div>
            </div>
          </div>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {[...Array(6)].map((item, index) => {
                return (
                  <div key={index} className='relative bg-base-200 rounded-lg p-4 h-40'>
                    <FontAwesomeIcon icon={faTrash} className='absolute text-muted right-4' />
                  </div>
                )
              })}
            </div>
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

export default PropertyImages
