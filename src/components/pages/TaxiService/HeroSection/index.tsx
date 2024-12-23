import React from 'react'
import heroSection1 from '@/assets/images/texi-service-bg.jpg'
import rectSvg from '@/assets/svg/styled-rectangle.svg'
import carsSvg from '@/assets/images/texi-cars.png'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className='relative justify-items-center'>
      <Image src={heroSection1} alt='Hero Background' layout='fill' objectFit='cover' quality={100} />
      <Image src={rectSvg} alt='' layout='fill' quality={100} />
      <div className='absolute inset-0 bg-black bg-opacity-50 z-0'></div>

      <div className='container flex flex-col gap-6 text-white px-4 md:px-0 py-10 md:py-20 text-center z-20'>
        <div className='flex flex-col items-center justify-center flex-1 z-10'>
          <h1 className='text-4xl font-bold'>Premium Taxi Service for Seamless Journey</h1>
          <Image src={carsSvg} alt='' className='' />
        </div>
      </div>
    </div>
  )
}
