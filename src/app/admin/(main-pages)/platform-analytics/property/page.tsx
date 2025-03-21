'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { ROUTES } from '@/libs/constants'
import StatisticsCard from '@/components/pages/@admin/StatisticCard'
import CustomButton from '@/components/common/CustomButton'
import Link from 'next/link'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TableComponent from '@/components/common/TableComponent'
import { adminUserListURL } from '@/services/APIs/admin'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

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
  }, [filters])

  return (
    <div className='space-y-4'>
      <div className='bg-white p-4 rounded-lg grid grid-cols-1 xs:grid-cols-2 gap-4'>
        <Link className='col-span-full' href={ROUTES.ADMIN.PLATFORM_ANALYTICS}>
          <button className='text-primary mt-4 inline-flex gap-2 items-center'>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back To List
          </button>
        </Link>
        <StatisticsCard title='Total Properties' number='840' change='8.70' />
        <StatisticsCard title='Average Occupancy Rate' number='840' change='8.70' />
        {/* <StatisticsCard title='Net Profit' number='12%' change='5.70' /> */}
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-3 gap-4'>
        <div className='bg-white p-4 rounded-lg'>
          <h1 className='text-lg font-bold'>Revenue by Property</h1>
          <div className='w-full h-52 max-h-52'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart
                width={500}
                height={400}
                data={dataUser}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Area type='monotone' dataKey='uv' stroke='#B47345' fill='#FFF9F5B8' />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg'>
          <h1 className='text-lg font-bold'>Occupancy Trends</h1>
          <ResponsiveContainer width='100%' height={200}>
            <BarChart data={dataPreferences} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis tickFormatter={tick => `${tick / 1000}K`} />
              <Tooltip />
              <Bar dataKey='value' fill='#D4F5E3' />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='bg-white p-4 rounded-lg'>
          <h1 className='text-lg font-bold'>Top Performing Properties</h1>
          <div className='relative'>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={ActiveUserData}
                  innerRadius={50}
                  outerRadius={70}
                  startAngle={180}
                  endAngle={0}
                  dataKey='value'
                  cornerRadius={0}
                >
                  {ActiveUserData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='absolute inset-0 flex flex-col justify-center items-center'>
              <p className='text-sm text-gray-500'>Total Users</p>
              <p className='text-lg font-bold'>32000</p>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white p-4 rounded-lg'>
        <div className='flex items-center justify-between'>
          <h1 className='text-lg font-bold'>Detailed Property Data</h1>
          <div className='flex items-center gap-4'>
            <input
              type='text'
              placeholder='Search User'
              // value={searchInput}
              // onChange={e => handleSearchChange(e.target.value)}
              className='input bg-gray-100 w-full max-w-xs'
            />
            <CustomButton title='Search' className='rounded-lg !px-4 !py-2' />
          </div>
        </div>
        <div className='w-full py-2 rounded-lg'>
          <TableComponent
            className='p-0 shadow-none'
            columns={columns}
            refetchData={refetchData}
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
    </div>
  )
}

const dataUser = [
  {
    name: 'Week 1',
    uv: 600,
    pv: 400,
    amt: 400
  },
  {
    name: 'Week 2',
    uv: 630,
    pv: 450,
    amt: 450
  },
  {
    name: 'Week 3',
    uv: 512,
    pv: 390,
    amt: 390
  },
  {
    name: 'Week 4',
    uv: 320,
    pv: 300,
    amt: 300
  }
]

const ActiveUserData = [
  { label: 'Active Users', value: 20000 },
  { label: 'Inactive Users', value: 10000 }
]
const COLORS = ['#C7763E', '#c7773e90']

const dataPreferences = [
  { name: 'Preference 1', value: 28000 },
  { name: 'Preference 2', value: 24000 },
  { name: 'Preference 3', value: 20000 },
  { name: 'Preference 4', value: 25000 }
]

export default PaymentFinance
