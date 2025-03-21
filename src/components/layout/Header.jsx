'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import CustomButton from '../common/CustomButton'
import userStore from '@/stores/userStore'
import AppLogo from '../common/Logo'
import { languages, ROUTES } from '@/libs/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
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
import GoogleTranslate from '@/assets/images/GoogleTranslate.png'
import USAImg from '@/assets/images/USA.png'
import ArabicImg from '@/assets/images/Arab-Flag.png'
// import barImg from '@/assets/svg/arrowDown.svg'
import Image from 'next/image'
import LanguageSelector from '../common/LanguageSelector'
import { getImage } from '@/utils/helper'
import { cn } from '@/libs/tailwind'
import Axios from '@/libs/axios'
import { notificationDeleteURL, notificationListURL } from '@/services/APIs/user'
import dayjs from 'dayjs'

const NavbarItem = ({ label, href, isMenu }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <div
        className={cn(
          isActive && 'text-primary hover:text-primary',
          isActive && !isMenu && 'border-b-4 border-[#C7763E]',
          'transition-transform transform duration-200 ease-in-out cursor-pointer hover:scale-105 px-2 py-2'
        )}
      >
        {label}
      </div>
    </Link>
  )
}

const nav_items = [
  { title: "Stays", route: ROUTES.STAYS, access: "/stays" },
  { title: "Taxi Service", route: ROUTES.TAXI_SERVICE, access: "/stays" },
  { title: "About", route: ROUTES.ABOUT, access: "/stays" },
  { title: "Contact Us", route: ROUTES.CONTACT_US, access: "/stays" },
  { title: "Personal Details", route: ROUTES.PROFILE.PERSONAL_DETAILS, access: "/profile" },
  { title: "Preferences", route: ROUTES.PROFILE.PREFERENCES, access: "/profile" },
  { title: "Security", route: ROUTES.PROFILE.SECURITY, access: "/profile" },
  { title: "Payment Details", route: ROUTES.PROFILE.PAYMENT_DETAILS, access: "/profile" },
  { title: "Stays", route: ROUTES.HOTEL.STAYS, access: "/hotels" },
  { title: "Taxi Service", route: ROUTES.HOTEL.CAR_RENTAL, access: "/hotels" },
]

