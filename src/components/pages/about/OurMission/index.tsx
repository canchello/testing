import React from 'react'
import Image from 'next/image'
import Mission1 from '@/assets/images/mission1.png'
import Mission2 from '@/assets/images/mission2.png'
import Mission3 from '@/assets/images/mission3.png'

export default function OurMission() {
  return (
    <div className='justify-items-center bg-custom-dark-blue'>
      <div className='container relative pt-10 pb-60 md:pb-44 lg:pb-48 mb-[880px] md:mb-[520px] lg:mb-72 flex flex-col items-center gap-6 py-6 px-6 md:py-20 md:px-10 text-center text-white'>
        <h2 className='text-4xl font-bold'>Our Mission</h2>
        <p className='text-xl max-w-5xl'>
          Our mission is to revolutionize the way people explore Libya by providing an easy, efficient, and secure
          platform for booking hotels and other travel services.
        </p>

        <div className='absolute flex justify-center mx-auto text-black top-80 xs:top-60'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='card max-w-72 bg-base-100 shadow-lg'>
              <div className='card-body items-center text-center p-6'>
                <div className='rounded-full bg-orange-100 p-6 mb-4'>
                  <Image src={Mission1} alt='' className='h-16 w-16' />
                </div>
                <p className='text-lg'>
                  Empower travelers with detailed information, photos, and honest reviews to make informed decisions.
                </p>
              </div>
            </div>

            <div className='card max-w-72 bg-base-100 shadow-lg'>
              <div className='card-body items-center text-center p-6'>
                <div className='rounded-full bg-orange-100 p-6 mb-4'>
                  <Image src={Mission2} alt='' className='h-16 w-16' />
                </div>
                <p className='text-lg'>
                  Support local hospitality businesses by offering them greater visibility and a user-friendly platform
                  to manage bookings.
                </p>
              </div>
            </div>

            <div className='card flex items-center bg-base-100 shadow-lg md:col-span-2 lg:col-span-1'>
              <div className='card-body items-center text-center p-6 max-w-72'>
                <div className='rounded-full bg-orange-100 p-6 mb-4'>
                  <Image src={Mission3} alt='' className='h-16 w-16' />
                </div>
                <p className='text-lg'>
                  Foster tourism growth in Libya while ensuring sustainable travel practices and cultural respect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
