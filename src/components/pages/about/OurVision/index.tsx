import React from 'react'
import Image from 'next/image'
import quote1 from '@/assets/svg/quote1.svg'

export default function OurVision() {
  return (
    <div className='justify-items-center'>
      <div className='container flex flex-col items-center gap-6 px-4 py-12 md:py-20 md:px-10'>
        <div>
          <p className='text-4xl font-bold'>Our Vision</p>
        </div>
        <div>
          <p className='text-xl font-normal'>
            As Libya continues to open its doors to the world, we envision a thriving tourism sector that highlights the
            country's natural beauty, cultural treasures, and historical significance. Our goal is to become the go-to
            platform for anyone planning to explore Libya, while supporting local businesses and promoting responsible,
            eco-friendly travel.
          </p>
        </div>
        <div>
          <Image src={quote1} alt='' className='h-20' />
        </div>
        <div>
          <p className='text-4xl font-normal italic'>Shaping the Future of Travel in Libya</p>
        </div>
      </div>
    </div>
  )
}
