'use client'
import React, { useEffect, useState } from 'react'
import HotelConfirmation from '@/components/pages/user/booking-status/HotelConfirmation'
import RecommendCarBooking from '@/components/pages/user/booking-status/RecommendCarBooking'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Axios from '@/libs/axios'
import { fetchUserBookingListURL } from '@/services/APIs/booking'
import HotelDetailCard from '@/components/pages/user/booking-confirmation/HotelDetailCard'
import Loader from '@/components/common/Loader'

const BookingConfirmed = () => {
  const params = useParams()
  const [isLoading, setLoading] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)

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
      const { data: res }: any = await Axios({ ...fetchUserBookingListURL, data: payload })
      setBookingDetails(res?.data?.data.find((booking: any) => booking._id === params.id))
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
    <div className='container mx-auto p-4 space-y-8'>
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
      {!isLoading && bookingDetails ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='col-span-2 space-y-4'>
            <HotelConfirmation bookingDetails={bookingDetails} />
          </div>
          <HotelDetailCard bookingDetails={bookingDetails} />
        </div>
      ) : (
        <Loader />
      )}
      <RecommendCarBooking />
    </div>
  )
}

export default BookingConfirmed
