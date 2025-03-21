'use client'
import React, { useEffect, useState } from 'react'
import arrowUp from '@/assets/svg/arrowUp.svg'
import arrowDown from '@/assets/svg/arrowDown.svg'
import Image, { StaticImageData } from 'next/image'
import faqGeneral from '@/assets/images/faqgeneral.png'
import faqAccommadation from '@/assets/images/faqaccommadation.png'
import faqCarRental from '@/assets/images/faqcarrental.png'
import faqLocation from '@/assets/images/faqlocation.png'
import { fetchFaqListURL } from '@/services/APIs/faq'
import Axios from '@/libs/axios'
import Loader from '@/components/common/Loader'

interface Category {
  id: number
  title: string
  value: string
  icon: StaticImageData
}

interface FaqList {
  _id: any
  question: string
  answer: string
}

const FAQ: React.FC = () => {
  const categories = [
    {
      id: 1,
      title: 'General',
      value: 'general',
      icon: faqGeneral
    },
    {
      id: 2,
      title: 'Accommodation',
      value: 'accommodation',
      icon: faqAccommadation
    },
    {
      id: 3,
      title: 'Taxi Service',
      value: 'car_rental',
      icon: faqCarRental
    },
    {
      id: 4,
      title: 'Site-Seeing',
      value: 'site_seeing',
      icon: faqLocation
    }
  ]
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0])
  const [faqList, setFaqList] = useState<FaqList[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [openId, setOpenId] = useState<number | null>(null) // Change state to track open question by ID

  const toggleQuestion = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  const fetchFaqList = async () => {
    setIsLoading(true)
    try {
      const payload = {
        query: {
          category: selectedCategory.value
        }
      }
      const { data }: any = await Axios({ ...fetchFaqListURL, data: payload })
      setFaqList(data.data?.data || [])
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFaqList()
  }, [selectedCategory])

  return (
    <div className='flex flex-col items-center p-4'>
      <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-10 mb-8'>
        {categories.map(category => (
          <div
            key={category.id}
            className={`flex flex-col gap-5  items-center justify-center rounded-lg transition-shadow cursor-pointer ${
              selectedCategory.id === category.id
                ? 'bg-custom-orange text-black shadow-lg'
                : 'bg-white  border border-primary'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <div className='flex flex-col gap-5 p-10 items-center'>
              <Image src={category.icon} alt={category.title} />
              <h3 className='text-lg font-semibold'>{category.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className='w-full max-w-5xl'>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {faqList.map(q => (
              <div key={q._id} className='rounded-md'>
                <div
                  className={`flex justify-between p-4 cursor-pointer ${
                    openId === q._id ? 'bg-custom-orange' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleQuestion(q._id)}
                >
                  <p className='font-semibold'>{q.question}</p>
                  <span className='text-gray-600'>
                    {openId === q._id ? (
                      <Image src={arrowUp} alt='arrowUp' />
                    ) : (
                      <Image src={arrowDown} alt='arrowDown' />
                    )}
                  </span>
                </div>
                {openId === q._id && (
                  <div className='p-4 bg-custom-orange'>
                    <p className='text-black'>{q.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQ
