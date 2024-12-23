'use client'

import React, { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomRadio from '@/components/form/RadioGroup'
import ProfilePhotoModal from '@/components/common/ProfilePhotoModal'
import Modal from '@/components/UI/Modal'
import Axios from '@/libs/axios'
import { updateUserProfileURL } from '@/services/APIs/userDetails'
import Loader from '@/components/common/Loader'
import { getImage } from '@/utils/helper'
import { LOGGED_USER_PROVIDER_TYPE } from '@/libs/constants'
import { toast } from 'sonner'
import PhoneInput from '@/components/form/PhoneInput'
import OTPInput from '@/components/form/OtpInput'

interface FormData {
  personalDetails: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    gender: string
    designation: string
  }
}

const PersonalDetails = ({ onNext = () => {} }) => {
  const { user = {}, setUser }: any = userStore()
  const [loading, setLoading] = useState<Boolean>(false)
  const [formLoading, setFormLoading] = useState<Boolean>(false)
  const [verifyLoading, setVerifyLoading] = useState<Boolean>(false)
  const phoneNumber = useRef()
  const [photoUpdated, setPhotoUpdated] = useState<Boolean>(false)
  const [verifyNumber, setVerifyNumber] = useState<Boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setFocus,
    reset, // To reset the form with updated values
    getValues
  } = useForm<FormData>({
    defaultValues: {
      personalDetails: {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        gender: user?.gender || '',
        designation: user?.designation || ''
      }
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
      setPhotoUpdated(false)
      return res.data
    } catch (error) {
      console.log('error', error)
    }
  }

  const onChangeNumber = () => {
    setVerifyNumber(false)
    setFocus('personalDetails.phoneNumber')
  }

  const onVerifyNumber = () => {
    setVerifyLoading(true)
    // add verify number logic
    setVerifyLoading(false)
    onNext()
  }

  const sendNumberOTP = () => {
    setVerifyNumber(true)
  }

  const onSubmit = async (data: any) => {
    setFormLoading(true)
    const updatedPersonalDetailsFields = {} as any
    const updatedPassportDetailsFields = {} as any
    // Extract the values from getValues
    const formValues = getValues() as any
    Object.keys(dirtyFields.personalDetails || {}).forEach(field => {
      updatedPersonalDetailsFields[field] = formValues?.personalDetails[field] || ''
    })

    const userDetails = { ...updatedPersonalDetailsFields }

    try {
      if (Object.keys(updatedPersonalDetailsFields).length > 0) {
        await updateUserProfile(userDetails)
      }
      setFormLoading(false)
      sendNumberOTP()
      // onNext()
    } catch (error) {
      console.log('error', error)
      setFormLoading(false)
    }
  }

  // if () {
  //   return <Loader />
  // }
  return (
    <div className='space-y-4'>
      <div className='container mx-auto bg-white p-8 rounded-lg'>
        <h2 className='text-2xl font-bold mb-2'>
          Personal Details<span className='text-red-600'>*</span>
        </h2>
        <p className='mb-6 text-lg'>
          Please provide the basic contact details for the vendor or main point of contact for this property to ensure
          smooth communication and support.
        </p>

        <div className='flex justify-between items-center space-x-4 mb-6'>
          <div className='flex items-center space-x-4'>
            <div className='w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden'>
              {user?.profilePicture ? (
                <img src={getImage(user.profilePicture)} alt='User' className='w-full h-full object-cover' />
              ) : user?.profilePicture ? (
                <img
                  src={
                    user.authProviders[0] === LOGGED_USER_PROVIDER_TYPE.google
                      ? user.profilePicture
                      : getImage(user.profilePicture)
                  }
                  alt='User'
                  className='w-full h-full object-cover'
                />
              ) : (
                <span className='text-gray-500'>
                  {user?.firstName || user?.lastName
                    ? (user.firstName || '') + ' ' + (user?.lastName || '')
                    : (user.email || '').split('@')[0]}
                </span>
              )}
            </div>
            <div>
              <p className='text-lg font-medium'>
                {user?.firstName || user?.lastName
                  ? user.firstName + ' ' + user?.lastName
                  : (user.email || '').split('@')[0]}
              </p>
              <p className='text-sm text-gray-500'>{user.email}</p>
            </div>
          </div>
          <CustomButton
            variant='secondary'
            className='justify-items-end !p-0'
            title={
              <label className='px-6 py-2 cursor-pointer' htmlFor='upload-profile-photo'>
                Upload Photo
              </label>
            }
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Controller
              name='personalDetails.firstName'
              control={control}
              rules={{ required: 'First Name is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='First name'
                  placeholder='Enter First Name'
                  error={errors?.personalDetails?.firstName?.message}
                  required
                />
              )}
            />
            <Controller
              name='personalDetails.lastName'
              control={control}
              rules={{ required: 'Last Name is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Last name'
                  placeholder='Enter Last Name'
                  error={errors?.personalDetails?.lastName?.message}
                  required
                />
              )}
            />
            <Controller
              name='personalDetails.email'
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  isDisabled
                  value={user.email}
                  label='Email Address'
                  placeholder='Enter Email Address'
                />
              )}
            />
            <Controller
              name='personalDetails.phoneNumber'
              control={control}
              rules={{ required: 'Contact number is required' }}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  label='Contact - Number'
                  placeholder='Enter Number'
                  error={errors.personalDetails?.phoneNumber?.message}
                  required
                />
              )}
            />
            <Controller
              name='personalDetails.gender'
              control={control}
              rules={{ required: 'Gender is required' }}
              render={({ field }) => (
                <CustomRadio
                  {...field}
                  label='Gender'
                  options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Prefer not to say', value: 'NA' }
                  ]}
                  error={errors?.personalDetails?.gender?.message}
                  required
                />
              )}
            />
          </div>
          <Controller
            name='personalDetails.designation'
            control={control}
            rules={{ required: 'Designation is required' }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label='Designation'
                options={[
                  { label: 'Owner', value: 'owner' },
                  { label: 'Manager', value: 'manager' }
                ]}
                error={errors?.personalDetails?.designation?.message}
                required
              />
            )}
          />

          <Modal
            id='upload-profile-photo'
            modalClass='p-0'
            body={
              <ProfilePhotoModal
                defaultImage={
                  user?.authProviders?.[0] === LOGGED_USER_PROVIDER_TYPE.google
                    ? user?.profilePicture
                    : getImage(user.profilePicture)
                }
              />
            }
          />

          <div>
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
      {verifyNumber && (
        <div className='container mx-auto bg-white p-8 rounded-lg'>
          <h2 className='text-2xl font-bold mb-2'>Verify Phone Number</h2>
          <p className='mb-6 text-lg'>
            Please enter the One Time Password (OTP) that has been sent to the phone no.{' '}
            {getValues('personalDetails.phoneNumber')}
          </p>
          <div className='flex justify-between flex-wrap items-center gap-2'>
            <OTPInput onComplete={() => {}} />
            <div className='flex items-center gap-2'>
              <CustomButton title='Change Number' variant='default' onClick={onChangeNumber} />
              <CustomButton title='Verify Number' onClick={onVerifyNumber} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalDetails
