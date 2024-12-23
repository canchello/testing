import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import TextInput from '@/components/form/LabelInput'
import CustomTextArea from '@/components/form/TextareaInput'
import Rating from '@/components/UI/Rating'

interface EditableReview {
  rating: number
  review: string
  description: string
}

interface ReviewModalProps {
  review: EditableReview
  onSave: any // Callback to save changes
  onClose: () => void // Callback to close the modal
}

const ReviewModal: React.FC<ReviewModalProps> = ({ review, onSave, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<EditableReview>({
    defaultValues: {
      review: review.review || '',
      description: review.description || '',
      rating: review.rating || 0
    }
  })

  // Pre-fill form values
  React.useEffect(() => {
    setValue('review', review.review)
    setValue('description', review.description)
    setValue('rating', review.rating)
  }, [review, setValue])

  const onSubmit = (data: EditableReview) => {
    onSave({ ...review, ...data }) // Pass updated data to parent
    onClose() // Close modal
  }

  return (
    <div className='flex flex-col justify-center p-4 md:p-6'>
      <div className='text-center rounded-lg py-4 max-w-full'>
        <h2 className='text-xl font-bold text-center mb-4'>Edit Your Review</h2>
        <p className='text-center text-base mb-4'>
          Make changes to your submitted review to ensure your feedback is accurate and helpful for others!
        </p>
        <Controller
          name='rating'
          control={control}
          render={({ field }) => (
            <Rating rating={field.value} total={5} disabled={false} onChange={newRating => field.onChange(newRating)} />
          )}
        />
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='review'
          control={control}
          rules={{ required: 'Review title is required' }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='Review Title'
              placeholder='Enter review title'
              error={errors.review?.message}
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

export default ReviewModal
