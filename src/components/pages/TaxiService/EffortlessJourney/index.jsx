'use client'
import Image from 'next/image'
import React from 'react'
import carsImg from "@/assets/images/journey-group.png"
import CustomButton from '@/components/common/CustomButton'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function EffortlessJourney() {
  const router = useRouter()
  return (
    <div className='justify-items-center'>
      <div className='container grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 py-10'>
        <div>
          <Image
            src={carsImg}
          />
        </div>
        <div className='flex justify-center items-center'>
          <div className='flex flex-col items-start space-y-3 max-w-[480px]'>
            <h1 className='text-4xl font-bold'>Effortless Journeys, Exceptional Comfort</h1>
            <p className='text-xl'>
              Enjoy luxury and convenience with Libya Booking’s car rentals. From airport pickups to hotel transfers, travel in style with reliable, comfortable service at every step.
            </p>
            <Link href={"/login"}>
              <CustomButton title="Book Now" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
