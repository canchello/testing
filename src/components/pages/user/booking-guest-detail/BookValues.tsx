import CustomDateInput from '@/components/form/DateField'
import hotelStore from '@/stores/hotelStore'
import { faBaby, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import React from 'react'
import { toast } from 'sonner'

export default function BookValues({ bookingDetails, isLoading }: any) {
  const { hotelFilters, setHotelFilters }: any = hotelStore()
  const checkInDate = dayjs(bookingDetails?.checkIn)
  const checkOutDate = dayjs(bookingDetails?.checkOut)

  // Calculate total days of stay
  const totalDays = checkOutDate.diff(checkInDate, 'day')
  return (
    <div>
      <div className='bg-custom-dark-blue flex p-4 rounded-lg'>
        <div className='w-full space-y-4'>
          <div className='flex justify-around flex-wrap gap-2 bg-white p-3 rounded-lg'>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center bg-custom-orange p-2 rounded-full w-8 h-8'>
                <FontAwesomeIcon icon={faPeopleGroup} className='text-primary' />
              </div>
              <span>Adult: {hotelFilters?.adults || '-'}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center bg-custom-orange p-2 rounded-full w-8 h-8'>
                <FontAwesomeIcon icon={faBaby} className='text-primary' />
              </div>
              <span>Children: {hotelFilters?.children || '-'}</span>
            </div>
          </div>
          <div className='bg-white p-3 rounded-lg space-y-2'>
            <CustomDateInput
              disabled={!!bookingDetails?.checkIn}
              label='Check-In date'
              placeholder='Enter Check In'
              value={dayjs(bookingDetails?.checkIn).format('YYYY-MM-DD') ?? hotelFilters?.checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => {
                if (hotelFilters?.checkOut && dayjs(e.target.value).isAfter(hotelFilters?.checkOut)) {
                  return toast.error('Check-in date must be before check-out date')
                  // return setHotelFilters({ ...hotelFilters, checkIn: e.target.value, checkOut: e.target.value })
                }
                setHotelFilters({ ...hotelFilters, checkIn: e.target.value })
              }}
            />
            <CustomDateInput
              label='Check-out date'
              disabled={!!bookingDetails?.checkOut}
              placeholder='Enter Check out'
              value={dayjs(bookingDetails?.checkOut).format('YYYY-MM-DD') ?? hotelFilters?.checkOut}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => {
                if (hotelFilters?.checkIn && dayjs(e.target.value).isBefore(hotelFilters?.checkIn)) {
                  return toast.error('Check-Out date must be after check-in date')
                }
                setHotelFilters({ ...hotelFilters, checkOut: e.target.value })
              }}
            />
          </div>
          <div className='flex justify-between items-center bg-white p-3 rounded-lg gap-2 text-lg'>
            <p className='text-sm font-medium text-gray-500'>Price per night</p>
            <p className='font-semibold'>${bookingDetails?.totalPrice / totalDays || 0}</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-white p-3 rounded-lg gap-2'>
            <p className='text-sm font-medium'>
              Book for {totalDays} Nights - {bookingDetails?.roomId?.length} Room at
            </p>
            <div className='flex items-center gap-2'>
              <h1 className='text-primary text-3xl font-semibold'>${bookingDetails?.totalPrice}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
