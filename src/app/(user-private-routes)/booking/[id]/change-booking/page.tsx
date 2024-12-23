'use client'
import React, { useState } from 'react'
import userStore from '@/stores/userStore'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import HotelCancellation from '@/components/pages/user/booking-status/HotelCancellation'
import HotelChange from '@/components/pages/user/booking-status/HotelChange'
import UpgradeBookingHotelDetailsCard from '@/components/pages/user/booking-status/UpgradeBookingHotelDetailsCard'
import Axios from '@/libs/axios'
import { getBookingListURL } from '@/services/APIs/user'
import { useParams } from 'next/navigation'
import { useMount } from 'react-use'
import Loader from '@/components/common/Loader'

const ChangeBooking = () => {
  const params = useParams()
  const { setUser }: any = userStore()
  const [isLoading, setLoading] = useState(false)
  const [booking, setBooking] = useState<any>()

  const fetchBookingDetails = async () => {
    try {
      setLoading(true)
      const { data }: any = await Axios({
        ...getBookingListURL,
        data: {
          query: { _id: params.id },
          options: {
            populate: 'rooms property',
            lean: true,
            findOne: true
          }
        }
      })
      setBooking(data.data || null)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useMount(() => fetchBookingDetails())

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
      {!isLoading && booking && (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='md:col-span-2 space-y-4'>
            <HotelChange booking={booking} />
          </div>
          <UpgradeBookingHotelDetailsCard booking={booking} />
        </div>
      )}
      {isLoading && <Loader />}
    </div>
  )
}

export default ChangeBooking
