import CustomButton from '@/components/common/CustomButton'
import CustomTextInput from '@/components/form/TextField'
import { closeModal } from '@/components/UI/Modal'
import Axios from '@/libs/axios'
import { addPropertyIntoWishListURL, createWishListURL, wishlistListingURL } from '@/services/APIs/wishlist'
import userStore from '@/stores/userStore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface FormData {
  name: string
}

const AddPropertyToWishListModal = () => {
  const { user, setUserWishList, wishListData }: any = userStore()
  const params = useParams()
  const [selectedWishlistId, setSelectedWishlistId] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: ''
    }
  })

  const fetchUserWishList = async () => {
    const payload = {
      query: {
        userId: user?._id
      }
    }
    try {
      const { data }: any = await Axios({ ...wishlistListingURL, data: payload })
      setUserWishList(data?.data?.data || [])
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    }
  }

  const createWishList = async (data: any) => {
    try {
      const { data: res }: any = await Axios({ ...createWishListURL, data })
      toast.success('Wishlist created successfully!')
      return res.data
    } catch (error) {
      console.log('error', error)
    }
  }

  const addPropertyToWishList = async (wishlistId: any) => {
    const payload = {
      propertyId: params.id
    }
    try {
      const { data }: any = await Axios({ ...addPropertyIntoWishListURL(wishlistId), data: payload })
      await fetchUserWishList()
      toast.success('Hotel added to your wishlist!')
      return data.data
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    if (user) fetchUserWishList()
  }, [])

  const onSubmit = async (data: FormData) => {
    if (!wishListData.length) {
      createWishList(data).then(res => {
        addPropertyToWishList(res._id)
      })
      closeModal('add-property-to-wishlist-modal')
    } else if (selectedWishlistId) {
      addPropertyToWishList(selectedWishlistId)
      fetchUserWishList()
      closeModal('add-property-to-wishlist-modal')
    }
  }

  return (
    <div className='flex flex-col justify-center p-4'>
      <div className='text-center rounded-lg p-4 w-80 md:w-[620px] max-w-full'>
        <h2 className='text-xl font-bold text-center mb-2'>Add Property To Wishlist</h2>
        <p className='text-center text-base'>
          {wishListData?.length
            ? 'Choose an existing wishlist to save this property.'
            : 'Create a new wishlist to save this property for your future plans.'}
        </p>
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        {wishListData?.length ? (
          <div>
            <label className='block text-sm font-medium text-gray-700'>Select a Wishlist</label>
            <select
              value={selectedWishlistId}
              onChange={e => setSelectedWishlistId(e.target.value)}
              className='w-full p-2 border rounded-lg mt-1'
              required
            >
              <option value='' disabled>
                Select a wishlist
              </option>
              {wishListData.map((wishlist: any) => (
                <option key={wishlist._id} value={wishlist._id}>
                  {wishlist.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Wishlist Name is required'
            }}
            render={({ field }) => (
              <CustomTextInput
                {...field}
                label='Wishlist Name'
                placeholder='Enter wishlist name'
                error={errors.name?.message}
              />
            )}
          />
        )}
        <div className='justify-items-center'>
          <CustomButton title='Continue' type='submit' isDisabled={!!wishListData.length && !selectedWishlistId} />
        </div>
      </form>
    </div>
  )
}

export default AddPropertyToWishListModal
