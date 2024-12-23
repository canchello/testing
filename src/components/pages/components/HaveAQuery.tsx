'use client'
import React, { useState } from 'react'
import instaLogo from '@/assets/images/insta.png'
import youtubeLogo from '@/assets/images/youtube.png'
import facebookLogo from '@/assets/images/facebook.png'
import mapView from '@/assets/images/contactus-map.png'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@/components/form/TextField'
import CustomButton from '@/components/common/CustomButton'
import appStore from '@/stores/appStore'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
  is_subscribed: boolean
}

export default function HaveAQuery() {
  // const [isLoading] = useState(false)
  const { loading, setQuery }: any = appStore()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      is_subscribed: false
    }
  })

  const onSubmit = async (data: FormData) => {
    await setQuery(data)
    reset()
  }

  return (
    <div className='container bg-white mx-auto py-3 px-3 md:py-20 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8'>
      {/* Left Section: Have a Query Form */}
      <div className='flex flex-col justify-center bg-custom-dark-blue text-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Have a Query?</h2>
        <p className='mb-6'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name='name'
              control={control}
              rules={{
                required: 'Name is required'
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder='Name'
                  className='rounded focus:outline-none focus:ring-2 focus:ring-primary text-black'
                  isDisabled={loading}
                  error={errors.name?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name='email'
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder='Email'
                  className='rounded focus:outline-none focus:ring-2 focus:ring-primary text-black'
                  isDisabled={loading}
                  error={errors.email?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name='subject'
              control={control}
              rules={{
                required: 'Subject is required'
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder='Subject'
                  className='rounded focus:outline-none focus:ring-2 focus:ring-primary text-black'
                  isDisabled={loading}
                  error={errors.subject?.message}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name='message'
              control={control}
              rules={{
                required: 'Message is required'
              }}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  placeholder='Message'
                  className='p-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary text-black'
                  disabled={loading}
                />
              )}
            />
          </div>
          <div className='flex items-center'>
            <Controller
              name='is_subscribed'
              control={control}
              render={({ field: { onChange, onBlur, ref, value, ...field } }) => (
                <input
                  type='checkbox'
                  id='is_subscribed'
                  {...field}
                  checked={value} // Bind checked to `value` as boolean
                  onChange={e => onChange(e.target.checked)} // Use the `onChange` handler
                  onBlur={onBlur}
                  ref={ref}
                  className='h-4 w-4 text-primary border-gray-300 rounded'
                  disabled={loading}
                />
              )}
            />

            <label htmlFor='is_subscribed' className='ml-2 block text-sm cursor-pointer'>
              Subscribe to our newsletter for the latest updates and offers.
            </label>
          </div>
          <CustomButton
            className={`w-full border-none ${loading ? '!bg-orange-500' : ''}`}
            type='submit'
            title='Submit'
            isLoading={loading}
          />
        </form>
      </div>

      {/* Right Section: Office Info */}
      <div className='space-y-8'>
        {/* Office Info */}
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Our Office</h2>
          <p className='mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <div className='overflow-hidden rounded-lg shadow-lg'>
            {/* <Image src={mapView} alt='Map' className='object-cover' width={500} height={400} layout='responsive' /> */}
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53609.17595954849!2d13.147135859146331!3d32.883002227396815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a892c4c11c43d9%3A0x8d99d8947b5cec86!2sTripoli%2C%20Libya!5e0!3m2!1sen!2sin!4v1734160114064!5m2!1sen!2sin'
              // style={{ width: '500', height: '400' }}
              className='h-full min-h-96 w-full'
              // allowfullscreen=''
              loading='lazy'
              // referrerpolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Social Media</h2>
          <div className='flex space-x-4'>
            <div className='flex space-x-2'>
              <div>
                <Image className='cursor-pointer' src={instaLogo} alt='insta icon' />
              </div>
              <div>
                <Image className='cursor-pointer' src={facebookLogo} alt='facebook icon' />
              </div>
              <div>
                <Image className='cursor-pointer' src={youtubeLogo} alt='youtube icon' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
