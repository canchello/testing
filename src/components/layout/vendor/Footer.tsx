import React from 'react'
import Image from 'next/image'
import instaLogo from '@/assets/images/insta.png'
import facebookLogo from '@/assets/images/facebook.png'
import youtubeLogo from '@/assets/images/youtube.png'
import mailIcon from '@/assets/svg/mailIcon.svg'
import phoneIcon from '@/assets/svg/phoneIcon.svg'
import Link from 'next/link'
import { ROUTES } from '@/libs/constants'
import AppLogo from '@/components/common/Logo'

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
      { label: 'Top Locations', href: ROUTES.STAYS + '#top-locations' },
      { label: 'Help', href: ROUTES.FAQ },
      { label: 'Blogs', href: ROUTES.BLOGS }
    ]
  }
]

const Footer = () => {
  return (
    <footer className='justify-items-center bg-custom-dark-blue text-white p-4'>
      <div className='container'>
        <div className='flex flex-col md:flex-row gap-3 md:gap-0 justify-between text-center text-md text-white'>
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
