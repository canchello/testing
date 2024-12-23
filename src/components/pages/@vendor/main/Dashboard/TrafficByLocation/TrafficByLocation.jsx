'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { name: '60% USA', value: 60 },
  { name: '12% UK', value: 12 },
  { name: '11% Lebenan', value: 11 },
  { name: '9% Canada', value: 9 },
  { name: '5% lIbya', value: 5 },
  { name: '2% Others', value: 2 }
]
const COLORS = ['#FFEEE2', '#E5B7A4', '#B47345', '#C7763E', '#FCC9A5']

const TrafficByLocation = () => {
  return (
    <div className=' bg-white space-y-4 w-full'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-semibold text-gray-800'>Traffic By Location</h2>
        <button className='text-gray-400 hover:text-gray-600'>
          <svg width='16' height='4' viewBox='0 0 16 4' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M8 3.125C8.62132 3.125 9.125 2.62132 9.125 2C9.125 1.37868 8.62132 0.875 8 0.875C7.37868 0.875 6.875 1.37868 6.875 2C6.875 2.62132 7.37868 3.125 8 3.125Z'
              fill='#15253B'
            />
            <path
              d='M14 3.125C14.6213 3.125 15.125 2.62132 15.125 2C15.125 1.37868 14.6213 0.875 14 0.875C13.3787 0.875 12.875 1.37868 12.875 2C12.875 2.62132 13.3787 3.125 14 3.125Z'
              fill='#15253B'
            />
            <path
              d='M2 3.125C2.62132 3.125 3.125 2.62132 3.125 2C3.125 1.37868 2.62132 0.875 2 0.875C1.37868 0.875 0.875 1.37868 0.875 2C0.875 2.62132 1.37868 3.125 2 3.125Z'
              fill='#15253B'
            />
          </svg>
        </button>
      </div>

      {/* TrafficByLocation */}
      <div className='w-full h-52 max-h-52'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart width={550} height={300}>
            <Pie data={data} innerRadius={50} outerRadius={90} fill='#8884d8' paddingAngle={5} dataKey='value'>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              layout='vertical'
              align='right'
              verticalAlign='middle'
              formatter={value => <span style={{ color: 'black' }}>{value}</span>}
              iconType='circle'
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TrafficByLocation
