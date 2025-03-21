import CustomButton from '@/components/common/CustomButton'
import { closeModal } from '@/components/UI/Modal'
import Axios from '@/libs/axios'
import { removePropertyFromWishListURL, wishlistListingURL } from '@/services/APIs/wishlist'
import userStore from '@/stores/userStore'
import { useParams } from 'next/navigation'
import React from 'react'

const WishListConfirmationModal = ({ wishlist }: any) => {
  const { user, setUserWishList }: any = userStore()
  const params = useParams() // Hotel ID comes from route params
  const hotelId = params.id // Assuming hotel ID is passed via params

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
    } finally {
    }
  }

  const handleHotelRemoveFromWishlist = async () => {
    const payload = {
      propertyId: hotelId
    }
    try {
      const response: any = await Axios({ ...removePropertyFromWishListURL(wishlist._id), data: payload })
      if (response) {
        await fetchUserWishList()
        closeModal('remove-property-from-wishlist-modal')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className='flex flex-col justify-center p-4'>
      <div className='text-center rounded-lg p-4 w-80 md:w-[620px] max-w-full'>
        <h2 className='text-xl font-bold text-center mb-2'>Remove Hotel From Wishlist</h2>
        <p className='text-center text-base'>Are you sure you want to remove this hotel from your wishlist?</p>
      </div>
      <div className='flex justify-center gap-4 mt-4'>
        {/* Cancel Button */}
        <CustomButton
          title='Cancel'
          variant='secondary'
          onClick={() => closeModal('remove-property-from-wishlist-modal')}
        />
        {/* Continue Button */}
        <CustomButton title='Remove' variant='error' onClick={handleHotelRemoveFromWishlist} />
      </div>
    </div>
  )
}

export default WishListConfirmationModal
