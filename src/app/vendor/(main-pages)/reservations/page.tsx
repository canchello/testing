'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/common/Loader'
import Filters from '@/components/pages/@vendor/main/Reservations/Filters'
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import { cancelBookingURL, vendorBookingList } from '@/services/APIs/vendor'
import duration from 'dayjs/plugin/duration'
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/libs/constants'
import { useDebounce } from 'react-use'
import { cn } from '@/libs/tailwind'
import Axios from '@/libs/axios'
import { toast } from 'sonner'

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
  const [newSearch, setNewSearch] = useState('')
  useDebounce(() => setNewSearch(filters.search), 2000, [filters.search])

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
      cell: (row: any) => <div>{`${row?.user?.firstName || ''} ${row?.user?.lastName || ''}`}</div>
    },
    {
      name: 'Room',
      dataKey: 'roomType',
      cell: (row: any) => <div>{row?.rooms[0]?.roomType?.name}</div>,
      sortable: true
    },
    {
      name: 'Request',
      dataKey: 'specialRequest'
    },
    {
      name: 'Duration',
      dataKey: 'duration',
      cell: (row: any) => <div>{findDuration(row.checkIn, row.checkOut)}</div>
    },
    {
      name: 'Check-in & Check-out',
      cell: (row: any) => (
        <div>{`${dayjs(row?.checkIn).format('MMMM DD, YYYY')} - ${dayjs(row?.checkOut).format('MMMM DD, YYYY')}`}</div>
      ),
      dataKey: 'checkIn',
      sortable: true
    },
    {
      name: 'Status',
      dataKey: 'status',
      cell: (row: any) => <div className='capitalize'>{getStatusBadge(row?.status)}</div>,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row: any) => <Actions {...{ row }} />
    }
  ]

  useEffect(() => {
    setRefetchData(true)
  }, [filters.filterRange, filters.status, newSearch])

  return (
    <div>
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
          enablePagination={true}
          dataURL={vendorBookingList}
          recordPerPage={10}
          payloadObj={{
            optionFilters: {
              populate: 'rooms user',
              lean: true
            },
            additionalFilters: {
              status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
              searchColumns: ['user.firstName', 'user.lastName', 'user.email', 'status'],
              search: newSearch ? newSearch : undefined,
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

const Actions = ({ row }: any) => {
  const router = useRouter()
  const [cancelLoading, setCancelLoading] = useState(false)

  const updateBookingStatus = async (bookingId: any, status: any) => {
    try {
      setCancelLoading(true)
      const { data }: any = await Axios({ ...cancelBookingURL(bookingId) })
      toast.success(data.message)
    } catch (error) {
      console.error(error)
    } finally {
      setCancelLoading(false)
    }
  }

  return (
    <div className='flex gap-4'>
      <div className='cursor-pointer' onClick={() => router.push(`/vendor/reservations/${row._id}`)}>
        <FontAwesomeIcon icon={faEye} />
      </div>
      {BOOKING_STATUS.CONFIRMED === row?.status && (
        <div
          className={cn(
            'py-1 px-2 rounded-md cursor-pointer',
            row?.status === BOOKING_STATUS.PENDING ? 'bg-[#D5F6E5]' : 'bg-[#FFEEEE]'
          )}
          onClick={() =>
            updateBookingStatus(
              row?._id,
              row?.status === BOOKING_STATUS.PENDING ? BOOKING_STATUS.CONFIRMED : BOOKING_STATUS.CANCELLED
            )
          }
        >
          {cancelLoading ? 'Loading...' : row?.status === BOOKING_STATUS.PENDING ? 'Confirm' : 'Cancel'}
        </div>
      )}
    </div>
  )
}

export default Reservations
