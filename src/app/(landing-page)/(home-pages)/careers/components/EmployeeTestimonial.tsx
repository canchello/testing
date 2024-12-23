'use client'
// components/Testimonial.tsx
import { useState } from 'react'
import employeeTestimonial from '@/assets/images/employeeTestimonial.png'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image, { StaticImageData } from 'next/image'
import QuoteImg from '@/assets/svg/quote-spuare.svg'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'

interface Testimonial {
  name: string
  role: string
  imageUrl: StaticImageData
  text: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Rajni Sharma',
    role: 'Frontend Developer',
    imageUrl: employeeTestimonial, // Ensure you have a proper image here
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    name: 'John Doe',
    role: 'Backend Developer',
    imageUrl: employeeTestimonial,
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
]

const TestimonialComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length)
  }

  const goToPrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const { name, role, imageUrl, text } = testimonials[currentIndex]

  return (
    <div className='bg-custom-dark-blue justify-items-center'>
      <div className='container pt-10 w-full'>
        <div className='text-3xl font-semibold text-white  text-center'>What our Employees say about us?</div>
        <div className='flex flex-col md:flex-row items-center justify-between text-white p-8 md:p-16 rounded-lg  max-w-6xl mx-auto'>
          {/* Left Side - Testimonial */}
          <div className='md:w-1/2 space-y-4'>
            <div className='text-4xl text-gray-400'>
              <Image src={QuoteImg} alt='' className='w-20' />
            </div>
            <p className='text-lg leading-relaxed'>{text}</p>
            <div className='mt-4'>
              <h3 className='text-xl font-semibold'>{name}</h3>
              <p className='text-sm text-gray-300'>{role}</p>
              <div className='space-x-6 mt-4'>
                <button className='bg-primary text-white p-2 rounded-full focus:outline-none' onClick={goToPrev}>
                  <RiArrowLeftSLine fontSize={28} />
                </button>
                <button className='bg-primary text-white p-2 rounded-full focus:outline-none' onClick={goToNext}>
                  <RiArrowRightSLine fontSize={28} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className='mt-6 md:mt-0 md:w-1/3'>
            <Image src={imageUrl} alt={name} className='w-full rounded-lg object-cover shadow-md' />
          </div>

          {/* Navigation Arrows */}
        </div>
      </div>
    </div>
  )
}

export default TestimonialComponent
