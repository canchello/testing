'use client'
import Rating from '@/components/UI/Rating'
import dayjs from 'dayjs'
import React from 'react'
import { Img } from 'react-image'
import ReviewStatistics from '@/components/pages/@vendor/main/ReviewAnalysis/ReviewStatistics'
import OverallRating from '@/components/pages/@vendor/main/ReviewAnalysis/OverallRating'
import ReviewsByCountry from '@/components/pages/@vendor/main/ReviewAnalysis/ReviewByCountries'

const Reviews = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <div className='bg-white p-4 col-span-2 rounded-lg'>
        <ReviewStatistics />
      </div>
      <div className='bg-white p-4 col-span-2 rounded-lg'>
        <OverallRating />
      </div>
      <div className='bg-white p-4 col-span-full rounded-lg'>
        <ReviewsByCountry />
      </div>
      <div className='col-span-full space-y-3'>
        <div className='flex flex-wrap justify-between'>
          <h1>Customer Reviews</h1>
          <p>options</p>
        </div>
        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4'>
          {[...Array(4)].map((_, index) => (
            <div key={index} className='bg-white rounded-lg p-4 space-y-3'>
              <Img src={'https://via.placeholder.com/150'} alt='' className='w-12 rounded-full' />
              <p className='text-sm font-semibold'>Jhon Doe</p>
              <div className='flex items-center gap-2'>
                <Rating rating={4} total={5} />

                <div>{dayjs().format('MMMM D, YYYY')}</div>
              </div>
              <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, incidunt!</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews
