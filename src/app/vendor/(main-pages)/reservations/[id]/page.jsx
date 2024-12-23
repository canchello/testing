import BookingHistoryTable from '@/components/pages/@vendor/main/Reservations/details/BookingHoistory'
import BookingInfoCard from '@/components/pages/@vendor/main/Reservations/details/BookingInfoCard'
import ProfileCard from '@/components/pages/@vendor/main/Reservations/details/ProfileCard'
import RoomInfoCard from '@/components/pages/@vendor/main/Reservations/details/RoomInfoCar'
import Filters from '@/components/pages/@vendor/main/Reservations/Filters'
import React from 'react'

export default function ReservationDetails() {
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Profile Card */}
        <div className="lg:col-span-3">
          <ProfileCard />
        </div>

        {/* Booking Info */}
        <div className="lg:col-span-6">
          <BookingInfoCard />
        </div>

        {/* Room Info */}
        <div className="lg:col-span-3">
          <RoomInfoCard />
        </div>
      </div>

      {/* Booking History Section */}
      <div className="mt-8">
        <BookingHistoryTable />
      </div>
    </div>
  )
}
