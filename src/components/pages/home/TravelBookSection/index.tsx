import CustomButton from '@/components/common/CustomButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TravelBook() {
  const router = useRouter()
  return (
    <div className='bg-custom-dark-blue text-white justify-items-center'>
      <div className='container flex flex-col md:flex-row items-center text-white p-10'>
        {/* Text Section */}
        <div className='max-w-lg mb-8 md:mb-0'>
          <h2 className='text-3xl font-bold mb-4'>Seamless Airport Transfers for a Stress-Free Journey</h2>
          <p className='mb-4'>
            Travel with ease and convenience by booking our reliable airport drop-off and pick-up services.
          </p>
          <Link href={'/login'}>
            <CustomButton variant='light' title='Book Now' />
          </Link>
        </div>

        {/* Image Section */}
        <div className='relative max-h-[300px] w-full'>
          <img
            src='https://res.cloudinary.com/dndsypilw/image/upload/v1730370444/qe6dmkyhyteggq72p7fg.jpg'
            alt='Airport transfer'
            className='w-full max-h-[300px] object-none rounded-lg'
          />
        </div>
      </div>
    </div>
  )
}
