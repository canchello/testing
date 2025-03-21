"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import Axios from '@/libs/axios'
import BookingHistoryTable from '@/components/pages/@vendor/main/Reservations/details/BookingHoistory'
import ProfileCard from '@/components/pages/@vendor/main/Reservations/details/ProfileCard'
import { getUserDataURL } from '@/services/APIs/admin';
import Loader from '@/components/common/Loader';

export default function UserDetails() {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState(null)

  const fetchUserDetails = async () => {
    // const payload = {
    //   "query": {
    //     "_id": params.id
    //   },
    //   "options": {
    //     "populate": "rooms user", // [property]
    //     "lean": true,
    //     "findOne": true
    //   }
    // }
    try {
      setLoading(true)
      const { data } = await Axios({ ...getUserDataURL(params.id) })
      setUserDetails(data?.data)
    } catch (error) {
      console.error('error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])

  if (loading) return <Loader />
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Profile Card */}
        <div className="lg:col-span-3">
          <ProfileCard user={userDetails} passport={userDetails?.passport} />
        </div>

        {/* Booking History Section */}
        <div className="lg:col-span-9">
          <BookingHistoryTable userDetails={userDetails} />
        </div>
      </div>
    </div>
  )
}
