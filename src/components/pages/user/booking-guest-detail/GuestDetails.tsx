'use client'

import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userStore from '@/stores/userStore'
import { getUserPassportDetailsURL } from '@/services/APIs/userDetails'
import Axios from '@/libs/axios'
import CustomCheckbox from '@/components/form/CheckBox'
import CustomRadio from '@/components/form/RadioGroup'
import UserForm from './Forms/UserForm'
import PassportForm from './Forms/PassportForm'
import CustomButton from '@/components/common/CustomButton'
import { updateUserBookingURL } from '@/services/APIs/booking'
import { useParams, useRouter } from 'next/navigation'
import dayjs from 'dayjs'

interface FormData {
  specialRequest: string
  travellingForWork: boolean
  termsAndCondition: boolean
  is_subscribed: boolean
  user: {
    firstName: string
    lastName: string
    email: string
    contact: string
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

export default function GuestDetails({ bookingDetails }: any) {
  const { user }: any = userStore()
  const router = useRouter()
  const params = useParams()
  const [autoFill, setAutoFill] = useState(false)
  const [passportDetails, setPassportDetails] = useState<PassportDetailsProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      specialRequest: '',
      travellingForWork: false,
      termsAndCondition: false,
      is_subscribed: false,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        dob: '',
        nationality: '',
        gender: '',
        address: ''
      },
      passport: {
        issuingCountry: '',
        passportNumber: '',
        expiryDate: '',
        agreedPolicy: false,
        firstName: '',
        lastName: ''
      }
    }
  })

  const fetchUserPassportDetails = async () => {
    try {
      const { data: res }: any = await Axios({ ...getUserPassportDetailsURL })
      setPassportDetails(res.data)
    } catch (error) {
      console.error('Error fetching passport details:', error)
    }
  }

  useEffect(() => {
    if (autoFill) {
      fetchUserPassportDetails()
    } else {
      reset({
        specialRequest: '',
        travellingForWork: false,
        termsAndCondition: false,
        is_subscribed: false,
        user: {
          firstName: '',
          lastName: '',
          email: '',
          contact: '',
          dob: '',
          nationality: '',
          gender: '',
          address: ''
        },
        passport: {
          issuingCountry: '',
          passportNumber: '',
          expiryDate: '',
          agreedPolicy: false,
          firstName: '',
          lastName: ''
        }
      }) // Reset to default values when autofill is disabled
    }
  }, [autoFill, reset])

  useEffect(() => {
    if (bookingDetails) {
      reset(prevValues => ({
        ...prevValues,
        ...bookingDetails,
        travellingForWork: bookingDetails?.travellingForWork || false,
        specialRequest: bookingDetails?.specialRequest || '',
        user: {
          ...prevValues.user,
          ...bookingDetails.user,
          dob: bookingDetails.user?.dob?.split('T')[0] || ''
        },
        passportDetails: {
          ...prevValues.passport,
          ...bookingDetails.passportDetails,
          expiryDate:
            (bookingDetails.passport?.expiryDate &&
              dayjs(new Date(bookingDetails.passport?.expiryDate)).format('YYYY-MM-DD')) ||
            ''
        }
      }))
    }
  }, [bookingDetails, reset])

  useEffect(() => {
    if (autoFill && user && passportDetails) {
      reset(prevValues => ({
        ...prevValues,
        user: {
          ...prevValues.user,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          contact: user.contact || '',
          dob: user.dob?.split('T')[0] || '',
          nationality: user.nationality || '',
          gender: user.gender || '',
          address: user.address || ''
        },
        passport: {
          ...prevValues.passport,
          issuingCountry: passportDetails.issuingCountry || '',
          passportNumber: passportDetails.passportNumber || '',
          expiryDate:
            (passportDetails.expiryDate && dayjs(new Date(passportDetails.expiryDate)).format('YYYY-MM-DD')) || '',
          agreedPolicy: passportDetails.agreedPolicy || false,
          firstName: passportDetails.firstName || '',
          lastName: passportDetails.lastName || ''
        }
      }))
    }
  }, [autoFill, user, passportDetails, reset])

  const updateUserBookingDetails = async () => {
    setIsLoading(true)
    const formData = getValues()
    try {
      const response: any = await Axios({ ...updateUserBookingURL(params.id), data: formData })
      if (response.data) {
        router.push(`/booking/${params.id}/payment`)
      }
      setIsLoading(false)
    } catch (error) {
      console.log('error', error)
      setIsLoading(false)
    }
  }

  return (
    <div className='space-y-4'>
      <h1 className='text-xl font-semibold'>Enter Guest Details</h1>
      <div className='bg-gray-100 rounded-lg space-y-4 p-4'>
        <CustomCheckbox
          checked={autoFill}
          label={
            <p className='font-semibold'>
              Select this option if you're booking for yourself to auto-fill your details.
            </p>
          }
          onChange={val => setAutoFill(val)}
        />
        <p>To complete your reservation, please provide the following details:</p>
        <Controller
          name='travellingForWork'
          control={control}
          render={({ field }) => (
            <CustomRadio
              {...field}
              label='Are You Traveling for Work?'
              options={[
                { label: 'Yes', value: true },
                { label: 'No', value: false }
              ]}
            />
          )}
        />
        <UserForm control={control} errors={errors} />
        <PassportForm control={control} errors={errors} fieldPrefix='passport' />
      </div>
      <Controller
        name={'is_subscribed'}
        control={control}
        render={({ field }) => (
          <CustomCheckbox
            {...field}
            checked={field.value}
            className='my-3'
            label={
              <p className='text-base font-normal'>
                Yes, I’d like to receive promotions and special offers via email. Stay updated with the latest deals,
                promotions, and exclusive offers. You can unsubscribe at any time.
              </p>
            }
          />
        )}
      />
      <Controller
        name={'termsAndCondition'}
        control={control}
        render={({ field }) => (
          <CustomCheckbox
            {...field}
            checked={field.value}
            className='my-3'
            label={
              <p className='text-base font-normal'>
                I agree to the
                <span className='text-primary text-link mx-1'>Terms and Conditions</span>
                and <span className='text-primary text-link ml-1'>Privacy Policy</span>. By ticking this box, you
                confirm that you have read and agree to our terms and privacy policies regarding your booking and
                personal data.
              </p>
            }
          />
        )}
      />
      <div>
        <CustomButton
          title='Continue'
          className='min-w-40'
          onClick={handleSubmit(updateUserBookingDetails)}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
