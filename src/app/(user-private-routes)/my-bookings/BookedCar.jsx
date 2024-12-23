import CustomButton from '@/components/common/CustomButton'
import { BOOKING_STATUS } from '@/libs/constants'
import StandardCar from '@/assets/images/taxi-standard.png'
import BasicCar from '@/assets/images/taxi-basic.png'
import LuxuryCar from '@/assets/images/taxi-luxury.png'
import dayjs from 'dayjs'
import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faTaxi } from '@fortawesome/free-solid-svg-icons'

export default function BookedCar({ booking, carButtonClick }) {
  const carData = booking.car
  const isPendingPayment = booking.status === BOOKING_STATUS.PENDING
  const isForReview = dayjs().isAfter(dayjs(new Date(booking.pickupDateTime))) && !isPendingPayment

  return (
    <div className='px-4'>
      <div className='shadow-lg rounded-lg overflow-hidden grid grid-cols-1'>
        {/* Car Icon Section */}
        <div className='relative flex items-center justify-center w-full bg-gray-100 p-4'>
          <Image
            src={getTaxiImage(booking.rideType)}
            alt='Car'
            className='p-3 h-24 w-24 bg-white rounded-full object-contain'
          />
          {/* Payment Status */}
          {isPendingPayment && (
            <div className='absolute flex items-center justify-start top-2 right-2'>
              <span className='bg-red-100 text-red-600 px-4 py-1 rounded-full font-semibold text-sm'>
                Payment Pending
              </span>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className='flex-1 flex flex-col gap-3 p-6'>

          {/* Rating Section */}
          <div className='flex items-center gap-2'>
            <span className='text-green-600 bg-green-100 px-4 rounded-full font-bold text-lg'>
              {carData?.rating || 9.4}
            </span>
            <span className='text-green-600 font-medium'>Excellent</span>
            <span className='text-gray-500 text-sm ml-auto'>{carData?.ratingCount || 0} reviews</span>
          </div>

          {/* Car Information */}
          <div className='space-y-4'>
            <h2 className='text-xl font-bold'>
              {booking?.rideType === "luxury" && "Luxury Ride"}
              {booking?.rideType === "standard" && "Standard Ride"}
              {booking?.rideType === "basic" && "Basic Ride"}
            </h2>
            <div className=''>
              <p className='text-base font-bold'>Pick-Up Location</p>
              <div className='flex items-center gap-2 text-gray-500'>
                <FontAwesomeIcon icon={faTaxi} />
                <p className='font-medium'> {booking.pickUpLocation || '-'}</p>
              </div>
            </div>
            <div className=''>
              <p className='text-base font-bold'>Drop-off Location</p>
              <div className='flex items-center gap-2 text-gray-500'>
                <FontAwesomeIcon icon={faLocationDot} />
                <p className='font-medium'> {booking.dropOffLocation || '-'}</p>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                <p className='text-base font-bold'>Pick-Up Date</p>
                <p className='font-medium'>{booking.pickupDateTime ? dayjs(new Date(booking.pickupDateTime)).format("MM-DD-YYYY hh:mm A") : '-'}</p>
              </div>
              <div>
                <p className='text-base font-bold'>Passengers</p>
                <p className='font-medium'>{booking.passengerCount || 0} Passengers</p>
              </div>
            </div>
          </div>

          {/* Price and Action Button */}
          <div className='mt-auto'>
            <p className='font-bold text-lg'>
              Price: <span className=''>${(booking.totalPrice || '0')}</span>
            </p>
            <CustomButton
              title={isPendingPayment ? 'Make Payment' : (isForReview ? 'Write a Review' : 'Manage Booking')}
              onClick={() =>
                carButtonClick({
                  bookingId: booking._id,
                  status: booking.status
                })
              }
              variant={isPendingPayment ? "error" : (isForReview ? "secondary" : "primary")}
              className={`mt-4 w-full `}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const getTaxiImage = (rideType) => {
  if (rideType === "luxury") return LuxuryCar
  if (rideType === "standard") return StandardCar
  return BasicCar
}
