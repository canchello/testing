'use client'
import React, { useEffect, useState } from 'react'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import { vendorBookingList } from '@/services/APIs/vendor'
import duration from 'dayjs/plugin/duration'
import StatisticsCard from '@/components/pages/@admin/StatisticCard'
import { getSupportTicketsListURL, listTaxiBookingsURL } from '@/services/APIs/admin'
import { getStatusBadge } from '@/components/common/components'
import Link from 'next/link'
import { ROUTES, USER_ROLES } from '@/libs/constants'
import Filters from './Filters'
import CustomButton from '@/components/common/CustomButton'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'react-use'

dayjs.extend(duration)
interface Filters {
  filterRange: [Date | undefined, Date | undefined]
  search: string
  status: string
}

const Support = () => {
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

  const columns = [
    {
      name: 'User Name',
      dataKey: 'username',
      sortable: true,
      cell: (row: any) => <div>{`${row?.user?.firstName || ''} ${row?.user?.lastName || ''}`}</div>
    },
    {
      name: 'Pickup Location',
      dataKey: 'pickupLocation',
      cell: (row: any) => <div>{row?.pickUpLocation}</div>
    },
    {
      name: 'Drop Location',
      dataKey: 'dropLocation',
      cell: (row: any) => <div>{row?.dropOffLocation}</div>
    },
    {
      name: 'Pickup Date & Time',
      dataKey: 'pickupDateTime',
      cell: (row: any) => <div>{dayjs(row?.pickupDateTime).format('MMM DD, YYYY HH:mm A')}</div>
    },
    {
      name: 'Note',
      dataKey: 'note',
      cell: (row: any) => <div className='line-clamp-2 max-w-40'>{row?.note}</div>
    },
    {
      name: "Driver' Details",
      dataKey: 'driverDetails',
      cell: (row: any) => (
        <div className='line-clamp-2 max-w-40'>
          <span>{row.driverName || ''}</span>
          <span>{row.driverContactNumber || ''}</span>
        </div>
      )
    },
    {
      name: 'Action',
      dataKey: 'action',
      cell: (row: any) => (
        <div>
          <CustomButton
            variant='light_text'
            title={row.driverName || row.driverContactNumber ? 'Show Details' : 'Assign Driver'}
            className='whitespace-nowrap'
            onClick={() => router.push(`/taxi-bookings/${row?._id}`)}
          />
        </div>
      ),
      sortable: true
    }
  ]

  useEffect(() => {
    setRefetchData(true)
  }, [newSearch])

  return (
    <div className='space-y-8'>
      <div className='flex flex-wrap items-center justify-between'>
        <div>
          <h1 className='text-lg font-medium'>Taxi Bookings</h1>
        </div>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
      </div>
      <div className='w-full pb-7 rounded-lg'>
        <TableComponent
          columns={columns}
          refetchData={refetchData}
          setRefetchData={setRefetchData}
          enablePagination={true}
          dataURL={listTaxiBookingsURL}
          recordPerPage={10}
          payloadObj={{
            optionFilters: {
              populate: 'user',
              lean: true
            },
            additionalFilters: {
              // status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
              searchColumns: [
                'user.firstName',
                'user.lastName',
                'user.email',
                'pickUpLocation',
                'dropOffLocation',
                'driverName',
                'driverContactNumber'
              ],
              search: newSearch ? newSearch : undefined
              // filterRange: filters.filterRange[0]
              //   ? [filters.filterRange[0]?.toISOString(), filters.filterRange[1]?.toISOString()]
              //   : undefined
            }
          }}
        />
      </div>
    </div>
  )
}

export default Support
