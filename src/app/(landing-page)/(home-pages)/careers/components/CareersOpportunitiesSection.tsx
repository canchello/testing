'use client'
import React, { useState } from 'react'
import careersopportunities from '@/assets/images/careersopportunities.png'
import Image from 'next/image'
import arrowUp from '@/assets/svg/arrowUp.svg'
import arrowDown from '@/assets/svg/arrowDown.svg'
import locationIcon from '@/assets/images/locationIcon.png'
import experienceIcon from '@/assets/images/experienceIcon.png'
import responsibilitiesIcon from '@/assets/images/responsibilitiesIcon.png'
import salaryIcon from '@/assets/images/salaryIcon.png'
// import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Job {
  title: string
  location: string
  experience: string
  salary: string
  responsibilities: string[]
}

const jobs: Job[] = [
  {
    title: 'Customer Support Specialist',
    location: 'Remote',
    experience: '4 Years',
    salary: 'Rs. 4,00,000 LPA',
    responsibilities: ['Assist Users With Queries', 'Troubleshoot Issues', 'Ensure Exceptional Customer Satisfaction.']
  },
  {
    title: 'Front-End Developer',
    location: 'Remote',
    experience: '3 Years',
    salary: 'Rs. 6,00,000 LPA',
    responsibilities: ['Develop Frontend Applications', 'Optimize Performance', 'Collaborate with Designers.']
  },
  {
    title: 'UI/UX Designer',
    location: 'Office',
    experience: '2 Years',
    salary: 'Rs. 5,00,000 LPA',
    responsibilities: ['Create User-Centered Designs', 'Conduct User Research', 'Design Prototypes and Mockups.']
  }
]

const CareerOpportunities: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className='justify-items-center'>
      <div className='container py-16 px-8'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-20'>
          {/* Left Section */}
          <div className='flex-1'>
            <Image
              src={careersopportunities} // Replace this with your own image path
              alt='Career Illustration'
              className='w-full h-auto rounded-lg shadow-md'
            />
          </div>

          {/* Right Section */}
          <div className='flex-1'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold'>Career Opportunities</h2>
            </div>
            {jobs.map((job, index) => (
              <div key={index} className='mb-6 border-b border-gray-300 pb-4'>
                <div
                  className='flex justify-between items-center cursor-pointer'
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className='text-lg font-semibold text-primary'>{job.title}</h3>
                  <span className='mr-2'>
                    <Image src={activeIndex === index ? arrowUp : arrowDown} alt='icon' />
                  </span>
                </div>
                {activeIndex === index && (
                  <div className='mt-4'>
                    <div className='flex items-center text-gray-700'>
                      <Image src={locationIcon} alt='locationIcon' className='mr-3' />
                      <p>
                        Location: <span className='font-bold'>{job.location}</span>
                      </p>
                    </div>
                    <div className='flex items-center text-gray-700 mt-2'>
                      <Image src={experienceIcon} alt='experienceIcon' className='mr-3' />
                      <p>
                        Experience: <span className='font-bold'>{job.experience}</span>
                      </p>
                    </div>
                    <div className='flex items-center text-gray-700 mt-2'>
                      <Image src={salaryIcon} alt='salaryIcon' className='mr-3' />
                      <p>
                        Salary: <span className='font-bold'>{job.salary}</span>
                      </p>
                    </div>
                    <div className='mt-4'>
                      <div className='flex items-center text-gray-700 mt-2'>
                        <Image src={responsibilitiesIcon} alt='salaryIcon' className='mr-3' />
                        <p>Responsibilities:</p>
                      </div>
                      <ul className='list-disc list-inside text-gray-600 mt-2'>
                        {job.responsibilities.map((responsibility, idx) => (
                          <li className='pl-10' key={idx}>
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerOpportunities
