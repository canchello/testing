'use client'
import React from 'react'
import Card from './Card' // Assuming Card is already created
import bookingsIcon from '@/assets/svg/calenderOutline.svg'
import checkInIcon from '@/assets/svg/checkInIcon.svg'
import checkOutIcon from '@/assets/svg/checkOutIcon.svg'
import dollarIcon from '@/assets/svg/dollarIcon.svg'
import OverallRating from '../OverallRatings/OverallRatings'
import Reservations from '../Reservations/Reservations'
import TrafficByLocation from '../TrafficByLocation/TrafficByLocation'
import RoomAvailability from '../RoomAvailability/RoomAvailability'
import Revenue from '../Revenue/Revenue'
import BookingList from '../BookingList/BookingList'

const StatisticsCards = () => {
  const cardData = [
    {
      id: 1,
      title: 'New Bookings',
      data: '840',
      growthPercentage: '8.70%',
      status: 'positive',
      icon: bookingsIcon
    },
    {
      id: 2,
      title: 'Check-In',
      data: '231',
      growthPercentage: '3.56%',
      status: 'positive',
      icon: checkInIcon
    },
    {
      id: 3,
      title: 'Check-Out',
      data: '124',
      growthPercentage: '1.06%',
      status: 'negative',
      icon: checkOutIcon
    },
    {
      id: 4,
      title: 'Total Revenue',
      data: '$123,980',
      growthPercentage: '5.70%',
      status: 'positive',
      icon: dollarIcon
    }
  ]

  return (
    <div>
      {/* Dashboard Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4'>
        <div className='col-span-6 w-full grid grid-cols-1 md:grid-cols-2 md:col-span-4 lg:grid-cols-4 lg:col-span-6 gap-4'>
          {/* Static cards */}
          {cardData.map(card => (
            <Card key={card.id} details={card} />
          ))}
          <div className='col-span-2 md:col-span-2'>
            {/* Reservations */}
            <Reservations />
          </div>
          <div className='col-span-2'>
            {/* Traffic By Location */}
            <TrafficByLocation />
          </div>
        </div>
        <div className='col-span-2'>
          {/* Overall Rating */}
          <OverallRating />
        </div>
        <div className='col-span-2'>
          {/* Room Availability */}
          <RoomAvailability />
        </div>
        <div className='col-span-6'>
          {/* Revenue */}
          <Revenue />
        </div>
        <div className='col-span-8'>
          {/* Booking list */}
          <BookingList />
        </div>
      </div>
    </div>
  )
}

export default StatisticsCards
