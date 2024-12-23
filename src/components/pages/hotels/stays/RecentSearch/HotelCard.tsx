import { ArrowRightFilled, LocationFilled } from '@/assets/svg/Iconify'
import CustomButton from '@/components/common/CustomButton'
import Rating from '@/components/UI/Rating'

export default function HotelCard({ title, location, image, rating, distance }: any) {
  return (
    <div className='flex gap-2 bg-white shadow-lg rounded-lg overflow-hidden p-3'>
      {/* Hotel Image */}
      <img src={image} alt={title} className='h-36 w-40 object-cover rounded-xl' />

      {/* Hotel Details */}
      <div className='flex flex-col justify-between px-4'>
        <h3 className='font-bold text-lg'>{title}</h3>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col space-y-2'>
            <p className='text-black flex space-x-4'>
              <LocationFilled fontSize={24} />
              {location}
            </p>
            <p className='text-sm mt-1'>{distance}</p>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <span>4</span>
          <Rating rating={4} total={5} />
        </div>
      </div>
    </div>
  )
}
