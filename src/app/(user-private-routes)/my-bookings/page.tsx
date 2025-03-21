'use client'
import React, { useState } from 'react'
import CustomButton from '@/components/common/CustomButton'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'
import Slider from 'react-slick'
import BookingReviewModal from '@/components/pages/user/my-bookings/BookingReviewModal,'
import ManageBookingModal from '@/components/pages/user/my-bookings/ManageBookingModal'
import BookedHotel from './BookedHotel'
import Axios from '@/libs/axios'
import { getBookingListURL, getTaxiBookingListURL } from '@/services/APIs/user'
import { useMount } from 'react-use'
import { BOOKING_STATUS } from '@/libs/constants'
import { useRouter } from 'next/navigation'
import BookedCar from './BookedCar'
import Link from 'next/link'
import { toast } from 'sonner'

export default function MyBookings() {
  const router = useRouter()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1
        }
      }
    ],
    arrow: true,
    nextArrow: <CustomArrow direction='right' />,
    prevArrow: <CustomArrow direction='left' />
  }

  const [state, setState] = useState({
    hotelBookings: [],
    taxiBookings: [],
    hotelLoading: false,
    taxiLoading: false
  })
  const [showModal, setShowModal] = useState<boolean | any>(false)
  const [bookingActions, setBookingActions] = useState('')
  const [selectedAction, setSelectedAction] = useState<string>('')

  const { hotelBookings, taxiBookings } = state

  useMount(() => {
    fetchHotelBookings()
    fetchTaxiBookings()
  })

  const fetchHotelBookings = async () => {
    try {
      setState(prev => ({ ...prev, hotelLoading: true }))
      const { data }: any = await Axios({
        ...getBookingListURL,
        data: {
          query: {
            // _id: '6750a52672ecdf9cd4fc60b4'
          },
          options: {
            populate: 'rooms property',
            sort: '-createdAt',
            lean: true
          }
        }
      })
      setState(prev => ({ ...prev, hotelBookings: data.data?.data || [] }))
    } catch (error) {
      console.error(error)
    } finally {
      setState(prev => ({ ...prev, hotelLoading: false }))
    }
  }

  const fetchTaxiBookings = async () => {
    try {
      setState(prev => ({ ...prev, taxiLoading: true }))
      const { data }: any = await Axios({
        ...getTaxiBookingListURL,
        data: {
          query: {},
          options: {
            populate: '',
            lean: true
          }
        }
      })
      setState(prev => ({ ...prev, taxiBookings: data.data?.data || [] }))
    } catch (error) {
      console.error(error)
    } finally {
      setState(prev => ({ ...prev, taxiLoading: false }))
    }
  }

  const carButtonClick = ({ isBeforeDay, propertyId, bookingId, status }: any) => {
    // if (status === BOOKING_STATUS.CONFIRMED) {
    //   if (isBeforeDay) {
    //     setShowModal({ propertyId, bookingId })
    //     setBookingActions('Manage Booking')
    //   } else {
    //     setShowModal({ propertyId, bookingId })
    //     setBookingActions('Write a Review')
    //   }
    // } else if (status === BOOKING_STATUS.PENDING) {
    //   router.push(`/booking/${bookingId}/guest-details`)
    // }
  }
  const hotelButtonClick = ({ isBeforeDay, propertyId, bookingId, status }: any) => {
    if (status === BOOKING_STATUS.CONFIRMED) {
      if (isBeforeDay) {
        setShowModal({ propertyId, bookingId })
        setBookingActions('Manage Booking')
      } else {
        setShowModal({ propertyId, bookingId })
        setBookingActions('Write a Review')
      }
    } else if (status === BOOKING_STATUS.PENDING) {
      router.push(`/booking/${bookingId}/guest-details`)
    }
  }
  const handleModalClose = () => {
    setShowModal(false)
  }

  return (
    <div className='justify-items-center'>
      <div className='container p-4 md:p-10'>
        {/* Back to Home Button */}
        <Link href={'/'}>
          <CustomButton
            title='Back to Home'
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

        {/* Bookings Section */}
        <div className='flex flex-col justify-center my-6 gap-6'>
          <h1 className='text-3xl font-bold'>
            {!!hotelBookings.length ? 'Hotel Bookings' : 'No Hotel Booking Found!'}
          </h1>
          {!hotelBookings.length && (
            <p className='text-lg'>
              It looks like you don’t have any bookings yet. Ready to plan your next stay? Explore our listings and book
              now for an unforgettable experience!
            </p>
          )}

          {/* Hotel Booking Cards */}
          {hotelBookings?.length > 1 && (
            <div className='w-full mt-16 xxs:mt-0'>
              <Slider {...settings}>
                {hotelBookings.map((booking: any) => (
                  <BookedHotel key={booking.id} {...{ booking, hotelButtonClick }} />
                ))}
              </Slider>
            </div>
          )}
          {hotelBookings.length === 1 && <BookedHotel {...{ booking: hotelBookings?.[0], hotelButtonClick }} />}
        </div>

        {/* Taxi Booking */}
        <div className='flex flex-col justify-center my-6 gap-6'>
          <h1 className='text-3xl font-bold'>{!!taxiBookings.length ? 'Taxi Bookings' : 'No Taxi Booking Found!'}</h1>
          {!taxiBookings.length && (
            <p className='text-lg'>
              It looks like you don’t have any bookings yet. Ready to plan your next road trip? Explore our listings and
              book now for an unforgettable experience!
            </p>
          )}

          {/* Hotel Booking Cards */}
          {taxiBookings?.length > 1 && (
            <div className='w-full mt-16 xxs:mt-0'>
              <Slider {...settings}>
                {taxiBookings.map((booking: any) => (
                  <BookedCar key={booking.id} {...{ booking, carButtonClick }} />
                ))}
              </Slider>
            </div>
          )}
          {taxiBookings.length === 1 && <BookedCar {...{ booking: taxiBookings?.[0], carButtonClick }} />}
        </div>

        {/* Review Modal */}
        {!!showModal &&
          (bookingActions === 'Write a Review' ? (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white rounded-lg overflow-auto h-screen p-4'>
                <BookingReviewModal
                  propertyId={showModal.propertyId}
                  bookingId={showModal.bookingId}
                  onClose={handleModalClose}
                />
              </div>
            </div>
          ) : (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white rounded-lg p-4 sm:p-6'>
                <ManageBookingModal
                  bookingId={showModal.bookingId}
                  selectedAction={selectedAction}
                  setSelectedAction={setSelectedAction}
                  onClose={handleModalClose}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

const CustomArrow = ({ className, style, onClick, direction }: any) => (
  <div
    className={`absolute -top-16 ${direction === 'left' ? 'right-16' : 'right-4'} cursor-pointer`}
    style={{ ...style }}
    onClick={onClick}
  >
    <button className='bg-custom-dark-blue text-white p-2 rounded-full shadow-md focus:outline-none'>
      {direction === 'left' ? <RiArrowLeftSLine fontSize={28} /> : <RiArrowRightSLine fontSize={28} />}
    </button>
  </div>
)
