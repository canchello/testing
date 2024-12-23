import CustomButton from '@/components/common/CustomButton'
import CustomDateInput from '@/components/form/DateField'
import hotelStore from '@/stores/hotelStore'
import userStore from '@/stores/userStore'
import { faBaby, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

export default function BookValues({ propertyData }) {
  const params = useParams()
  const { hotelFilters, setHotelFilters } = hotelStore()
  const { user } = userStore()

  const lowestPrice = useMemo(() => {
    if (!propertyData) return
    const prices = propertyData?.roomType?.map(i => i.price)
    return Math.min(...(prices || [0]))
  }, [propertyData])

  return (
    <div className=''>
      <div className='bg-custom-dark-blue flex p-4 rounded-lg'>
        <div className='w-full space-y-4'>
          <div className='flex justify-around flex-wrap gap-2 bg-white p-3 rounded-lg'>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center bg-custom-orange p-2 rounded-full w-8 h-8'>
                <FontAwesomeIcon icon={faPeopleGroup} className='text-primary' />
              </div>
              <span>Adult: {hotelFilters?.adults || '-'}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center bg-custom-orange p-2 rounded-full w-8 h-8'>
                <FontAwesomeIcon icon={faBaby} className='text-primary' />
              </div>
              <span>Children: {hotelFilters?.children || '-'}</span>
            </div>
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
          {lowestPrice &&
            <div className='flex flex-col items-center justify-center bg-white p-3 rounded-lg gap-2'>
              <p className='text-sm font-medium'>Price starts from</p>
              <div className='flex items-center gap-2'>
                <h1 className='text-primary text-3xl font-semibold'>${lowestPrice}</h1>
                <span className='font-medium'>per night</span>
              </div>
            </div>}
          <div>
            {user ?
              <Link href={'/booking/checkout/' + params.id}>
                <CustomButton title='Book Now' className='w-full' />
              </Link>
              :
              <Link href={'/login'}>
                <CustomButton title='Login to Book' className='w-full' />
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
