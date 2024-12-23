import CustomButton from '@/components/common/CustomButton'
import React from 'react'
import heroSection1 from '@/assets/images/herosection1.png'
import heroSection2 from '@/assets/images/herosection2.png'
import Image from 'next/image'
import BookingForm from './BookingForm'
import Link from 'next/link'
import { ROUTES } from '@/libs/constants'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()
  return (
    <div className='bg-custom-dark-blue relative justify-items-center'>
      <div className='container flex flex-col md:flex-row gap-4 md:gap-0 text-white p-4 md:py-20 md:px-10 pb-60 sm:pb-40 md:pb-20'>
        {/* Left Section */}
        <div className='flex items-center justify-center flex-1 mr-2 md:mr-10'>
          <div className='flex flex-col gap-4'>
            <div className='text-4xl font-bold'>Discover the Untouched Beauty of Libya</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
            <Link href={'/login'}>
              <CustomButton title='Plan Your Trip' />
            </Link>
          </div>
        </div>

        {/* Right Section with Images */}
        <div className='flex-1 flex gap-4 items-end'>
          <div className='space-y-2'>
            <div className='text-lg font-semibold'>Tripoli</div>
            <Image src={heroSection1} alt='heroSection1' />
          </div>
          <div className='space-y-2'>
            <div className='text-lg font-semibold'>Leptis Magna</div>
            <Image src={heroSection2} alt='herosection2' />
          </div>
        </div>
      </div>

      {/* Booking Form - Centered Horizontally */}
      <div className='absolute w-full flex justify-center bottom-[-3.5rem]'>
        <BookingForm />
      </div>
    </div>
  )
}
