'use client'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomDateInput from '@/components/form/DateField'
import Card1 from '@/assets/images/Card1.png'
import Card2 from '@/assets/images/Card2.png'
import Card3 from '@/assets/images/Card3.png'
import Card4 from '@/assets/images/Card4.png'
import Card5 from '@/assets/images/Card5.png'
import Image from 'next/image'
import Axios from '@/libs/axios'
import { addUserCardDetailsURL } from '@/services/APIs/userDetails'
import { toast } from 'sonner'

interface CardFormData {
  bankName: string
  cardHolderName: string
  cardNumber: string
  expiryDate: string
  cvv: string
}
interface AddCardFormProps {
  setIsCardCreated: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCardForm: React.FC<AddCardFormProps> = ({ setIsCardCreated = () => {} }) => {
  const [loading, setLoading] = useState<Boolean>(false)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CardFormData>({
    defaultValues: {
      bankName: '',
      cardHolderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  })

  const onSubmit = async (data: CardFormData) => {
    setLoading(true)
    try {
      const { data: res }: any = await Axios({ ...addUserCardDetailsURL, data })
      if (res) {
        toast.success('Card Details Successfully Added!')
        setLoading(false)
        setIsCardCreated(true)
      }
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  return (
    <div className='p-6 bg-[#FFF9F0] rounded-lg'>
      <h2 className='text-xl font-bold mb-4'>Add New Card</h2>
      <div className='flex flex-wrap space-x-4 mb-6 items-center'>
        <Image src={Card1} alt='' className='w-12' />
        <Image src={Card2} alt='' className='w-12' />
        <Image src={Card3} alt='' className='w-12' />
        <Image src={Card4} alt='' className='w-12' />
        <Image src={Card5} alt='' className='w-12' />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
          {/* Bank Select */}
          <Controller
            name='bankName'
            control={control}
            rules={{ required: 'Bank is required' }}
            render={({ field }) => (
              <CustomSelect
                disabled={!!loading}
                {...field}
                label='Bank'
                options={[
                  { label: 'HDFC Bank Pvt. Ltd.', value: 'hdfc' },
                  { label: 'ICICI Bank', value: 'icici' },
                  { label: 'SBI', value: 'sbi' }
                ]}
                error={errors.bankName?.message}
                required
              />
            )}
          />

          {/* Cardholder's Name */}
          <Controller
            name='cardHolderName'
            control={control}
            rules={{ required: "Cardholder's name is required" }}
            render={({ field }) => (
              <TextInput
                {...field}
                isDisabled={!!loading}
                label="Cardholder's Name"
                placeholder="Enter Cardholder's Name"
                error={errors.cardHolderName?.message}
                required
              />
            )}
          />

          {/* Card Number */}
          <Controller
            name='cardNumber'
            control={control}
            rules={{ required: 'Card number is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                isDisabled={!!loading}
                label='Card Number'
                placeholder='Enter Card Number'
                error={errors.cardNumber?.message}
                required
                type='number'
              />
            )}
          />

          {/* Expiry Date */}
          <Controller
            name='expiryDate'
            control={control}
            rules={{ required: 'Expiry date is required' }}
            render={({ field }) => (
              <CustomDateInput
                {...field}
                disabled={!!loading}
                label='Expiry Date'
                placeholder='MM/YY'
                error={errors.expiryDate?.message}
                required
              />
            )}
          />

          {/* CVV */}
          <Controller
            name='cvv'
            control={control}
            rules={{ required: 'CVV is required' }}
            render={({ field }) => (
              <TextInput
                isDisabled={!!loading}
                {...field}
                label='CVV'
                placeholder='Enter CVV'
                error={errors.cvv?.message}
                required
              />
            )}
          />
        </div>
        {/* Submit Button */}
        <div className=''>
          <CustomButton isLoading={!!loading} type='submit' title='Save Card Details' className='w-full md:w-auto' variant='primary' />
        </div>
      </form>
    </div>
  )
}

export default AddCardForm
