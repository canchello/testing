import CustomButton from '@/components/common/CustomButton'
import Axios from '@/libs/axios'
import { getHotelByIdURL } from '@/services/APIs/hotel'
import hotelStore from '@/stores/hotelStore'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface StayDetails {
  adults: string
  checkIn: string
  checkOut: string
}

export default function HotelConfirmation({ bookingDetails }: any) {
  const params = useParams()
  const router = useRouter()
  const { selectedRooms, selectedHotel, hotelFilters }: any = hotelStore()
  const checkInDate = dayjs(bookingDetails?.checkIn)
  const checkOutDate = dayjs(bookingDetails?.checkOut)

  // Calculate total days of stay
  const totalDays = checkOutDate.diff(checkInDate, 'day')
  const nights = totalDays - 1

  function getStayDuration(details: StayDetails): string {
    const { checkIn, checkOut } = details

    const checkInDate = dayjs(checkIn)
    const checkOutDate = dayjs(checkOut)

    // Calculate total days of stay
    const totalDays = checkOutDate.diff(checkInDate, 'day')

    // Calculate nights
    const nights = totalDays - 1

    return `${totalDays} days ${nights} night${nights > 1 ? 's' : ''}`
  }

  const result = selectedRooms
    .map((selectedRoom: any) => {
      const room = selectedHotel?.roomType.find((r: any) => r._id === selectedRoom.id)
      if (room) {
        return { ...room, count: selectedRoom.count }
      }
      return null
    })
    .filter((room: any) => room !== null)

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Booking Confirmed!</h1>
      <div className='md:col-span-2 space-y-6'>
        {result.map((res: any) => (
          <div className='space-y-2' key={res._id}>
            <h2 className='text-lg font-semibold capitalize'>{res.name}</h2>
            <p className='text-gray-600'>
              {hotelFilters?.adults} Adults | 0 Children &nbsp;&nbsp; • &nbsp;&nbsp; {getStayDuration(hotelFilters)}
            </p>
            <p className='text-gray-600'>${bookingDetails?.totalPrice ?? 0 / (nights === 0 ? 1 : nights)} per Night</p>
          </div>
        ))}

        <div className='border-t pt-4 space-y-2'>
          <h3 className='text-lg font-semibold'>Price Breakdown</h3>
          <div className='flex justify-between text-gray-800'>
            <p>Your Booking</p>
            <p>${bookingDetails?.totalPrice}</p>
          </div>
          <div className='flex justify-between text-gray-800'>
            <p>Platform Fee</p>
            <p className='text-red-500'>$0.00</p>
          </div>
          <div className='flex justify-between border-t pt-2 text-gray-800 font-bold'>
            <p>Total Amount</p>
            <p>${bookingDetails?.totalPrice}</p>
          </div>
        </div>

        <p className='text-sm text-gray-600'>
          The property handles all payment. For any questions,
          <span className='text-link text-primary font-semibold mx-1 cursor-pointer'>contact</span>
          them directly.
        </p>
        <div>
          <Link href={'/my-bookings'}>
            <CustomButton title='View My Bookings' variant='secondary' />
          </Link>
        </div>
      </div>
    </div>
  )
}
