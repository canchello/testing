import CustomButton from '@/components/common/CustomButton'
import CustomRadio from '@/components/form/RadioGroup'
import Modal from '@/components/UI/Modal'
import Axios from '@/libs/axios'
import { BOOKING_REFUND_METHOD, BOOKING_STATUS, ROUTES } from '@/libs/constants'
import { cancelBookingURL } from '@/services/APIs/user'
import { calculateDaysAndNights } from '@/utils/helper'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const cancellationFee = 20

export default function HotelCancellation({ booking }: any) {
  const [confirmCancel, setConfirmCancel] = useState(false)
  const roomData = booking.rooms?.[0]

  const { days = 0, nights = 0 } = calculateDaysAndNights(booking.checkIn, booking.checkOut)
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Confirm Cancellation</h1>
      <div className='md:col-span-2 space-y-6'>
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold'>{roomData.name}</h2>
          <p className='text-gray-600'>
            {roomData.roomType?.numberOfGuest || 0} Adults | 0 Children &nbsp;&nbsp; • &nbsp;&nbsp; {days} Days /{' '}
            {nights} Nights
          </p>
          <p className='text-gray-600'>${booking.totalPrice / nights} per night</p>
          <p className='text-red-500'>Your booking was cancelled.</p>
        </div>

        <div className='border-t pt-4 space-y-2'>
          <h3 className='text-lg font-semibold'>Price Breakdown</h3>
          <div className='flex justify-between text-gray-800'>
            <p>Your Booking</p>
            <p>${booking.totalPrice.toFixed(2)}</p>
          </div>
          <div className='flex justify-between text-gray-800'>
            <p>Cancellation Fee</p>
            <p className='text-red-500'>${cancellationFee.toFixed(2)}</p>
          </div>
          <div className='flex justify-between border-t pt-2 text-gray-800 font-bold'>
            <p>Refund Amount</p>
            <p>${Math.abs(booking.totalPrice - cancellationFee).toFixed(2)}</p>
          </div>
        </div>

        <p className='text-sm text-gray-600'>
          The property handles all payment. For any questions,
          <span className='text-link text-primary font-semibold mx-1 cursor-pointer'>contact</span>
          them directly.
        </p>
        <div className='flex flex-col xs:flex-row gap-4'>
          {booking.status === BOOKING_STATUS.CONFIRMED && (
            <CustomButton
              variant='error'
              className='justify-items-end !p-0'
              title={
                <label className='px-6 py-2 cursor-pointer' htmlFor='booking-cancellation'>
                  {/* // <label className='px-6 py-2 cursor-pointer' htmlFor='cancellation-successfull'> */}
                  Cancel Booking
                </label>
              }
            />
          )}
          <Link href={ROUTES.MY_BOOKINGS}>
            <CustomButton title='View My Bookings' variant='secondary' />
          </Link>
        </div>
      </div>
      <Modal id='booking-cancellation' modalClass='p-0' body={<CancellationConfirm bookingId={booking._id} />} />
      {/* <Modal id='cancellation-successfull' modalClass='p-0' body={<CancellationSuccess booking={booking} />} /> */}
    </div>
  )
}

const cancelBooking = async ({ bookingId, value }: any) => {
  const { data }: any = await Axios({ ...cancelBookingURL(bookingId), data: { cancelPaymentSource: value } })
  return data
}

const CancellationConfirm = async ({ bookingId }: any) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(BOOKING_REFUND_METHOD.LIBUTEL_WALLET)
  const [success, setSuccess] = useState(false)

  const onContinue = async () => {
    try {
      setLoading(true)
      const data = await cancelBooking({ bookingId, value })
      toast.success(data.message)
      setSuccess(true)
      // openModal('cancellation-successfull')
      // closeModal('booking-cancellation')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const onBookNew = async () => {
    try {
      setSuccess(false)
      router.push(ROUTES.SEARCH_RESULTS)
    } catch (error) {
      console.error(error)
    }
  }

  if (success)
    return (
      <div className='justify-items-center p-8 space-y-4 text-center'>
        <FontAwesomeIcon icon={faCheckCircle} size='3x' className='text-success' />
        <h2 className='text-xl font-bold mb-2 text-success'>Booking Cancelled Successfully!</h2>
        <p>
          Your booking has been successfully cancelled. The refund amount will be credited to your bank account within
          2-3 business days. Thank you for your patience!
        </p>
        <CustomButton title={'Book a trip'} variant='success' className='min-w-44' onClick={onBookNew} />
      </div>
    )

  return (
    <div className='justify-items-center p-8'>
      <h2 className='text-xl font-bold mb-2'>Choose Your Payment Method</h2>
      <p>Please select where you’d like to receive your payment:</p>
      <div className='my-8'>
        <CustomRadio
          options={[
            { label: 'Libutel Wallet', value: BOOKING_REFUND_METHOD.LIBUTEL_WALLET },
            { label: 'Bank Account', value: BOOKING_REFUND_METHOD.BANK }
          ]}
          value={value}
          // disabled={loading}
          onChange={(data: any) => setValue(data)}
        />
      </div>
      <CustomButton title={'Continue'} className='min-w-44' isLoading={loading} onClick={onContinue} />
    </div>
  )
}
