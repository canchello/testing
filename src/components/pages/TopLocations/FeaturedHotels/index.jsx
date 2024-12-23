import React from 'react'
import HotelCard from '../../home/TopHotelsandLocation/HotelCard'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'
import Image from 'next/image'

export default function FeaturedHotels() {
  return (
    <div className='justify-items-center'>
      <div className='container m-4'>
        <div className='grid grid-cols-1 xs:grid-cols-2 gap-4'>
          <div className='justify-items-center'>
            <Image
              src="https://res.cloudinary.com/dndsypilw/image/upload/v1730370276/xt9okzqdo9uzgnij5dwz.png"
              alt=""
              width={560}
              height={769}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='space-y-4 mx-2'>
            <h1 className='text-3xl font-bold'>
              Featured Hotels
            </h1>
            <p className='text-xl'>
              Discover some of the top-rated and unique hotels across Libya, offering luxurious amenities, stunning views, and warm hospitality. Each featured stay provides a memorable experience for both relaxation and adventure.
            </p>
            <HotelCard
              hotel={{}}
            />
            <div className='space-x-4'>
              <button className='bg-custom-dark-blue text-white p-2 rounded-full shadow-md focus:outline-none'>
                <RiArrowLeftSLine fontSize={28} />
              </button>
              <button className='bg-custom-dark-blue text-white p-2 rounded-full shadow-md focus:outline-none'>
                <RiArrowRightSLine fontSize={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
