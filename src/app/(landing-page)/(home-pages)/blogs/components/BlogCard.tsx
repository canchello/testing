// components/BlogCard.tsx

import Image, { StaticImageData } from 'next/image'
import forwardIcon from '@/assets/svg/forward.svg'
import Link from 'next/link'
import { getImage } from '@/utils/helper'
interface Blog {
  id: string
  category: string
  title: string
  image: string
  // link: string;
}

const BlogCard = ({ id, category, title, image }: Blog) => {
  return (
    <div className='flex flex-col bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='overflow-hidden rounded-xl h-64'>
        <Image
          src={getImage(image)}
          alt={title}
          className='w-full rounded-xl'
          width={320}
          height={320}
          objectFit='cover'
        />
      </div>

      <div className='flex flex-col flex-1 p-4 gap-3'>
        <h2 className='text-lg font-semibold truncate'>{title}</h2>
        <div className='flex-1 flex items-end'>
          <Link href={`/blog/${id}`} className='flex items-center cursor-pointer gap-4'>
            {/* <a href={link} className="mt-4 inline-flex items-center text-sm text-primary hover:text-primary"> */}
            <div className='text-xl text-primary hover:text-primary/55 font-bold'>Read Now</div>
            <button className='btn btn-circle bg-primary text-white'>❯</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
