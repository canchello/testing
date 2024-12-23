import Image from 'next/image'
import contactUsHero from '@/assets/images/contactusHero.png'
import phoneIcon from '@/assets/svg/phoneIconWhite.svg'
import mailIcon from '@/assets/svg/mailIconWhite.svg'
import SubscribeUs from '@/components/pages/home/subscribeUs'
import HaveAQuery from '@/components/pages/components/HaveAQuery'
import AppPromotionCard from '@/components/pages/TopLocations/PromotionCard'

const ContactUs = () => {
  return (
    <>
      <div className='relative'>
        <div className='justify-items-center bg-custom-dark-blue'>
          <div className='container mx-auto py-10 grid grid-cols-1 text-white md:grid-cols-2 relative'>
            {/* Left section: Text Content */}
            <div className='flex flex-col justify-center px-8 p-10 max-w-7xl'>
              <h2 className='text-4xl font-bold mb-4'>Get In Touch With Us!</h2>
              <p className='text-lg mb-8'>
                We’re here to help you with any questions, feedback, or assistance you may need. Whether you’re planning
                your next trip to Libya or have a query about your hotel booking, feel free to reach out!
              </p>
            </div>

            {/* Right section: Half circular image */}
            <div className='relative z-10 hidden md:block'>
              <div className='absolute inset-0 flex justify-center'>
                <div className='relative h-[600px] w-96 lg:w-[420px]'>
                  <Image
                    src={contactUsHero} // Ensure the image is in the public folder
                    alt='Libya Landscape'
                    layout='fill'
                    // objectFit='cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* White Section (How to Contact Us) */}
        <div className='relative bg-white text-black py-10'>
          <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative'>
            <div className='flex flex-col px-8 gap-4'>
              <h3 className='text-2xl font-semibold'>How to Contact Us</h3>
              <p className='mt-2'>Have a question or need assistance? We’re here to help! You can reach us through:</p>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20'>
                <div className='flex flex-col items-start space-y-4'>
                  <div className='bg-primary p-3 rounded-full'>
                    <Image src={phoneIcon} alt='phoneIcon' />
                  </div>
                  <p className='text-lg break-all'>info@libyabooking.com</p>
                </div>
                <div className='flex flex-col items-start space-y-4'>
                  <div className='bg-primary  p-3 rounded-full'>
                    <Image src={mailIcon} alt='phoneIcon' />
                  </div>
                  <p className='text-lg break-all'>+91-9003199000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HaveAQuery />
      </div>
      <AppPromotionCard className='my-8' />
      <SubscribeUs />
    </>
  )
}

export default ContactUs
