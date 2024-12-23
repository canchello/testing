'use client'
import CustomButton from '@/components/common/CustomButton'
import TestimonialCard from './Card'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const imageUrl = 'https://res.cloudinary.com/dndsypilw/image/upload/v1730370161/fxt1cycweb8wwv1fhoap.jpg'

const Testimonials = () => {
  const router = useRouter()
  const testimonials = [
    {
      name: 'Carlos Fernandes',
      location: 'UK',
      message:
        'Our stay in Tripoli was extraordinary. The hotel was luxurious, and the recommendations for local dining and cultural experiences were spot on.',
      rating: 4,
      imageUrl
    },
    {
      name: 'Emily S.',
      location: 'USA',
      message:
        'Booking our entire trip through Libutel was the best decision we made. From seamless hotel reservations to guided tours of Leptis Magna, everything was perfectly organized.',
      rating: 5,
      imageUrl
    },
    {
      name: 'Ahmed K.',
      location: 'Dubai',
      message:
        'Our stay in Tripoli was extraordinary. The hotel was luxurious, and the recommendations for local dining and cultural experiences were spot on.',
      rating: 4,
      imageUrl
    }
  ]

  return (
    <div className='justify-items-center'>
      <div className='container flex flex-col items-center justify-center text-center py-12 px-4 gap-8'>
        <h2 className='text-3xl font-bold'>Loved by Individuals all across the Globe</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              location={testimonial.location}
              message={testimonial.message}
              rating={testimonial.rating}
              imageUrl={testimonial.imageUrl}
            />
          ))}
        </div>
        <Link href={'/login'}>
          <CustomButton variant='secondary' title='Book Your Trip' />
        </Link>
      </div>
    </div>
  )
}

export default Testimonials
