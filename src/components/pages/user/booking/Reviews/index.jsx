import React, { useEffect, useState } from 'react'
import Review from './Review'
import Axios from '@/libs/axios'
import Loader from '@/components/common/Loader'
import { userReviewListURL } from '@/services/APIs/review'
import Rating from './Rating'

export default function HotelReviews({ hotel }) {
  const [reviewsListData, setReviewsData] = useState()
  const [loading, setLoading] = useState(false)

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const { data } = await Axios({
        ...userReviewListURL,
        data: {
          query: { propertyId: hotel._id }
        }
      })
      setReviewsData(data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl'>Reviews</h1>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Rating hotel={hotel} />
        <div className='md:col-span-3'>
          {loading ?
            <Loader />
            :
            (
              !!reviewsListData?.data?.length ?
                reviewsListData?.data.map(item => (
                  <Review key={item._id} review={item} />
                ))
                :
                <p className='text-muted'>No Reviews yet</p>
            )
          }
        </div>
      </div>
    </div>
  )
}
