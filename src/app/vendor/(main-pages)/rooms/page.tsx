'use client'
import { useEffect, useState } from 'react'
import Filters from '@/components/pages/@vendor/main/Rooms/Filters'
import RoomDetail from '@/components/pages/@vendor/main/Rooms/RoomDetails'
import RoomList from '@/components/pages/@vendor/main/Rooms/RoomList'
import Axios from '@/libs/axios'
import { vendorRoomsList } from '@/services/APIs/vendor'
import { useDebounce } from 'react-use'

export default function RoomsPage() {
  const [roomsList, setRoomsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState([])

  const [filters, setFilters] = useState({
    search: '',
    sort: '',
    status: 'All Status'
  })
  const [newSearch, setNewSearch] = useState('')
  useDebounce(() => setNewSearch(filters.search), 500, [filters.search])

  const fetchRoomsList = async () => {
    const payload = {
      query: {
        search: newSearch ? newSearch : undefined,
        searchColumns: ['name', 'size']
      },
      options: {
        populate: ['attachment', 'amenities'], // ["facility", "attachment :. return only one attachment", "attachments :. return more than one attachment"]
        sort: filters.sort ? { [filters.sort]: -1 } : { createdAt: -1 },
        lean: true
      }
    }
    try {
      setLoading(true)
      const { data }: any = await Axios({ ...vendorRoomsList, data: payload })
      setRoomsList(data?.data?.data || [])
      setSelectedRoom(data?.data?.data?.[0])
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoomsList()
  }, [newSearch, filters.sort])

  return (
    <div className=''>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 space-y-4'>
          <Filters
            {...{
              filters,
              onChangeFilter: data => setFilters(prev => ({ ...prev, ...data }))
            }}
          />
          {!!roomsList?.length ? (
            <RoomList loading={loading} rooms={roomsList} setSelectedRoom={setSelectedRoom} />
          ) : (
            <div className='flex justify-center my-4'>No rooms listed</div>
          )}
        </div>
        <div>
          {!!roomsList?.length ? (
            <RoomDetail room={selectedRoom} />
          ) : (
            <div className='flex justify-center my-4'>No rooms selected</div>
          )}
        </div>
      </div>
    </div>
  )
}
