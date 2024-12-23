import React from 'react'
import Image from 'next/image'
import Member1 from '@/assets/images/member1.png'
import Member2 from '@/assets/images/member2.png'
import Member3 from '@/assets/images/member3.png'
import Member4 from '@/assets/images/member4.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'

export default function OurTeam() {
  return (
    <div className='bg-custom-dark-blue justify-items-center'>
      <div className='container flex flex-col gap-6 px-4 py-10 md:py-20 md:px-10 text-center text-white'>
        <h2 className='text-3xl font-bold'>Meet the People Behind the Platform</h2>
        <p className='text-lg'>
          We are a team of travel enthusiasts, tech innovators, and customer service professionals who share a love for
          Libya and its rich cultural heritage. Our diverse backgrounds and experiences come together to create a
          seamless travel booking experience, both for our users and our partners.
        </p>

        <div className='flex justify-center space-x-4 mt-6'>
          <button className='bg-custom-offwhite text-black p-2 rounded-full shadow-md focus:outline-none'>
            <RiArrowLeftSLine fontSize={28} />
          </button>
          <button className='bg-custom-offwhite text-black p-2 rounded-full shadow-md focus:outline-none'>
            <RiArrowRightSLine fontSize={28} />
          </button>
        </div>

        <div className='carousel w-full flex justify-center gap-6 text-white'>
          <div className='carousel-item'>
            <div className='flex flex-col justify-end w-56 p-4 rounded-lg shadow-lg text-center'>
              <div className='overflow-hidden mx-auto mb-4'>
                <Image src={Member1} alt='John Smith' />
              </div>
              <h3 className='text-2xl font-bold mb-2'>John Smith</h3>
              <p className='text-lg'>Sr. Developer</p>
            </div>
          </div>

          <div className='carousel-item hidden xs:block'>
            <div className='flex flex-col justify-end w-56 p-4 rounded-lg shadow-lg text-center'>
              <div className='overflow-hidden mx-auto mb-4'>
                <Image src={Member2} alt='John Smith' />
              </div>
              <h3 className='text-2xl font-bold mb-2'>John Smith</h3>
              <p className='text-lg'>Sr. Developer</p>
            </div>
          </div>

          <div className='carousel-item hidden lg:block'>
            <div className='flex flex-col justify-end w-56 p-4 rounded-lg shadow-lg text-center'>
              <div className='overflow-hidden mx-auto mb-4'>
                <Image src={Member3} alt='John Smith' />
              </div>
              <h3 className='text-2xl font-bold mb-2'>John Smith</h3>
              <p className='text-lg'>Sr. Developer</p>
            </div>
          </div>

          <div className='carousel-item hidden lg:block'>
            <div className='flex flex-col justify-end w-56 p-4 rounded-lg shadow-lg text-center'>
              <div className='overflow-hidden mx-auto mb-4'>
                <Image src={Member4} alt='John Smith' />
              </div>
              <h3 className='text-2xl font-bold mb-2'>John Smith</h3>
              <p className='text-lg'>Sr. Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
