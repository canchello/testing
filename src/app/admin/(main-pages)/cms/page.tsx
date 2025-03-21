'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import { vendorBookingList } from '@/services/APIs/vendor'
import duration from 'dayjs/plugin/duration'
import { PAYMENT_STATUS, ROUTES } from '@/libs/constants'
import Filters from './Filters'
import { deleteBlogURL, listBlogURL } from '@/services/APIs/admin'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import Axios from '@/libs/axios'
import { toast } from 'sonner'
import { useDebounce } from 'react-use'

dayjs.extend(duration)
interface Filters {
  search: string
}

const ContentManagement = () => {
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

  const findDuration = (checkIn: any, checkOut: any) => {
    const diff = dayjs(checkOut).diff(dayjs(checkIn), 'day')
    // const durationFormatted = Math.round(dayjs.duration(diff).asDays())
    return `${diff + 1 || 0} days`
  }

  const getStatusBadge = (status: any) => {
    return (
      <div
        className={`py-1 px-2 border text-center rounded-full ${
          status === 'publish' ? 'bg-[#D5F6E5]' : 'bg-[#FFEEEE]'
        }`}
      >
        {status}
      </div>
    )
  }

  const onDelete = async (id: any) => {
    try {
      const { data }: any = await Axios({ ...deleteBlogURL(id) })
      toast.success(data.message)
      setRefetchData(true)
    } catch (error) {
      console.error(error)
    }
  }

  const columns = [
    // {
    //   name: 'Guest',
    //   dataKey: 'guestUser',
    //   sortable: true,
    //   cell: (row: any) => <div>{row?.user?.firstName + ' ' + row?.user?.lastName}</div>
    // },
    {
      name: 'Article',
      dataKey: 'article',
      cell: (row: any) => <div className='max-w-96 truncate'>{row?.title || ''}</div>,
      sortable: true
    },
    {
      name: 'Category',
      dataKey: 'category',
      cell: (row: any) => <div className='capitalize'>{(row.category || '').replace(/_/g, ' ')}</div>
    },
    {
      name: 'Page Views',
      dataKey: 'pageView',
      cell: (row: any) => <div className='capitalize'>{row?.views || 0}</div>,
      sortable: true
    },
    {
      name: 'Status',
      dataKey: 'status',
      cell: (row: any) => <div className='capitalize'>{getStatusBadge(row?.visibility || 'Draft')}</div>,
      sortable: true
    },
    {
      name: 'Likes',
      dataKey: 'like',
      cell: (row: any) => <div className='capitalize'>{row?.likes || 0}</div>,
      sortable: true
    },
    // {
    //   name: 'Comments',
    //   dataKey: 'comments',
    //   cell: (row: any) => <div className='capitalize'>{row?.comments}</div>,
    //   sortable: true
    // },
    {
      name: 'Action',
      dataKey: 'action',
      cell: (row: any) => (
        <div className='capitalize'>
          <div className='flex gap-4 p-2'>
            <FontAwesomeIcon
              className='cursor-pointer'
              icon={faPencil}
              onClick={() => router.push(`${ROUTES.ADMIN.CMS}/blog/${row?._id}`)}
            />
            <FontAwesomeIcon
              className='cursor-pointer'
              icon={faTrash}
              onClick={() => {
                onDelete(row?._id)
              }}
            />
          </div>
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
          <h1 className='text-lg font-medium'>Content List</h1>
        </div>
        <Filters filters={filters} onFiltersChange={handleFiltersChange} />
      </div>
      <div className='w-full pb-7 rounded-lg'>
        <TableComponent
          columns={columns}
          refetchData={refetchData}
          setRefetchData={setRefetchData}
          enablePagination={true}
          dataURL={listBlogURL}
          recordPerPage={10}
          payloadObj={{
            optionFilters: {
              // populate: 'rooms user',
              // lean: true
            },
            additionalFilters: {
              // status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
              searchColumns: ['title', 'category'],
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

export default ContentManagement
