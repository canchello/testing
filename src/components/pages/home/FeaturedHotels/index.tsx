import Link from 'next/link'
import { useRouter } from 'next/navigation'

const HotelFeature = () => {
  const router = useRouter()
  return (
    <div className='justify-items-center'>
      <div className='container p-10 my-8 flex flex-col md:flex-row items-center gap-10'>
        {/* Text Section */}
        <div className='md:w-1/2 mb-6 md:mb-0'>
          {/* Featured Badge */}
          <div className='mb-4'>
            <span className='bg-[#f3e5d3] text-slate-600 px-4 py-2 rounded-full text-sm font-semibold'>
              Featured Luxury Hotels
            </span>
          </div>

          {/* Hotel Name and Description */}
          <h2 className='text-3xl font-bold mb-2'>Radisson Blu Al Mahary Hotel, Tripoli</h2>
          <p className='text-gray-500 mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>

          {/* Stats */}
          <div className='flex space-x-6 mb-6 text-primary'>
            <div className='text-left'>
              <span className='block text-2xl font-bold'>250+</span>
              <span className='text-gray-500'>Luxury Rooms</span>
            </div>
            <div className='text-left'>
              <span className='block text-2xl font-bold'>4.5</span>
              <span className='text-gray-500'>Customer Ratings</span>
            </div>
            <div className='text-left'>
              <span className='block text-2xl font-bold'>12.5k+</span>
              <span className='text-gray-500'>Bookings</span>
            </div>
          </div>

          {/* Book Now Button */}
          <Link href={'/login'}>
            <button className='btn btn-primary px-6 py-3 text-white bg-[#002c53] hover:bg-[#001e3a] rounded-full flex items-center'>
              Book Now
              <span className='ml-2 text-lg'>→</span>
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className='flex space-x-4 md:w-1/2'>
          <img
            src='https://res.cloudinary.com/dndsypilw/image/upload/v1730370048/evh7y7jzp6qtr12hzwlg.jpg'
            alt='Hotel Front'
            className='w-1/2 h-72 object-cover rounded-lg mb-10'
          />
          <img
            src='https://res.cloudinary.com/dndsypilw/image/upload/v1730370049/u8anjtcnw1gxmsv4osss.jpg'
            alt='Hotel Lobby'
            className='w-1/2 h-72 object-cover rounded-lg mt-10'
          />
        </div>
      </div>
    </div>
  )
}

export default HotelFeature
