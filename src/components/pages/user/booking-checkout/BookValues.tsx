import CustomButton from '@/components/common/CustomButton'
import CustomDateInput from '@/components/form/DateField'
import Axios from '@/libs/axios'
import { createNewBookingURL } from '@/services/APIs/booking'
import hotelStore from '@/stores/hotelStore'
import { faBaby, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface Facility {
  _id: string
  title: string
}

interface Room {
  _id: string
  propertyId: string
  roomTypeId: string
  roomNumber: string
}

interface RoomType {
  _id: string
  propertyId: string
  name: string
  size: string
  numberOfGuest: number
  bedType: string
  numberOfBathrooms: number
  serveBreakfast: boolean
  facilityId: string[]
  price: number
  createdAt: string
  updatedAt: string
  facility: Facility[]
  room: Room[]
  count: number
}

interface SelectedRoom {
  id: string
  count: number
}

interface HotelFilters {
  adults?: number
  children?: number
  checkIn: string
  checkOut: string
}

interface HotelStore {
  hotelFilters: HotelFilters
  setHotelFilters: (filters: HotelFilters) => void
  selectedHotel: {
    roomType: RoomType[]
  } | null
  selectedRooms: SelectedRoom[]
}

export default function BookValues({ propertyData }: { propertyData: any }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { hotelFilters, setHotelFilters, selectedHotel, selectedRooms }: HotelStore | any = hotelStore()

  const getAllRoomIds = (data: RoomType[]): string[] => {
    return data.flatMap(item => item.room.slice(0, item.count).map(r => r._id)) // Combine all room IDs into a single array
  }

  const createNewBooking = async () => {
    if (selectedRooms.length === 0) return toast.error('Please select any room')

    const result = selectedRooms
      .map((selectedRoom: any) => {
        const room = (propertyData || selectedHotel)?.roomType?.find((r: any) => r._id === selectedRoom.id)
        if (room) {
          return { ...room, count: selectedRoom.count }
        }
        return null
      })
      .filter((room: any): room is RoomType & { count: number } => room !== null)

    const payload = {
      roomId: getAllRoomIds(result) || [],
      checkIn: hotelFilters.checkIn,
      checkOut: hotelFilters.checkOut
    }

    setIsLoading(true)
    try {
      const response: any = await Axios({ ...createNewBookingURL, data: payload })
      setIsLoading(false)
      router.push(`/booking/${response?.data?.data?._id}/guest-details`)
    } catch (error) {
      setIsLoading(false)
      console.error('Booking error:', error)
    }
  }

  return (
    <div>
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
          <div className='flex justify-between items-center bg-white p-3 rounded-lg gap-2 text-lg'>
            <p className='text-sm font-medium text-gray-500'>Price per night</p>
            <p className='font-semibold'>${80.0}</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-white p-3 rounded-lg gap-2'>
            <p className='text-sm font-medium'>Book for {2} Nights - 1 Room at</p>
            <div className='flex items-center gap-2'>
              <h1 className='text-primary text-3xl font-semibold'>${50.0}</h1>
            </div>
          </div>
          <div>
            <CustomButton title='Checkout' className='w-full' isLoading={isLoading} onClick={createNewBooking} />
          </div>
        </div>
      </div>
    </div>
  )
}
