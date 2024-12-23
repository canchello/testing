import CustomButton from '@/components/common/CustomButton'
import { BOOKING_STATUS } from '@/libs/constants'
import { getImage } from '@/utils/helper'
import dayjs from 'dayjs'
import React from 'react'

export default function BookedHotel({ booking, hotelButtonClick }) {
  const propertyData = booking.property
  const roomData = booking.rooms?.[0]
  const isBeforeDay = dayjs().isBefore(dayjs(new Date(booking.checkIn)))

  if (!booking || !roomData) return
  return (
    <div className='px-4'>
      <div className='flex flex-col sm:flex-row shadow-lg rounded-lg overflow-hidden'>
        {/* Image Section */}
        <div className='relative w-full sm:w-1/2 h-64 sm:h-96'>
          <img
            src={getImage(propertyData?.primaryAttachment?.fileUrl)}
            alt='Hotel'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Details Section */}
        <div className='p-6 flex flex-col gap-3 w-full sm:w-1/2'>
          {/* Rating Section */}
          <div className='flex items-center gap-2'>
            {propertyData?.rating && (
              <span className='text-green-600 bg-green-100 px-4 rounded-full font-bold text-lg'>
                {propertyData?.rating || 0}
              </span>
            )}
            <span className='text-green-600 font-medium'>Excellent</span>
            <span className='text-gray-500 text-sm ml-auto'>{propertyData?.ratingCount || 0} reviews</span>
          </div>

          {/* Hotel Information */}
          <div>
            <h2 className='text-xl font-bold'>{propertyData?.title}</h2>
            <p className='text-sm text-gray-600'>{propertyData?.address}</p>
            <p className='mt-2 font-bold capitalize'>{roomData?.roomType?.name}</p>
            <p className='text-gray-500'>
              <span className='font-medium'>Check In:</span> {dayjs(new Date(booking.checkIn)).format('MM-DD-YYYY')}
            </p>
            <p className='text-gray-500'>
              <span className='font-medium'>Check Out:</span> {dayjs(new Date(booking.checkOut)).format('MM-DD-YYYY')}
            </p>
            <p className='text-gray-500'>
              <span className='font-medium'>Guests:</span> {roomData.roomType?.numberOfGuest || 0}
            </p>
          </div>

          {/* Price and Action Button */}
          <div className='mt-auto'>
            <p className='font-bold text-lg'>
              Total Price: <span className=''>${booking.totalPrice || '-'}</span>
            </p>
            <CustomButton
              title={
                <label htmlFor='booking-review-modal'>
                  {isBeforeDay
                    ? booking.status === BOOKING_STATUS.CONFIRMED
                      ? 'Manage Booking'
                      : 'Book Now'
                    : 'Write a review'}
                </label>
              }
              onClick={() =>
                hotelButtonClick({
                  isBeforeDay,
                  propertyId: propertyData._id,
                  bookingId: booking._id,
                  status: booking.status
                })
              }
              className={`mt-4 w-full ${isBeforeDay ? 'bg-primary text-white' : '!bg-custom-dark-blue text-white'}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
