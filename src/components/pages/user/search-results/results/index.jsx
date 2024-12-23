import React from 'react'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/libs/tailwind'
import hotelStore from '@/stores/hotelStore'
import dayjs from 'dayjs'

export default function Results({ data, checkIn, checkOut }) {
  const { hotelFilters } = hotelStore()

  return (
    <div className='space-y-4'>
      <div className='flex flex-1 flex-wrap justify-between items-end gap-4'>
        <div className={cn('space-y-1')}>
          <p className='font-medium text-gray-500'>{data?.length || 0} search results for</p>
          <h1 className='text-2xl font-bold'>Tripoli</h1>
          {!!hotelFilters && (
            <>
              {(hotelFilters?.checkIn || hotelFilters?.checkOut) && (
                <p className='text-xl font-medium space-x-4'>
                  <span>
                    {hotelFilters?.checkIn}
                    {hotelFilters?.checkOut && <> to {hotelFilters?.checkOut}</>}
                  </span>
                </p>
              )}
              <p className='text-xl font-medium space-x-4'>
                <span>
                  {hotelFilters?.adults || 0} Adults | {hotelFilters?.children || 0} Children
                </span>
              </p>
            </>
          )}
        </div>
        <div className='dropdown dropdown-end ml-auto'>
          <div
            tabIndex={0}
            role='button'
            className='bg-primary text-white border-none focus:outline-none focus:ring-2 focus:ring-opacity-50'
          >
            <span>Sort by</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <ul tabIndex={0} className='dropdown-content w-52 menu bg-base-100 rounded-box z-[1] p-2 shadow'>
            <li>
              <a>Price</a>
            </li>
            <li>
              <a>Popularity</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='space-y-4'>
        {!!data?.length ? (
          data.map((item, index) => <Card key={item.id || index} hotel={item} checkIn={checkIn} checkOut={checkOut} />)
        ) : (
          <p className='text-center text-muted'>No data found!</p>
        )}
      </div>
    </div>
  )
}
