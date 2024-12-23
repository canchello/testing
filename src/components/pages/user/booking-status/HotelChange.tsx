'use client'
import CustomButton from '@/components/common/CustomButton'
import React, { useState } from 'react'
import UpgradeRoomCard from './UpgradeRoomCard'
import { useMount } from 'react-use'
import Axios from '@/libs/axios'
import { fetchRoomListURL, upgradeRoomURL } from '@/services/APIs/user'
import Loader from '@/components/common/Loader'
import Link from 'next/link'
import { ROUTES } from '@/libs/constants'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Modal, { openModal } from '@/components/UI/Modal'

export default function HotelChange({ booking }: any) {
  const router = useRouter()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(false)
  const [upgrading, setUpgrading] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null)
  const [upgradeSuccess, setUpgradeSuccess] = useState(false)

  const handleSelect = (id: number) => {
    setSelectedRoom(id)
  }
  const fetchRoomList = async () => {
    try {
      setLoading(true)
      const currRoomData = booking.rooms?.[0]
      const currentRoomPrice = currRoomData.roomType?.price
      const { data }: any = await Axios({
        ...fetchRoomListURL,
        data: {
          query: {
            propertyId: booking.property._id,
            numberOfGuest: currRoomData?.roomType?.numberOfGuest,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            priceRange: [currentRoomPrice, null]
          },
          options: {
            popuplate: 'attachment',
            lean: true
          }
        }
      })
      const rooms = data?.data?.data
      // .filter((i: any) => i.price > currentRoomPrice)
      setRooms(rooms)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useMount(() => fetchRoomList())

  const upgradeBooking = async () => {
    try {
      setUpgrading(true)
      const totalRooms = booking.rooms?.length || 0
      const roomType: any = rooms.find((i: any) => i._id === selectedRoom)
      const newRooms = roomType?.room?.slice(0, totalRooms).map((i: any) => i._id) || []
      if (!selectedRoom) return toast.error('Please select room to upgrade', { id: 'error' })
      const { data }: any = await Axios({
        ...upgradeRoomURL(booking._id),
        data: {
          upgradeRoomId: newRooms
        }
      })
      toast.success(data.message)
      openModal('change-booking-success')
      setUpgradeSuccess(true)
    } catch (error) {
      console.error(error)
    } finally {
      setUpgrading(false)
    }
  }

  const selectedNewRoom: any = rooms.find((room: any) => room._id === selectedRoom)
  const totalDue = booking.rooms.length * (selectedNewRoom?.price || 0) - booking.totalPrice
  return (
    <div className='space-y-4'>
      <div className='space-y-1 border-b pb-2'>
        <h1 className='text-2xl font-bold'>Upgrade Booking</h1>
        <p>
          Would you like to proceed with modifying your booking details? Select your new preferences to update your
          reservation.
        </p>
      </div>
      {loading && <Loader />}
      {!loading && (
        <div className='md:col-span-2 space-y-6'>
          <div className='flex flex-col gap-4'>
            {!rooms.length ? (
              <p className='text-center'>There are no rooms to upgrade</p>
            ) : (
              rooms.map((room: any) => (
                <UpgradeRoomCard
                  key={room._id}
                  image={room.attachment?.fileUrl ?? 'https://via.placeholder.com/400x300'}
                  title={room.name}
                  price={room.price}
                  adults={room.numberOfGuest}
                  cancellationDate={room.cancellationDate}
                  selected={room.id === selectedRoom}
                  onSelect={() => handleSelect(room._id)}
                />
              ))
            )}
            {/* {} */}
          </div>
          {!!rooms.length && totalDue >= 0 ? (
            <>
              <div className='mt-6 border-t pt-4 flex justify-between items-center'>
                <h3 className='text-lg font-semibold'>Total Amount Due</h3>
                <span className='text-lg font-bold text-gray-800'>${totalDue.toFixed(2) || 0}</span>
              </div>
              <div className='flex gap-4'>
                {!upgradeSuccess && (
                  <CustomButton
                    title='Upgrade Booking'
                    variant='primary'
                    onClick={upgradeBooking}
                    isLoading={upgrading}
                  />
                )}
                <Link href={ROUTES.MY_BOOKINGS}>
                  <CustomButton title='Cancel' variant='light' />
                </Link>
              </div>
            </>
          ) : (
            <div className='flex justify-center'>
              <Link href={ROUTES.MY_BOOKINGS}>
                <CustomButton title='My Booking' variant='primary' />
              </Link>
            </div>
          )}
        </div>
      )}
      <Modal
        id='change-booking-success'
        modalClass='p-0'
        body={
          <ConfirmModal
            title='Upgrade Request Received!'
            description='Your upgrade request is under review. Once confirmed, complete the payment to book the ride. Track your status on the “My Bookings page”.'
          />
        }
      />
    </div>
  )
}

export const ConfirmModal = ({ title = '', description = '' }) => {
  const router = useRouter()

  const onBookNew = async () => {
    try {
      router.push(ROUTES.MY_BOOKINGS)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='justify-items-center p-8 space-y-4 text-center'>
      <FontAwesomeIcon icon={faCheckCircle} size='3x' className='text-success' />
      <h2 className='text-xl font-bold mb-2 text-success'>{title || ''}</h2>
      <p>{description || ''}</p>
      <CustomButton title={'View Booking'} variant='success' className='min-w-44' onClick={onBookNew} />
    </div>
  )
}
