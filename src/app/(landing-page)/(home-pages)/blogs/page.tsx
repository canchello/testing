import Image from 'next/image'
import React from 'react'
import heroImage from '@/assets/images/heroImageBlog.png'
import heroImage2 from '@/assets/images/blogsection1.png'
import BlogGrid from './components/BlogGrid'
import AppPromotionCard from '@/components/pages/TopLocations/PromotionCard'

const Blogs = () => {
  return (
    <div className='justify-items-center'>
      <div className='container justify-items-center py-6 px-4 xs:px-0'>
        <div className='relative h-[500px] my-5 justify-items-center hidden md:block'>
          <Image src={heroImage} alt='Hero Background' objectFit='cover' priority height={440} />
        </div>
        <div className='relative z-10 mt:10 md:-mt-72 lg:-mt-52 xl:-mt-40 justify-items-center md:mx-6 max-w-6xl'>
          <div className='bg-custom-dark-blue p-6 rounded-xl shadow-lg text-white flex flex-col md:flex-row'>
            {/* Article Content */}
            <div className='w-full md:w-1/2 pr-6 flex flex-col gap-5 p-5 items-start'>
              <span className='bg-white text-blue-900 font-semibold px-3 py-1 rounded-full text-sm'>
                Featured This Month
              </span>
              <h2 className='mt-4 text-2xl font-bold'>How To Experience Libya Like A Local: Top Tips And Tricks</h2>
              <p className='mt-2 text-sm text-gray-300'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
              <button className='mt-4 inline-flex items-center text-sm text-primary hover:text-orange-300'>
                Read Now
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='ml-1 h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h14m-7-7l7 7-7 7' />
                </svg>
              </button>
            </div>

            {/* Image Thumbnail */}
            <div className='w-full md:w-1/2 flex md:justify-end'>
              <Image src={heroImage2} alt='Article Thumbnail' className='w-full rounded-lg' width={500} height={300} />
            </div>
          </div>
        </div>
        <BlogGrid />
        <AppPromotionCard className='my-8' />
      </div>
    </div>
  )
}

export default Blogs
