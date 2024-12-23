'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import CustomButton from '@/components/common/CustomButton'
import Axios from '@/libs/axios'
import { fetchBlogListURL, getBlogURL, getNextBlogURL } from '@/services/APIs/blogs'
import Loader from '@/components/common/Loader'
import { getImage } from '@/utils/helper'
import Link from 'next/link'

interface Blog {
  id: number
  category: string
  title: string
  image: StaticImageData
  avg_read_time: any
  content: string
  attachment: any
  //   content: string;
}
interface PopularBlogs {
  title: string
  _id: any
}

const BlogDetails = () => {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  const [blog, setBlog] = useState<Blog | null>(null)
  const [popularBlogs, setPopularBlogs] = useState<PopularBlogs[]>([])
  const [nextBlog, setNextBlog] = useState<any>()
  // Find the blog based on the ID from the route
  const fetchBlogDetails = async () => {
    const blogId = id
    const { data }: any = await Axios({ ...getBlogURL(blogId) })
    setBlog(data.data)
  }

  const getBlogContent = (content: any) => {
    return { __html: content }
  }

  const fetchPopularBlogs = async () => {
    const payload = {
      query: {
        is_popular: true
      },
      options: {
        select: ['title', 'id', 'createdAt']
      }
    }
    const { data }: any = await Axios({ ...fetchBlogListURL, data: payload })
    setPopularBlogs(data.data.data)
  }

  const fetchNextBlog = async () => {
    const { data }: any = await Axios({ ...getNextBlogURL(id) })
    setNextBlog(data.data?.[1] || null)
  }

  useEffect(() => {
    fetchBlogDetails()
    fetchPopularBlogs()
    fetchNextBlog()
  }, [])

  // If no blog is found or still loading
  if (!blog || !popularBlogs) {
    return <Loader className='min-h-screen' />
  }

  // Render the blog details
  return (
    <div className='p-4 md:p-12 mx-auto'>
      <div className='flex justify-between mb-4'>
        <span className='text-md font-bold bg-custom-orange px-3 py-1 rounded-full'>{blog.category}</span>
        <p>{blog?.avg_read_time} Mins Read</p>
      </div>
      <h1 className='text-4xl font-bold mb-6'>{blog.title}</h1>
      <div className='relative w-full h-[400px]'>
        {/* Parent container with defined height */}
        <Image
          src={getImage(blog.attachment?.fileUrl)}
          alt={blog.title}
          className='rounded-xl'
          // src={blog.image} // Ensure this path is correct
          layout='fill'
          objectFit='cover'
        />
      </div>
      {/* Description Section */}
      <div className='flex flex-col md:flex-row w-full'>
        <div className='flex-1 py-4'>
          <p dangerouslySetInnerHTML={getBlogContent(blog?.content)} />
        </div>
        <div className='md:w-72 space-y-10 py-4'>
          <div>
            <div className='font-bold text-lg mb-4'>Popular Blogs</div>
            <ul className='list-disc pl-5'>
              {popularBlogs?.map(blog => (
                <li onClick={() => router.push(`/blog/${blog._id}`)} className='border-b border-gray-300 py-2'>
                  {blog?.title}
                </li>
              ))}
            </ul>
          </div>
          <div className='bg-custom-dark-blue p-4 flex flex-col gap-5 text-white items-start rounded-md'>
            <p className='text-right w-full'>Ad</p>
            <p className='text-2xl font-bold'>Partner Hub Round Up Email</p>
            <span>Did you come here for something in particular or just general Riker-bashing? And blowing into</span>
            <CustomButton title='Explore Now' className='!bg-custom-orange !text-black' />
          </div>
        </div>
      </div>
      {nextBlog && (
        <div className='flex flex-col md:flex-row justify-between items-center mt-10 gap-6'>
          <p className='text-2xl text-primary font-bold'>{nextBlog?.title}</p>
          <div>
            <Link href={`/blog/${nextBlog?._id}`}>
              <CustomButton title='Read Now' />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogDetails
