'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomDateInput from '@/components/form/DateField'
import CustomRadio from '@/components/form/RadioGroup'
import CustomTextArea from '@/components/form/TextareaInput'
import PassportForm from './PassportForm'
import ProfilePhotoModal from '@/components/common/ProfilePhotoModal'
import Modal from '@/components/UI/Modal'
import Axios from '@/libs/axios'
import {
  addUserPassportDataURL,
  getUserPassportDetailsURL,
  updateUserPassportDetailsURL,
  updateUserProfileURL
} from '@/services/APIs/userDetails'
import { getImage } from '@/utils/helper'
import { LOGGED_USER_PROVIDER_TYPE } from '@/libs/constants'
import { toast } from 'sonner'
import PhoneInput from '@/components/form/PhoneInput'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { resendOTPURL, verifyOTP_URL } from '@/services/APIs/user'
import { sendOTPURL } from '@/services/APIs/vendor'
import OTPInput from '@/components/form/OtpInput'

interface FormData {
  personalDetails: {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    dob: string
    nationality: string
    gender: string
    address: string
  }
  passportDetails: {
    issuingCountry: string
    passportNumber: string
    expiryDate: string
    agreedPolicy: boolean
    firstName: string
    lastName: string
  }
}
interface PassportDetailsProps {
  issuingCountry: string
  passportNumber: string
  expiryDate: string
  agreedPolicy: boolean
  firstName: string
  lastName: string
}

const defaultTimer = 120 // 2 Minute

const PersonalDetails = () => {
  const { user, setUser, updateUserProfile: fetchUpdatedUser }: any = userStore()
  const [loading, setLoading] = useState<Boolean>(false)
  const [formLoading, setFormLoading] = useState<Boolean>(false)
  const [passportDetails, setPassportDetails] = useState<PassportDetailsProps | null>(null)
  const [photoUpdated, setPhotoUpdated] = useState<Boolean>(false)

  const [verifyLoading, setVerifyLoading] = useState<Boolean>(false)
  const [verifyNumber, setVerifyNumber] = useState<Boolean>(false)
  const [otp, setOTP] = useState('')

  const [resendLoading, setResendLoading] = useState(false)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [timer, setTimer] = useState(defaultTimer)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    reset, // To reset the form with updated values
    getValues,
    setFocus
  } = useForm<FormData>({
    defaultValues: {
      personalDetails: {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        dob: (user?.dob && dayjs(new Date(user?.dob)).format('YYYY-MM-DD')) || '',
        nationality: user?.nationality || '',
        gender: user?.gender || '',
        address: user?.address || ''
      },
      passportDetails: {
        issuingCountry: 'india',
        passportNumber: '',
        expiryDate: '',
        agreedPolicy: false,
        firstName: '',
        lastName: ''
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

  const addorUpdateUserPassportDetails = async (data: any) => {
    try {
      const apiURL = passportDetails ? updateUserPassportDetailsURL : addUserPassportDataURL
      const { data: res }: any = await Axios({ ...apiURL, data })
      if (res) {
        toast.success('Passport details Saved!')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const onChangeNumber = () => {
    setVerifyNumber(false)
    setFocus('personalDetails.phoneNumber')
  }

  // Countdown Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    } else {
      setIsResendDisabled(false) // Enable resend button when timer reaches 0
    }

    return () => clearInterval(interval) // Cleanup on unmount
  }, [isResendDisabled, timer])

  const onVerifyNumber = async () => {
    setVerifyLoading(true)
    try {
      const { data }: any = await Axios({
        ...verifyOTP_URL,
        data: {
          userId: user._id,
          type: 'phoneNumber',
          otp: otp
        }
      })
      toast.success(data.message)
      setVerifyNumber(false)
      fetchUpdatedUser()
    } catch (error) {
      console.log('error', error)
    } finally {
      setVerifyLoading(false)
    }
  }

  const sendNumberOTP = async () => {
    try {
      const { data }: any = await Axios({
        ...sendOTPURL,
        data: {
          userId: user._id,
          type: 'phoneNumber'
        }
      })
      toast.success(data.message)
      setVerifyNumber(true)
      setTimer(defaultTimer)
      setIsResendDisabled(true)
    } catch (error) {
      console.log('error', error)
    }
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
    Object.keys(dirtyFields.passportDetails || {}).forEach(field => {
      updatedPassportDetailsFields[field] = formValues?.passportDetails[field] || ''
    })

    const userDetails = { ...updatedPersonalDetailsFields }

    try {
      if (Object.keys(updatedPersonalDetailsFields).length > 0) {
        await updateUserProfile(userDetails)
      }
      if (Object.keys(updatedPassportDetailsFields).length > 0) {
        await addorUpdateUserPassportDetails(updatedPassportDetailsFields)
      }
      !user.isNumberVerified && sendNumberOTP()
      setFormLoading(false)
    } catch (error) {
      console.log('error', error)
      setFormLoading(false)
    }
  }

  const fetchUserPassportDetails = async () => {
    setLoading(true)
    try {
      const { data: res }: any = await Axios({ ...getUserPassportDetailsURL })
      setPassportDetails(res.data)
      setLoading(false)
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUserPassportDetails()
  }, [])

  // Update form fields once passport details are available
  useEffect(() => {
    if (passportDetails) {
      reset({
        personalDetails: {
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.email || '',
          phoneNumber: user?.phoneNumber || '',
          dob: (user.dob && dayjs(new Date(user?.dob)).format('YYYY-MM-DD')) || '',
          nationality: user?.nationality || '',
          gender: user?.gender || '',
          address: user?.address || ''
        },
        passportDetails: {
          issuingCountry: passportDetails.issuingCountry || '',
          passportNumber: passportDetails.passportNumber || '',
          expiryDate:
            (passportDetails.expiryDate && dayjs(new Date(passportDetails.expiryDate)).format('YYYY-MM-DD')) || '',
          agreedPolicy: passportDetails.agreedPolicy || false,
          firstName: passportDetails.firstName || '',
          lastName: passportDetails.lastName || ''
        }
      })
    }
  }, [passportDetails, user, reset])

  const onResendOTP = async () => {
    try {
      if (resendLoading) return
      setResendLoading(true)
      const { data }: any = await Axios({ ...resendOTPURL, data: { userId: user._id, type: 'phoneNumber' } })
      toast.success(data.message || 'OTP has been resend successfully!')
      setTimer(defaultTimer)
      setIsResendDisabled(true)
    } catch (error) {
      console.error(error)
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-2'>
        Personal Details<span className='text-red-600'>*</span>
      </h2>
      <p className='mb-6 text-lg'>
        Explore the most popular destinations in Libya and beyond! Whether you're looking for a city escape or a coastal
        retreat, here are the top locations our travelers love:
      </p>

      <div className='flex flex-col md:flex-row gap-5 lg:gap-0 justify-between items-start lg:items-center lg:space-x-4 mb-6'>
        <div className='flex items-center space-x-4'>
          <div className='w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden'>
            {user?.profilePicture ? (
              <img
                src={
                  user.authProviders.length === 1 && user.authProviders.includes(LOGGED_USER_PROVIDER_TYPE.google)
                    ? user.profilePicture
                    : getImage(user.profilePicture)
                }
                alt='User'
                className='w-full h-full object-cover'
              />
            ) : (
              <FontAwesomeIcon icon={faUser} />
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
                ref={field.ref}
                label='Contact - Number'
                placeholder='Enter Number'
                error={errors.personalDetails?.phoneNumber?.message}
                required
              />
            )}
          />
          <Controller
            name='personalDetails.dob'
            control={control}
            rules={{ required: 'Date of Birth is required' }}
            render={({ field }) => (
              <CustomDateInput
                {...field}
                label='Date of Birth'
                placeholder='Enter Date of Birth'
                error={errors?.personalDetails?.dob?.message}
                required
                disableFuture={true} // This disables future dates
              />
            )}
          />
          <Controller
            name='personalDetails.nationality'
            control={control}
            rules={{ required: 'Nationality is required' }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label='Nationality'
                options={[
                  { label: 'India', value: 'india' },
                  { label: 'USA', value: 'usa' }
                ]}
                error={errors?.personalDetails?.nationality?.message}
                required
              />
            )}
          />
        </div>

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
        <Controller
          name='personalDetails.address'
          control={control}
          rules={{ required: 'Address is required' }}
          render={({ field }) => (
            <CustomTextArea
              {...field}
              label='Address'
              placeholder='Enter Address'
              error={errors?.personalDetails?.address?.message}
              required
            />
          )}
        />

        <PassportForm control={control} errors={errors} fieldPrefix='passportDetails' />

        <Modal
          id='upload-profile-photo'
          modalClass='p-0'
          body={
            <ProfilePhotoModal
              defaultImage={
                user.authProviders.length === 1 && user.authProviders.includes(LOGGED_USER_PROVIDER_TYPE.google)
                  ? user.profilePicture
                  : getImage(user.profilePicture)
              }
            />
          }
        />

        <div>
          <CustomButton
            isDisabled={!isDirty && !photoUpdated} // Enable if form is dirty or photo updated
            type='submit'
            isLoading={Boolean(loading || formLoading)}
            title='Save Details'
            variant='primary'
            className='mt-6 min-w-44 w-full md:w-auto'
          />
        </div>
      </form>
      {verifyNumber && (
        <div className='container mx-auto bg-white pt-8 rounded-lg'>
          <h2 className='text-2xl font-bold mb-2'>Verify Phone Number</h2>
          <p className='mb-6 text-lg'>
            Please enter the One Time Password (OTP) that has been sent to the phone no.{' '}
            {getValues('personalDetails.phoneNumber')}
          </p>
          <div className='flex justify-between flex-wrap items-center gap-2'>
            <div>
              <OTPInput onComplete={otp => setOTP(otp)} />
              <p className='text-base mt-2 text-center'>
                Didn’t receive the OTP?{' '}
                <span
                  className={`font-bold text-primary cursor-pointer ${isResendDisabled ? 'opacity-50' : ''}`}
                  onClick={!resendLoading && !isResendDisabled ? onResendOTP : undefined}
                >
                  {resendLoading ? 'Loading...' : 'Resend OTP'}
                  {isResendDisabled && ` in ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}
                </span>
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <CustomButton title='Change Number' variant='default' onClick={onChangeNumber} />
              <CustomButton
                title='Verify Number'
                isLoading={!!verifyLoading}
                isDisabled={!!verifyLoading}
                onClick={onVerifyNumber}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalDetails
