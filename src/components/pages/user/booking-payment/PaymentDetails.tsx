'use client'
import CustomButton from '@/components/common/CustomButton'
import CustomCheckbox from '@/components/form/CheckBox'
import CustomRadio from '@/components/form/RadioGroup'
import Axios from '@/libs/axios'
import { PAYMENT_METHOD, PAYMENT_STATUS } from '@/libs/constants'
import { bookingURL, updateUserBookingURL } from '@/services/APIs/booking'
import hotelStore from '@/stores/hotelStore'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

export default function PaymentDetails({
  useWalletBalance,
  setUseWalletBalance,
  wallet,
  bookingDetails,
  couponCode
}: any) {
  const router = useRouter()
  const params = useParams()
  const { resetState }: any = hotelStore()
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null) // Store selected payment method

  const handlePaymentClick = async () => {
    if (!paymentMethod) return toast.error('Please select any payment method')
    try {
      const payload = {
        paymentMethod: paymentMethod || '', // Use the selected payment method
        couponCode,
        useWalletBalance
      }
      const res: any = await Axios({ ...updateUserBookingURL(params.id), data: payload })
      if (res.data.data.booking?.status === PAYMENT_STATUS.PENDING) {
        window.open(res?.data?.data?.session_url, '_self')
      }
      if (res.data.data?.booking?.status === PAYMENT_STATUS.CONFIRMED) {
        return router.push(`/booking/${params.id}/confirmation`)
      }
      resetState()
      localStorage.removeItem('hotel-store')
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
        {bookingDetails && (
          <div>
            <div className='flex justify-between'>
              <span>Booking Amount</span>
              <span>{bookingDetails.originalPrice ? `$${bookingDetails.originalPrice.toFixed(2)}` : '-'}</span>
            </div>
            <div className='flex justify-between '>
              <p>Platform Fee</p>
              <p className=''>{bookingDetails.platformCharge ? `$${bookingDetails.platformCharge.toFixed(2)}` : '-'}</p>
            </div>
            <div className='flex justify-between text-success'>
              <p>Discount</p>
              <p className=''>
                {bookingDetails.discountAmount ? `- $${bookingDetails.discountAmount.toFixed(2)}` : '-'}
              </p>
            </div>
            <div className='flex justify-between font-bold  mt-4'>
              <p>Billing Amount</p>
              <p className=''>
                {bookingDetails.totalPrice
                  ? `$${(bookingDetails.totalPrice + bookingDetails.platformCharge).toFixed(2)}`
                  : '-'}
              </p>
            </div>
          </div>
        )}
        <div className='divider' />
        <CustomRadio
          label='How do you want to Pay?'
          value={paymentMethod} // Pass the current selected payment method
          options={[
            { label: 'COD', value: PAYMENT_METHOD.CASH_ON_DELIVERY },
            // { label: 'NetBanking', value: PAYMENT_METHOD.NET_BANKING },
            { label: 'Debit/Credit Card', value: PAYMENT_METHOD.DEBIT_CREDIT_CARD }
          ]}
          onChange={onChange} // Handle changes to payment method
          required
        />
        <CustomCheckbox
          checked={useWalletBalance}
          className='mt-6'
          labelClass='p-0'
          isDisabled={!wallet?.amount}
          onChange={(val: boolean) => setUseWalletBalance(val)}
          label={
            <p className='text-base font-normal'>
              Use Wallet Balance (${(wallet?.amount ? wallet.amount : 0).toFixed(2)})
            </p>
          }
        />
      </div>
      <div>
        <CustomButton title='Make Payment' className='min-w-40' onClick={handlePaymentClick} />
      </div>
    </div>
  )
}
