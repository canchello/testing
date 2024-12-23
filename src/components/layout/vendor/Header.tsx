'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
// import CustomButton from '../common/CustomButton'
import userStore from '@/stores/userStore'
// import AppLogo from '../common/Logo'
import { languages, PROFILE_STATUS, ROUTES } from '@/libs/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faCheckCircle,
  faClose,
  faHeadset,
  faHeart,
  faHouseFlag,
  faMessage,
  faStar,
  faUser,
  faWallet
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

interface NavbarItemProps {
  label: string
  href: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, href }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <div
        className={`${
          isActive ? 'text-primary hover:text-primary border-b-4 border-[#C7763E]' : ''
        } transition-transform transform duration-200 ease-in-out cursor-pointer hover:scale-105 px-2 py-2`}
      >
        {label}
      </div>
    </Link>
  )
}

const Header: React.FC = () => {
  const { user }: any = userStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev)
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    closeDropdown()
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='bg-custom-dark-blue justify-items-center text-white py-4 px-2 sm:px-4 md:px-8'>
      <div className='container flex justify-between'>
        {user?.profileStatus === PROFILE_STATUS.COMPLETE && (
          <>
            <button onClick={toggleDropdown} className='text-gray-700 md:hidden'>
              {/* <Image src={barIcon} alt="barIcon" /> */}
            </button>
            {/* Desktop Menu */}
            <div className='space-x-6 font-semibold hidden lg:flex'>header will be diff for vendor</div>
          </>
        )}
        <div className='flex items-center'>
          <div>
            <AppLogo />
          </div>
        </div>

        {user ? (
          <div className='flex gap-4'>
            <CustomButton title='Logout' />
          </div>
        ) : (
          <div className='hidden md:flex md:w-[340px] justify-end gap-4'>
            <Link href='/login'>
              <CustomButton title='Login' />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header

const ProfileDropDown = ({}) => {
  const router = useRouter()
  const { logout, clearAuthState }: any = userStore()

  const onLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <ul tabIndex={0} className='dropdown-content menu bg-base-100 text-black rounded-box z-[1] mt-4 w-72 p-2 shadow'>
      {[
        { title: 'Manage Account', icon: faUser, route: ROUTES.PROFILE.PERSONAL_DETAILS },
        { title: 'My Bookings', icon: faHouseFlag, route: ROUTES.MY_BOOKINGS },
        { title: 'My Reviews', icon: faStar, route: ROUTES.MY_REVIEWS },
        { title: 'Wishlist', icon: faHeart, route: ROUTES.MY_WISHLIST },
        { title: 'Wallet', icon: faWallet, route: ROUTES.WALLET_REWARDS },
        { title: 'Customer Support', icon: faHeadset, route: ROUTES.CUSTOMER_SUPPORT }
      ].map((item, index) => {
        return (
          <Link href={item.route}>
            <li key={index + item.title} className='flex flex-row items-center rounded-lg'>
              <div className='w-full'>
                <FontAwesomeIcon icon={item.icon} className='hover:bg-transparent' />
                <span className='font-semibold hover:bg-transparent focus:bg-transparent p-0'>{item.title}</span>
              </div>
            </li>
          </Link>
        )
      })}
      <li className='mt-2'>
        <CustomButton title='Logout' variant='error' onClick={() => onLogout()} />
      </li>
    </ul>
  )
}

const NotificationDropDown = () => {
  const notifications = [
    {
      id: 1,
      title: 'Booking Confirmed',
      message: 'Your Booking for 12/Dec/2024 has been confirmed',
      time: 'now'
    },
    {
      id: 2,
      title: 'Booking Confirmed',
      message: 'Your Booking for 12/Dec/2024 has been confirmed',
      time: '12/07/24'
    }
  ]
  return (
    <ul tabIndex={0} className='dropdown-content menu bg-base-100 text-black rounded-box z-[1] mt-4 w-96 p-2 shadow'>
      {notifications.map((notification, index) => (
        <>
          <li>
            <div key={notification.id} className={`flex items-start p-4`}>
              <div className='flex-shrink-0'>
                <span className='w-8 h-8 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500'>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
              </div>
              <div className='ml-3'>
                <p className='font-semibold text-sm'>{notification.title}</p>
                <p className='text-gray-600 text-sm'>{notification.message}</p>
              </div>
              <div className='ml-auto flex flex-col items-end'>
                <button className='text-gray-400 hover:text-red-500 transition duration-200'>
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <span className='text-xs text-gray-400 mt-2'>{notification.time}</span>
              </div>
            </div>
          </li>
          {index < notifications.length - 1 && <div className='border-b my-2' />}
        </>
      ))}
    </ul>
  )
}
import no_messages from '@/assets/images/no_messages.jpg'
import { getImage } from '@/utils/helper'
import AppLogo from '@/components/common/Logo'
import CustomButton from '@/components/common/CustomButton'
const MessagesDropDown = () => {
  const messages = []
  return (
    <div
      tabIndex={0}
      className='flex dropdown-content menu bg-base-100 text-black rounded-box z-[1] mt-4 w-96 p-4 shadow'
    >
      <div className='flex flex-col justify-center items-center text-center'>
        <Image src={no_messages} alt='' />
        <p className='text-xl font-bold'>No Messages!</p>
        <p className='text-lg'>It seems like you don't have any messages at the moment.</p>
      </div>
    </div>
  )
}
