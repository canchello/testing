import CustomButton from '@/components/common/CustomButton'
import Rating from '@/components/UI/Rating'
import { faLocationDot, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

interface ReviewCardProps {
  image: string
  title: string
  location: string
  rating: number
  review: string
  description: string
  reviewedOn: string
  onEdit: () => void
  onDelete: () => void
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  image,
  title,
  location,
  rating,
  review,
  description,
  reviewedOn,
  onEdit,
  onDelete
}) => {
  return (
    <div className='flex flex-col sm:flex-row justify-center w-full gap-4'>
      {/* Image Section */}
      <Image
        src={image}
        alt={title}
        layout='responsive'
        width={240}
        height={240}
        className='w-60 sm:max-w-60 max-h-60 rounded-xl object-cover'
      />

      {/* Content Section */}
      <div className='flex flex-col flex-1'>
        <div className='flex flex-col'>
          {/* Title and Location */}
          <div className='flex flex-col xs:flex-row items-start justify-between'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-xl font-semibold'>{title}</h3>
              <div className='flex items-center gap-2 text-gray-500'>
                <FontAwesomeIcon icon={faLocationDot} className='' fontSize={'large'} />
                <p className='text-lg font-semibold'>{location}</p>
              </div>
            </div>
            {/* Rating */}
            <div className='flex items-center gap-2'>
              <span className='font-bold text-success'>{rating.toFixed(1)}</span>
              <Rating rating={rating} total={5} />
            </div>
          </div>

          {/* Review */}
          <div className='flex flex-col my-2'>
            <p className='font-semibold mt-2'>{review}</p>
            <p className='text-gray-500 font-sm mt-2'>{description}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex flex-wrap justify-between items-end flex-1'>
          <div className='flex flex-col xs:flex-row gap-2'>
            <CustomButton
              onClick={onEdit}
              className=''
              title={
                <label className='px-6 py-2 cursor-pointer' htmlFor='edit-review-modal'>
                  Edit Review
                </label>
              }
            />
            <CustomButton
              title='Delete Review'
              variant='default'
              icon={<FontAwesomeIcon icon={faTrash} />}
              ImageIcon={false}
              iconPosition='left'
              onClick={onDelete}
              className='!text-error'
            />
          </div>

          {/* Reviewed On */}
          <div className='text-right ml-auto'>
            <p className='text-sm text-gray-400 mt-2'>Reviewed on</p>
            <p className='text-sm font-semibold mt-2'>{reviewedOn}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
