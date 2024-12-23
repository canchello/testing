'use client'
import React from 'react'
import Slider from 'react-slick'
import DestinationCard from './DestinationCard'
import top1 from '@/assets/images/top1.jpg'
import top2 from '@/assets/images/top2.jpg'
import top3 from '@/assets/images/top3.jpg'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'

const Carousel = () => {
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
    appendDots: (dots: React.ReactNode) => (
      <div className='flex justify-center'>
        <ul className='flex justify-center gap-2 slick-dots-ul'>{dots}</ul>
      </div>
    ),
    customPaging: (i: number) => <div className={`w-2 h-2 rounded-full bg-gray-400`}></div>
  }

  const slides = [
    {
      title: 'Leptis Magna',
      image: top1,
      tag: 'Ancient Roman & Greek Cities'
    },
    {
      title: 'Sabratha',
      image: top2,
      description:
        'Sabratha, an ancient Roman city located on the Mediterranean coast of Libya, offers a unique glimpse into the grandeur of the Roman Empire.'
    },
    {
      title: 'Cyrene',
      image: top3,
      tag: 'Ancient Roman & Greek Cities'
    }
  ]

  return (
    <div className='w-full'>
      <Slider {...settings} className='w-full'>
        {slides.map((slide, index) => (
          <div key={index} className='justify-items-center px-4'>
            <DestinationCard item={slide} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

const CustomArrow = ({ className, style, onClick, direction }: any) => (
  <div
    className={`absolute -bottom-20 md:-top-16 ${direction === 'left' ? 'right-20' : 'right-4'} z-10 cursor-pointer`}
    style={{ ...style }}
    onClick={onClick}
  >
    <button className='bg-custom-dark-blue text-white p-2 rounded-full shadow-md focus:outline-none'>
      {direction === 'left' ? <RiArrowLeftSLine fontSize={28} /> : <RiArrowRightSLine fontSize={28} />}
    </button>
  </div>
)

export default Carousel
