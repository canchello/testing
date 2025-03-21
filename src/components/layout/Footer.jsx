'use client'
import React from 'react'
import Image from 'next/image'
import instaLogo from '@/assets/images/insta.png'
import facebookLogo from '@/assets/images/facebook.png'
import youtubeLogo from '@/assets/images/youtube.png'
import mailIcon from '@/assets/svg/mailIcon.svg'
import phoneIcon from '@/assets/svg/phoneIcon.svg'
import Link from 'next/link'
import AppLogo from '../common/Logo'
import { ROUTES } from '@/libs/constants'
import userStore from '@/stores/userStore'
import { cn } from '@/libs/tailwind'

const sections = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: ROUTES.ABOUT },
      { label: 'Contact Us', href: ROUTES.CONTACT_US },
      { label: 'Careers', href: ROUTES.CAREER }
    ]
  },
  {
    title: 'Services',
    links: [
      { label: 'Stays', href: ROUTES.STAYS },
      { label: 'Taxi Service', href: ROUTES.TAXI_SERVICE },
      { label: 'Become a Partner', href: ROUTES.CAREER }
    ]
  },
  {
    title: 'Useful Links',
    links: [
      // { label: 'Top Locations', href: ROUTES.STAYS + '#top-locations' },
      { label: 'Top Locations', href: ROUTES.TOP_HOTELS },
      { label: 'Help', href: ROUTES.FAQ },
      { label: 'Blogs', href: ROUTES.BLOGS }
    ]
  }
]

const Footer = () => {
  const { user } = userStore()

  return (
    <footer className={cn(
      'justify-items-center bg-custom-dark-blue text-white p-6',
      user ? "" : "md:p-10"
    )}>
      <div className='container'>
        {!user && <>
          <div className='mx-auto flex flex-col lg:flex-row justify-between gap-11'>
            <div className='flex-1'>
              <div className='space-y-4'>
                {/* <p className='text-xl font-semibold'>Logo</p> */}
                <AppLogo />
                <p className='text-md'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row flex-1 gap-6'>
              {sections.map((section, index) => (
                <div key={index} className='flex flex-col flex-1'>
                  <div className='pb-4 text-2xl border-b border-[#B9B9B9] font-bold'>{section.title}</div>
                  {section.links.map((link, linkIndex) => (
                    <Link key={linkIndex} href={link.href}>
                      <div className='hover:text-primary cursor-pointer py-2 mt-1'>{link.label}</div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-between flex-col items-center md:flex-row gap-6 md:gap-0 border-b border-[#B9B9B9] py-4'>
            <div className='flex gap-2'>
              <div>
                <Image className='cursor-pointer' src={instaLogo} alt='insta icon' />
              </div>
              <div>
                <Image className='cursor-pointer' src={facebookLogo} alt='facebook icon' />
              </div>
              <div>
                <Image className='cursor-pointer' src={youtubeLogo} alt='youtube icon' />
              </div>
            </div>
            <div className='flex items-center flex-col md:flex-row space-y-3 md:space-y-0 gap-4'>
              <div className='flex gap-4 text-primary text-base'>
                <Image src={mailIcon} alt='mailicon' />
                <div>info@libyabooking.com</div>
              </div>
              <div className='hidden md:block text-[#B9B9B9]'>|</div>
              <div className='flex gap-4 text-primary text-base'>
                <Image src={phoneIcon} alt='mailicon' />
                <div>+91-9003199000</div>
              </div>
            </div>
          </div>
        </>}
        <div className={cn('flex flex-col md:flex-row gap-3 md:gap-0 justify-between text-center text-md text-white', !user && "mt-4")}>
          <p>&copy; 2024 LibyaBooking. All Rights Reserved</p>
          <Link href={'/policy'}>
            <p>Privacy Policy | Terms of Service</p>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
