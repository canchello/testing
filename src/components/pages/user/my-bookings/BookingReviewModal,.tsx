import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import TextInput from '@/components/form/LabelInput'
import CustomTextArea from '@/components/form/TextareaInput'
import Rating from '@/components/UI/Rating'
import Axios from '@/libs/axios'
import { createReviewURL } from '@/services/APIs/user'
import { toast } from 'sonner'
import ToggleInput from '@/components/UI/ToggleInput'

interface EditableReview {
  rating: number
  title: string
  description: string
  cleanliness: number
  staff: number
  location: number
  amenities: number
  valueForMoney: number
}

interface RevieBookingModalProps {
  title?: EditableReview
  propertyId?: any
  bookingId?: any
  onSave?: any // Callback to save changes
  onClose: () => void // Callback to close the modal
}

const BookingReviewModal: React.FC<RevieBookingModalProps> = ({ propertyId, bookingId, onSave, onClose }) => {
  const [detailedReview, setDetailedReview] = React.useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<EditableReview>({
    defaultValues: {
      rating: 1,
      cleanliness: 0,
      staff: 0,
      location: 0,
      amenities: 0,
      valueForMoney: 0
    }
  })

  const onSubmit = async (data: EditableReview) => {
    try {
      const { data: res }: any = await Axios({
        ...createReviewURL,
        data: {
          ...data,
          propertyId,
          bookingId
        }
      })
      toast.success(res.message)
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col justify-center p-4'>
      <div className='text-center rounded-lg p-4 w-80 md:w-[620px] max-w-full'>
        <h2 className='text-xl font-bold text-center mb-4'>We value your Feedback!</h2>
        <p className='text-center text-base mb-4'>
          Let us know about your experience with the [hotel/taxi service]! Your feedback helps us improve and assists
          future travellers in making the best choices.
        </p>
        {!detailedReview && (
          <Controller
            name='rating'
            control={control}
            render={({ field }) => (
              <Rating
                rating={field.value}
                total={5}
                disabled={false}
                onChange={newRating => field.onChange(newRating)}
              />
            )}
          />
        )}
      </div>
      <form className='flex flex-col gap-4 p-4' onSubmit={handleSubmit(onSubmit)}>
        <ToggleInput
          label={<h1 className='text-lg'>Would you like to provide a Detailed Rating?</h1>}
          isChecked={detailedReview}
          onChange={val => setDetailedReview(val)}
        />
        {detailedReview && (
          <div className='flex flex-col gap-2'>
            {['cleanliness', 'staff', 'location', 'amenities', 'valueForMoney'].map((category: any) => (
              <Controller
                key={category}
                name={category}
                control={control}
                render={({ field }) => (
                  <div className='flex items-center gap-2 flex-wrap'>
                    <label className='font-medium capitalize min-w-40'>{category}:</label>
                    <Rating
                      rating={field.value}
                      total={5}
                      disabled={false}
                      onChange={newRating => field.onChange(newRating)}
                    />
                  </div>
                )}
              />
            ))}
          </div>
        )}
        <Controller
          name='title'
          control={control}
          rules={{ required: 'Review title is required' }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='Review Title'
              placeholder='Enter review title'
              error={errors.title?.message}
              required
            />
          )}
        />
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <CustomTextArea
              {...field}
              label='Write Your Review'
              placeholder='Write your review'
              error={errors.description?.message}
            />
          )}
        />
        <div className='flex justify-center gap-4'>
          <CustomButton title='Submit Review' type='submit' />
          <CustomButton title='Cancel' variant='secondary' onClick={onClose} />
        </div>
      </form>
    </div>
  )
}

export default BookingReviewModal
