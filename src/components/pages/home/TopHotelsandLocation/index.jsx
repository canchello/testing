// https://github.com/allynkalda/Apartment-Listing-App
'use client'
import { Img } from 'react-image'
import HotelCard from './HotelCard'
import CustomButton from '@/components/common/CustomButton'
import { useEffect, useState } from 'react'
import Axios from '@/libs/axios'
import { getHotelListURL } from '@/services/APIs/hotel'
import { ROUTES } from '@/libs/constants'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const TopHotelsAndLocation = ({ title = '', description = '' }) => {
  const router = useRouter()
  const [state, setState] = useState({
    loading: false,
    hotels: []
  })

  const fetchHotels = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }))
      const payload = {
        query: {
          // location: [String(locationCords.latitude), String(locationCords.longitude)]
        },
        options: {
          page: 1,
          limit: 3,
          populate: 'primaryAttachment',
          lean: true
        }
      }
      const { data } = await Axios({ ...getHotelListURL, data: payload })
      setState(prev => ({
        ...prev,
        hotels: data?.data?.data || []
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  return (
    <div className='justify-items-center'>
      <div className='container flex flex-col items-center px-4 py-10'>
        {/* Title Section */}
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold'>{title}</h1>
          <p className='text-gray-500 mt-2'>{description}</p>
        </div>

        {/* Map Image Section */}
        <div className='relative w-full h-full my-4'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53609.17595954849!2d13.147135859146331!3d32.883002227396815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a892c4c11c43d9%3A0x8d99d8947b5cec86!2sTripoli%2C%20Libya!5e0!3m2!1sen!2sin!4v1734160114064!5m2!1sen!2sin"
            style={{
              width: "100%",
              height: "250px",
              border: 0,
            }}
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          {/* <Img
            src={'https://res.cloudinary.com/dndsypilw/image/upload/v1730370276/xt9okzqdo9uzgnij5dwz.png'}
            alt={'mapImage'}
            className='rounded-lg object-cover h-full w-full'
            loader={<div className='h-full bg-gray-200 animate-pulse rounded-lg'></div>}
            unloader={
              <div className='h-full bg-red-200 rounded-lg text-center flex items-center justify-center'>
                Failed to load
              </div>
            }
          /> */}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto z-10'>
          {(state.hotels || []).map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
            />
          ))}
        </div>

        <Link href={ROUTES.TOP_HOTELS} className="mt-8">
          <CustomButton variant='secondary' title='See All' />
        </Link>
      </div>
    </div>
  )
}

export default TopHotelsAndLocation

export const hotelsData = [
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
