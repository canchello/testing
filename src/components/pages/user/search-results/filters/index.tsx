import CustomButton from '@/components/common/CustomButton'
import CustomDateInput from '@/components/form/DateField'
import CustomSelect from '@/components/form/SelectField'
import { countries } from '@/libs/constants'
import hotelStore from '@/stores/hotelStore'
import React from 'react'

export default function Filters({ state, setState }: any) {
  const { hotelFilters, setHotelFilters, fetchHotelList }: any = hotelStore()

  const handleSearchChange = () => {
    if (hotelFilters) {
      const payload = {
        query: {
          search: hotelFilters?.location,
          searchColumns: ['city', 'state', 'country'],
          checkIn: new Date(hotelFilters?.checkIn),
          checkOut: new Date(hotelFilters?.checkOut),
          numberOfGuest: Number(hotelFilters?.adults) + Number(hotelFilters?.children) || 0
          // location: [String(locationCords.latitude), String(locationCords.longitude)]
        },
        options: {
          page: 1,
          limit: 10,
          populate:["primaryAttachment","attachment"],
          // populate: 'attachment facility rules',
          lean: true
        }
      }
      fetchHotelList(payload)
      setState((prev: any) => ({
        ...(prev || {}),
        chackIn: new Date(hotelFilters?.checkIn),
        checkOut: new Date(hotelFilters?.checkOut)
      }))
    }
  }
  return (
<div className=''>
  <div className='bg-custom-dark-blue  w-full flex p-4 rounded-lg'>
    <div className='w-full space-y-4'>
      <p className='text-center text-white text-xl font-semibold'>Your Search</p>
      <div className='bg-white p-3 rounded-lg'>
        <CustomSelect
          label='Location'
          options={Object.keys(countries).map((item: any) => ({
            label: countries[item],
            value: countries[item],
          }))}
          value={hotelFilters?.location || ''}
          onChange={e => setHotelFilters({ ...hotelFilters, location: e.target.value })}
        />
      </div>
      <div className='bg-white p-3 rounded-lg space-y-2'>
        <CustomDateInput
          label='Check-In date'
          placeholder='Enter Check In'
          value={hotelFilters?.checkIn}
          onChange={e => setHotelFilters({ ...hotelFilters, checkIn: e.target.value })}
        />
        <CustomDateInput
          label='Check-out date'
          placeholder='Enter Check out'
          value={hotelFilters?.checkOut}
          onChange={e => setHotelFilters({ ...hotelFilters, checkOut: e.target.value })}
        />
      </div>
      <div className='flex flex-col sm:flex-row bg-white p-3 rounded-lg gap-2'>
        <CustomSelect
          label='Adults'
          options={counts.map((item: any) => ({ label: item, value: item }))}
          value={hotelFilters?.adults || '0'}
          onChange={e => setHotelFilters({ ...hotelFilters, adults: e.target.value })}
        />
        <CustomSelect
          label='Children'
          options={counts.map((item: any) => ({ label: item, value: item }))}
          value={hotelFilters?.children || '0'}
          onChange={e => setHotelFilters({ ...hotelFilters, children: e.target.value })}
        />
      </div>
      <CustomButton title='Search' className='w-full' onClick={handleSearchChange} />
    </div>
  </div>
</div>

  )
}

const counts = Array.from({ length: 10 }, (_, i) => i)
