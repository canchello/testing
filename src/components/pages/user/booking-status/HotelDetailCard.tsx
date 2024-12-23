import React, { useEffect, useState } from 'react'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getImage } from '@/utils/helper'
import dayjs from 'dayjs'

export default function HotelDetailCard({ booking }: any) {
  const propertyData = booking?.property
  return (
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
          <p className='text-gray-600 text-sm font-semibold'>
            {dayjs(new Date(booking.checkIn)).format('MMM D')} - {dayjs(new Date(booking.checkOut)).format('MMM D')} |{' '}
            {booking.rooms?.length || 0} Room(s)
          </p>
        </div>
      </div>

      <div className='space-y-3'>
        <h4 className='font-semibold text-gray-800 text-2xl'>Cancellation Policy</h4>
        <p className='text-sm text-gray-600'>
          You’re about to cancel your entire booking - review the details below before canceling.
        </p>
      </div>
    </div>
  )
}
