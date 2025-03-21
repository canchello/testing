'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Filters from '@/components/pages/@vendor/main/Reservations/Filters'
import { faBed, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import { vendorBookingList } from '@/services/APIs/vendor'
import duration from 'dayjs/plugin/duration'
import { PAYMENT_STATUS, ROUTES } from '@/libs/constants'
import CustomButton from '@/components/common/CustomButton'
import StatisticsCard from '@/components/pages/@admin/StatisticCard'
import Link from 'next/link'
import { adminUserListURL } from '@/services/APIs/admin'
import { useDebounce } from 'react-use'

dayjs.extend(duration)
interface Filters {
  filterRange: [Date | undefined, Date | undefined]
  search: string
  status: string
}

const UserManagement = () => {
  const router = useRouter()

  const [refetchData, setRefetchData] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    filterRange: [undefined, undefined],
    search: '',
    status: 'All Status'
  })
  const [newSearch, setNewSearch] = useState('')
  useDebounce(() => setNewSearch(filters.search), 500, [filters.search])

  // const handleFiltersChange = (newFilters: any) => {
  //   setFilters(prev => ({ ...prev, ...newFilters }))
  // }

  // const findDuration = (checkIn: any, checkOut: any) => {
  //   const diff = dayjs(checkOut).diff(dayjs(checkIn))
  //   const durationFormatted = Math.round(dayjs.duration(diff).asDays())
  //   return `${durationFormatted} days`
  // }

  // const getStatusBadge = (status: any) => {
  //   return (
  //     <div
  //       className={`p-1 border text-center rounded-full ${
  //         status === PAYMENT_STATUS.CONFIRMED ? 'bg-[#D5F6E5]' : 'bg-[#FFEEEE]'
  //       }`}
  //     >
  //       {status}
  //     </div>
  //   )
  // }

  const columns = [
    {
      name: 'User Name',
      dataKey: 'username',
      sortable: true,
      cell: (row: any) => <div>{`${row?.firstName || ''} ${row?.lastName || ''}`}</div>
    },
    {
      name: 'Email Address',
      dataKey: 'email',
      cell: (row: any) => <div>{row?.email}</div>,
      sortable: true
    },
    {
      name: 'Contact Number',
      dataKey: 'phoneNumber',
      cell: (row: any) => <div>{row?.phoneNumber}</div>,
      sortable: true
    },
    {
      name: 'Date of Birth',
      dataKey: 'dob',
      cell: (row: any) => <div>{dayjs(row.dob).format('MMM DD YYYY')}</div>,
      sortable: true
    },
    {
      name: 'Nationality',
      dataKey: 'nationality',
      cell: (row: any) => <div>{row.nationality || ''}</div>,
      sortable: true
    },
    {
      name: 'Registration Date',
      dataKey: 'createdAt',
      cell: (row: any) => <div>{dayjs(row.createdAt).format('MMM DD YYYY')}</div>,
      sortable: true
    },
    {
      name: 'Booking Made',
      dataKey: 'bookingCount',
      cell: (row: any) => <div>{row.bookingCount || '-'}</div>,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row: any) => (
        <div className='flex gap-4'>
          <Link href={ROUTES.ADMIN.USER_MANAGEMENT + '/' + row._id}>
            <CustomButton variant='light_text' title='View' className='rounded-lg !px-4 !py-0' />
          </Link>
        </div>
      )
    }
  ]

  useEffect(() => {
    setRefetchData(true)
  }, [newSearch])

  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 xs:grid-cols-2 gap-4'>
        <StatisticsCard title='New Bookings' number='840' change='8.70' icon={faBed} />
        <StatisticsCard title='Total Revenue' number='$123' change='5.70' icon={faDollarSign} />
      </div>
      <div className='flex flex-wrap items-center justify-between'>
        <div>
          <h1 className='text-lg font-medium'>User Information</h1>
        </div>
        {/* <Filters filters={filters} onFiltersChange={handleFiltersChange} /> */}
        <div className='flex items-center gap-4'>
          <input
            type='text'
            placeholder='Search User'
            value={filters.search}
            onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className='input bg-gray-100 w-full max-w-xs'
          />
          {/* <CustomButton title='Search' className='rounded-lg !px-4 !py-2' /> */}
        </div>
      </div>
      <div className='w-full py-2 rounded-lg'>
        <TableComponent
          className='p-0 shadow-none'
          columns={columns}
          refetchData={refetchData}
          setRefetchData={setRefetchData}
          enablePagination={true}
          dataURL={adminUserListURL}
          recordPerPage={10}
          payloadObj={{
            optionFilters: {
              // populate: 'rooms user',
              // lean: true
            },
            additionalFilters: {
              // status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
              searchColumns: ['firstName', 'lastName', 'email', 'contact', 'nationality'],
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

export default UserManagement
