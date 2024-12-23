'use client'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const RoomAvailability = () => {
  const ratingCategories = [
    { name: 'Facilities', score: 4.4 },
    { name: 'Cleanliness', score: 4.7 },
    { name: 'Services', score: 4.6 },
    { name: 'Comfort', score: 4.8 },
    { name: 'Location', score: 4.5 }
  ]

  return (
    <div className=' bg-white space-y-4 w-full'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-semibold text-gray-800'>Room Availability</h2>
        <button className='text-gray-400 hover:text-gray-600'>
          <svg width='16' height='4' viewBox='0 0 16 4' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M8 3.125C8.62132 3.125 9.125 2.62132 9.125 2C9.125 1.37868 8.62132 0.875 8 0.875C7.37868 0.875 6.875 1.37868 6.875 2C6.875 2.62132 7.37868 3.125 8 3.125Z'
              fill='#15253B'
            />
            <path
              d='M14 3.125C14.6213 3.125 15.125 2.62132 15.125 2C15.125 1.37868 14.6213 0.875 14 0.875C13.3787 0.875 12.875 1.37868 12.875 2C12.875 2.62132 13.3787 3.125 14 3.125Z'
              fill='#15253B'
            />
            <path
              d='M2 3.125C2.62132 3.125 3.125 2.62132 3.125 2C3.125 1.37868 2.62132 0.875 2 0.875C1.37868 0.875 0.875 1.37868 0.875 2C0.875 2.62132 1.37868 3.125 2 3.125Z'
              fill='#15253B'
            />
          </svg>
        </button>
      </div>

      {/*RoomAvailability */}
      <div className='flex items-center space-x-4'>
        <div className='flex flex-col items-center justify-center bg-[#FFEFE6] rounded-md p-4 w-20 h-20'>
          <h1 className='text-2xl font-bold text-gray-800'>4.6</h1>
          <p className='text-sm text-gray-600'>/5</p>
        </div>
        <div>
          <p className='text-lg font-semibold text-gray-800'>Impressive</p>
          <p className='text-sm text-gray-500'>from 2546 reviews</p>
        </div>
      </div>

      {/* RoomAvailability */}
      <div className='space-y-2'>
        {ratingCategories.map(category => (
          <div key={category.name} className='flex items-center justify-between'>
            <p className='text-sm text-gray-600'>{category.name}</p>
            <div className='flex items-center w-2/3 space-x-2'>
              <div className='w-full h-2 bg-gray-200 rounded-full'>
                <div className='h-2 bg-orange-500 rounded-full' style={{ width: `${(category.score / 5) * 100}%` }} />
              </div>
              <p className='text-sm text-gray-600'>{category.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomAvailability
