'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/common/Loader'
import Filters from '@/components/pages/@vendor/main/Reservations/Filters'
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
import { ownerListURL } from '@/services/APIs/admin'
import { useDebounce } from 'react-use'

dayjs.extend(duration)
interface Filters {
  filterRange: [Date | undefined, Date | undefined]
  search: string
  status: string
}

const PaymentFinance = () => {
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
      name: 'Property Owner',
      dataKey: 'guestUser',
      sortable: true,
      cell: (row: any) => <div>{`${row?.firstName || ''} ${row?.lastName || ''}`}</div>
    },
    {
      name: 'Email',
      dataKey: 'email'
    },
    {
      name: 'Bank Name',
      dataKey: 'bankName',
      cell: (row: any) => <div>{row?.bankDetail?.bankName}</div>,
      sortable: true
    },
    {
      name: 'Account Number',
      dataKey: 'accountNumber',
      cell: (row: any) => <div>{row.bankDetail?.accountNumber}</div>
    },
    {
      name: 'IFSC Code',
      cell: (row: any) => <div>{row.bankDetail?.IFSC}</div>,
      dataKey: 'ifscCode',
      sortable: true
    },
    {
      name: 'Last Payout',
      dataKey: 'lastPayout',
      cell: (row: any) => <div className='capitalize'>{row?.lastPayout}</div>,
      sortable: true
    },
    {
      name: 'Action',
      dataKey: 'action',
      cell: (row: any) => (
        <div>
          <Link href={ROUTES.ADMIN.PAYMENT_FINANCE + '/' + row._id}>
            <CustomButton title='View' className='rounded-lg !px-4 !py-0' />
          </Link>
        </div>
      ),
      sortable: true
    }
  ]

  useEffect(() => {
    setRefetchData(true)
  }, [newSearch, filters.status, filters.filterRange])

  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 xs:grid-cols-3 gap-4'>
        <StatisticsCard title='Total Revenue' number='840' change='8.70' />
        <StatisticsCard title='Total Payout' number='840' change='8.70' />
        <StatisticsCard title='Net Profit' number='12%' change='5.70' />
      </div>
      <div className='flex flex-wrap items-center justify-between'>
        <div>
          <h1 className='text-lg font-medium'>Property List</h1>
        </div>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} showStatus={false} />
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
              populate: ['bankDetail'],
              lean: true
            },
            additionalFilters: {
              status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
              searchColumns: ['email', 'firstName', 'lastName', 'phoneNumber'],
              search: filters.search ? filters.search : undefined,
              dateRange:
                filters.filterRange?.[0] && filters.filterRange?.[1]
                  ? {
                      createdAt: [filters.filterRange[0], filters.filterRange[1]]
                    }
                  : undefined
            }
          }}
        />
      </div>
    </div>
  )
}

export default PaymentFinance
