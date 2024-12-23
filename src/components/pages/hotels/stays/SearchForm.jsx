'use client';
import React, { useState } from 'react'
import CustomButton from '@/components/common/CustomButton'

import CustomSelect from '@/components/form/SelectField'
import CustomDateInput from '@/components/form/DateField'

import { cn } from '@/libs/tailwind'
import hotelStore from '@/stores/hotelStore'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/libs/constants';

export default function SearchForm({ className = "" }) {
  const router = useRouter()
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
            options={[
              { label: 'India', value: 'india' },
              { label: 'USA', value: 'usa' },
            ]}
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
            onChange={e => setHotelFilters({ ...hotelFilters, checkIn: e.target.value })}
          />

          {/* Check Out Date */}
          <CustomDateInput
            type="date"
            wrapperClass="flex-1 w-full"
            placeholder='Check-out Date'
            value={hotelFilters?.checkOut || ''}
            onChange={e => setHotelFilters({ ...hotelFilters, checkOut: e.target.value })}
          />

          <CustomButton title='Search' onClick={() => router.push(ROUTES.SEARCH_RESULTS)} />
        </div>
      </div>
    </div>
  )
}
