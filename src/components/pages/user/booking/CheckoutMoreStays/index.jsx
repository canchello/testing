import React, { useEffect, useState } from 'react'
import Carousel from './carousel'
import Axios from '@/libs/axios'
import { getHotelListURL } from '@/services/APIs/hotel'
import Loader from '@/components/common/Loader'

export default function CheckoutMoreStays() {
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
    <div className='pt-8'>
      <h1 className='text-3xl font-bold'>Checkout More Stays!</h1>
      {state.loading ?
        <Loader />
        :
        <Carousel items={state.hotels || []} />}
    </div>
  )
}
