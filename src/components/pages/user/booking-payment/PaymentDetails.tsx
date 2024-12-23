'use client'
import CustomButton from '@/components/common/CustomButton'
import CustomRadio from '@/components/form/RadioGroup'
import Axios from '@/libs/axios'
import { STRIPE_PUBLISHABLE_KEY } from '@/libs/constants'
import { bookingURL, updateUserBookingURL } from '@/services/APIs/booking'
import {loadStripe} from "@stripe/stripe-js"
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

export default function PaymentDetails() {
  const params = useParams();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null) // Store selected payment method

  const handlePaymentClick = async () => {
    try {
      const payload = {
        paymentMethod: paymentMethod || '' // Use the selected payment method
      }
      const res: any = await Axios({ ...updateUserBookingURL(params.id), data: payload })
      if(res){  
        const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY || '')
        const response: any = await Axios({ ...bookingURL, data: {
          id: params.id
        } })
        const resp = stripe?.redirectToCheckout({
          sessionId: response.data.data.id
        })
      }
      console.log('res', res)
    } catch (error) {
      console.log('error', error)
    }
  }

  const onChange = (value: string) => {
    setPaymentMethod(value) // Update state with selected payment method
  }

  return (
    <div className='space-y-4'>
      <h1 className='text-xl font-bold'>Payment Details</h1>
      <div className='bg-gray-100 rounded-lg p-4'>
        <CustomRadio
          label='How do you want to Pay?'
          value={paymentMethod} // Pass the current selected payment method
          options={[
            { label: 'COD', value: 'cash_on_delivery' },
            { label: 'NetBanking', value: 'net-banking' },
            { label: 'Debit/Credit Card', value: 'card' }
          ]}
          onChange={onChange} // Handle changes to payment method
          required
        />
      </div>
      <div>
        <CustomButton title='Make Payment' className='min-w-40' onClick={handlePaymentClick} />
      </div>
    </div>
  )
}
