'use client'
import React from 'react'
import Slider from 'react-slick'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'
import HotelCard from '@/components/pages/home/TopHotelsandLocation/HotelCard'

const Carousel = ({ items = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    arrow: true,
    nextArrow: <CustomArrow direction='right' />,
    prevArrow: <CustomArrow direction='left' />,
    appendDots: (dots) => (
      <div className='flex justify-center'>
        <ul className='flex justify-center gap-2 slick-dots-ul'>{dots}</ul>
      </div>
    ),
    customPaging: () => <div className={`w-2 h-2 rounded-full bg-gray-400`}></div>
  }

  return (
    <div className='w-full mt-16 sm:mt-6'>
      <Slider {...settings} className='w-full'>
        {items.map((hotel, index) => (
          <div key={index} className='justify-items-center px-4'>
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

const CustomArrow = ({ className, style, onClick, direction }) => (
  <div
    className={`absolute -top-16 ${direction === 'left' ? 'right-16' : 'right-4'} cursor-pointer`}
    style={{ ...style }}
    onClick={onClick}
  >
    <button className='bg-custom-dark-blue text-white p-2 rounded-full shadow-md focus:outline-none'>
      {direction === 'left' ? <RiArrowLeftSLine fontSize={28} /> : <RiArrowRightSLine fontSize={28} />}
    </button>
  </div>
)
export default Carousel
