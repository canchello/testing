'use client'
import Rating from '@/components/UI/Rating'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Img } from 'react-image'
import ReviewStatistics from '@/components/pages/@vendor/main/ReviewAnalysis/ReviewStatistics'
import OverallRating from '@/components/pages/@vendor/main/ReviewAnalysis/OverallRating'
import ReviewsByCountry from '@/components/pages/@vendor/main/ReviewAnalysis/ReviewByCountries'
import Axios from '@/libs/axios'
import { vendorReviewList } from '@/services/APIs/vendor'
import { getImage } from '@/utils/helper'
import Loader from '@/components/common/Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const fetchReviewsList = async () => {
    const payload = {
      options: {
        populate: 'user',
        lean: true,
        sort: { createdAt: -1 }
      }
    }
    setIsLoading(true)
    try {
      const { data }: any = await Axios({ ...vendorReviewList, data: payload })
      setReviewsList(data?.data?.data)
      setIsLoading(false)
    } catch (error) {
      console.log('error', error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchReviewsList()
  }, [])

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
      <div className='bg-white p-4 col-span-2 rounded-lg'>
        <ReviewStatistics />
      </div>
      <div className='bg-white p-4 col-span-2 rounded-lg'>
        <OverallRating />
      </div>
      <div className='bg-white p-4 col-span-full rounded-lg'>
        <ReviewsByCountry />
      </div>
      <div className='col-span-full space-y-3'>
        <div className='flex flex-wrap justify-between'>
          <h1 className='text-lg font-semibold'>Customer Reviews</h1>
          <div className='dropdown dropdown-end'>
            <button tabIndex={0} className='bg-white py-2 px-4 rounded-lg'>
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 mt-1 p-2 shadow'>
              <li>
                <a>Option 1</a>
              </li>
              <li>
                <a>Option 2</a>
              </li>
            </ul>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : !reviewsList.length ? (
          <div className='text-center !my-20'>No reviews found</div>
        ) : (
          <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4'>
            {reviewsList.map((review: any, index) => (
              <div key={index} className='bg-white rounded-lg p-4 space-y-3'>
                <Img
                  src={getImage(review?.user?.profilePicture) || 'https://via.placeholder.com/150'}
                  alt=''
                  className='w-12 rounded-full'
                />
                <p className='text-sm font-semibold'>{review?.user?.firstName + ' ' + review?.user?.lastName}</p>
                <div className='flex items-center gap-2'>
                  <Rating rating={review?.rating} total={5} />

                  <div>{dayjs(review?.createdAt).format('MMMM D, YYYY')}</div>
                </div>
                <p className='text-xs'>{review?.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reviews
