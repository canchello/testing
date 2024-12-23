import CustomButton from '@/components/common/CustomButton'
import BookingForm from '@/components/pages/home/HeroSection/BookingForm'
import HomeLayout from '@/layouts/HomeLayout'
import Image from 'next/image'
import NotFoundImg from '@/assets/images/404.png'
import Link from 'next/link'
import { ROUTES } from '@/libs/constants'

const PageNotFound = () => {
  return (
    <HomeLayout>
      <div className='py-3 px-3 md:py-16 md:px-10'>
        <div className='flex flex-col md:flex-row gap-4 md:gap-0'>
          {/* Left Section */}
          <div className='flex items-center justify-center flex-1 pl-5 md:pl-20 mr-2 md:mr-10'>
            <div className='flex flex-col gap-4'>
              <div className='text-4xl font-bold'>
                <h1 className='text-3xl font-bold'>Oops! Something Went Wrong</h1>
              </div>
              <div>
                <p className='text-xl'>
                  We’re sorry, but something didn’t go as planned. Don’t worry, you can still search for the perfect
                  hotel for your next stay.
                </p>
              </div>
              <Link href={'/'}>
                <CustomButton title='Back To Home' variant='secondary' />
              </Link>
            </div>
          </div>

          {/* Right Section with Images */}
          <div className='flex-1 flex gap-4 justify-center'>
            <div className='space-y-2'>
              <Image src={NotFoundImg} alt='heroSection1' />
            </div>
          </div>
        </div>

        {/* Booking Form - Centered Horizontally */}
        <div className='mt-10 w-full flex justify-center'>
          <BookingForm />
        </div>
      </div>
    </HomeLayout>
  )
}

export default PageNotFound
