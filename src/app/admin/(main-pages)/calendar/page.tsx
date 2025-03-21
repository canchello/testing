'use client'
import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': require('date-fns/locale/en-US')
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [
  { title: 'Maintenance', start: new Date(2024, 5, 1, 11, 0), end: new Date(2024, 5, 1, 13, 0) },
  { title: 'Training', start: new Date(2024, 5, 5, 14, 0), end: new Date(2024, 5, 5, 16, 0) },
  { title: 'VIP Guest Arrival', start: new Date(2024, 5, 7, 12, 0), end: new Date(2024, 5, 7, 13, 0) },
  { title: 'Inventory Check', start: new Date(2024, 5, 12, 9, 0), end: new Date(2024, 5, 12, 13, 0) },
  { title: 'Guest Welcome Event', start: new Date(2024, 5, 21, 18, 0), end: new Date(2024, 5, 21, 20, 0) },
  { title: 'Monthly Review', start: new Date(2024, 5, 29, 11, 0), end: new Date(2024, 5, 29, 13, 0) }
]

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState({
    start: 'Jun 14, 2024',
    end: 'Jun 16, 2024'
  })

  return (
    <div className='flex min-h-screen gap-4'>
      {/* Calendar Section */}
      <div className='flex-1 p-4'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
          endAccessor='end'
          defaultView='month'
          views={['month', 'week', 'day']}
          className='rounded-lg'
        />
      </div>

      {/* Side Panel */}
      <div className='bg-gray-100 rounded-lg p-4'>
        <h2 className='text-lg font-semibold mb-4'>1 date select</h2>

        {/* Date Inputs */}
        <div>
          <label className='label text-gray-600'>Start Date</label>
          <input type='text' value={selectedDate.start} className='input input-bordered w-full mb-2' readOnly />

          <label className='label text-gray-600'>End Date</label>
          <input type='text' value={selectedDate.end} className='input input-bordered w-full' readOnly />
        </div>

        {/* Open/Close Booking */}
        <div className='mt-4'>
          <h3 className='font-medium mb-2'>Open or close for booking</h3>
          <div className='flex gap-2'>
            <label className='cursor-pointer label'>
              <input type='radio' name='booking' className='radio checked:bg-blue-500' />
              <span className='label-text ml-1'>Open</span>
            </label>
            <label className='cursor-pointer label'>
              <input type='radio' name='booking' className='radio' />
              <span className='label-text ml-1'>Close</span>
            </label>
          </div>
        </div>

        {/* Rates Section */}
        <div className='mt-4'>
          <h3 className='font-medium mb-2'>Rates</h3>
          <div className='mb-2'>
            <label className='label'>Standard rate</label>
            <input type='text' placeholder='US$' className='input input-bordered w-1/2' />
          </div>

          <div>
            <label className='label'>Non-Refundable rate</label>
            <input type='text' placeholder='US$' className='input input-bordered w-1/2' />
          </div>
        </div>

        {/* Footer */}
        <div className='mt-6'>
          Changes made from following date:
          <br />
          <strong>11 January 2023</strong>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage
