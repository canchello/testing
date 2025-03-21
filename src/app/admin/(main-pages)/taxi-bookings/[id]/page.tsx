'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import { vendorBookingList } from '@/services/APIs/vendor'
import duration from 'dayjs/plugin/duration'
import { PAYMENT_STATUS, ROUTES } from '@/libs/constants'
import Filters from '../Filters'
import { Controller, useForm } from 'react-hook-form'
import TextInput from '@/components/form/LabelInput'
import CustomTextInput from '@/components/form/TextField'
import Axios from '@/libs/axios'
import { assignTaxiDriverURL, listTaxiBookingsURL } from '@/services/APIs/admin'
import CustomTextArea from '@/components/form/TextareaInput'
import { useMount } from 'react-use'
import Loader from '@/components/common/Loader'
import CustomButton from '@/components/common/CustomButton'
import { toast } from 'sonner'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

dayjs.extend(duration)

interface FormData {
  driverName: string
  driverContactNumber: string
  price: number
  note: string
}

const AssignDriver = () => {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [bookingDetails, setBookingDetails] = useState()

  useMount(async () => {
    try {
      setLoading(true)
      const { data }: any = await Axios({
        ...listTaxiBookingsURL,
        data: {
          query: {
            _id: params.id
          },
          options: {
            findOne: true,
            populate: 'user',
            lean: true,
            sort: { updatedAt: -1 }
          }
        }
      })
      setBookingDetails(data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  })
  if (loading) return <Loader />
  return <Form bookingDetails={bookingDetails} />
}

const Form = ({ bookingDetails }: any) => {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setFocus,
    reset, // To reset the form with updated values
    getValues
  } = useForm<FormData>({
    defaultValues: {
      ...(bookingDetails || {})
    }
  })

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      const { data: res } = await Axios({ ...assignTaxiDriverURL(params.id), data })
      toast.success(res.message)
      // router.push(ROUTES.ADMIN.TAXI_BOOKINGS)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-8'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='bg-white rounded-lg p-4'>
          <Link href={ROUTES.ADMIN.TAXI_BOOKINGS}>
            <CustomButton
              title='Back to Taxi Bookings'
              variant='default'
              ImageIcon={false}
              icon={
                <div className='rounded-full bg-primary p-2 h-8 w-8'>
                  <FontAwesomeIcon icon={faChevronLeft} color='white' />
                </div>
              }
              className='!p-0 mb-4'
              iconPosition='left'
            />
          </Link>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='col-span-full'>
              <h1 className='text-lg font-bold col-span-full'>User Details</h1>
              <hr />
            </div>
            <div>
              <h1 className='text-lg font-bold'>Username</h1>
              <p>{`${bookingDetails?.user?.firstName || ''} ${bookingDetails?.user?.lastName || ''}`}</p>
            </div>
            <div>
              <h1 className='text-lg font-bold'>Email</h1>
              <p>{bookingDetails?.user?.email || '-'}</p>
            </div>
            <div>
              <h1 className='text-lg font-bold'>Contact Number</h1>
              <p>{bookingDetails?.user?.phoneNumber || '-'}</p>
            </div>
            <div>
              <h1 className='text-lg font-bold'>Gender</h1>
              <p>{bookingDetails?.user?.gender || '-'}</p>
            </div>
            <div className='col-span-full mt-5'>
              <h1 className='text-lg font-bold col-span-full'>Assign Driver</h1>
              <hr />
            </div>

            <Controller
              name='driverName'
              control={control}
              rules={{ required: 'Driver name is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Driver name'
                  placeholder='Enter Driver name'
                  error={errors?.driverName?.message}
                  required
                />
              )}
            />
            <Controller
              name='driverContactNumber'
              control={control}
              rules={{ required: 'Driver contact number is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Driver contact number'
                  placeholder='Enter driver contact number'
                  error={errors?.driverContactNumber?.message}
                  required
                />
              )}
            />
            {/* <Controller
              name='price'
              control={control}
              rules={{ required: 'Price is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Taxi Charge'
                  placeholder='Enter taxi charge'
                  error={errors?.price?.message}
                  required
                />
              )}
            /> */}
            <div className='col-span-full'>
              <Controller
                name='note'
                control={control}
                rules={{ required: 'Note is required' }}
                render={({ field }) => (
                  <CustomTextArea
                    {...field}
                    label='Note'
                    placeholder='Type driver note...'
                    error={errors?.note?.message}
                    required
                  />
                )}
              />
            </div>
          </div>
          <div className='flex justify-end mt-4'>
            <CustomButton title='Assign Driver' variant='secondary' isLoading={loading} type='submit' />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AssignDriver
