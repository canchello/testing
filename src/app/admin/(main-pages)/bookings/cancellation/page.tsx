'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import { vendorBookingList } from '@/services/APIs/vendor'
import duration from 'dayjs/plugin/duration'
import { PAYMENT_STATUS, ROUTES } from '@/libs/constants'
import StatisticsCard from '@/components/pages/@admin/StatisticCard'
import Filters from './Filters'
import Link from 'next/link'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

dayjs.extend(duration)
interface Filters {
  filterRange: [Date | undefined, Date | undefined]
  search: string
  status: string
}

const Cancellation = () => {
  const router = useRouter()

  const [refetchData, setRefetchData] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    filterRange: [undefined, undefined],
    search: '',
    status: 'All Status'
  })
  const handleFiltersChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const findDuration = (checkIn: any, checkOut: any) => {
    const diff = dayjs(checkOut).diff(dayjs(checkIn), 'day')
    // const durationFormatted = Math.round(dayjs.duration(diff).asDays())
    return `${diff + 1 || 0} days`
  }

  const getStatusBadge = (status: any) => {
    return (
      <div
        className={`p-1 border text-center rounded-full ${
          status === PAYMENT_STATUS.CONFIRMED ? 'bg-[#D5F6E5]' : 'bg-[#FFEEEE]'
        }`}
      >
        {status}
      </div>
    )
  }

  const columns = [
    {
      name: 'Guest',
      dataKey: 'guestUser',
      sortable: true,
      cell: (row: any) => <div>{row?.user?.firstName + ' ' + row?.user?.lastName}</div>
    },
    {
      name: 'Property',
      dataKey: 'propertyTitle',
      cell: (row: any) => <div>{row?.property?.title}</div>
    },
    {
      name: 'Room',
      dataKey: 'roomType',
      cell: (row: any) => <div>{row?.rooms[0]?.roomType?.name}</div>,
      sortable: true
    },
    {
      name: 'Check-in Date',
      cell: (row: any) => <div>{`${dayjs(row?.checkIn).format('MMM DD, YYYY')}`}</div>,
      dataKey: 'checkIn',
      sortable: true
    },
    {
      name: 'Cancellation Date',
      cell: (row: any) => <div>{`${dayjs(row?.checkIn).format('MMM DD, YYYY')}`}</div>,
      dataKey: 'cancellationDate',
      sortable: true
    },
    {
      name: 'Reason for Cancellation',
      dataKey: 'reasonForCancellation',
      cell: (row: any) => <div className='capitalize'>{row?.reasonForCancellation}</div>,
      sortable: true
    },
    {
      name: 'Refund Status',
      dataKey: 'status',
      cell: (row: any) => <div className='capitalize'>{getStatusBadge(row?.status)}</div>,
      sortable: true
    }
  ]

  useEffect(() => {
    setRefetchData(true)
  }, [filters])

  return (
    <div className='space-y-8'>
      <div>
        <Link href={ROUTES.ADMIN.BOOKINGS}>
          <CustomButton
            title='Back to List'
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
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-3 gap-4'>
        <StatisticsCard title='Total Cancellation' number='840' change='8.70' />
        <StatisticsCard title='Cancellation Rate' number='12%' change='5.70' />
        <StatisticsCard title='Refund Amount' number='12,000' change='5.70' />
      </div>
      <div className='flex flex-wrap items-center justify-between'>
        <div>
          <h1 className='text-lg font-bold'>Booking Cancellation</h1>
        </div>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
      </div>
      <div className='w-full py-7 rounded-lg'>
        <TableComponent
          columns={columns}
          refetchData={refetchData}
          enablePagination={true}
          dataURL={vendorBookingList}
          recordPerPage={10}
          payloadObj={{
            optionFilters: {
              populate: 'rooms user property',
              lean: true
            },
            additionalFilters: {
              status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
              // searchColumns: [
              //   'specialRequest',
              //   'guestUser.firstName',
              //   'guestUser.lastName',
              //   'guestUser.email',
              //   'guestUser.gender',
              //   'status'
              // ],
              search: filters.search,
              filterRange: filters.filterRange[0]
                ? [filters.filterRange[0]?.toISOString(), filters.filterRange[1]?.toISOString()]
                : undefined
            }
          }}
        />
      </div>
    </div>
  )
}

export default Cancellation
