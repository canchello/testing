import Rating from '@/components/UI/Rating'
import Image from 'next/image'
import React from 'react'
import Quote from '@/assets/svg/quote.svg'

interface TestimonialCardProps {
  name: string
  location: string
  message: string
  rating: number
  imageUrl: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, location, message, rating, imageUrl }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-sm flex flex-col justify-between gap-4'>
      <div className='space-y-4'>
        <div className='flex justify-center'>
          <Image className='cursor-pointer' src={Quote} alt='insta icon' />
        </div>
        <div className='flex justify-center'>
          <Rating rating={rating} total={5} />
        </div>
        <p className='text-center text-gray-600'>{message}</p>
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Image src={imageUrl} alt={name} width={80} height={80} className='max-h-20 rounded-full' />
        <div className='text-center'>
          <p className='font-bold'>{name}, {location}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
