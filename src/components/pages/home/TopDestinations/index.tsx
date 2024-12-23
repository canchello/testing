import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'
import React from 'react'
import Carousel from './carousel'

export default function TopDestination() {
  return (
    <div className='container mx-auto p-10 pt-28'>
      <div className='max-w-full'>
        <div className='flex justify-between mb-4'>
          <div className=''>
            <h2 className='text-3xl font-bold mb-2'>Explore Libya's Top Destinations</h2>
          </div>
        </div>
        <Carousel />
      </div>
    </div>
  )
}
