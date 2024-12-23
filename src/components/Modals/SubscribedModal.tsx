import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import subscribed from '@/assets/images/subscribed.png'
import Image from 'next/image'
import CustomButton from '../common/CustomButton'

export default function SubscribedModal({ onClose = () => {} }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-10 rounded-lg shadow-lg max-w-2xl w-full relative'>
        {/* Close Button */}
        <button className='absolute top-6 right-6 text-gray-500 hover:text-gray-700' onClick={onClose}>
          <FontAwesomeIcon icon={faClose} fontSize={'large'} className='text-primary' />
        </button>

        {/* Content */}
        <div className='flex items-center space-x-4'>
          {/* Text Content */}
          <div className='flex-1'>
            <h2 className='text-xl font-bold'>Thank you for joining our Community!</h2>
            <p className='text-base mt-2'>
              Get ready to receive the latest travel tips, exclusive deals, and insider information straight to your
              inbox. We’re excited to have you with us!
            </p>
            <CustomButton
              onClick={onClose}
              className='mt-4 px-4 shadow-lg shadow-slate-400'
              title='Get Started'
              variant='secondary'
            />
          </div>

          {/* Illustration */}
          <div>
            <Image src={subscribed} alt='Welcome Illustration' height={200} width={270} />
          </div>
        </div>
      </div>
    </div>
  )
}
