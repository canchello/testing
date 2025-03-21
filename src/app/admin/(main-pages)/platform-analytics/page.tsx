'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Filters from '@/components/pages/@vendor/main/Reservations/Filters'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import duration from 'dayjs/plugin/duration'
import { PAYMENT_STATUS, ROUTES } from '@/libs/constants'
import StatisticsCard from '@/components/pages/@admin/StatisticCard'
import Link from 'next/link'
import CustomButton from '@/components/common/CustomButton'
import { ownerListURL } from '@/services/APIs/admin'

dayjs.extend(duration)
interface Filters {
  filterRange: [Date | undefined, Date | undefined]
  search: string
  status: string
}

const PaymentFinance = () => {
  const router = useRouter()

  return (
    <div className='space-y-4'>
      <div className='bg-white p-4 rounded-lg grid grid-cols-1 xs:grid-cols-3 gap-4'>
        <div className='col-span-full flex items-center justify-between'>
          <h1 className='text-lg font-bold'>User Analytics</h1>
          <CustomButton title='View More' variant='light_text' className='rounded-lg' />
        </div>
        <StatisticsCard title='New Bookings' number='840' change='8.70' />
        <StatisticsCard title='Cancellation' number='840' change='8.70' />
        {/* <StatisticsCard title='Net Profit' number='12%' change='5.70' /> */}
      </div>
      <div className='bg-white p-4 rounded-lg grid grid-cols-1 xs:grid-cols-3 gap-4'>
        <div className='col-span-full flex items-center justify-between'>
          <h1 className='text-lg font-bold'>Property Analytics</h1>
          <CustomButton title='View More' variant='light_text' className='rounded-lg' />
        </div>
        <StatisticsCard title='Total Properties' number='840' change='8.70' />
        <StatisticsCard title='Average Occupancy Rate' number='840' change='8.70' />
        <StatisticsCard title='Total Revenue' number='12%' change='5.70' moreLink={ROUTES.ADMIN.PLATFORM_ANALYTICS} />
      </div>
      <div className='bg-white p-4 rounded-lg grid grid-cols-1 xs:grid-cols-2 gap-4'>
        <div className='col-span-full flex items-center justify-between'>
          <h1 className='text-lg font-bold'>Booking Trends</h1>
          <CustomButton title='View More' variant='light_text' className='rounded-lg' />
        </div>
        <StatisticsCard title='Total Bookings' number='840' change='8.70' />
        <StatisticsCard title='Cancellation Rate' number='840' change='8.70' />
      </div>
      <div className='bg-white p-4 rounded-lg grid grid-cols-1 xs:grid-cols-4 gap-4'>
        <div className='col-span-full flex items-center justify-between'>
          <h1 className='text-lg font-bold'>Revenue & Finance Reports</h1>
          <CustomButton title='View More' variant='light_text' className='rounded-lg' />
        </div>
        <StatisticsCard title='Total Revenue' number='840' change='8.70' />
        <StatisticsCard title='Refunds/Adjustments' number='840' change='8.70' />
        <StatisticsCard title='Net Revenue' number='840' change='8.70' />
        <StatisticsCard title='Booking Revenue' number='840' change='8.70' />
      </div>
    </div>
  )
}

export default PaymentFinance
