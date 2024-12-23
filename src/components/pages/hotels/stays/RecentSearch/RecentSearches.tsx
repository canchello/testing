import React from 'react'
import HotelCard from './HotelCard'

export default function RecentSearches() {
  return (
    <div className='mb-4'>
      <h2 className='text-2xl font-bold mb-2'>Your Recent Searches</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {hotelsData.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

const hotelsData = [
  {
    id: 1,
    name: 'Al Waddan Hotel',
    location: 'Tripoli, Libya',
    distance: '450m from centre',
    rating: 4.5,
    image: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730370270/p0v4kebutmpmzk2vgzdp.jpg'
  },
  {
    id: 2,
    name: 'Al Waddan Hotel',
    location: 'Tripoli, Libya',
    distance: '450m from centre',
    rating: 4.0,
    image: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730370269/mgqkmmtxqjeyrqw5w1cx.jpg'
  },
  {
    id: 3,
    name: 'Al Waddan Hotel',
    location: 'Tripoli, Libya',
    distance: '450m from centre',
    rating: 4.0,
    image: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730370267/r99z7ust4f6b23unecrc.jpg'
  }
]
