import Rating from '@/components/UI/Rating'
import Image from 'next/image'
import React from 'react'
import { format } from "date-fns";

export default function Review({ review }) {
  return (
    <div className='flex flex-col w-full gap-4 border-b py-4'>
      <div className='flex flex-col xs:flex-row justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <Image
            src={'https://res.cloudinary.com/dndsypilw/image/upload/v1730369796/hfvz03ujeezwcth7nboo.jpg'}
            alt={'photo'}
            width={40}
            height={40}
            className='h-10 w-10 rounded-full object-cover'
          />
          <h1 className='font-medium'>John Doe</h1>
        </div>
        {/* Rating */}
        <div className='flex items-center gap-2'>
          <span className='font-bold text-success'>{review.rating.toFixed(1)}</span>
          <Rating rating={review.rating} total={5} />
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-col xs:flex-row justify-between flex-1'>
        <div className='space-y-2'>
          {/* Title */}
          <h3 className='text-xl font-semibold'>{review.title}</h3>
          <p className='text-gray-500 font-sm mt-2'>{review.description}</p>
        </div>
        <div className='text-right min-w-32'>
          <p className='text-sm text-gray-400 mt-2'>Reviewed on</p>
          <p className='text-sm font-semibold mt-2'>
            {format(new Date(review.createdAt), 'dd MMM, yyyy')}
          </p>
        </div>
      </div>
    </div>
  )
}
