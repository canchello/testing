'use client'
import React from 'react'
import Link from 'next/link'
import CustomButton from '@/components/common/CustomButton'
import Axios from '@/libs/axios'
import { forgotPasswordURL } from '@/services/APIs/user'
import { toast } from 'sonner'

const EmailSentForm = ({ email }: any) => {
  const [loading, setLoading] = React.useState(false)
  const onSubmit = async () => {
    try {
      setLoading(true)
      const { data }: any = await Axios({ ...forgotPasswordURL, data: { email } })
      toast.success(data.message)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center md:max-h-screen overflow-auto'>
      <div className='p-4 md:px-8'>
        <div className='lg:p-8 flex flex-col justify-center items-center gap-4 text-black text-center'>
          <div className='text-2xl md:text-4xl font-bold font-carmine'>
            <p className='mb-2 text-center text-wrap'>Check Your Email!</p>
          </div>
          <h2 className='text-lg mb-2 text-center text-wrap'>
            A password reset link has been sent to your registered email address
          </h2>

          <div className='flex flex-col gap-4 w-full'>
            {/* Submit Button */}
            <CustomButton
              variant='secondary'
              isLoading={loading}
              title='Resend Email'
              onClick={onSubmit}
              className='w-full'
            />
          </div>

          {/* Login Link */}
          <p className='text-base mt-2 text-center text-black'>
            Go back to{' '}
            <Link href='/login' className='font-bold text-primary'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmailSentForm
