import Image from 'next/image'
import React from 'react'

export default function CarCard({ item = null }: any) {
  return (
    <div className='h-96 w-80 rounded-xl relative overflow-hidden group cursor-pointer'>
      {/* Image */}
      <Image
        src={item.image}
        alt=''
        className='rounded-xl h-full w-full object-cover transition-transform duration-500 group-hover:opacity-40'
      />

      {/* Tag at the Top */}
      {item.title && (
        <div className='absolute top-2 w-full flex justify-center group-hover:opacity-0'>
          <p className='text-lg font-medium bg-white text-black rounded-full px-3 py-1 mx-2 shadow-md'>{item.title}</p>
        </div>
      )}

      {/* Title (Normal View) */}
      <div className='absolute bottom-5 w-full flex justify-center text-white opacity-100 group-hover:opacity-0 transition-opacity duration-500'>
        <p className='text-3xl font-semibold capitalize'>{item.id}</p>
      </div>

      {/* Hover Overlay with Description */}
      <div className='absolute top-0 h-full bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-5 text-white'>
        <h3 className='text-3xl font-semibold mb-2 capitalize'>{item.id}</h3>
        <p className=''>{item.description || 'A car description.'}</p>
      </div>
    </div>
  )
}
