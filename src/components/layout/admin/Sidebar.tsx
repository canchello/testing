'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useHover } from 'react-use'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import DashboardIcon from '@/assets/svg/dashboardIcon.svg'
import bookmarkIcon from '@/assets/svg/bookmark.svg'
import RoomsIcon from '@/assets/svg/roomsIcon.svg'
import walletIcon from '@/assets/svg/wallet.svg'
import notificationIcon from '@/assets/svg/notification.svg'
import marketingIcon from '@/assets/svg/marketing.svg'
import supportIcon from '@/assets/svg/support.svg'
import cmsIcon from '@/assets/svg/cms.svg'
import analyticsIcon from '@/assets/svg/analytics.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { ROUTES } from '@/libs/constants'

const routes = [
  { icon: DashboardIcon, label: 'User Management', href: ROUTES.ADMIN.USER_MANAGEMENT },
  { icon: RoomsIcon, label: 'Owner/Property', href: ROUTES.ADMIN.OWNERS },
  { icon: bookmarkIcon, label: 'Booking', href: ROUTES.ADMIN.BOOKINGS },
  { icon: walletIcon, label: 'Payment & Finance', href: ROUTES.ADMIN.PAYMENT_FINANCE },
  { icon: analyticsIcon, label: 'Platform Analytics', href: ROUTES.ADMIN.PLATFORM_ANALYTICS },
  { icon: cmsIcon, label: 'CMS', href: ROUTES.ADMIN.CMS },
  { icon: marketingIcon, label: 'Marketing', href: ROUTES.ADMIN.MARKETING },
  { icon: supportIcon, label: 'Support', href: ROUTES.ADMIN.SUPPORT },
  { icon: supportIcon, label: 'Taxi Bookings', href: ROUTES.ADMIN.TAXI_BOOKINGS },
  { icon: notificationIcon, label: 'Notification', href: ROUTES.ADMIN.NOTIFICAION }
]

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const router = usePathname() // Current path

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='flex'>
      <div
        className={`bg-custom-dark-blue text-white flex flex-col relative ${
          isExpanded ? 'w-64' : 'w-16'
        } transition-all duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className='flex items-center justify-center py-4'>
          <div className='w-8 h-8 bg-primary rounded-full'></div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className='absolute top-14 -right-3 bg-white text-primary rounded-full shadow-md flex items-center justify-center h-7 w-7'
          aria-label='Toggle Sidebar'
        >
          <FontAwesomeIcon icon={isExpanded ? faChevronLeft : faChevronRight} className='' />
        </button>

        {/* Navigation Links */}
        <nav className='mt-4 pb-10 space-y-4 overflow-auto'>
          {routes.map(({ icon, label, href }) => (
            <NavItem
              key={label}
              icon={icon}
              label={label}
              isExpanded={isExpanded}
              href={href}
              active={router === href}
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon?: any
  label?: string
  isExpanded?: boolean
  active?: boolean
  href: string
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isExpanded, active, href }) => {
  const element = (hovered: boolean) => (
    <Link
      href={href}
      className={`flex items-center px-3 m-2 py-2 rounded ${
        active ? 'bg-marchent-primary text-[#15253B]' : 'hover:bg-marchent-primary hover:text-[#15253B] text-gray-300'
      } transition-colors`}
    >
      <div className='w-6 h-6 min-w-6 flex justify-center items-center'>
        <Image
          src={icon}
          className={`w-full h-full ${active || hovered ? 'invert-1' : 'invert-0'}`}
          alt={`${label} icon`}
        />
      </div>
      {isExpanded && <span className='ml-4'>{label}</span>}
    </Link>
  )

  const [hoverable, _hovered] = useHover(element)

  return hoverable
}

export default Sidebar
