import React from 'react'
import { useRouter } from 'next/navigation'
import CustomButton from '@/components/common/CustomButton'

interface EditableReview {
  rating: number
  review: string
  description: string
}

interface RevieBookingModalProps {
  bookingId?: string
  selectedAction?: string
  setSelectedAction: any // Callback to close the modal
  onSave?: any // Callback to save changes
  onClose: () => void // Callback to close the modal
}

const ManageBookingModal: React.FC<RevieBookingModalProps> = ({
  bookingId,
  selectedAction,
  setSelectedAction,
  onClose
}) => {
  const router = useRouter()

  return (
    <div className='bg-white rounded-lg p-4'>
      <h2 className='text-2xl font-bold mb-4'>Manage your Booking!</h2>
      <p className='text-gray-600 mb-4'>Please select how you’d like to proceed with managing your booking.</p>
      <select
        className='w-full border border-gray-300 rounded p-2 mb-4'
        value={selectedAction}
        onChange={(e: any) => setSelectedAction(e.target.value)}
      >
        <option value=''>Select Your Action</option>
        <option value='Cancel Booking'>Cancel Booking</option>
        <option value='Upgrade Booking'>Upgrade Booking</option>
      </select>
      <CustomButton
        variant='primary'
        className={`w-full py-2 rounded ${!selectedAction ? 'opacity-50 cursor-not-allowed' : ''}`}
        title='Continue'
        onClick={() => {
          if (selectedAction === 'Cancel Booking') {
            router.push(`/booking/${bookingId}/cancel-booking`)
          } else if (selectedAction === 'Upgrade Booking') {
            router.push(`/booking/${bookingId}/change-booking`)
          }
          onClose()
        }}
      />
      <CustomButton
        title='Close'
        variant='light'
        className='mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded'
        onClick={() => onClose()}
      />
    </div>
  )
}

export default ManageBookingModal
