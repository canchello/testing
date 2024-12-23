import React from 'react'
import heroSection1 from '@/assets/images/about1.png'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className='bg-custom-dark-blue relative justify-items-center'>
      <div className='container flex flex-col md:flex-row gap-12 text-white px-4 py-10 md:py-20'>
        {/* Left Section */}
        <div className='flex items-center justify-center flex-1'>
          <div className='flex flex-col gap-4 max-w-[574px]'>
            <div className='text-4xl font-bold'>Discover the Essence of Travel with Us!</div>
            <div>
              Founded with a passion for showcasing the beauty of Libya, our company aims to make travel more accessible
              and enjoyable for tourists from around the world.
            </div>
          </div>
        </div>

        {/* Right Section with Images */}
        <div className='flex-1 flex gap-4 items-end'>
          <div className='space-y-2 mx-auto'>
            <Image src={heroSection1} alt='heroSection1' />
          </div>
        </div>
      </div>
    </div>
  )
}
