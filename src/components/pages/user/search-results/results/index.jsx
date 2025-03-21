import React, { useEffect, useState } from 'react'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/libs/tailwind'
import hotelStore from '@/stores/hotelStore'

export default function Results({ data, checkIn, checkOut }) {
  const { hotelFilters, fetchHotelList } = hotelStore()

  const handleSortChange = (sorting) => {
    const payload = {
      query: {
        search: hotelFilters?.location?.toLowerCase(),
        searchColumns: ["city", "state", "country"],
        checkIn: new Date(hotelFilters?.checkIn),
        checkOut: new Date(hotelFilters?.checkOut),
        numberOfGuest:
          Number(hotelFilters?.adults) + Number(hotelFilters?.children) ?? 0,
      },
      options: {
        page: 1,
        limit: 10,
        populate: ["primaryAttachment", "attachment"],
        sort: { "ratingCount": sorting || -1 },
        lean: true,
      },
    };
    fetchHotelList(payload);
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-1 flex-wrap justify-between items-end gap-4'>
        <div className={cn('space-y-1')}>
          <p className='font-medium text-gray-500'>{data?.length || 0} search results for</p>
          {hotelFilters.location && <h1 className='text-2xl font-bold'>{hotelFilters.location}</h1>}
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

            className='p-3 flex items-center gap-5 border rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50'
          >
            <span>Sort by</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <ul tabIndex={0} className='dropdown-content w-52 menu bg-base-100 rounded-box z-[1] p-2 shadow'>
            <li onClick={() => handleSortChange(1)}>
              <a>Price</a>
            </li>
            <li onClick={() => handleSortChange(-1)}>
              <a>Popularity</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='space-y-4'>
        {!!data?.length ? (
          data.map((item, index) => <Card key={item.id || index} hotel={item} checkIn={hotelFilters.checkIn} checkOut={hotelFilters.checkOut} />)
        ) : (
          <p className='text-center text-muted'>No data found!</p>
        )}
      </div>
    </div>
  )
}
