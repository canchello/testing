'use client'
import React, { useEffect, useState } from 'react'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import { vendorBookingList } from '@/services/APIs/vendor'
import duration from 'dayjs/plugin/duration'
import StatisticsCard from '@/components/pages/@admin/StatisticCard'
import Filters from './Filters'
import { getSupportTicketsListURL } from '@/services/APIs/admin'
import { getStatusBadge } from '@/components/common/components'
import Link from 'next/link'
import { ROUTES, USER_ROLES } from '@/libs/constants'
import { useDebounce } from 'react-use'

dayjs.extend(duration)
interface Filters {
  filterRange: [Date | undefined, Date | undefined]
  search: string
  status: string
}

const Support = () => {
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
      name: 'Email Address',
      dataKey: 'email',
      cell: (row: any) => <div>{row?.user?.email}</div>
    },
    {
      name: 'Reason',
      dataKey: 'reason',
      cell: (row: any) => <div>{row?.issueSubject}</div>,
      sortable: true
    },
    {
      name: 'Raised Date',
      cell: (row: any) => <div>{`${dayjs(row?.createdAt).format('MMM DD, YYYY')}`}</div>,
      dataKey: 'raisedDate',
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
  }, [newSearch])

  return (
    <div className='space-y-8'>
      <div className='space-y-4'>
        <h1 className='text-lg font-bold'>Support Tickets</h1>
        <div className='grid grid-cols-1 xs:grid-cols-3 gap-4'>
          <Link href={ROUTES.ADMIN.SUPPORT + '/' + USER_ROLES.USER}>
            <StatisticsCard title='User Ticket' number='840' change='8.70' icon={faArrowRightFromBracket} />
          </Link>
          <Link href={ROUTES.ADMIN.SUPPORT + '/' + USER_ROLES.VENDOR}>
            <StatisticsCard title='Property Owner Ticket' number='840' change='8.70' icon={faArrowRightFromBracket} />
          </Link>
          <Link href={ROUTES.ADMIN.SUPPORT + '/closed'}>
            <StatisticsCard title='Resolved Ticket' number='840' change='8.70' icon={faArrowRightFromBracket} />
          </Link>
        </div>
      </div>
      <div className='flex flex-wrap items-center justify-between'>
        <div>
          <h1 className='text-lg font-medium'>Tickets</h1>
        </div>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
      </div>
      <div className='w-full pb-7 rounded-lg'>
        <TableComponent
          columns={columns}
          refetchData={refetchData}
          setRefetchData={setRefetchData}
          enablePagination={true}
          dataURL={getSupportTicketsListURL}
          recordPerPage={10}
          payloadObj={{
            optionFilters: {
              populate: 'user',
              lean: true
            },
            additionalFilters: {
              // status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
              searchColumns: ['user.firstName', 'user.lastName', 'user.email', 'issueSubject', 'issueType', 'status'],
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

export default Support
