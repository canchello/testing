'use client'
import CustomButton from '@/components/common/CustomButton'
import Image from 'next/image'
import { Img } from 'react-image'
import InstaLogo from '@/assets/svg/instagram.svg'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LibyaLensComponent = () => {
  const router = useRouter()
  const images = [
    {
      src: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg',
      alt: 'Libya landscape',
      label: 'Shivani Jain',
      span: 'row-span-5' // Control grid item span
    },
    {
      src: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/mwtsoapmjaguvgp85b4v.jpg',
      alt: 'Libya camel',
      label: 'Sarah R.',
      span: 'row-span-4 hidden sm:block'
    },
    {
      src: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369796/hfvz03ujeezwcth7nboo.jpg',
      alt: 'Libya couple',
      label: 'Mark & Rose',
      span: 'row-span-4  hidden sm:block' // Span across two columns
    },
    {
      src: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/tof0amhcmqmgxcftvlll.jpg',
      alt: 'Libya palm trees',
      label: 'Sarah R.',
      span: 'row-span-6'
    }
  ]

  return (
    <div className='bg-neutral-900 text-white p-10 justify-items-center'>
      <div className='container grid grid-col-1 grid-rows-8 xs:grid-col-3 grid-flow-col gap-4'>
        <div className='row-span-3 flex flex-col justify-center items-center text-center'>
          <h1 className='text-3xl font-bold'>Discover Libya Through Our Lens</h1>
          <p className='mt-2 text-sm'>
            Explore the stunning landscapes, iconic attractions, and rich cultural experiences that make Libya a unique
            destination.
          </p>
        </div>
        {images.map((image, index) => (
          <div key={index} className={`relative ${image.span}`}>
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
              <div className='bg-white rounded-full p-2'>
                <Image className='cursor-pointer' src={InstaLogo} alt='insta icon' />
              </div>
              <div className='bg-white rounded-full px-3 py-1 flex items-center'>{image.label}</div>
            </div>
          </div>
        ))}
        <div className='row-span-2'>
          <Link href={'/register'}>
            <CustomButton
              title='Create an Account'
              className='border-transparent	h-full w-full rounded-md text-center'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LibyaLensComponent
