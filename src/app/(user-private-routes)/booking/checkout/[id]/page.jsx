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
import { getRoomTypeListURL } from '@/services/APIs/hotel'
import { useParams } from 'next/navigation'
import hotelStore from '@/stores/hotelStore'
import Loader from '@/components/common/Loader'
import { useUnmount } from 'react-use'

const BookingCheckout = () => {
  const params = useParams()
  const { hotelFilters, setSelectedRooms } = hotelStore()
  const { setUser } = userStore()
  const [propertyData, setPropertyData] = useState([])
  const [isLoading, setLoading] = useState(false)

  const fetchRoomDetails = async () => {
    try {
      setLoading(true)
      const { data } = await Axios({
        ...getRoomTypeListURL,
        data: {
          query: {
            propertyId: params.id,
            checkIn: hotelFilters.checkIn,
            checkOut: hotelFilters.checkOut
          },
          options: {
            populate: ["attachment", "amenities"],
            lean: true
          }
        }
      })
      setPropertyData(data.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useUnmount(() => {
    setSelectedRooms([])
  })

  useEffect(() => {
    fetchRoomDetails()
  }, [])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col lg:flex-row gap-4'>
        <BookValues propertyData={{ roomType: propertyData }} />
        <div className='flex-1 space-y-4 lg:w-[calc(100vw_-288px)]'>
          <Link href={`/stays/${params.id}`}>
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
          {
            isLoading ? <Loader /> :
              propertyData && <RoomDetails rooms={propertyData} />
          }
        </div>
      </div>
    </div>
  )
}

export default BookingCheckout
