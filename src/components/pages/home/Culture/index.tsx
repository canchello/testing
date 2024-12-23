import Image from 'next/image'
import CultureFrame from '@/assets/images/CultureFrame.png'
// import culture2Img from '@/assets/images/culture2.png'
import HomeCultureImg from '@/assets/svg/home-culture.svg'
import HomeCulture2Img from '@/assets/svg/home-culture-2.svg'
import CustomButton from '@/components/common/CustomButton'
import Link from 'next/link'
import { ROUTES } from '@/libs/constants'

const LibyaCultureComponent = () => {
  return (
    <div className='bg-custom-dark-blue text-white justify-items-center'>
      <div className='container p-10'>
        <div className='md:flex items-center gap-8 mb-12'>
          <div className='md:w-3/5'>
            <Image src={CultureFrame} alt='Libya Culture' className='rounded-lg' />
          </div>

          <div className='md:w-[40%] mt-6 md:mt-0'>
            <h1 className='text-3xl font-bold mb-4'>Embrace the Rich Tapestry of Libya’s Culture</h1>
            <p className='mb-6 text-sm'>
              Discover Libya's deep-rooted history and vibrant traditions, from ancient civilizations to contemporary
              practices.
            </p>
            <Link href={ROUTES.ABOUT}>
              <CustomButton title='Explore Libya’s Culture' variant='light' />
            </Link>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className='bg-primary p-6 flex items-center '>
            <div className='mr-4'>
              <Image src={HomeCulture2Img} alt='Libya Culture' />
            </div>
            <div>
              <h3 className='font-bold text-lg mb-2'>Suggested Routes</h3>
              <p className='text-sm'>
                Ready-made travel itineraries for different interests (e.g., historical tours, desert adventures).
              </p>
            </div>
          </div>
          <div className='bg-custom-orange p-6 flex items-center text-black'>
            <div className='mr-4'>
              <Image src={HomeCultureImg} alt='Libya Culture' />
            </div>
            <div>
              <h3 className='font-bold text-lg mb-2'>Customizable Options</h3>
              <p className='text-sm'>Tools to help users create their own itineraries.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LibyaCultureComponent
