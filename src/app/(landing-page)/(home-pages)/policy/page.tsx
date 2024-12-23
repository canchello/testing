'use client'
import React, { useState, useRef, RefObject } from 'react'
import data from './data'
import CustomButton from '@/components/common/CustomButton'
// import ContactUsModal from "@components/sections/contactUsModal";

const PrivacyPolicy: React.FC = () => {
  const [contactModal, setContactModal] = useState(false)
  const [currentView, setCurrentView] = useState('Terms & Conditions')
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null) // Track active subsection
  const toggleContact = () => setContactModal(prev => !prev)

  // Create a ref for each section content item
  const sectionRefs = useRef<{ [key: string]: RefObject<HTMLElement> }>({})

  // Find the current section based on currentView state
  const currentSection = data.sections.find(section => section.title === currentView)
  const nextSection = data.sections.find(section => section.title !== currentView)

  // Handle scrolling to specific section on click
  const scrollToSection = (title: string) => {
    const section = sectionRefs.current[title]
    if (section && section.current) {
      section.current.scrollIntoView({ behavior: 'smooth' })
      setActiveSubsection(title) // Set active subsection
    }
  }

  const handleViewChange = (view: string) => {
    setCurrentView(view)
    window.scrollTo(0, 0)
    setActiveSubsection(null) // Reset subsection highlight when changing main section
  }

  return (
    <div className='container grid grid-cols-1 md:grid-cols-5 gap-6 mx-auto p-4'>
      {/* Sidebar for switching between sections */}
      <div className='py-4 flex flex-col space-y-4'>
        {data.sections.map(section => (
          <div className='space-y-3' key={section.title}>
            <div
              onClick={() => setCurrentView(section.title)}
              className={`text-left space-y-2 mt-2 font-bold text-xl cursor-pointer text-gray-700`}
            >
              {section.title}
              <hr className='mt-1' />
            </div>
            <div className='space-y-2'>
              {section.content.map(content => (
                <p
                  key={content.title}
                  onClick={() => scrollToSection(content.title)}
                  className={`font-semibold cursor-pointer hover:text-primary ${
                    activeSubsection === content.title ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {content.title}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main content display */}
      <div className='py-4 md:col-span-4'>
        <h1 className='text-2xl font-bold mb-4'>{data.title}</h1>
        <p className='mb-4 text-gray-600 font-bold'>{data.updated}</p>
        <div className='text-center mb-4 p-5 bg-orange-100 rounded-lg font-bold'>
          <p>{data.introduction.main_text}</p>
        </div>
        <div className='space-y-6'>
          {currentSection?.content.map((section, index) => {
            // Assign refs dynamically for each section content
            if (!sectionRefs.current[section.title]) {
              sectionRefs.current[section.title] = React.createRef<HTMLElement>()
            }

            return (
              <section key={index} ref={sectionRefs.current[section.title]}>
                <h2 className='text-lg font-semibold mb-2 mt-9'>{section.title}</h2>
                {section.content.map((paragraph, i) => (
                  <p key={i} className='text-gray-700'>
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className='list-disc ml-8 mt-2 text-gray-700'>
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </div>

        <p className='mt-6 text-center text-gray-600'>
          {data.contact.text}
          <span onClick={toggleContact} className='cursor-pointer text-primary underline font-bold'>
            {data.contact.email}
          </span>
          .
        </p>
        <div className='flex flex-col md:flex-row justify-between items-center mt-10'>
          <div>
            <p className='text-2xl text-primary font-bold'>{nextSection?.title}</p>
          </div>
          <CustomButton title='Read Now' onClick={() => handleViewChange(nextSection?.title || '')} />
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
