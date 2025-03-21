'use client'
import React, { useEffect, useState } from 'react'
import BookValues from '@/components/pages/user/booking/BookValues'
import HotelDetails from '@/components/pages/user/booking/HotelDetails'
import Link from 'next/link'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'next/navigation'
import Axios from '@/libs/axios'
import { getHotelListURL } from '@/services/APIs/hotel'
import Loader from '@/components/common/Loader'
import hotelStore from '@/stores/hotelStore'

const Booking = () => {
  const params = useParams()
  const { hotelFilters, setselectedHotel } = hotelStore()
  const [propertyData, setPropertyData] = useState()
  const [isLoading, setLoading] = useState(false)

  const fetchHotelDetails = async () => {
    try {
      setLoading(true)
      const { data } = await Axios({
        ...getHotelListURL, data: {
          query: {
            _id: params.id,
            // checkIn: hotelFilters.checkIn,
            // checkOut: hotelFilters.checkOut,
          },
          "options": {
            "populate": ["facilities", "rules", "attachment"],
            "lean": true
          }
        }
      })
      setPropertyData(data.data?.data?.find(i => i._id === params.id))
      setselectedHotel(data.data?.data?.find(i => i._id === params.id))
    } catch (error) {
      console.error(error);
    }
    finally {
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
        <div className='space-y-4 flex-1 lg:w-[calc(100%_-280px)]'>
          <Link href='/stays/search-results'>
            <CustomButton
              title='Back to Results'
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
          {isLoading ?
            <Loader />
            :
            (propertyData &&
              <HotelDetails
                hotel={propertyData}
              />)
          }
        </div>
      </div>
    </div>
  )
}

export default Booking
