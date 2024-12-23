'use client'
import React, { useEffect, useState } from 'react'
import userStore from '@/stores/userStore'
import BookValues from '@/components/pages/user/booking-checkout/BookValues'
import RoomDetails from '@/components/pages/user/booking-checkout/RoomDetails'
import Link from 'next/link'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Axios from '@/libs/axios'
import { getHotelListURL } from '@/services/APIs/hotel'
import { useParams } from 'next/navigation'
import hotelStore from '@/stores/hotelStore'

const BookingCheckout = () => {
  const params = useParams()
  const { hotelFilters } = hotelStore()
  const { setUser } = userStore()
  const [propertyData, setPropertyData] = useState({})
  const [isLoading, setLoading] = useState(false)

  const fetchHotelDetails = async () => {
    try {
      setLoading(true)
      const { data } = await Axios({
        ...getHotelListURL,
        data: {
          query: {
            _id: params.id,
            checkIn: hotelFilters.checkIn,
            checkOut: hotelFilters.checkOut
          },
          options: {
            populate: ['facility', 'rules', "attachment", "roomType"],
            lean: true
          }
        }
      })
      setPropertyData(data.data.data?.find(i => i._id === params.id))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHotelDetails()
  }, [])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col lg:flex-row gap-4'>
        <BookValues propertyData={propertyData} />
        <div className='flex-1 space-y-4 lg:w-[calc(100vw_-288px)]'>
          <Link href='/booking'>
            <CustomButton
              title='Back to Hotel'
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

          <RoomDetails rooms={propertyData.roomType} />
        </div>
      </div>
    </div>
  )
}

export default BookingCheckout
