'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const data = [
  {
    name: '12 Jun',
    booked: 70,
    canceled: 10
  },
  {
    name: '13 Jun',
    booked: 75,
    canceled: 25
  },
  {
    name: '14 Jun',
    booked: 55,
    canceled: 5
  },
  {
    name: '15 Jun',
    booked: 25,
    canceled: 10
  },
  {
    name: '16 Jun',
    booked: 75,
    canceled: 35
  },
  {
    name: '17 Jun',
    booked: 55,
    canceled: 35
  },
  {
    name: '18 Jun',
    booked: 55,
    canceled: 15
  }
]
const Reservations = () => {
  return (
    <div className=' bg-white space-y-4 w-full'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-semibold text-gray-800'>Reservations</h2>
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

      {/* Reservations Section */}
      <div className='w-full h-52 max-h-52'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart width={550} height={300} data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip wrapperStyle={{ color: 'black' }} />
            <Bar type='monotone' dataKey='booked' stackId='a' fill='#FFEEE2' />
            <Bar type='monotone' dataKey='canceled' stackId='a' fill='#C7763E' />
            <Legend
              layout='horizontal'
              verticalAlign='top'
              formatter={value => <span style={{ color: 'black' }}>{value}</span>}
              iconType='circle'
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Reservations
