import CustomButton from '@/components/common/CustomButton'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

export default function CarCard({ item = null }: any) {
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden relative'>
      {/* Car Image */}
      <img src={item.image} alt={item.title} className='h-60 w-full object-cover rounded-xl' />
      <div className='absolute flex items-center justify-between top-2 left-2'>
        <span className='font-bold text-black px-2 py-1 rounded-full text-sm bg-white'>⭐ {item.rating}</span>
      </div>
      {/* Car Details */}
      <div className='p-4 space-y-3'>
        <h3 className='font-bold text-xl mt-2'>{item.title}</h3>
        <p className='text-gray-500 font-medium'>{item.type || 'CAR TYPE'}</p>
        <div className='flex flex-wrap gap-4'>
          {[
            { title: '4 Passengers', icon: faCircleUser },
            { title: '4 Doors', icon: faCircleUser },
            { title: 'Air-Conditioning', icon: faCircleUser }
          ].map((item, index) => (
            <div className='flex items-center space-x-2'>
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
        <CustomButton title='Book Now' />
      </div>
    </div>
  )
  return (
    <div className='h-96 w-80 rounded-xl relative overflow-hidden group cursor-pointer'>
      {/* Image */}
      <Image
        src={item.image}
        alt=''
        className='rounded-xl h-full w-full object-cover transition-transform duration-500 group-hover:opacity-40'
      />

      {/* Tag at the Top */}
      <div className='absolute top-2 w-full flex justify-center group-hover:opacity-0'>
        <p className='text-lg font-medium bg-white rounded-full px-3 py-1 mx-2 shadow-md'>
          Ancient Roman & Greek Cities
        </p>
      </div>

      {/* Title (Normal View) */}
      <div className='absolute bottom-5 w-full flex justify-center text-white opacity-100 group-hover:opacity-0 transition-opacity duration-500'>
        <p className='text-3xl font-semibold'>{item.title}</p>
      </div>

      {/* Hover Overlay with Description */}
      <div className='absolute top-0 h-full bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-5 text-white'>
        <h3 className='text-3xl font-semibold mb-2'>{item.title}</h3>
        <p className=''>{item.description || 'An ancient Roman city showcasing the grandeur of history.'}</p>
      </div>
    </div>
  )
}
