import React, { useState } from 'react'
import CustomButton from '@/components/common/CustomButton'

import CustomSelect from '@/components/form/SelectField'
import CustomDateInput from '@/components/form/DateField'
import CustomTextInput from '@/components/form/TextField'

import { faCheckCircle, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from '@/libs/axios'
import { requestTaxiURL } from '@/services/APIs/user'
import { toast } from 'sonner'
import { ConfirmModal } from '../../user/booking-status/HotelChange'
import Modal, { openModal } from '@/components/UI/Modal'
import { Controller, useForm } from 'react-hook-form'

export default function BookForm() {
  const [loading, setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (formdata) => {
    try {
      setLoading(true)
      let payload = { ...formdata }
      console.log('payload', payload)
      if (payload.pickupDate && payload.pickupTime) {
        payload.pickupDateTime = payload.pickupDate && payload.pickupTime && `${payload.pickupDate}T${payload.pickupTime}:00`
        delete payload.pickupDate
        delete payload.pickupTime
      }
      const { data } = await Axios({ ...requestTaxiURL, data: payload })
      toast.success(data.message)
      openModal('booking-success')
      reset()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-2xl font-bold'>Book Your Ride</p>
      <p className='text-xl'>
        Fill in your details, and our team will review your request. You can proceed with the payment once your
        ride is confirmed.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Controller
          name='pickUpLocation'
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              className={field.value ? '' : 'text-gray-500 font-medium'}
              placeholder='Pick-up Location'
              options={[
                { label: 'Airport 1', value: 'Airport 1' },
                { label: 'Airport 2', value: 'Airport 2' },
                { label: 'Airport 3', value: 'Airport 3' }
              ]}
            // onChange={e => setFormData(prev => ({ ...prev, pickUpLocation: e.target.value }))}
            />
          )}
        />
        <Controller
          name='dropOffLocation'
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              className={field.value ? '' : 'text-gray-500 font-medium'}
              placeholder='Drop-off Location'
              options={[
                { label: 'Hotel 1', value: 'Hotel 1' },
                { label: 'Hotel 2', value: 'Hotel 2' },
                { label: 'Hotel 3', value: 'Hotel 3' }
              ]}
            // onChange={e => setFormData(prev => ({ ...prev, pickUpLocation: e.target.value }))}
            />
          )}
        />
        <Controller
          name='pickupDate'
          control={control}
          render={({ field }) => (
            <CustomDateInput
              {...field}
              type="date"
              placeholder='Pick-up Date'
              value={field.value || ''}
            // onChange={e => setFormData(prev => ({ ...prev, pickupDate: e.target.value }))}
            />
          )}
        />
        <Controller
          name='pickupTime'
          control={control}
          render={({ field }) => (
            <CustomDateInput
              {...field}
              type="time"
              placeholder='Pick-up Time'
              value={field.value || ''}
            // onChange={e => setFormData(prev => ({ ...prev, pickupDate: e.target.value }))}
            />
          )}
        />
        <Controller
          name='passengerCount'
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              className={field.value ? '' : 'text-gray-500 font-medium'}
              placeholder='Passengers'
              options={[
                ...Array.from({ length: 6 }, (_, index) => ({ label: `${index + 1}`, value: Number(`${index + 1}`) }))
              ]}
            // onChange={e => setFormData(prev => ({ ...prev, passengerCount: e.target.value }))}
            />
          )}
        />
        <Controller
          name='bagCount'
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              className={field.value ? '' : 'text-gray-500 font-medium'}
              placeholder='Number of luggage bag'
              options={[
                ...Array.from({ length: 6 }, (_, index) => ({ label: `${index + 1}`, value: Number(`${index + 1}`) }))
              ]}
            // onChange={e => setFormData(prev => ({ ...prev, bagCount: e.target.value }))}
            />
          )}
        />
        <Controller
          name='rideType'
          control={control}
          render={({ field }) => (
            <CustomSelect
              {...field}
              className={field.value ? '' : 'text-gray-500 font-medium'}
              placeholder='Ride Type'
              options={[
                { label: "Basic", value: "basic" },
                { label: "Standard", value: "standard" },
                { label: "Luxury", value: "luxury" },
              ]}
            // onChange={e => setFormData(prev => ({ ...prev, bagCount: e.target.value }))}
            />
          )}
        />
        <Controller
          name='flightNumber'
          control={control}
          render={({ field }) => (
            <CustomTextInput
              {...field}
              value={field.value || ''}
              placeholder='Flight Number'
            // onChange={e => setFormData(prev => ({ ...prev, flightNumber: e.target.value }))}
            // className='border border-gray-400'
            />
          )}
        />
        <div className='col-span-full mx-auto'>
          <CustomButton type='submit' title='Book Now' isLoading={loading} />
        </div>
      </form>
      <Modal
        id='booking-success'
        modalClass='p-0'
        body={
          <ConfirmModal
            title='Thank You!'
            description='We’ve received your request, and it’s currently under review. Once your booking is confirmed, you’ll receive an email with all the details. You can make the payment after confirmation.'
          />
        }
      />
    </div>
  )
}
