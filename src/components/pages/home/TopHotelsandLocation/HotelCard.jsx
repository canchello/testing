import { ArrowRightFilled, LocationFilled } from '@/assets/svg/Iconify'
import { getImage } from '@/utils/helper'
import Link from 'next/link'

export default function HotelCard({ hotel }) {
  return (
    <div className='w-80 bg-white shadow-lg rounded-lg overflow-hidden relative'>
      {/* Hotel Image */}
      <img
        src={
          hotel?.primaryAttachment?.fileUrl
            ? getImage(hotel.primaryAttachment?.fileUrl)
            : 'https://res.cloudinary.com/dndsypilw/image/upload/v1730370270/p0v4kebutmpmzk2vgzdp.jpg'
        }
        alt={hotel.title}
        className='h-60 w-full object-cover rounded-xl'
      />
      {!!Number(hotel.rating) &&
        <div className='absolute flex items-center justify-between top-2 left-2'>
          <span className='font-bold text-black px-2 py-1 rounded-full text-sm bg-white'>⭐ {hotel.rating}</span>
        </div>}
      {/* Hotel Details */}
      <div className='p-4 text-black'>
        <h3 className='font-bold text-lg mt-2'>{hotel.title}</h3>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col space-y-2'>
            <p className='text-black flex space-x-2'>
              <LocationFilled fontSize={24} />
              <span>
                {`${hotel.city}, ${hotel.state}`}
              </span>
            </p>
            <p className='text-sm mt-1'>{hotel.distance || "450m from center"}</p>
          </div>
          <div className='flex justify-end p-4'>
            <Link href={"/stays/" + hotel._id}>
              <button className='bg-primary px-4 py-2 rounded-full text-white font-bold'>
                <ArrowRightFilled fontSize={24} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
