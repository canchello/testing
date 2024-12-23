'use client'
import React, { useState } from 'react'
import userStore from '@/stores/userStore'
import HotelDetailCard from '@/components/pages/user/booking-status/HotelDetailCard'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import HotelCancellation from '@/components/pages/user/booking-status/HotelCancellation'

const CancelBooking = () => {
  const { setUser } = userStore()
  const [isLoading, setLoading] = useState(false)

  return (
    <div className='container mx-auto py-8 space-y-4 p-4 md:p-6'>
      <Link href='/'>
        <CustomButton
          title='Back to Home'
          variant='default'
          ImageIcon={false}
          icon={
            <div className='rounded-full bg-primary p-2 h-8 w-8'>
              <FontAwesomeIcon icon={faChevronLeft} color='white' />
            </div>
          }
          className='!p-0'
          iconPosition='left'
        />
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='col-span-2 space-y-4'>
          <HotelCancellation />
        </div>
        <HotelDetailCard />
      </div>
    </div>
  )
}

export default CancelBooking
