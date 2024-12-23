"use client";
import React, { useEffect, useState } from 'react'
import {
  faCarSide,
  faCheckCircle,
  faChevronDown,
  faHeart,
  faLocationDot,
  faMugSaucer,
  faPersonSwimming,
  faUtensils
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HotelPicGrid from './HotelPicGrid.tsx'
import CustomButton from '@/components/common/CustomButton'
import HotelReviews from './Reviews'
import CheckoutMoreStays from './CheckoutMoreStays'
import Modal from '@/components/UI/Modal'
import AddPropertyToWishListModal from '../wishlist/AddPropertyToWishlistModal'
import userStore from '@/stores/userStore'
import Axios from '@/libs/axios';
import { wishlistListingURL } from '@/services/APIs/wishlist.js';
import WishListConfirmationModal from '../wishlist/WishListConfirmationModal';

export default function HotelDetails({
  hotel,
  defaultRulesShow = 3
}) {
  const { user, setUserWishList, wishListData } = userStore();
  const [state, setState] = useState({
    viewAllRules: false
  })
  const [isInWishlist, setIsInWishlist] = useState(false);
  const hotelAttachmentsImages = hotel.attachment.map((url) => {
    return { image: url?.fileUrl }
  })

  // Check if the hotel exists in the wishlist
  const checkIfInWishlist = () => {
    const exists = wishListData?.find(
      (wishlistItem) =>
        wishlistItem.propertyId.includes(hotel._id) // Assuming propertyId is an array
    );
    setIsInWishlist(exists);
  };

  const fetchUserWishList = async () => {
    const payload = {
      query: {
        userId: user?._id
      },
      options: {
        populate: 'propertyAttachments',
        lean: true
      }
    }
    try {
      const response = await Axios({ ...wishlistListingURL, data: payload })
      setUserWishList(response.data.data.data)
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    } finally {
    }
  }

  useEffect(() => {
    if (user)
      fetchUserWishList()
  }, [])

  // Update wishlist check whenever `wishListData` changes
  useEffect(() => {
    checkIfInWishlist();
  }, [wishListData, hotel._id]);

  return (
    <div className='space-y-2'>
      <div className='flex flex-wrap justify-between gap-4'>
        <h1 className='text-3xl font-bold'>{hotel.title}</h1>
        <CustomButton
          title={
            <label htmlFor={isInWishlist ? 'remove-property-from-wishlist-modal' : 'add-property-to-wishlist-modal'}>
              <FontAwesomeIcon
                icon={faHeart}
                className={`text-gray-500 hover:text-red-500 ${isInWishlist ? 'text-red-500' : ''
                  }`}
                fontSize={24}
              />
            </label>
          }
          variant='default'
          className='border-none outline-none ml-auto'
        />
      </div>
      <div className='flex gap-2 items-center'>
        <FontAwesomeIcon icon={faLocationDot} />
        <p>{hotel.address}</p>
      </div>
      <div className='space-y-4 pt-4'>
        <div>
          <HotelPicGrid images={hotelAttachmentsImages || []} />
        </div>
        <div>
          <h1 className='text-2xl'>{hotel.title} is waiting for you!</h1>
          <p>{hotel.description}</p>
        </div>
        <div className='space-y-2'>
          <h1 className='text-2xl'>Most Popular Facilities</h1>
          <div className='flex flex-wrap gap-4'>
            {(hotel.facility || [])
              .map((item, index) => (
                <div key={index} className='flex items-center gap-3 bg-gray-300 py-2 px-4 rounded-full'>
                  {showFacilityIcon(item)}
                  <p>{item.title}</p>
                </div>
              ))}
          </div>
        </div>
        <div className='space-y-2'>
          <h1 className='text-2xl'>Property Rules</h1>
          <p>New your cental pak sleep station special request</p>
          <div className=''>
            {(hotel.rules || [])
              .slice(0, defaultRulesShow)
              .map((item, index) => (
                <div key={index} className='grid grid-cols-1 sm:grid-cols-4 p-4 border'>
                  <p className='font-semibold'>{item.name}</p>
                  <p className='col-span-3 text-gray-500'>{item.value}</p>
                </div>
              ))}
          </div>
          {!state.viewAllRules && hotel.rules > defaultRulesShow &&
            <div className='justify-items-center'>
              <CustomButton
                title='View All'
                variant='secondary'
                icon={<FontAwesomeIcon icon={faChevronDown} />}
                ImageIcon={false}
                onClick={() => setState(prev => ({ ...prev, viewAllRules: true }))}
              />
            </div>}
        </div>
        <HotelReviews hotel={hotel} />
        <div className='max-w-full py-4'>
          <CheckoutMoreStays />
        </div>
      </div>
      <Modal id='add-property-to-wishlist-modal' modalClass='!p-2' body={<AddPropertyToWishListModal />} />
      <Modal id='remove-property-from-wishlist-modal' modalClass='!p-2' body={<WishListConfirmationModal wishlist={isInWishlist} />} />
    </div>
  )
}

const showFacilityIcon = (item) => {
  const title = item.title.toLowerCase()
  let icon = faCheckCircle
  if (title.includes("breakfast")) icon = faMugSaucer
  else if (title.includes("swimming")) icon = faPersonSwimming
  else if (title.includes("car") || title.includes("park")) icon = faCarSide
  else if (title.includes("restaurant")) icon = faUtensils
  return <FontAwesomeIcon icon={icon} />
}
