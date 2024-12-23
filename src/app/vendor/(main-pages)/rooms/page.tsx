import Filters from '@/components/pages/@vendor/main/Rooms/Filters'
import RoomDetail from '@/components/pages/@vendor/main/Rooms/RoomDetails'
import RoomList from '@/components/pages/@vendor/main/Rooms/RoomList'

const rooms = [
  {
    id: 1,
    name: 'Standard',
    size: 25,
    bed: 'Queen Bed',
    guests: 2,
    price: 100,
    availability: '23/29 Rooms',
    status: 'Occupied',
    image: '',
    features: ['Affordable', 'Work Desk'],
    facilities: ['Wi-Fi', 'Room Service'],
    amenities: ['Bottled Water', 'Hair Dryer']
  },
  {
    id: 2,
    name: 'Deluxe',
    size: 35,
    bed: 'King Bed',
    guests: 2,
    price: 150,
    availability: '18/25 Rooms',
    status: 'Available',
    image: '',
    features: ['Spacious', 'Modern Design'],
    facilities: ['Wi-Fi', 'Mini-Fridge'],
    amenities: ['Toiletries', 'Coffee Maker']
  }
  // Add more room data here
]

export default function RoomsPage() {
  return (
    <div className=''>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 space-y-4'>
          <Filters />
          <RoomList rooms={rooms} />
        </div>
        <div>
          <RoomDetail room={rooms[1]} />
        </div>
      </div>
    </div>
  )
}
