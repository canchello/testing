'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import carRentImg from '@/assets/images/car-rental.jpg'
import BookForm from '@/components/pages/hotels/car-rental/BookForm'
import CarTypes from '@/components/pages/TaxiService/ChoosePerfectRide/CarTypes'
import CarServices from '@/components/pages/TaxiService/ChoosePerfectRide/CarServices'

const CarRental = () => {

  return (
    <div className='container mx-auto space-y-4'>
      <div className='relative sm:mb-96'>
        <Image src={carRentImg} alt='' className='w-full max-h-96 object-cover rounded-xl' />
        <div className='absolute top-0 h-full w-full p-4 sm:p-8 text-white bg-gradient-to-r from-[#15253B] to-transparent rounded-xl'>
          <div className='flex gap-2 flex-col justify-center h-full'>
            <h1 className='text-xl sm:text-3xl font-bold'>Effortless Journeys, Exceptional Comfort</h1>
            <span className='text-sm sm:text-xl'>
              From airport pickups to hotel transfers, travel in style with reliable, comfortable service at every step.
            </span>
          </div>
        </div>
        <div className='hidden sm:block absolute sm:mx-10 bg-custom-orange p-4 rounded-xl top-3/4 shadow-lg'>
          <BookForm />
        </div>
      </div>
      <div className='block sm:hidden sm:mx-10 bg-custom-orange p-4 rounded-xl shadow-lg'>
        <BookForm />
      </div>
      <div className='py-8 space-y-2'>
        <h1 className='text-3xl font-bold'>Book Your Perfect Ride!</h1>
        <CarTypes />
      </div>
      <div className='py-8'>
        <CarServices />
      </div>
    </div>
  )
}

export default CarRental
