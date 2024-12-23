'use client'
import React from 'react'
import Slider from 'react-slick'
import CarCard from './CarCard'
import top1 from '@/assets/images/top1.jpg'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ],
    arrow: true,
    nextArrow: <></>,
    prevArrow: <></>
  }

  const slides = [
    {
      title: 'Mercedes',
      image: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369796/hfvz03ujeezwcth7nboo.jpg',
      type: 'SUV',
      rating: 4
    },
    {
      title: 'Mercedes',
      image: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369796/hfvz03ujeezwcth7nboo.jpg',
      type: 'SUV',
      rating: 4
    },
    {
      title: 'Mercedes',
      image: 'https://res.cloudinary.com/dndsypilw/image/upload/v1730369796/hfvz03ujeezwcth7nboo.jpg',
      type: 'SUV',
      rating: 4
    }
  ]

  return (
    <div className='w-full'>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className='!flex justify-center p-4'>
            <CarCard item={slide} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

const CustomArrow = ({ className, style, onClick, direction }: any) => (
  <div
    className={`absolute -top-16 ${direction === 'left' ? 'right-20' : 'right-4'} z-10 cursor-pointer`}
    style={{ ...style }}
    onClick={onClick}
  >
    <button className='bg-custom-dark-blue text-white p-2 rounded-full shadow-md focus:outline-none'>
      {direction === 'left' ? <RiArrowLeftSLine fontSize={28} /> : <RiArrowRightSLine fontSize={28} />}
    </button>
  </div>
)

export default Carousel
