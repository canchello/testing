import { cn } from '@/libs/tailwind'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Img } from 'react-image'

export default function ExploreTopDestinations() {
  return (
    <div className='mb-4'>
      <h2 className='text-2xl font-bold mb-2'>Explore Top Destinations</h2>
      <p className='mb-6 text-lg'>
        Explore the most popular destinations in Libya and beyond! Whether you're looking for a city escape or a
        coastal retreat, here are the top locations our travelers love:
      </p>
      {/* <div className='grid grid-row-2 grid-col-3 gap-4'> */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {images.map((image, index) => (
          <div key={index} className={cn(`relative ${image.span}`)}>
            <Img
              src={image.src}
              alt={image.alt}
              className='rounded-lg object-cover h-full w-full'
              loader={<div className='h-full bg-gray-200 animate-pulse rounded-lg'></div>}
              unloader={
                <div className='h-full bg-red-200 rounded-lg text-center flex items-center justify-center'>
                  Failed to load
                </div>
              }
            />
            <div className='absolute bottom-4 left-4 text-black text-sm flex gap-4'>
              <div className='bg-white rounded-full px-3 py-1 flex items-center'>{image.label}</div>
              <div className='flex items-center bg-white rounded-full py-3 px-4'>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const images = [
  {
    src: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg',
    alt: 'Libya landscape',
    label: 'Shivani Jain',
    span: 'lg:row-span-2 lg:h-84' // Control grid item span
  },
  {
    src: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/mwtsoapmjaguvgp85b4v.jpg',
    alt: 'Libya camel',
    label: 'Sarah R.',
    span: 'h-84 lg:h-44'
  },
  {
    src: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369796/hfvz03ujeezwcth7nboo.jpg',
    alt: 'Libya couple',
    label: 'Mark & Rose',
    span: 'h-84 lg:h-44' // Span across two columns
  },
  {
    src: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/tof0amhcmqmgxcftvlll.jpg',
    alt: 'Libya palm trees',
    label: 'Sarah R.',
    span: 'lg:col-span-2 h-84 lg:h-44'
  }
]
