'use client'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ProfileImage from '@/assets/images/IdelImage.png'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEllipsisH, faMessage, faUser } from '@fortawesome/free-solid-svg-icons'
import userStore from '@/stores/userStore'

// Map routes to readable names
const routeToTitleMap: { [key: string]: string } = {
  '/vendor/dashboard': 'Dashboard',
  '/vendor/reservations': 'Reservations',
  '/vendor/rooms': 'Rooms',
  '/vendor/messages': 'Messages',
  '/vendor/calendar': 'Calendar',
  '/vendor/payments': 'Payments',
  '/vendor/reviews': 'Reviews'
}

const UserHeader = () => {
  const { user }: any = userStore()
  const pathname = usePathname() // Get the current path

  // Get the title from the map or set a default value
  const activeTitle = pathname.includes('reservations/') ? 'Guest Details' : routeToTitleMap[pathname] || 'Dashboard'

  return (
    <nav className='flex items-center justify-between bg-transparent w-full'>
      {/* Dynamic Page Title */}
      <div>
        <h1 className='text-2xl font-bold text-gray-800'>{activeTitle}</h1>
      </div>

      {/* Right Section - Icons and Profile */}
      <div className='flex items-center bg-white rounded-md px-4 py-2 space-x-4'>
        {/* Notifications Icon */}
        <div className='flex items-center gap-3' tabIndex={0}>
          <CustomButton
            className='btn-circle border-none !p-0 min-h-4 h-10 w-10'
            title={<FontAwesomeIcon icon={faBell} />}
          />
        </div>

        {/* Messages Icon */}
        <div className='flex items-center gap-3' tabIndex={0}>
          <CustomButton
            className='btn-circle border-none !p-0 min-h-4 h-10 w-10'
            title={<FontAwesomeIcon icon={faMessage} />}
          />
        </div>

        {/* Profile Section */}
        <div className='flex items-center space-x-2'>
          <CustomButton
            className='btn-circle border-none !p-0 min-h-4 h-10 w-10'
            title={<FontAwesomeIcon icon={faUser} />}
          />
          {/* User Name */}
          <span className='text-lg font-normal'>
            {user?.firstName || user?.lastName
              ? (user?.firstName || '') + ' ' + (user?.lastName || '')
              : (user.email || '').split('@')[0]}
          </span>
        </div>

        {/* Options Menu (Three Dots) */}
        <div className='dropdown dropdown-end'>
          <button
            aria-label='Options'
            className='flex items-center justify-center w-6 h-6 text-gray-600 hover:text-gray-800'
          >
            <FontAwesomeIcon icon={faEllipsisH} size='lg' />
          </button>
          <ul tabIndex={0} className='dropdown-content menu border bg-base-100 rounded-lg z-[1] w-52 mt-1 p-2 shadow'>
            {[{ title: 'item 1' }, { title: 'item 2' }].map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default UserHeader
