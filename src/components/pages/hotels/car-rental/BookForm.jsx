import React, { useState } from 'react'
import CustomButton from '@/components/common/CustomButton'

import CustomSelect from '@/components/form/SelectField'
import CustomDateInput from '@/components/form/DateField'
import CustomTextInput from '@/components/form/TextField'

import { faCheckCircle, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from '@/libs/axios'
import { airportListURL, requestTaxiURL } from '@/services/APIs/user'
import { toast } from 'sonner'
import { ConfirmModal } from '../../user/booking-status/HotelChange'
import Modal, { openModal } from '@/components/UI/Modal'
import { Controller, useForm } from 'react-hook-form'
import MapOption from './MapOption'
import { cn } from '@/libs/tailwind'
import TextInput from '@/components/form/LabelInput'
import { useMount } from 'react-use'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'

dayjs.extend(utc)

export default function BookForm() {
  const [loading, setLoading] = useState(false)
  const [mapLocation, setMapLocation] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      pickUpLocation: '',
      dropOffLocation: '',
      pickupDate: '',
      pickupTime: '',
      passengerCount: '',
      bagCount: '',
      rideType: '',
      flightNumber: ''
    },
    mode: 'onSubmit',
  })

  const [fromAddress, setFromAddress] = useState('airport')
  const [airportOptions, setAirports] = useState([
    { label: 'Select Option', value: '' },
    { label: 'Tripoli International Airport', value: 'Tripoli International Airport' },
    { label: 'Mitiga International Airport', value: 'Mitiga International Airport' },
    { label: 'Al Abraq International Airport', value: 'Al Abraq International Airport' }
  ])

  const handleFromChange = (e) => {
    setFromAddress(e.target.value)
  }
  const fetchAirports = async () => {
    try {
      const { data } = await Axios({ ...airportListURL })
      const options = data.data?.data.map(i => ({ label: i.address, value: i.address }))
      setAirports(options || [])
    } catch (error) {
      console.error(error)
    }
  }

  useMount(fetchAirports)
  const hotelOptions = [
    { label: 'Select Option', value: '' },
    { label: 'Al Waddan Hotel', value: 'Al Waddan Hotel' },
    { label: 'Flames Dumas', value: 'Flames Dumas' },
    { label: 'La fountain blu', value: 'La fountain blu' },
  ]

  // const handleToChange = (value) => {
  //   setToAddress(value)
  //   setFromAddress(value === 'Airport' ? 'Hotel' : 'Airport')
  // }

  const onSubmit = async (formdata) => {
    try {
      if (Object.values(formdata).some(value => !value)) {
        toast.warning("Please fill in all form fields.");
        return;
      }
      setLoading(true)
      let payload = { ...formdata }
      if (payload.pickupDate && payload.pickupTime) {
        payload.pickupDateTime = payload.pickupDate && payload.pickupTime &&
          dayjs(`${payload.pickupDate} ${payload.pickupTime}`).utc().format()

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
        <div className='col-span-full'>
          <CustomSelect
            label="Select Route"
            placeholder='Select Route'
            options={[{ label: 'Airport to Hotel', value: 'airport' }, { label: 'Hotel to Airport', value: 'hotel' }]}
            value={fromAddress}
            onChange={handleFromChange}
          />
        </div>
        <div className={cn(fromAddress !== "airport" && 'flex items-center gap-2')}>
          {(fromAddress !== "airport" && mapLocation) ?
            <TextInput value={"Map Location"} isDisabled wrapperClass='flex-1' />
            :
            <Controller
              name='pickUpLocation'
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  wrapperClass='flex-1'
                  className={field.value ? '' : 'text-gray-500 font-medium'}
                  placeholder='Pick-up Location'
                  options={fromAddress === 'airport' ? airportOptions : hotelOptions}
                // onChange={e => setFormData(prev => ({ ...prev, pickUpLocation: e.target.value }))}
                />
              )}
            />}
          {(fromAddress !== "airport") && (
            !mapLocation ?
              <MapOption
                className="mt-1"
                onSelectLocation={(location) => {
                  setMapLocation(location)
                  setValue("pickUpLocation", location)
                }} />
              :
              <div className='cursor-pointer mt-1' onClick={() => {
                setMapLocation()
                setValue("pickUpLocation", null)
              }}>
                <FontAwesomeIcon icon={faClose} className='bg-white rounded-full p-3 ' />
              </div>)
          }
        </div>
        <div className={cn(fromAddress === "airport" && 'flex items-center gap-2')}>
          {(fromAddress === "airport" && mapLocation) ?
            <TextInput value={"Map Location"} isDisabled wrapperClass='flex-1' />
            :
            <Controller
              name='dropOffLocation'
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  wrapperClass="flex-1"
                  className={cn(field.value ? '' : 'text-gray-500 font-medium')}
                  placeholder='Drop-off Location'
                  options={fromAddress === 'hotel' ? airportOptions : hotelOptions}
                // onChange={e => setFormData(prev => ({ ...prev, pickUpLocation: e.target.value }))}
                />
              )}
            />}
          {(fromAddress === "airport") && (!mapLocation ?
            <MapOption
              className="mt-1"
              onSelectLocation={(location) => {
                setMapLocation(location)
                setValue("dropOffLocation", location)
              }} />
            :
            <div className='cursor-pointer mt-1' onClick={() => {
              setMapLocation()
              setValue("dropOffLocation", null)
            }}>
              <FontAwesomeIcon icon={faClose} className='bg-white rounded-full p-3 ' />
            </div>)
          }
        </div>
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
