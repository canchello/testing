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
  const { selectedHotel }: { selectedHotel: Hotel; selectedRooms: SelectedRoom[] } | any = hotelStore()

  const roomData = selectedHotel?.roomType?.find((r: any) => r._id === bookingDetails?.rooms?.[0]?.roomTypeId)
  // .map((selectedRoom: any) => {
  //   if (room) {
  //     return { ...room, count: selectedRoom.count }
  //   }
  //   return null
  // })
  // .filter((room: any) => room !== null)

  const hotelRoom = {
    ...(bookingDetails?.rooms?.[0]?.roomType ? bookingDetails?.rooms?.[0]?.roomType : {}),
    ...roomData
  }

  if (hotelRoom && roomData)
    return (
      <div className='space-y-4'>
        {/* {[].map((res: any) => ( */}
        <RoomData
          isDisableControls={!!bookingDetails}
          room={hotelRoom}
          selectedRooms={bookingDetails?.rooms}
          key={roomData._id}
        />
        {/* ))} */}
      </div>
    )
}
