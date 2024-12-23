'use client'

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomTextArea from '@/components/form/TextareaInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'sonner'
import Modal from '@/components/UI/Modal'
import MerchatDeclaration from '../MerchatDeclaration'

interface FormData {
  accountHolderName: string
  accountNumber: string
  accountType: string
  bankName: string
  bankAddress: string
  swiftCode: string
}

const BankDetails = ({ onNext = () => {}, onPrev = () => {} }) => {
  const { property = {} }: any = userStore()
  const [formLoading, setFormLoading] = useState<Boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      accountHolderName: property.accountHolderName || '',
      accountNumber: property.accountNumber || '',
      accountType: property.accountType || '',
      bankName: property.bankName || '',
      bankAddress: property.bankAddress || '',
      swiftCode: property.swiftCode || ''
    }
  })

  const onSubmit = async (data: FormData) => {
    setFormLoading(true)
    try {
      // Mock submission
      console.log('Bank Details Submitted:', data)
      toast.success('Bank details successfully submitted!')
      setFormLoading(false)
      onNext()
    } catch (error) {
      console.error('Error submitting bank details:', error)
      setFormLoading(false)
    }
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
            name='accountHolderName'
            control={control}
            rules={{ required: "Account holder's name is required" }}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Account Holder's Name"
                placeholder="Enter Account Holder's Name"
                error={errors?.accountHolderName?.message}
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
                  { label: 'Savings', value: 'savings' },
                  { label: 'Current', value: 'current' }
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
          name='bankAddress'
          control={control}
          rules={{ required: 'Bank address is required' }}
          render={({ field }) => (
            <CustomTextArea
              {...field}
              label='Bank Address'
              placeholder='Enter Address'
              error={errors?.bankAddress?.message}
              required
            />
          )}
        />

        {/* SWIFT Code */}
        <Controller
          name='swiftCode'
          control={control}
          rules={{ required: 'SWIFT code is required' }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='SWIFT Code'
              className='md:w-1/2'
              placeholder='Enter Code'
              error={errors?.swiftCode?.message}
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
            isLoading={!!formLoading}
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
