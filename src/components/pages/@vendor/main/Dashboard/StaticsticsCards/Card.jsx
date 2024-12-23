'use client'
import Image from 'next/image'
import React from 'react'

import trendingUpIcon from '@/assets/svg/trendingUpIcon.svg'
import trendingDownIcon from '@/assets/svg/trendingDownIcon.svg'

const Card = ({ details }) => {
  const growthStyle = details.status === 'positive' ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'

  return (
    <div
      className='max-w-[240px] p-4 rounded-lg space-y-4
                       hover:bg-marchent-secondary transition duration-200'
    >
      {/* Header Section */}
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-sm text-gray-500'>{details.title}</p>
          <h1 className='text-2xl font-bold'>{details.data}</h1>
        </div>
        <div
          className='w-10 h-10 bg-[#FFEFE6] flex items-center justify-center
                               rounded-md group-hover:bg-white transition duration-200'
        >
          <Image src={details.icon} alt='icon' className='w-5 h-5' />
        </div>
      </div>

      {/* Growth Section */}
      <div className='flex items-center gap-2'>
        <div className={`text-xs flex gap-1 items-center font-medium px-2 py-1 rounded-md ${growthStyle}`}>
          <div className='w-4 h-4'>
            <Image src={details.status === 'positive' ? trendingUpIcon : trendingDownIcon} />
          </div>
          <p>{details.growthPercentage}</p>
        </div>
        <p className='text-xs text-gray-500'>from last week</p>
      </div>
    </div>
  )
}

export default Card
