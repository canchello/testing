'use client'
import React, { useEffect, useState } from 'react'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import { vendorBookingList } from '@/services/APIs/vendor'
import duration from 'dayjs/plugin/duration'
import StatisticsCard from '@/components/pages/@admin/StatisticCard'
import { getSupportTicketsListURL } from '@/services/APIs/admin'
import { getStatusBadge } from '@/components/common/components'
import Filters from '../Filters'
import { useParams } from 'next/navigation'
import { USER_ROLES } from '@/libs/constants'

dayjs.extend(duration)
interface Filters {
  filterRange: [Date | undefined, Date | undefined]
  search: string
  status: string
}

const Support = () => {
  const params = useParams()
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
  }, [filters])

  return (
    <div className='space-y-8'>
      <div className='flex flex-wrap items-center justify-between'>
        <div>
          <h1 className='text-lg font-medium'>
            {params.role === USER_ROLES.USER && 'User'}
            {params.role === USER_ROLES.VENDOR && 'Property Owner'}
            {params.role === 'closed' && 'Resolved'}
            <span> Tickets </span>
          </h1>
        </div>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
      </div>
      <div className='w-full pb-7 rounded-lg'>
        <TableComponent
          columns={columns}
          refetchData={refetchData}
          enablePagination={true}
          dataURL={getSupportTicketsListURL}
          recordPerPage={10}
          payloadObj={{
            // optionFilters: {
            //   populate: 'user',
            //   lean: true
            // },
            additionalFilters: {
              role: [USER_ROLES.USER, USER_ROLES.VENDOR].includes(`${params.role}`) ? params.role : undefined,
              status: params.role === 'closed' ? params.role : undefined,
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

export default Support
