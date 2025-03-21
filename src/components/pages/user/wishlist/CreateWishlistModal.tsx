import CustomButton from '@/components/common/CustomButton'
import TextInput from '@/components/form/LabelInput'
import CustomTextArea from '@/components/form/TextareaInput'
import CustomTextInput from '@/components/form/TextField'
import { closeModal } from '@/components/UI/Modal'
import Rating from '@/components/UI/Rating'
import Axios from '@/libs/axios'
import { createWishListURL, wishlistListingURL } from '@/services/APIs/wishlist'
import userStore from '@/stores/userStore'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface FormData {
  name: string
}

const CreateWishlistModal = () => {
  const [loading, setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: ''
    }
  })
  const { user, setUserWishList }: any = userStore()
  const fetchUserWishList = async () => {
    const payload = {
      query: {
        userId: user._id
      },
      options: {
        populate: 'propertyAttachments',
        lean: true
      }
    }
    try {
      const { data }: any = await Axios({ ...wishlistListingURL, data: payload })
      setUserWishList(data?.data?.data || [])
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    }
  }

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      const { data: res }: any = await Axios({ ...createWishListURL, data })
      toast.success('Wishlist created successfully!')
      closeModal('create-wishlist-modal')
      await fetchUserWishList()
      reset()
      return res.data
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center p-4'>
      <div className='text-center rounded-lg p-4 w-80 md:w-[620px] max-w-full'>
        <h2 className='text-xl font-bold text-center mb-2'>Create a New Wishlist</h2>
        <p className='text-center text-base'>
          Organize your travel plans! Start a new wishlist to keep track of hotels, locations, and experiences for your
          upcoming trips.
        </p>
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='name'
          control={control}
          rules={{
            required: 'Wishlist Name is required'
          }}
          render={({ field }) => (
            <CustomTextInput
              {...field}
              label='Review Title'
              placeholder='Enter wishlist name'
              error={errors.name?.message}
            />
          )}
        />
        <div className='justify-items-center'>
          <CustomButton title='Continue' type='submit' isLoading={loading} />
        </div>
      </form>
    </div>
  )
}

export default CreateWishlistModal
