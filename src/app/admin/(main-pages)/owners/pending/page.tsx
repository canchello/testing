'use client'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import duration from 'dayjs/plugin/duration'
import { PROFILE_STATUS, ROUTES } from '@/libs/constants'
import Link from 'next/link'
import CustomButton from '@/components/common/CustomButton'
import Filters from '@/components/pages/@admin/owners/Filters'
import { ownerListURL } from '@/services/APIs/admin'

dayjs.extend(duration)
interface Filters {
  filterRange: [Date | undefined, Date | undefined]
  search: string
  status: string
}

const Reservations = () => {
  const [refetchData, setRefetchData] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    filterRange: [undefined, undefined],
    search: '',
    status: 'All Status'
  })
  const handleFiltersChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const columns = [
    {
      name: 'Owner Id',
      dataKey: 'ownerID',
      sortable: true,
      cell: (row: any) => <div>{row?._id}</div>
    },
    {
      name: 'Owner Name',
      dataKey: 'ownername',
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
      cell: (row: any) => <div>{row?.primaryProperty?.phoneNumber}</div>,
      sortable: true
    },
    {
      name: 'Property Name',
      dataKey: 'name',
      cell: (row: any) => <div>{row.primaryProperty?.title}</div>,
      sortable: true
    },
    {
      name: 'Property Address',
      dataKey: 'address',
      cell: (row: any) => <div>{row.primaryProperty?.address}</div>,
      sortable: true
    },
    {
      name: 'City',
      dataKey: 'city',
      cell: (row: any) => <div>{row.primaryProperty?.city}</div>,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row: any) => (
        <div className='flex gap-4'>
          <Link href={ROUTES.ADMIN.OWNERS + '/pending/' + row._id}>
            <CustomButton variant='light_text' title='View' className='rounded-lg !px-4 !py-0' />
          </Link>
        </div>
      )
    }
  ]

  useEffect(() => {
    setRefetchData(true)
  }, [filters])

  return (
    <div>
      <div className='flex flex-wrap items-center justify-between'>
        <div>
          <h1 className='text-lg font-medium'>Owner Listing</h1>
        </div>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
      </div>
      <div className='w-full py-7 rounded-lg'>
        <TableComponent
          columns={columns}
          refetchData={refetchData}
          enablePagination={true}
          dataURL={ownerListURL}
          recordPerPage={10}
          payloadObj={{
            optionFilters: {
              // populate: 'primaryProperty',
              lean: true
            },
            additionalFilters: {
              status: PROFILE_STATUS.PENDING,
              // searchColumns: [
              //   'specialRequest',
              //   'guestUser.firstName',
              //   'guestUser.lastName',
              //   'guestUser.email',
              //   'guestUser.gender',
              //   'status'
              // ],
              search: filters.search ? filters.search : undefined
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

export default Reservations
