import React from 'react'
import Image from 'next/image'
import Partner1 from '@/assets/images/partner1.png'
import Partner2 from '@/assets/images/partner2.png'
import Partner3 from '@/assets/images/partner3.png'

export default function ReliablePartner() {
  return (
    <div className='bg-custom-orange justify-items-center'>
      <div className='container flex flex-col items-center gap-10 px-4 py-10 md:py-20 md:px-10 text-center'>
        <h2 className='text-4xl font-bold'>Your Reliable Partner for Libyan Travel!</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mx-auto text-black'>
          <div className='card bg-base-100 shadow-lg'>
            <div className='card-body items-start text-left p-6'>
              <div className='rounded-full bg-custom-dark-blue p-4 mb-4'>
                <Image src={Partner1} alt='' className='h-10 w-10' />
              </div>
              <h2 className='text-2xl font-bold'>Exclusive Focus on Libya</h2>
              <p className='text-lg'>
                Empower travelers with detailed information, photos, and honest reviews to make informed decisions.
              </p>
            </div>
          </div>

          <div className='card bg-base-100 shadow-lg'>
            <div className='card-body items-start text-left p-6'>
              <div className='rounded-full bg-custom-dark-blue p-4 mb-4'>
                <Image src={Partner2} alt='' className='h-10 w-10' />
              </div>
              <h2 className='text-2xl font-bold'>24/7 Customer Support</h2>
              <p className='text-lg'>
                Support local hospitality businesses by offering them greater visibility and a user-friendly platform to
                manage bookings.
              </p>
            </div>
          </div>

          <div className='card bg-base-100 shadow-lg sm:col-span-2 lg:col-span-1'>
            <div className='card-body items-start text-left p-6'>
              <div className='rounded-full bg-custom-dark-blue p-4 mb-4'>
                <Image src={Partner3} alt='' className='h-10 w-10' />
              </div>
              <h2 className='text-2xl font-bold'>Tailored for Your Needs</h2>
              <p className='text-lg'>
                Foster tourism growth in Libya while ensuring sustainable travel practices and cultural respect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
