'use client'
import React from 'react'
import CustomButton from '@/components/common/CustomButton'
import CarTypes from './CarTypes'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ChoosePerfectRide() {
  const router = useRouter()
  return (
    <div className='justify-items-center bg-custom-dark-blue'>
      <div className='container justify-items-center text-white p-4 py-10 space-y-4'>
        <h1 className='text-4xl font-bold'>
          Choose the Perfect Ride
        </h1>
        <p className='text-lg'>
          Discover car rental options tailored to your needs
        </p>
        <CarTypes />
        <div>
          <Link href={"/login"}>
            <CustomButton title="Book Now" />
          </Link>
        </div>
      </div>
    </div>
  )
}
