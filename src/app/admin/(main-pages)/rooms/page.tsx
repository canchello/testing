'use client'
import { useEffect, useState } from 'react'
import Filters from '@/components/pages/@vendor/main/Rooms/Filters'
import RoomDetail from '@/components/pages/@vendor/main/Rooms/RoomDetails'
import RoomList from '@/components/pages/@vendor/main/Rooms/RoomList'
import Axios from '@/libs/axios'
import { vendorRoomsList } from '@/services/APIs/vendor'

export default function RoomsPage() {
  const [roomsList, setRoomsList] = useState([])
  const [selectedRoom, setSelectedRoom] = useState([])
  const fetchRoomsList = async () => {
    const payload = {
      options: {
        populate: ['attachment', 'facility'], // ["facility", "attachment :. return only one attachment", "attachments :. return more than one attachment"]
        lean: true
      }
    }
    try {
      const { data }: any = await Axios({ ...vendorRoomsList, data: payload })
      setRoomsList(data?.data?.data)
      setSelectedRoom(data?.data?.data?.[0])
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchRoomsList()
  }, [])

  return (
    <div className=''>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 space-y-4'>
          <Filters />
          {roomsList?.length > 0 && <RoomList rooms={roomsList} setSelectedRoom={setSelectedRoom} />}
        </div>
        <div>{roomsList?.length > 0 && <RoomDetail room={selectedRoom} />}</div>
      </div>
    </div>
  )
}
