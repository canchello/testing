'use client'
import React, { useEffect, useState } from 'react'
import BookValues from '@/components/pages/user/booking-guest-detail/BookValues'
import GuestDetails from '@/components/pages/user/booking-payment/GuestDetails'
import RoomDetails from '@/components/pages/user/booking-payment/RoomDetails'
import PaymentDetails from '@/components/pages/user/booking-payment/PaymentDetails'
import Link from 'next/link'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faChevronLeft, faClose } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'next/navigation'
import Axios from '@/libs/axios'
import { fetchUserBookingListURL } from '@/services/APIs/booking'
import Loader from '@/components/common/Loader'
import { checkCouponURL, getWalletURL } from '@/services/APIs/user'
import { toast } from 'sonner'
import CustomSelect from '@/components/form/SelectField'

const BookingPayment = () => {
  const params = useParams()
  const [isLoading, setLoading] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [loadingCoupon, setLoadingCoupon] = useState(false)
  const [couponApplied, setCouponApplied] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [useWalletBalance, setUseWalletBalance] = useState(false)
  const [wallet, setWallet] = useState<any>()

  const fetchWalletDetails = async () => {
    try {
      const { data }: any = await Axios({ ...getWalletURL })
      setWallet(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const addCoupon = async (couponCode: string) => {
    try {
      setLoadingCoupon(true)
      const { data }: any = await Axios({ ...checkCouponURL, data: { couponCode, bookingId: params?.id } })
      toast.success(data.message)
      // setBookingDetails(data?.data || null)
      couponCode && setCouponApplied(true)
    } catch (error) {
      console.error(error)
      setCouponApplied(false)
    } finally {
      setLoadingCoupon(false)
    }
  }

  const fetchUserBookingDetails = async () => {
    setLoading(true)
    const payload = {
      query: {
        _id: params?.id
      },
      options: {
        populate: 'rooms property',
        lean: true,
        findOne: true
      }
    }
    try {
      const { data }: any = await Axios({ ...fetchUserBookingListURL, data: payload })
      setBookingDetails(data?.data || null)
      setCouponCode(data?.data?.couponCode || '')
      data?.data?.couponCode && setCouponApplied(true)
      setLoading(false)
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchUserBookingDetails()
    }
    fetchWalletDetails()
  }, [])

  return (
    <div className='container mx-auto p-4'>
      {isLoading ? (
        <div className='h-screen flex justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <div className='flex flex-col lg:flex-row gap-4'>
          <BookValues bookingDetails={bookingDetails} />
          <div className='flex-1 space-y-4 lg:w-[calc(100vw_-280px)]'>
            <Link href={`/booking/${params.id}/guest-details`}>
              <CustomButton
                title='Back to Guest Details'
                variant='default'
                ImageIcon={false}
                icon={
                  <div className='rounded-full bg-primary p-2 h-8 w-8'>
                    <FontAwesomeIcon icon={faChevronLeft} color='white' />
                  </div>
                }
                className='!p-0'
                iconPosition='left'
              />
            </Link>
            <RoomDetails bookingDetails={bookingDetails} />
            <GuestDetails bookingDetails={bookingDetails} />
            <div className=''>
              <p className='text-xl font-semibold mb-2'>Apply Coupon</p>
              <div className='flex items-center gap-2 space-x-2 text-lg'>
                {/* <TextInput
                  placeholder='Enter Coupon Code'
                  value={couponCode}
                  isDisabled={couponApplied}
                  onChange={e => setCouponCode(e.target.value)}
                /> */}
                <CustomSelect
                  disabled={couponApplied}
                  // label='Coupon Code'
                  options={(wallet?.availableCoupon || []).map((coupon: any) => ({
                    label: `${coupon.title || ''} - ${coupon.code || ''}`,
                    value: coupon.code
                  }))}
                  // error={errors.bankName?.message}
                  // required
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                />
                {couponApplied ? (
                  <div className='flex gap-4'>
                    <FontAwesomeIcon icon={faCheckCircle} fontSize={24} className='text-success' />
                    <FontAwesomeIcon
                      icon={faClose}
                      fontSize={24}
                      className='cursor-pointer text-error'
                      onClick={() => {
                        setCouponApplied(false)
                        setCouponCode('')
                        addCoupon('')
                      }}
                    />
                  </div>
                ) : (
                  <CustomButton
                    title='Apply'
                    className='rounded-md'
                    onClick={() => addCoupon(couponCode)}
                    isLoading={loadingCoupon}
                  />
                )}
              </div>
            </div>

            <PaymentDetails {...{ useWalletBalance, setUseWalletBalance, wallet, bookingDetails, couponCode }} />
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingPayment
