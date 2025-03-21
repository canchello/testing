'use client';
import React, { useState } from 'react'
import CustomButton from '@/components/common/CustomButton'

import CustomSelect from '@/components/form/SelectField'
import CustomDateInput from '@/components/form/DateField'

import { cn } from '@/libs/tailwind'
import hotelStore from '@/stores/hotelStore'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/libs/constants';
import appStore from '@/stores/appStore';
import dayjs from 'dayjs';
import { toast } from 'sonner';

export default function SearchForm({ className = "" }) {
  const router = useRouter()
  const { cities } = appStore()
  const [isLoading, setLoading] = useState(false)
  const [formdata, setFormData] = useState({
    location: ''
  })
  const { hotelFilters, setHotelFilters } = hotelStore()

  return (
    <div className={cn('w-full', className)}>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col xs:flex-row items-center gap-4'>
          {/* Location */}
          <CustomSelect
            value={hotelFilters.location}
            className={hotelFilters.location ? '' : 'text-gray-500 font-medium'}
            wrapperClass='flex-1 w-full'
            placeholder='Location'
            options={cities.map((item) => ({ label: item, value: item }))}
            // onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
            onChange={e => setHotelFilters({ ...hotelFilters, location: e.target.value })}
          />

          {/* Guests Select */}
          <CustomSelect
            value={hotelFilters.adults || 0}
            className={hotelFilters.adults ? '' : 'text-gray-500 font-medium'}
            wrapperClass='flex-1 w-full'
            placeholder='Adults'
            options={[
              ...Array.from({ length: 10 }, (_, index) => ({ label: `${index + 1}`, value: `${index + 1}` }))
            ]}
            onChange={e => setHotelFilters({ ...hotelFilters, adults: e.target.value })}
          />

          {/* Guests Select */}
          <CustomSelect
            value={hotelFilters.children || 0}
            className={hotelFilters.children ? '' : 'text-gray-500 font-medium'}
            wrapperClass='flex-1 w-full'
            placeholder='Children'
            options={[
              ...Array.from({ length: 10 }, (_, index) => ({ label: `${index + 1}`, value: `${index + 1}` }))
            ]}
            onChange={e => setHotelFilters({ ...hotelFilters, children: e.target.value })}
          />
        </div>

        <div className='flex flex-wrap flex-col xs:flex-row  items-center gap-4'>
          {/* Check In Date */}
          <CustomDateInput
            type="date"
            wrapperClass="flex-1 w-full"
            placeholder='Check-in Date'
            value={hotelFilters?.checkIn || ''}
            min={new Date().toISOString().split('T')[0]}
            onChange={e => {
              if (hotelFilters?.checkOut && dayjs(e.target.value).isAfter(hotelFilters?.checkOut)) {
                return toast.error('Check-in date must be before check-out date')
                // return setHotelFilters({ ...hotelFilters, checkIn: e.target.value, checkOut: e.target.value })
              }
              setHotelFilters({ ...hotelFilters, checkIn: e.target.value })
            }}
          />

          {/* Check Out Date */}
          <CustomDateInput
            type="date"
            wrapperClass="flex-1 w-full"
            placeholder='Check-out Date'
            value={hotelFilters?.checkOut || ''}
            min={new Date().toISOString().split('T')[0]}
            onChange={e => {
              if (hotelFilters?.checkIn && dayjs(e.target.value).isBefore(hotelFilters?.checkIn)) {
                return toast.error('Check-Out date must be after check-in date')
              }
              setHotelFilters({ ...hotelFilters, checkOut: e.target.value })
            }}
          />

          <CustomButton title='Search' onClick={() => router.push(ROUTES.SEARCH_RESULTS)} />
        </div>
      </div>
    </div>
  )
}
