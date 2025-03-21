"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import Axios from '@/libs/axios'
import BookingHistoryTable from '@/components/pages/@vendor/main/Reservations/details/BookingHoistory'
import BookingInfoCard from '@/components/pages/@vendor/main/Reservations/details/BookingInfoCard'
import ProfileCard from '@/components/pages/@vendor/main/Reservations/details/ProfileCard'
import RoomInfoCard from '@/components/pages/@vendor/main/Reservations/details/RoomInfoCar'
import Filters from '@/components/pages/@vendor/main/Reservations/Filters'
import { vendorBookingList } from '@/services/APIs/vendor'
import { t } from 'i18next';
import Loader from '@/components/common/Loader';

export default function ReservationDetails() {
  const params = useParams()
  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchBookingDetails = async () => {
    const payload = {
      "query": {
        "_id": params.id
      },
      "options": {
        "populate": "rooms user", // [property]
        "lean": true,
        "findOne": true
      }
    }
    try {
      setLoading(true)
      const response = await Axios({ ...vendorBookingList, data: payload })
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

      {/* Booking History Section */}
      <div className="mt-8">
        <BookingHistoryTable bookingDetails={bookingDetails} />
      </div>
    </div>
  )
}
