'use client'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/common/CustomButton'
import { faChevronLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '@/components/UI/Modal'
import CreateWishlistModal from '@/components/pages/user/wishlist/CreateWishlistModal'
import ShareWishlistModal from '@/components/pages/user/wishlist/ShareWishlistModal'
import Axios from '@/libs/axios'
import { wishlistListingURL } from '@/services/APIs/wishlist'
import userStore from '@/stores/userStore'
import WishlistCarousel from '@/components/pages/user/wishlist/Carousel/carousel'
import { useRouter, useSearchParams } from 'next/navigation'
import Loader from '@/components/common/Loader'
import Link from 'next/link'

export default function Wishlist() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')
  const wishListId = searchParams.get('wishlist')
  const { user, setUserWishList, wishListData }: any = userStore()
  const [loading, setLoading] = useState(true) // Add loading state
  const [shareWishListDetails, setShareWishListDetails] = useState({})

  const handleShareWishListClick = (wishlistId: string) => {
    const data = {
      userId: user._id,
      wishlistId: wishlistId
    }
    setShareWishListDetails(data)
  }

  const fetchUserWishList = async (userId: string, wishListId?: string) => {
    setLoading(true) // Start loading

    // Build the payload dynamically based on whether wishlistId is provided
    const payload: any = {
      query: {
        userId: userId
      },
      options: {
        populate: 'propertyAttachments',
        lean: true
      }
    }

    // If wishlistId is provided, add it to the query
    if (wishListId) {
      payload.query._id = wishListId
    }

    try {
      const response: any = await Axios({ ...wishlistListingURL, data: payload })
      setUserWishList(response.data.data.data)
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    } finally {
      setLoading(false) // End loading
    }
  }

  useEffect(() => {
    if (userId && wishListId) {
      fetchUserWishList(userId, wishListId)
    } else {
      fetchUserWishList(user._id)
    }
  }, [])

  return (
    <div className='p-4 md:p-10 space-y-6'>
      <div className='flex flex-wrap justify-between gap-6'>
        {!(userId && wishListId) && (
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
        )}
        {/* Conditionally render Create Wishlist button */}
        {!(userId && wishListId) && (
          <CustomButton
            className='!p-0 ml-auto'
            title={
              <label className='px-6 py-2 cursor-pointer' htmlFor='create-wishlist-modal'>
                Create new Wishlist
              </label>
            }
          />
        )}
      </div>

      <div className='flex flex-col justify-center items-center gap-4'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className='text-3xl font-bold'>
              {userId && wishListId ? 'Shared Wishlist' : 'Add Hotels to Your Wishlist'}
            </h1>
            <p className='text-lg'>
              {userId && wishListId
                ? 'Here are the details of the selected wishlist.'
                : "Save your favorite stays for later! Add hotels to your wishlist to easily find and book them when you're ready."}
            </p>
            <div className='w-full m-4'>
              {wishListData.map((list: any) => (
                <div key={list._id}>
                  <div className='flex items-center justify-between'>
                    <p className='text-2xl font-bold'>{list?.name}</p>

                    {/* Conditionally render Share Wishlist button */}
                    {!(userId && wishListId) && (
                      <CustomButton
                        className='!p-0'
                        variant='secondary'
                        title={
                          <label
                            className='p-4 cursor-pointer'
                            onClick={() => handleShareWishListClick(list._id)}
                            htmlFor='share-wishlist-modal'
                          >
                            <FontAwesomeIcon fontSize={'large'} icon={faShareNodes} />
                          </label>
                        }
                      />
                    )}
                  </div>
                  <div className='py-4'>
                    <WishlistCarousel propertyDetails={list?.propertyAttachments || []} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Modal id='create-wishlist-modal' modalClass='!p-2' body={<CreateWishlistModal />} />
      <Modal
        id='share-wishlist-modal'
        modalClass=''
        body={<ShareWishlistModal shareDetails={shareWishListDetails} />}
      />
    </div>
  )
}
