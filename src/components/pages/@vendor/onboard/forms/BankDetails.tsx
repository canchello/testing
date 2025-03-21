'use client'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomTextArea from '@/components/form/TextareaInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'sonner'
import Modal from '@/components/UI/Modal'
import MerchatDeclaration from '../MerchatDeclaration'
import { bankDetailsURL, createBankDetailsURL } from '@/services/APIs/vendor'
import Axios from '@/libs/axios'
import { BANK_ACCOUNT_TYPES } from '@/libs/constants'
import { useRouter } from 'next/navigation'
import userStore from '@/stores/userStore'
import { useMount } from 'react-use'
import Loader from '@/components/common/Loader'

interface FormData {
  holderName: string
  accountNumber: string
  accountType: string
  bankName: string
  address: string
  IFSC: string
}

const BankDetails = ({ onNext = () => {}, onPrev = () => {} }) => {
  const router = useRouter()
  const { user, updateUserProfile }: any = userStore()
  const [submitLoading, setSubmitLoading] = useState<Boolean>(false)
  const [formLoading, setFormLoading] = useState<Boolean>(false)

  const { bankDetails = {} } = user

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      holderName: bankDetails.holderName || '',
      accountNumber: bankDetails.accountNumber || '',
      accountType: bankDetails.accountType || BANK_ACCOUNT_TYPES.CURRENT,
      bankName: bankDetails.bankName || '',
      address: bankDetails.address || '',
      IFSC: bankDetails.IFSC || ''
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitLoading(true)
      const { data: res }: any = await Axios({
        ...createBankDetailsURL,
        data
      })
      await updateUserProfile()
      toast.success('Bank details successfully submitted!')
      router.push('/vendor/dashboard')
    } catch (error) {
      console.error('Error submitting bank details:', error)
    } finally {
      setSubmitLoading(false)
    }
  }

  useMount(async () => {
    try {
      setFormLoading(true)
      // fetch rules
      const { data: bankData }: any = await Axios({
        ...bankDetailsURL,
        data: { query: { propertyId: user?.primaryProperty?._id } }
      })
      reset(bankData?.data || null)
    } catch (error) {
      console.error(error)
    } finally {
      setFormLoading(false)
    }
  })

  if (formLoading) {
    return <Loader />
  }
  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-2'>
        Bank Details<span className='text-red-600'>*</span>
      </h2>
      <p className='mb-6 text-lg'>Please fill in your bank details to ensure smooth and timely payments.</p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        {/* Form Fields */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Account Holder's Name */}
          <Controller
            name='holderName'
            control={control}
            rules={{ required: "Account holder's name is required" }}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Account Holder's Name"
                placeholder="Enter Account Holder's Name"
                error={errors?.holderName?.message}
                required
              />
            )}
          />

          {/* Account Number */}
          <Controller
            name='accountNumber'
            control={control}
            rules={{ required: 'Account number is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label='Account Number'
                placeholder='Enter your Account Number'
                error={errors?.accountNumber?.message}
                required
              />
            )}
          />

          {/* Account Type */}
          <Controller
            name='accountType'
            control={control}
            rules={{ required: 'Account type is required' }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label='Account Type'
                options={[
                  { label: 'Savings', value: BANK_ACCOUNT_TYPES.SAVING },
                  { label: 'Current', value: BANK_ACCOUNT_TYPES.CURRENT }
                ]}
                // placeholder="Select Account Type"
                error={errors?.accountType?.message}
                required
              />
            )}
          />

          {/* Bank Name */}
          <Controller
            name='bankName'
            control={control}
            rules={{ required: 'Bank name is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label='Bank Name'
                placeholder='Enter Bank Name'
                error={errors?.bankName?.message}
                required
              />
            )}
          />
        </div>

        {/* Bank Address */}
        <Controller
          name='address'
          control={control}
          rules={{ required: 'Bank address is required' }}
          render={({ field }) => (
            <CustomTextArea
              {...field}
              label='Bank Address'
              placeholder='Enter Address'
              error={errors?.address?.message}
              required
            />
          )}
        />

        {/* SWIFT Code */}
        <Controller
          name='IFSC'
          control={control}
          rules={{ required: 'SWIFT code is required' }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='SWIFT Code'
              className='md:w-1/2'
              placeholder='Enter Code'
              error={errors?.IFSC?.message}
              required
            />
          )}
        />

        {/* Action Buttons */}
        <div className='flex items-center space-x-4'>
          <CustomButton
            title='Back'
            variant='default'
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={onPrev}
            iconPosition='left'
            ImageIcon={false}
            className='mt-6'
          />

          <CustomButton
            type='submit'
            isLoading={!!submitLoading}
            title='Submit'
            variant='primary'
            className='mt-6 min-w-44'
          />
        </div>
      </form>
      <Modal id='confirm-onboard-merchat' modalClass='p-0' body={<MerchatDeclaration />} />
    </div>
  )
}

export default BankDetails
