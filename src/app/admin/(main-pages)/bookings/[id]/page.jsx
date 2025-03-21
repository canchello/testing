"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import Axios from '@/libs/axios'
import BookingInfoCard from '@/components/pages/@vendor/main/Reservations/details/BookingInfoCard'
import ProfileCard from '@/components/pages/@vendor/main/Reservations/details/ProfileCard'
import RoomInfoCard from '@/components/pages/@vendor/main/Reservations/details/RoomInfoCar'
import Loader from '@/components/common/Loader';
import { getAdminBookingURL } from '@/services/APIs/admin';

export default function ReservationDetails() {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const fetchBookingDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({ ...getAdminBookingURL(params.id) })
      setBookingDetails(response?.data?.data)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookingDetails();
  }, [])

  if (loading) return <Loader />
  if (!bookingDetails) return (
    <div className='flex justify-center items-center my-5'>
      <p>Booking not Found!</p>
    </div>
  )
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Profile Card */}
        <div className="lg:col-span-3">
          <ProfileCard user={bookingDetails?.user} passport={bookingDetails?.passport} />
        </div>

        {/* Booking Info */}
        <div className="lg:col-span-6">
          <BookingInfoCard bookingDetails={bookingDetails} />
        </div>

        {/* Room Info */}
        <div className="lg:col-span-3">
          <RoomInfoCard bookingDetails={bookingDetails} />
        </div>
      </div>

      {/* Booking History Section * /}
      {/* <div className="mt-8">
        <BookingHistoryTable bookingDetails={bookingDetails} />
      </div> */}
    </div>
  )
}
