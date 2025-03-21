'use client'
import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import hotelStore from '@/stores/hotelStore'
import appStore from '@/stores/appStore'

const BookingForm: React.FC = () => {
  const { cities = [] }: any = appStore()
  const { hotelFilters, setHotelFilters }: any = hotelStore()

  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 bg-primary p-6 rounded-lg shadow-md max-w-6xl w-full mx-auto gap-4 items-center'>
      {/* Location Select */}
      <div className='col-span-2'>
        <label className='text-white'>Location</label>
        <select
          className='w-full bg-transparent placeholder-white border-b border-white text-white py-2 focus:outline-none focus:ring-0'
          value={hotelFilters?.location || ''}
          onChange={e => setHotelFilters({ ...hotelFilters, location: e.target.value })}
        >
          <option value='' disabled className='text-gray-500'>
            Select Location
          </option>
          {cities.map((item: any) => (
            <option key={item} value={item} className='text-black capitalize'>
              {item}
            </option>
          ))}
        </select>
      </div>
      {/* <div className='divider divider-horizontal invisible sm:visible before:bg-slate-200 before:w-[1px] after:bg-slate-200 after:w-[1px]'></div> */}

      {/* Check-In Date */}
      <div className='flex-1'>
        <label className='text-white'>Check In</label>
        <input
          type='date'
          className='w-full bg-transparent text-white placeholder-white border-b border-white px-3 py-2 focus:outline-none focus:ring-0'
          value={hotelFilters?.checkIn || ''}
          onChange={e => setHotelFilters({ ...hotelFilters, checkIn: e.target.value })}
        />
      </div>

      {/* <div className='divider divider-horizontal invisible sm:visible before:bg-slate-200 before:w-[1px] after:bg-slate-200 after:w-[1px]'></div> */}

      {/* Check-Out Date */}
      <div className='flex-1'>
        <label className='text-white'>Check Out</label>
        <input
          type='date'
          className='w-full bg-transparent text-white placeholder-white border-b border-white px-3 py-2 focus:outline-none focus:ring-0'
          value={hotelFilters?.checkOut || ''}
          onChange={e => setHotelFilters({ ...hotelFilters, checkOut: e.target.value })}
        />
      </div>

      {/* <div className='divider divider-horizontal invisible sm:visible before:bg-slate-200 before:w-[1px] after:bg-slate-200 after:w-[1px]'></div> */}

      {/* Guests Select */}
      <div className='flex-1'>
        <label className='text-white'>Guest</label>
        <select
          className='w-full bg-transparent text-white placeholder-white border-b border-white px-3 py-2 focus:outline-none focus:ring-0'
          value={hotelFilters?.adults || ''}
          onChange={e => setHotelFilters({ ...hotelFilters, adults: e.target.value })}
        >
          {[...Array(10).keys()].map(guest => (
            <option key={guest + 1} value={String(guest + 1)} className='text-black'>
              {guest + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <div className='flex justify-center'>
        <Link href={'/stays/search-results'}>
          <button className='bg-white min-w-20 flex justify-center p-4 rounded-full shadow-md focus:outline-none hover:bg-gray-200 transition'>
            <FontAwesomeIcon icon={faSearch} className='text-primary w-6' />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BookingForm
