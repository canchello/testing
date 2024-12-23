// components/BlogGrid.tsx
'use client'
import Axios from '@/libs/axios'
import BlogCard from './BlogCard'
import { blogs } from './blogData'
import { useEffect, useState } from 'react'
import { fetchBlogListURL } from '@/services/APIs/blogs'
import Loader from '@/components/common/Loader'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@/assets/svg/Iconify'
import { getImage } from '@/utils/helper'

interface BlogList {
  _id: any
  category: string
  title: string
  attachment: any
}

const BlogGrid = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6
  const [blogsList, setBlogsList] = useState<BlogList[]>([])

  const fetchBlogList = async () => {
    setIsLoading(true)
    try {
      const { data }: any = await Axios({
        ...fetchBlogListURL,
        data: {
          query: {},
          options: {
            sort: { createdAt: 1 },
            populate: ['attachment'],
            lean: true
          }
        }
      })
      setBlogsList(data.data.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogList()
  }, [])

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog)

  const totalPages = Math.ceil(blogs.length / blogsPerPage)

  return (
    <div className='py-8 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Wrapping both title and grid in a container */}
        <h3 className='text-2xl font-bold mb-6'>Travel Stories, Tips, And Top Hotel Picks</h3>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {blogsList?.map(blog => (
              <BlogCard
                key={blog?._id}
                id={blog?._id}
                category={blog.category}
                title={blog.title}
                // image={blog.image}
                image={blog.attachment?.fileUrl}
                // link={blog.link}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className='flex gap-2 justify-center mt-8'>
        <button
          className='bg-custom-dark-blue text-white p-2 rounded-full shadow-md focus:outline-none'
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          <RiArrowLeftSLine fontSize={28} />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-custom-orange ' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className='bg-custom-dark-blue text-white p-2 rounded-full shadow-md focus:outline-none'
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          <RiArrowRightSLine fontSize={28} />
        </button>
      </div>
    </div>
  )
}

export default BlogGrid
