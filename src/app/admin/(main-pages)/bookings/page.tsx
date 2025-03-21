'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Filters from '@/components/pages/@vendor/main/Reservations/Filters'
import { faBed, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'

import { PAYMENT_STATUS, ROUTES } from '@/libs/constants'
import StatisticsCard from '@/components/pages/@admin/StatisticCard'
import { getOwnerBookingListURL } from '@/services/APIs/admin'
import Link from 'next/link'
import { useDebounce } from 'react-use'

dayjs.extend(duration)
dayjs.extend(utc)
interface Filters {
  filterRange: [Date | undefined, Date | undefined]
  search: string
  status: string
}

const Reservations = () => {
  const router = useRouter()

  const [refetchData, setRefetchData] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    filterRange: [undefined, undefined],
    search: '',
    status: 'All Status'
  })
  const [newSearch, setNewSearch] = useState('')
  useDebounce(() => setNewSearch(filters.search), 500, [filters.search])

  const handleFiltersChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const findDuration = (checkIn: any, checkOut: any) => {
    const diff = dayjs(checkOut).diff(dayjs(checkIn), 'days')
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
      cell: (row: any) => <div>{`${row?.user?.firstName || ''}  ${row?.user?.lastName || ''}`}</div>
    },
    {
      name: 'Request',
      dataKey: 'specialRequest'
    },
    {
      name: 'Room',
      dataKey: 'roomType',
      cell: (row: any) => <div>{row?.rooms?.[0]?.roomType?.name}</div>,
      sortable: true
    },
    {
      name: 'Duration',
      dataKey: 'duration',
      cell: (row: any) => <div>{findDuration(row.checkIn, row.checkOut)}</div>
    },
    {
      name: 'Check-in & Check-out',
      cell: (row: any) => (
        <div>{`${dayjs(row?.checkIn).format('MMM DD, YYYY')} - ${dayjs(row?.checkOut).format('MMM DD, YYYY')}`}</div>
      ),
      dataKey: 'checkIn',
      sortable: true
    },
    {
      name: 'Status',
      dataKey: 'status',
      cell: (row: any) => <div className='capitalize'>{getStatusBadge(row?.status)}</div>,
      sortable: true
    }
  ]

  useEffect(() => {
    setRefetchData(true)
  }, [filters.filterRange, newSearch, filters.status])

  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 xs:grid-cols-2 gap-4'>
        <StatisticsCard title='New Bookings' number='840' change='8.70' icon={faBed} />
        <Link href={ROUTES.ADMIN.BOOKINGS + '/cancellation'}>
          <StatisticsCard title='Cancellation' number='12%' change='5.70' icon={faDollarSign} />
        </Link>
      </div>
      <div className='flex flex-wrap items-center justify-between'>
        <div>
          <h1 className='text-lg font-medium'>Reservation List</h1>
        </div>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
      </div>
      <div className='w-full py-7 rounded-lg'>
        <TableComponent
          columns={columns}
          refetchData={refetchData}
          setRefetchData={setRefetchData}
          enablePagination={true}
          dataURL={getOwnerBookingListURL}
          recordPerPage={10}
          rowClickable={true}
          onRowClick={row => router.push(ROUTES.ADMIN.BOOKINGS + '/' + row._id)}
          payloadObj={{
            optionFilters: {
              populate: 'rooms user',
              lean: true
            },
            additionalFilters: {
              status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
              searchColumns: ['user.firstName', 'user.lastName', 'user.email', 'user.phoneNumber', 'status'],
              search: filters.search ? filters.search : undefined,
              dateRange:
                filters.filterRange?.[0] && filters.filterRange?.[1]
                  ? {
                      checkIn: [filters.filterRange[0], filters.filterRange[1]]
                    }
                  : undefined
            }
          }}
        />
      </div>
    </div>
  )
}

export default Reservations
