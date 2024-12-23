'use client'
import React, { useState } from 'react'
import userStore from '@/stores/userStore'
import Image from 'next/image'
import StaysBg from '@/assets/images/stays-bg.jpg'
import CustomButton from '@/components/common/CustomButton'
import RecentSearches from '@/components/pages/hotels/stays/RecentSearch/RecentSearches'
import ExploreTopDestinations from '@/components/pages/hotels/stays/TopDestinations'
import SpecialUniqueStays from '@/components/pages/hotels/stays/SpecialUniqueStays'
import SearchForm from '@/components/pages/hotels/stays/SearchForm'

const Stay = () => {
  const { setUser }: any = userStore()
  const [isLoading, setLoading] = useState(false)
  return (
    <div className='mx-auto'>
      <div className='relative sm:mb-40 md:mb-52 lg:mb-20 '>
        <Image src={StaysBg} alt='' className='w-full max-h-96 object-cover rounded-xl' />
        <div className='absolute top-0 h-full w-full p-4 sm:p-8 text-white bg-gradient-to-r from-[#15253B] to-transparent rounded-xl'>
          <div className='flex gap-2 flex-col justify-center h-full'>
            <h1 className='leading-5 sm:leading-normal text-xl sm:text-3xl md:text-2xl lg:text-3xl font-bold'>
              Manage Your Bookings & Explore New Stays
            </h1>
            <span className='text-sm sm:text-xl md:text-base lg:text-xl'>
              Easily manage your upcoming stays, past bookings, and preferences all in one place.
            </span>
            {/* <h1 className='text-3xl font-bold'>Manage Your Bookings & Explore New Stays</h1>
            <span className='text-xl'>
              Easily manage your upcoming stays, past bookings, and preferences all in one place.
            </span> */}
          </div>
        </div>
        <div className='hidden sm:flex justify-center absolute w-full top-[88%] lg:top-3/4'>
          <SearchForm className='w-11/12 bg-custom-orange p-4 rounded-xl shadow-lg' />
        </div>
      </div>
      <div className='block sm:hidden w-full sm:mx-10 bg-custom-orange p-4 rounded-xl shadow-lg my-5'>
        <SearchForm />
      </div>
      {/* <RecentSearches /> */}
      <ExploreTopDestinations />
      <SpecialUniqueStays />
    </div>
  )
}

export default Stay
