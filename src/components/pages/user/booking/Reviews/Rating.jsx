import React, { useEffect, useState } from 'react'
import Axios from '@/libs/axios'
import CustomButton from '@/components/common/CustomButton'
import { getPropertyRatingsListURL } from '@/services/APIs/review'
import Loader from '@/components/common/Loader'

export default function Rating({ hotel }) {
  const [loading, setLoading] = useState(false)
  const [ratingData, setRatingData] = useState()

  const fetchRatings = async () => {
    try {
      setLoading(true)
      const { data } = await Axios({
        ...getPropertyRatingsListURL,
        data: {
          propertyId: hotel.id
        }
      })
      setRatingData(data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRatings()
  }, [])

  return (
    <div className='space-y-3'>
      {hotel.rating &&
        <h1 className='text-xl font-bold text-success'>
          {`${hotel.rating}/${hotel.ratingCount} Rating`}
        </h1>}
      <div className='w-full'>
        {loading ?
          <Loader />
          :
          (!!ratingData?.length ?
            ratingData.map((item, index) => (
              <div key={index} className='mb-2'>
                <div className='flex justify-between gap-2 flex-wrap text-gray-500'>
                  <p>{item._id || "-"}</p>
                  <p>{item.avgRating * 2 * 10}%</p>
                </div>
                <progress className='progress progress-warning w-full' value={item.avgRating * 2 * 10} max='100'></progress>
              </div>
            )) :
            <p className='text-center'>
              No ratings
            </p>
          )}
      </div>
      <CustomButton title='All Reviews' variant='secondary' className='w-full' />
    </div>
  )
}
