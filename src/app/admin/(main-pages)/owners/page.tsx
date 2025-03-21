'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { faBed, faDollarSign, faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import { vendorBookingList } from '@/services/APIs/vendor'
import duration from 'dayjs/plugin/duration'
import { PAYMENT_STATUS, ROUTES } from '@/libs/constants'
import StatisticsCard from '@/components/pages/@admin/StatisticCard'
import Link from 'next/link'
import CustomButton from '@/components/common/CustomButton'
import Filters from '@/components/pages/@admin/owners/Filters'
import { ownerListURL } from '@/services/APIs/admin'
import { useDebounce } from 'react-use'

dayjs.extend(duration)
interface Filters {
  search: string
}

const Owners = () => {
  const router = useRouter()

  const [refetchData, setRefetchData] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    search: ''
  })
  const [newSearch, setNewSearch] = useState('')
  useDebounce(() => setNewSearch(filters.search), 500, [filters.search])

  const handleFiltersChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const columns = [
    {
      name: 'Owner Name',
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
      name: 'Registration Date',
      dataKey: 'createdAt',
      cell: (row: any) => <div>{dayjs(row.createdAt).format('MMM DD YYYY')}</div>,
      sortable: true
    },
    {
      name: 'Property Address',
      dataKey: 'address',
      cell: (row: any) => <div>{row.primaryProperty?.address}</div>,
      sortable: true
    },
    {
      name: 'Booking Made (week)',
      dataKey: 'bookingCount',
      cell: (row: any) => <div>{row.primaryProperty?.bookingCount}</div>,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row: any) => (
        <div className='flex gap-4'>
          <Link href={ROUTES.ADMIN.OWNERS + '/' + row._id}>
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
    <div>
      <div className='grid grid-cols-1 xs:grid-cols-3 gap-4 mb-8'>
        <StatisticsCard title='Total Owner' number='840' change='8.70' icon={faBed} />
        <Link href={ROUTES.ADMIN.OWNERS + '/pending'}>
          <StatisticsCard title='Pending Approval' number='840' change='8.70' icon={faBed} />
        </Link>
        <StatisticsCard title='Average Property Revenue' number='$123' change='5.70' icon={faDollarSign} />
      </div>
      <div className='flex flex-wrap items-center justify-between'>
        <div>
          <h1 className='text-lg font-medium'>Owner List</h1>
        </div>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
      </div>
      <div className='w-full py-7 rounded-lg'>
        <TableComponent
          columns={columns}
          refetchData={refetchData}
          setRefetchData={setRefetchData}
          enablePagination={true}
          dataURL={ownerListURL}
          recordPerPage={10}
          payloadObj={{
            optionFilters: {
              // populate: 'primaryProperty',
              lean: true
            },
            additionalFilters: {
              // status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
              searchColumns: ['firstName', 'lastName', 'email', 'phoneNumber', 'primaryProperty.address', 'status'],
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

export default Owners
