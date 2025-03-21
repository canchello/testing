'use client'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'
import HotelCard from './HotelCard'

const WishlistCarousel = ({ propertyDetails }: any) => {
  const [isMobile, setIsMobile] = useState(false)

  // Update isMobile based on window width
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Run on initial render
    updateIsMobile()

    // Add resize event listener
    window.addEventListener('resize', updateIsMobile)

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [])

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

  const renderContent = () => {
    const shouldShowCarousel = isMobile
      ? propertyDetails?.length > 1 // On mobile, show carousel if more than 1 item
      : propertyDetails?.length > 3 // On desktop, show carousel if more than 3 items

    if (shouldShowCarousel) {
      return (
        <Slider {...settings}>
          {propertyDetails?.map((hotel: any) => (
            <div key={hotel._id} className='px-4'>
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </Slider>
      )
    } else {
      return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-4'>
          {propertyDetails?.map((hotel: any) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )
    }
  }

  return (
    <div className='w-full'>
      {propertyDetails?.length > 0 ? (
        renderContent()
      ) : (
        <div className='text-center py-8'>
          <h2 className='text-xl font-semibold text-gray-700'>This wishlist is currently empty.</h2>
          <p className='text-gray-500 mt-2'>
            Explore our collection of properties and add your favorites to the wishlist.
          </p>
        </div>
      )}
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

export default WishlistCarousel
