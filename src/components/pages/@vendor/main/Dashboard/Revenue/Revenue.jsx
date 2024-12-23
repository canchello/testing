'use client'

import React from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  {
    name: 'Dec 2027',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Jan 2028',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Feb 2028',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Mar 2028',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Apr 2028',
    uv: 1890,
    pv: 4800,
    amt: 2181
  }
]

const Revenue = () => {
  return (
    <div className=' bg-white space-y-4 w-full'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-semibold text-gray-800'>Revenue</h2>
        <div className='dropdown dropdown-end ml-auto'>
          <div
            tabIndex={0}
            role='button'
            className='border rounded-lg py-2 px-4 space-x-4 bg-primary text-white border-none focus:outline-none focus:ring-2 focus:ring-opacity-50'
          >
            <span>Last 3 Months</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <ul tabIndex={0} className='dropdown-content w-52 menu bg-base-100 rounded-box z-[1] p-2 shadow'>
            <li>
              <a>Last 3 Months</a>
            </li>
            <li>
              <a>Last 6 Months</a>
            </li>
            <li>
              <a>Last 9 Months</a>
            </li>{' '}
          </ul>
        </div>
      </div>

      {/* Revenue */}
      <div className='w-full h-52 max-h-52'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            width={500}
            height={400}
            data={data}
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
  )
}

export default Revenue
