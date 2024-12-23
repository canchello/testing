import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faStar, faArrowRight, faClose } from '@fortawesome/free-solid-svg-icons'
import CustomButton from '@/components/common/CustomButton'
import { getImage } from '@/utils/helper'
import Link from 'next/link'

export default function HotelCard({ hotel }: any) {
  return (
    <div className='relative w-80 h-[26rem] rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer group'>
      {/* Image */}
      <div className='relative h-2/3 w-full'>
        <Image
          src={
            hotel?.primaryAttachment?.fileUrl
              ? getImage(hotel.primaryAttachment.fileUrl)
              : 'https://via.placeholder.com/300'
          }
          alt={hotel?.title || 'Hotel Image'}
          layout='fill'
          objectFit='cover'
          className='transition-transform duration-500'
        />

        {/* Star Rating Badge */}
        {Number(hotel?.ratingCount) > 0 && (
          <div className='absolute top-4 left-4 bg-white flex items-center px-3 py-1 rounded-full shadow-md'>
            <FontAwesomeIcon icon={faStar} className='text-yellow-400 mr-1' />
            <span className='text-black font-medium'>{hotel?.rating || '0'}</span>
          </div>
        )}
        {/* <div className='absolute top-2 right-2 bg-white flex items-center px-4 py-2 rounded-full shadow-md'>
          <FontAwesomeIcon icon={faClose} className='' />
        </div> */}
      </div>

      {/* Hotel Info */}
      <div className='p-4 flex justify-between'>
        <div>
          {/* Title */}
          <h3 className='text-xl font-semibold text-gray-800 mb-1'>{hotel?.title || 'Hotel Title'}</h3>

          {/* Address */}
          <div className='flex items-center text-gray-600 mb-1'>
            <FontAwesomeIcon icon={faMapMarkerAlt} className='text-gray-500 mr-2' />
            <span>
              {hotel?.address}, {hotel?.city}
            </span>
          </div>
        </div>
        {/* Arrow Button */}
        <div className=''>
          <Link href={'/stays/' + hotel._id}>
            <CustomButton
              title={<FontAwesomeIcon icon={faArrowRight} />}
              className=' p-3 rounded-full shadow-md transition duration-300'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