const Header = () => {
  const { user } = userStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const pathname = usePathname()
  const dropdownRef = useRef()

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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isAuthUserRoute = useMemo(() => pathname.startsWith("/profile") || pathname.startsWith("/hotels"), [pathname])
  return (
    <div className='bg-custom-dark-blue justify-items-center text-white py-4 px-2 sm:px-4 md:px-8'>
      <div className='container flex justify-between'>
        {(!user || isAuthUserRoute)
          && (<>
            <div className={cn('lg:hidden flex items-center', isAuthUserRoute && "md:hidden")}>
              <button onClick={toggleDropdown} className='text-gray-700 lg:hidden mx-2'>
                <FontAwesomeIcon icon={faBars} className='text-primary' />
              </button>
              {/* Mobile Menu */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className='absolute left-6 top-10 px-2 py-2 mt-6 bg-white border rounded shadow-lg z-50 text-black'
                >
                  {nav_items
                    .filter(i => pathname.startsWith(i.access))
                    .map((item, index) => (
                      <NavbarItem key={index} label={item.title} href={item.route} isMenu />
                    ))}
                </div>
              )}

            </div>
            {/* Desktop Menu */}
            <div className={cn('gap-4 font-semibold hidden lg:flex', isAuthUserRoute && "lg:hidden")}>
              {nav_items
                .filter(i => i.access.startsWith("/stays"))
                .map((item, index) => <NavbarItem key={index} label={item.title} href={item.route} />)}
            </div>
          </>
          )}

        <div className='flex items-start'>
          <Link href={"/"}>
            <AppLogo logoClass='hidden xs:block' />
          </Link>
        </div>

        {user ? (
          <div className='flex gap-3'>
            <NotificationDropDown />
            <div className='dropdown dropdown-end hidden lg:block'>
              <div className='flex items-center gap-3' tabIndex={0}>
                <Link href={ROUTES.MESSAGES}>
                  <CustomButton
                    className='btn-circle border-none !p-0'
                    title={<FontAwesomeIcon fontSize={'large'} icon={faMessage} />}
                  />
                </Link>
              </div>
              {/* <MessagesDropDown /> */}
            </div>
            <div className='dropdown dropdown-end'>
              <div className='flex items-center gap-3' tabIndex={0}>
                <CustomButton
                  className='btn-circle border-none !p-0 overflow-hidden'
                  title={
                    user.profilePicture ? (
                      <img src={user.authProviders.length === 1 && user.authProviders.includes("google") ?
                        user.profilePicture : getImage(user.profilePicture, "profile")}
                        className='bg-gray-100 rounded-full' alt='' />
                    ) : (
                      <FontAwesomeIcon fontSize={'large'} icon={faUser} />
                    )
                  }
                />
                <p className='hidden lg:block truncate line-clamp-1 max-w-40'>
                  {user?.firstName || user?.lastName
                    ? (user?.firstName || '') + ' ' + (user?.lastName || '')
                    : (user.email || '').split('@')[0]}
                </p>
              </div>
              <ProfileDropDown key={Math.random()} />
            </div>
            <div className='dropdown dropdown-end hidden lg:block'>
              <div className='flex items-center' tabIndex={0}>
                <CustomButton
                  className='btn-circle border-none overflow-hidden !p-0'
                  title={
                    <Image
                      src={user?.language === languages.ARABIC ? ArabicImg : USAImg}
                      alt='User'
                      className='w-full h-full object-cover'
                    />
                  }
                  wrap={false}
                />
              </div>
              <LanguageSelector />
            </div>
          </div>
        ) : (
          <div className='md:flex lg:w-[320px] justify-end gap-4'>
            <div className='hidden lg:block dropdown dropdown-end'>
              <div className='flex items-center' tabIndex={0}>
                <CustomButton className='btn-circle border-none !p-0' title={<Image src={GoogleTranslate} alt='' />} />
              </div>
              <LanguageSelector />
            </div>
            <Link href='/login'>
              <CustomButton
                className='items-center'
                variant='light'
                title='Login'
              // icon={arrowRight}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header

const ProfileDropDown = ({ }) => {
  const router = useRouter()
  const { logout, clearAuthState } = userStore()

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
          <Link key={index} href={item.route}>
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

export const NotificationDropDown = ({ btnClass }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotification = async () => {
    const { data } = await Axios({ ...notificationListURL });
    setNotifications(data?.data?.data || []);
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const onDeleteNotification = async (id) => {
    setNotifications((prev) => prev.filter((notification) => notification._id !== id));
    await Axios({ ...notificationDeleteURL(id) });
  };

  return (
    <div className='dropdown dropdown-end hidden lg:block'>
      <div className='flex items-center gap-3' tabIndex={0}>
        <div class="indicator">
          {!!notifications.length && <span class="indicator-item badge badge-warning top-1 right-2"></span>}
          <CustomButton
            className={cn('btn-circle border-none !p-0', btnClass)}
            title={<FontAwesomeIcon fontSize={'large'} icon={faBell} />}
          />
          {/* <div class="bg-base-300 grid h-32 w-32 place-items-center">content</div> */}
        </div>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100 text-black rounded-box z-[10] mt-4 w-96 shadow"
      >
        {/* Scrollable Wrapper */}
        <ul className="max-h-96 overflow-y-auto overflow-x-hidden p-2 custom-scrollbar">
          {!!notifications.length ? (
            notifications.map((notification, index) => (
              <React.Fragment key={index}>
                <li>
                  <div key={notification._id} className="flex items-start p-4">
                    <div className="flex-shrink-0">
                      <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-semibold text-sm">{notification.title}</p>
                      <p className="text-gray-600 text-sm">{notification.text}</p>
                      <span className="text-xs text-gray-400 mt-2 flex justify-end">
                        {dayjs(notification.createdAt).format('DD-MM-YY hh:mm A')}
                      </span>
                    </div>
                    <div className="ml-auto flex flex-col items-end">
                      <FontAwesomeIcon
                        className="text-gray-400 hover:text-red-500 transition duration-200 cursor-pointer"
                        icon={faClose}
                        onClick={(e) => {
                          e.preventDefault();
                          onDeleteNotification(notification._id);
                        }}
                      />
                    </div>
                  </div>
                </li>
                {index < notifications.length - 1 && <div className="border-b my-2" />}
              </React.Fragment>
            ))
          ) : (
            <div className="flex items-center justify-center p-4">No Notifications!</div>
          )}
        </ul>
      </div>
    </div>
  );
};
