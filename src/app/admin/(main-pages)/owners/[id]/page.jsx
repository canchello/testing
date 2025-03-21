"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import Axios from '@/libs/axios'
import ProfileCard from '@/components/pages/@admin/owners/ProfileCard';
import { getOwnerDataURL } from '@/services/APIs/admin';
import Loader from '@/components/common/Loader';
import RoomListingTable from '@/components/pages/@admin/owners/RoomListing';

export default function ReservationDetails() {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [ownerDetails, setOwnerDetails] = useState(null)

  const fetchOwnerDetails = async () => {
    try {
      const { data } = await Axios({ ...getOwnerDataURL(params.id) })
      setOwnerDetails(data?.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchOwnerDetails();
  }, [])

  if (loading) return <Loader />
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Profile Card */}
        <div className="lg:col-span-3">
          <ProfileCard user={ownerDetails} property={ownerDetails?.user} />
        </div>

        {ownerDetails?.primaryProperty &&
          <div className="lg:col-span-9">
            <RoomListingTable property={ownerDetails?.primaryProperty} />
          </div>}

      </div>
    </div>
  )
}
