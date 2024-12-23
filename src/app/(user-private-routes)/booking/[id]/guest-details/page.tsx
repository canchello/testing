'use client'
import React, { useEffect, useState } from 'react'
import BookValues from '@/components/pages/user/booking-guest-detail/BookValues'
import RoomDetails from '@/components/pages/user/booking-guest-detail/RoomDetails'
import GuestDetails from '@/components/pages/user/booking-guest-detail/GuestDetails'
import Link from 'next/link'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Axios from '@/libs/axios'
import { fetchUserBookingListURL } from '@/services/APIs/booking'
import { useParams } from 'next/navigation'
import Loader from '@/components/common/Loader'

const BookingCheckout = () => {
  const [isLoading, setLoading] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const params = useParams()
  const fetchUserBookingDetails = async () => {
    setLoading(true)
    const payload = {
      query: {
        _id: params?.id
      },
      populate: 'rooms property',
      lean: true,
      findOne: true
    }
    try {
      const response:any = await Axios({ ...fetchUserBookingListURL, data: payload })
      setBookingDetails(response.data?.data?.data[0])
      setLoading(false)
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  
  useEffect(() => {
    if (params.id) {
      fetchUserBookingDetails()
    }
  }, [])

  return (
    <div className='container mx-auto p-4'>
       {isLoading ? <div className='h-screen flex justify-center items-center'><Loader/></div> :
      <div className='flex flex-col lg:flex-row gap-4'>
        <BookValues bookingDetails={bookingDetails} />
        <div className='flex-1 space-y-4 lg:w-[calc(100vw_-280px)]'>
          <Link href='/booking/checkout'>
            <CustomButton
              title='Back to Selection'
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
              <RoomDetails bookingDetails={bookingDetails}  />
              <GuestDetails bookingDetails={bookingDetails} />
        </div>
      </div>
      }
    </div>
  )
}

export default BookingCheckout
