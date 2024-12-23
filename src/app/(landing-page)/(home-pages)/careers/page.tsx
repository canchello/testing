'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import careersHero from '@/assets/images/careers.png'
import WhyWorkWithUsSection from './components/whyWorkWithUsSection'
import CareerOpportunities from './components/CareersOpportunitiesSection'
import EmployeeTestimonial from './components/EmployeeTestimonial'
import TestimonialComponent from './components/EmployeeTestimonial'
import ApplyForm from './components/ApplyForm'

const Careers: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null)
  const onApplyNow = () => formRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div>
      <div className='justify-items-center'>
        <div className='container justify-items-center px-4 py-10 md:p-10'>
          <h2 className='text-3xl font-bold mb-4 text-center'>Be a part of Something Big!</h2>
          <p className='text-gray-700 max-w-2xl text-center mb-6'>
            At Libya Hotel Booking Company, we’re not just building a platform; we’re creating a bridge that connects
            the world to the beauty and charm of Libya. If you’re passionate about travel, technology, and making a
            difference, we’d love for you to join our growing team!
          </p>
          <button
            className='bg-custom-dark-blue text-white px-6 py-3 rounded-full hover:bg-custom-dark-blue/90 shadow-lg transition'
            onClick={onApplyNow}
          >
            Apply Now
          </button>
          <div className='mt-10'>
            <Image src={careersHero} alt='careers' />
          </div>
        </div>
      </div>
      <section className='justify-items-center bg-custom-dark-blue text-white'>
        <div className='container py-16 mt-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold'>Why Work with Us?</h2>
          </div>

          <WhyWorkWithUsSection />
        </div>
      </section>
      <CareerOpportunities />
      <TestimonialComponent />
      <div ref={formRef} className='w-full'>
        <ApplyForm />
      </div>
    </div>
  )
}

export default Careers
