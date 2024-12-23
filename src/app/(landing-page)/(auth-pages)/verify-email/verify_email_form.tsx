'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import Axios from '@/libs/axios'
import { verifyOTP_URL } from '@/services/APIs/user'
import userStore from '@/stores/userStore'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

interface FormData {
  otp: string[]
}

const VerifyEmailForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { user }: any = userStore()
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { otp: ['', '', '', ''] }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [timer, setTimer] = useState(120) // 2 minutes
  const inputRefs = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    const email = searchParams.get('email') || ''
    if (!email) return router.push('/login')

    let interval: NodeJS.Timeout
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000)
    } else if (timer === 0) {
      setIsResendDisabled(false)
    }
    return () => clearInterval(interval)
  }, [isResendDisabled, timer])

  const onResendOTP = () => {
    setIsResendDisabled(true)
    setTimer(120) // Reset timer to 2 minutes
    // Logic to resend OTP goes here
  }

  const onSubmit = async (data: FormData) => {
    try {
      const email = searchParams.get('email') || ''
      setIsLoading(true)
      const otp = data.otp.join('')
      const payload = {
        email: email,
        otp: Number(otp)
      }
      const { data: res }: any = await Axios({ ...verifyOTP_URL, data: payload })
      if (res.status === 1) {
        toast.success(res.message)
        router.push('/login')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
    // Add logic for OTP verification
  }

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target
    if (/^\d$/.test(value)) {
      // Ensure input is a single digit
      setValue(`otp.${index}`, value)
      if (index < 3) inputRefs.current[index + 1].focus()
    } else if (value === '') {
      setValue(`otp.${index}`, '') // Clear if input is empty
    }
  }

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      setValue(`otp.${index}`, '') // Clear current input
      if (index > 0) {
        inputRefs.current[index - 1].focus() // Move focus to the previous input
      }
    }
  }

  return (
    <div className='flex justify-center items-center p-4 md:px-8 md:max-h-screen overflow-auto'>
      <div className='lg:p-8 flex flex-col justify-center items-center gap-4 text-black text-center'>
        <div className='text-2xl md:text-4xl font-bold font-carmine'>
          <p className='mb-2 text-center'>Verify Email!</p>
        </div>
        <div className='text-lg font-carmine'>
          <p className='mb-2 text-center'>
            Please enter the One Time Password (OTP) that has been sent to your e-mail.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <div className='flex justify-center gap-2 mb-4'>
            {Array.from({ length: 4 }, (_, index) => (
              <Controller
                key={index}
                name={`otp.${index}`}
                control={control}
                rules={{ required: 'All fields are required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    ref={el => {
                      field.ref(el) // Use react-hook-form's ref handling
                      inputRefs.current[index] = el! // Store in refs array for focus management
                    }}
                    type='text'
                    maxLength={1}
                    placeholder='-'
                    className='w-14 h-14 border border-gray-400 rounded-xl text-center text-xl'
                    onChange={e => handleOTPChange(e, index)}
                    onKeyDown={e => handleBackspace(e, index)}
                  />
                )}
              />
            ))}
          </div>

          {errors.otp && <p className='text-red-500'>{errors.otp.message}</p>}

          <CustomButton
            variant='secondary'
            title='Verify Email'
            type='submit'
            className='w-full'
            isLoading={isLoading}
          />
        </form>

        <p className='text-base mt-2 text-center'>
          Didn’t receive the OTP?{' '}
          <span
            className={`font-bold text-primary cursor-pointer ${isResendDisabled ? 'opacity-50' : ''}`}
            onClick={!isResendDisabled ? onResendOTP : undefined}
          >
            Resend OTP {isResendDisabled && `in ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}
          </span>
        </p>
      </div>
    </div>
  )
}

export default VerifyEmailForm
