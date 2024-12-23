'use client'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Table from '@/components/common/TableComponent'

const columns = [
  {
    name: 'Date',
    dataKey: 'createdAt',
    sortable: true,
    cell: row => <div>{row?.createdAt}</div>
  },
  {
    name: 'Issue Type',
    dataKey: 'issueType',
    sortable: true
  },
  {
    name: 'Issue Description',
    dataKey: 'issueDescription'
  },
  {
    name: 'Comment',
    dataKey: 'comment'
  },
  {
    name: 'Resolution Date',
    dataKey: 'resolutionDate',
    sortable: true
  },
  {
    name: 'Status',
    dataKey: 'status',
    sortable: true
  }
]
const BookingList = () => {
  return (
    <div className=' bg-white space-y-4 w-full'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-semibold text-gray-800'>Booking List</h2>
        <div className='dropdown dropdown-end ml-auto'>
          <div
            tabIndex={0}
            role='button'
            className='border rounded-lg py-2 px-4 space-x-4 bg-primary text-white border-none focus:outline-none focus:ring-2 focus:ring-opacity-50'
          >
            <span>Last 7 Days</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <ul tabIndex={0} className='dropdown-content w-52 menu bg-base-100 rounded-box z-[1] p-2 shadow'>
            <li>
              <a>Last 7 Days</a>
            </li>
            <li>
              <a>Last 30 Days</a>
            </li>
            <li>
              <a>Last 90 Days</a>
            </li>{' '}
          </ul>
        </div>
      </div>

      {/* BookingList Section */}
      <div className=''>
        <Table columns={columns} data={[]} />
      </div>
    </div>
  )
}

export default BookingList
