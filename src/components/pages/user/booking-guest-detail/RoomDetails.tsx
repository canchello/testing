import React from 'react'
import hotelStore from '@/stores/hotelStore'
import RoomData from '../booking-checkout/RoomData'

// Define the type for room and selectedRoom
interface Room {
  _id: string
  name: string
  price: number
  room: Array<{ _id: string }>
  facility: Array<{ title: string; icon: string }>
  numberOfBad?: number
  numberOfBathrooms?: number
}

interface SelectedRoom {
  id: string
  count: number
}

interface Hotel {
  roomType: Room[]
}

export default function RoomDetails({ bookingDetails }: any) {
  const { selectedHotel, selectedRooms }: { selectedHotel: Hotel; selectedRooms: SelectedRoom[] } | any = hotelStore()
  const result = selectedRooms
    .map((selectedRoom: any) => {
      const room = selectedHotel?.roomType?.find((r: any) => r._id === selectedRoom.id)
      if (room) {
        return { ...room, count: selectedRoom.count }
      }
      return null
    })
    .filter((room: any) => room !== null)

  return (
    <div className='space-y-4'>
      {result.map((res: any) => (
        <RoomData isDisableControls={!!bookingDetails} room={res} key={res._id} />
      ))}
    </div>
  )
}
