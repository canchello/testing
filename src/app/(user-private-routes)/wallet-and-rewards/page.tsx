'use client'
import React, { useState } from 'react'
import CustomButton from '@/components/common/CustomButton'
import { faChevronLeft, faShare, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Modal from '@/components/UI/Modal'
import CreateWishlistModal from '@/components/pages/user/wishlist/CreateWishlistModal'
import ShareWishlistModal from '@/components/pages/user/wishlist/ShareWishlistModal'

import WalletImg from '@/assets/images/wallet.png'
import Coins from '@/assets/images/coins.png'
import Gift from '@/assets/images/gift.png'
import WalletBrown from '@/assets/images/wallet2.png'
import MyCoupons from '@/components/pages/user/rewards-wallet/MyCoupon'
import ReferAFriend from '@/components/pages/user/rewards-wallet/ReferAFriend'
import Link from 'next/link'

export default function WallerRewards() {
  const [myBookings, setMyBookings] = useState([])

  return (
    <div className='container mx-auto p-4 md:p-10 space-y-4'>
      <div className='flex justify-between gap-6'>
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
      </div>
      <div className='flex flex-col justify-center items-center md:m-6 gap-4'>
        <h1 className='text-3xl font-bold'>Rewards & Wallet</h1>
        <p className='text-lg'>Save money on your next adventure with Booking.com</p>
        <div className='bg-custom-orange rounded-xl p-8 w-full flex flex-col items-center'>
          <h1 className='text-2xl font-bold'>Total Wallet Balance</h1>
          <span className='text-gray-400'>Includes all spendable rewards</span>
          <div className='flex items-center my-4 gap-4'>
            <Image src={WalletImg} alt='' className='h-16 w-16' />
            <h1 className='text-4xl font-bold'>$120/-</h1>
          </div>
          <span className='space-x-2 text-lg'>
            <span>Got a coupon code?</span>
            <span className='text-primary'>Add coupon into wallet</span>
          </span>
        </div>
        <CustomButton className='!p-0' variant='default' title='Refer to a friend' />
        <ReferAFriend />
      </div>
      <MyCoupons />
      <div>
        <p className='text-center'>
          Every time you make a booking or engage with our services, you earn points that can be redeemed for discounts,
          special offers, or future bookings.
        </p>
        <div className='flex flex-col md:flex-row mx-4 mt-8'>
          {rewards.map((item, index) => {
            return (
              <div key={index} className='w-full md:w-1/3 mx-4'>
                <div className='flex items-center gap-4'>
                  <Image src={item.icon} alt='' className='h-10 w-10' />
                  <h3 className='text-lg font-bold'>{item.title}</h3>
                </div>
                <ul className='ml-14 mt-4'>
                  {item.points.map((point, j) => (
                    <li key={j} className='text-gray-500 mb-4 list-disc'>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const rewards = [
  {
    icon: Coins,
    title: 'How to Earn Points?',
    points: [
      'Booking Rewards: Earn points for every booking you make through our platform.',
      'Referral Program: Share your unique referral code with friends and earn points when they make their first booking.',
      'Special Promotions: Keep an eye out for bonus points during promotional events and seasonal campaigns.'
    ]
  },
  {
    icon: Gift,
    title: 'Redeeming Points',
    points: [
      'Discounts on Future Bookings: Use your accumulated points to get discounts on your next hotel or car rental.',
      'Exclusive Offers: Redeem points for exclusive deals and packages available only to our loyal customers.'
    ]
  },
  {
    icon: WalletBrown,
    title: 'Wallet Points',
    points: [
      'Your wallet points are stored in your account and can be accessed anytime. You can check your current balance in the wallet section of your account.',
      'Wallet points can also be used to cover booking fees or service charges.'
    ]
  }
]
