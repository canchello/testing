'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useHover } from 'react-use'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import DashboardIcon from '@/assets/svg/dashboardIcon.svg'
import bookmarkIcon from '@/assets/svg/bookmark.svg'
import RoomsIcon from '@/assets/svg/roomsIcon.svg'
import MessagesIcon from '@/assets/svg/messagesIcon.svg'
import CalendarIcon from '@/assets/svg/calenderIcon.svg'
import PaymentsIcon from '@/assets/svg/paymentsIcon.svg'
import ReviewsIcon from '@/assets/svg/reviewIcon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const routes = [
  { icon: DashboardIcon, label: 'Dashboard', href: '/vendor/dashboard' },
  { icon: bookmarkIcon, label: 'Reservations', href: '/vendor/reservations' },
  { icon: RoomsIcon, label: 'Rooms', href: '/vendor/rooms' },
  { icon: MessagesIcon, label: 'Messages', href: '/vendor/messages' },
  { icon: CalendarIcon, label: 'Calendar', href: '/vendor/calendar' },
  { icon: PaymentsIcon, label: 'Payments', href: '/vendor/payments' },
  { icon: ReviewsIcon, label: 'Reviews', href: '/vendor/reviews' }
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
          isExpanded ? 'w-48' : 'w-16'
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
        <nav className='mt-4 space-y-4 overflow-auto'>
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
      <div className='w-6 h-6'>
        <Image src={icon} className={`${active || hovered ? 'invert-1' : 'invert-0'}`} alt={`${label} icon`} />
      </div>
      {isExpanded && <span className='ml-4'>{label}</span>}
    </Link>
  )

  const [hoverable, _hovered] = useHover(element)

  return hoverable
}

export default Sidebar
