import CustomButton from '@/components/common/CustomButton'
import hotelStore from '@/stores/hotelStore'
import { getImage } from '@/utils/helper'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useMemo } from 'react'

export default function Card({ hotel, checkIn, checkOut }) {
  const { hotelFilters } = hotelStore()

  const { room, nightCount, totalPrice, totalGuest } = useMemo(() => {
    const room = hotel.roomType?.[0]
    const daysDiff = dayjs(checkOut).diff(dayjs(checkIn), 'days') ;
    const totalPrice = (room?.price || 0) * ((daysDiff > 0) ? daysDiff : 1)
    const totalGuest = Number(hotelFilters?.adults || 0) + Number(hotelFilters?.children || 0)
    return { room, nightCount: daysDiff, totalPrice, totalGuest }
  }, [])

  return (
    <div className='flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg'>
      <div className='w-full lg:w-1/3'>
        <img
          src={hotel?.primaryAttachment? getImage(hotel?.primaryAttachment?.fileUrl) : 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369796/hfvz03ujeezwcth7nboo.jpg'}
          alt='Hotel Room'
          className='h-60 rounded-lg w-full object-cover'
        />
      </div>
      <div className='flex flex-col sm:flex-row justify-between flex-1 p-4 gap-4 h-full w-full'>
        <div className='flex flex-col justify-between gap-4'>
          <div className='space-y-1'>
            <h2 className='text-lg font-semibold'>{hotel.title}</h2>
            <p className='text-sm text-gray-500'>450m from centre</p>
          </div>

          {room &&
            <div>
              <h3 className='font-medium capitalize'>{room.name}</h3>
              <p className='text-sm text-gray-500'>1x king size bed • 1x bathroom</p>
            </div>}

          <div className='flex flex-wrap gap-2'>
            {/* max 2 will appear */}
            <span className='border border-primary rounded-full text-primary px-2 py-1'>
              Free Cancellation
            </span>
            <span className='border border-primary rounded-full text-primary px-2 py-1'>
              Breakfast Included
            </span>
          </div>
        </div>

        <div className='flex flex-col justify-between items-end gap-4'>
          <div className='flex flex-wrap items-center space-x-4 justify-end'>
            <div className='text-sm text-green-600 font-semibold'>Excellent</div>
            {hotel.rating && <div className='badge bg-green-100 text-green-600 font-medium'>{hotel.rating}</div>}
            <p className='text-sm text-gray-400'>(1,510 reviews)</p>
          </div>

          <div className='text-right'>
            <div className='text-xl font-semibold'>${totalPrice}</div>
            <p className='text-sm text-gray-500'>{nightCount} nights, {totalGuest} guests</p>
          </div>

          <Link href={'/stays/' + hotel.id}>
            <CustomButton title='See booking options' variant='secondary' />
          </Link>
        </div>
      </div>
    </div>
  )
}
