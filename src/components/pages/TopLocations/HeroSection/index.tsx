import React from 'react'
import heroSection1 from '@/assets/images/top-location.jpg'
import Image from 'next/image'
import ReviewCard from './ReviewCard'

export default function HeroSection() {
  return (
    <div className='relative justify-items-center'>
      <Image src={heroSection1} alt='Hero Background' layout='fill' objectFit='cover' quality={100} />
      <div className='absolute inset-0 bg-black bg-opacity-50 z-0'></div>

      <div className='container flex flex-col md:flex-row gap-6 text-white px-4 md:px-0 py-10 md:py-20'>
        {/* Left Section */}
        <div className='flex items-center justify-center flex-1 z-10'>
          <div className='flex flex-col gap-4 max-w-[574px]'>
            <div className='text-4xl font-bold'>Discover Libya’s most Beautiful Destinations & Top Hotels!</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>
        </div>

        {/* Right Section with Images */}
        <div className='flex-1 flex gap-4 items-end z-10'>
          <div className='space-y-2 mx-auto'>
            <ReviewCard />
          </div>
        </div>
      </div>
    </div>
  )
}
