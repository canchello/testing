'use client'
import React from 'react'
import { redirect, usePathname, useRouter } from 'next/navigation'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEllipsisH, faMessage, faUser } from '@fortawesome/free-solid-svg-icons'
import userStore from '@/stores/userStore'
import { ROUTES } from '@/libs/constants'
import { NotificationDropDown } from '../Header'

// Map routes to readable names
const routeToTitleMap: { [key: string]: string } = {
  [ROUTES.ADMIN.USER_MANAGEMENT]: 'Dashboard',
  [ROUTES.ADMIN.OWNERS]: 'Owner/Property',
  [ROUTES.ADMIN.BOOKINGS]: 'Reservations',
  [ROUTES.ADMIN.CMS]: 'CMS',
  [ROUTES.ADMIN.MARKETING]: 'Marketing',
  [ROUTES.ADMIN.NOTIFICAION]: 'Notification',
  [ROUTES.ADMIN.PAYMENT_FINANCE]: 'Finance',
  [ROUTES.ADMIN.PLATFORM_ANALYTICS]: 'Analytics',
  [ROUTES.ADMIN.TAXI_BOOKINGS]: 'Taxi Bookings',
  [ROUTES.ADMIN.SUPPORT]: 'Support'
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
        {/* <div className='flex items-center gap-3' tabIndex={0}>
          <CustomButton
            className='btn-circle border-none !p-0 min-h-4 h-10 w-10'
            title={<FontAwesomeIcon icon={faBell} />}
          />
        </div> */}

        <NotificationDropDown btnClass='btn-circle border-none !p-0 min-h-4 h-10 w-10' />

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
          <ProfileDropDown />
        </div>
      </div>
    </nav>
  )
}

export default UserHeader

const ProfileDropDown = ({}) => {
  const router = useRouter()
  const { logout, clearAuthState }: any = userStore()

  const onLogout = () => {
    logout()
    router.push(ROUTES.ADMIN.LOGIN)
  }

  return (
    <ul tabIndex={0} className='dropdown-content menu bg-base-100 text-black rounded-box z-50 mt-4 w-72 p-2 shadow'>
      {/* {[
        // { title: 'Manage Property', icon: faUser, route: ROUTES.VENDOR.ONBOARD }
        // { title: 'My Bookings', icon: faHouseFlag, route: ROUTES.MY_BOOKINGS },
        // { title: 'My Reviews', icon: faStar, route: ROUTES.MY_REVIEWS },
        // { title: 'Wishlist', icon: faHeart, route: ROUTES.MY_WISHLIST },
        // { title: 'Wallet', icon: faWallet, route: ROUTES.WALLET_REWARDS },
        // { title: 'Customer Support', icon: faHeadset, route: ROUTES.CUSTOMER_SUPPORT }
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
      })} */}
      <li className='mt-2'>
        <CustomButton title='Logout' variant='error' onClick={() => onLogout()} />
      </li>
    </ul>
  )
}
