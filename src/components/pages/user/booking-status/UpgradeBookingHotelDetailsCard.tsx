import { calculateDaysAndNights, getImage } from '@/utils/helper'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import React from 'react'

export default function UpgradeBookingHotelDetailsCard({ booking }: any) {
  const propertyData = booking.property
  const roomData = booking.rooms?.[0]
  const { days = 0, nights = 0 } = calculateDaysAndNights(booking.checkIn, booking.checkOut)

  return (
    <div className=''>
      <div className='bg-gray-100 shadow-sm rounded-lg p-4 space-y-4'>
        <div className='flex flex-col xs:flex-row md:flex-col lg:flex-row gap-4 items-start'>
          <img
            src={getImage(propertyData?.primaryAttachment?.fileUrl)}
            alt='Hotel Image'
            className='w-28 h-28 rounded-lg object-cover'
          />
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>{propertyData.title}</h3>
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faLocationDot} />
              <p className='text-gray-600'>{propertyData.address}</p>
            </div>
            <p className='text-gray-600 text-sm font-semibold break-words'>
              {dayjs(new Date(booking.checkIn)).format('MMM D')} - {dayjs(new Date(booking.checkOut)).format('MMM D')} |{' '}
              {booking.rooms?.length || 0} Room(s)
            </p>
          </div>
        </div>

        <div className='space-y-3'>
          <h4 className='font-semibold text-gray-800 text-lg'>{roomData.roomType?.name}</h4>
          <div className='flex flex-wrap justify-between'>
            <p className='text-sm text-gray-600'>{roomData.roomType?.numberOfGuest || 0} Adults | 0 Children</p>
            <p className='text-sm text-gray-600'>
              {days} Days / {nights} Nights
            </p>
          </div>
          <p className='text-sm text-gray-600'>${booking.totalPrice / nights} Per Night</p>
          <h4 className='font-semibold text-gray-800 text-lg'>Price</h4>
          <div className='flex justify-between'>
            <p className='text-sm text-gray-600'>Your Bookings</p>
            <p className='text-sm text-gray-600'>$ {Number(booking.totalPrice).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
