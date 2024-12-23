'use client'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'
import HotelCard from '@/components/pages/home/TopHotelsandLocation/HotelCard'
import Axios from '@/libs/axios'
import { getHotelListURL } from '@/services/APIs/hotel'
// import HotelCard from '@/components/pages/home/TopHotelsandLocation/HotelCard'

const SpecialUniqueStaysCarousel = () => {
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
    customPaging: (i) => <div className={`w-2 h-2 rounded-full bg-gray-400`}></div>
  }

  const [state, setState] = useState({
    loading: false,
    hotels: []
  })

  const fetchHotels = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }))
      const payload = {
        query: {
          // location: [String(locationCords.latitude), String(locationCords.longitude)]
        },
        options: {
          page: 1,
          limit: 3,
          populate: 'primaryAttachment',
          lean: true
        }
      }
      const { data } = await Axios({ ...getHotelListURL, data: payload })
      setState(prev => ({
        ...prev,
        hotels: data?.data?.data || []
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  return (
    <div className='w-full md:w-[calc(100vw_-370px)]'>
      <Slider {...settings} className='w-full'>
        {(state.hotels || []).map((slide, index) => (
          <div key={index} className='justify-items-center px-4'>
            <HotelCard hotel={slide} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

const CustomArrow = ({ className, style, onClick, direction }) => (
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

export default SpecialUniqueStaysCarousel
