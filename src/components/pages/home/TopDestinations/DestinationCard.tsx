import Image from 'next/image'
import React from 'react'

export default function DestinationCard({ item = null }: any) {
  return (
    <div className='h-96 w-96 md:w-52 lg:w-72 xl:w-96 rounded-xl relative overflow-hidden group cursor-pointer'>
      {/* Image */}
      <Image
        src={item.image}
        alt=''
        className='rounded-xl h-full w-full object-cover transition-transform duration-500 group-hover:opacity-40'
      />

      {/* Tag at the Top */}
      <div className='absolute top-2 w-full flex justify-center group-hover:opacity-0'>
        <p className='text-lg font-medium bg-white text-black rounded-full px-3 py-1 mx-2 shadow-md'>
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
