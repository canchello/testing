'use client'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/common/CustomButton'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoReviews from '@/assets/svg/reviews.svg'
import Image from 'next/image'
import ReviewCard from '@/components/pages/user/reviews'
import ReviewModal from '@/components/pages/user/reviews/ReviewModal'
import Modal from '@/components/UI/Modal'
import { deleteUserReviewURL, updateUserReviewURL, userReviewListURL } from '@/services/APIs/review'
import Loader from '@/components/common/Loader'
import Axios from '@/libs/axios'
import { toast } from 'sonner'
import Link from 'next/link'
import { getImage } from '@/utils/helper'

interface Review {
  id: string
  image: string
  title: string
  location: string
  rating: number
  review: string
  description: string
  reviewedOn: string
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentReview, setCurrentReview] = useState<Review | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)

  // Fetch user review list
  const fetchUserReviewList = async () => {
    setLoading(true) // Start loading state

    try {
      const { data }: any = await Axios({
        ...userReviewListURL,
        data: {
          options: {
            populate: 'user property',
            lean: true
          }
        }
      })

      const reviewData = (data.data?.data || [])?.map((review: any) => ({
        id: review._id,
        image: review.property.primaryAttachment?.fileUrl
          ? getImage(review.property.primaryAttachment?.fileUrl)
          : 'https://via.placeholder.com/150',
        title: review.property?.title || 'Unknown Property',
        location: review.property.address || 'Unknown Location',
        rating: review.rating || 0,
        review: review.title || 'No Review Title',
        description: review.description || 'No Description Provided',
        reviewedOn: new Date(review.updatedAt).toLocaleDateString()
      }))

      setReviews(reviewData)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false) // End loading state
    }
  }

  // Handle review update
  const handleReviewUpdate = async (updatedReview: Review) => {
    setLoading(true)
    try {
      // Simulate an API call to update review
      const response: any = await Axios({ ...updateUserReviewURL(updatedReview.id), data: { ...updatedReview } })
      if (response) {
        await fetchUserReviewList()
        // Update the state with the updated review
        toast.success('Review updated successfully')
        setShowModal(false)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error('Failed to update review:', error)
    }
  }

  const handleReviewDelete = async (id: any) => {
    setLoading(true)
    try {
      const response: any = await Axios({ ...deleteUserReviewURL(id) })
      if (response) {
        await fetchUserReviewList()
      }
      setLoading(false)
      toast.success('Review Successfully Deleted!')
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUserReviewList()
  }, [])

  return (
    <div className='justify-items-center'>
      <div className='container p-4 md:p-10'>
        {/* Back Button */}
        <Link href={'/'}>
          <CustomButton
            title='Back to Home'
            variant='default'
            ImageIcon={false}
            icon={
              <div className='rounded-full bg-primary p-2 h-8 w-8'>
                <FontAwesomeIcon icon={faChevronLeft} color='white' />
              </div>
            }
            className='!p-0'
            iconPosition='left'
          />
        </Link>

        {/* Main Content */}
        <div className='flex flex-col justify-center items-center my-4 gap-4'>
          <h1 className='text-3xl font-bold'>{!!reviews.length ? 'My Reviews' : 'No Reviews Yet!'}</h1>
          <p className='text-lg text-center'>
            {!!reviews.length
              ? 'View and manage all your submitted reviews here. Keep track of your feedback on past stays and help other travelers with your insights!'
              : 'You haven’t submitted any reviews yet. Share your experience after your next stay to help others make informed choices!'}
          </p>

          <div className='w-full m-4'>
            {/* Loading Spinner */}
            {loading && (
              <div className='flex justify-center items-center'>
                <Loader />
              </div>
            )}

            {/* Reviews List */}
            {!loading && !!reviews.length
              ? reviews.map((review, index) => (
                  <React.Fragment key={index}>
                    <ReviewCard
                      image={review.image}
                      title={review.title}
                      location={review.location}
                      review={review.review}
                      rating={review.rating}
                      description={review.description}
                      reviewedOn={review.reviewedOn}
                      onEdit={() => {
                        setCurrentReview(review)
                        setShowModal(true)
                      }}
                      onDelete={() => handleReviewDelete(review.id)}
                    />
                    <div className='divider' />
                  </React.Fragment>
                ))
              : // No Reviews Placeholder
                !loading && (
                  <div className='flex w-full justify-center'>
                    <Image src={NoReviews} alt='No Reviews' />
                  </div>
                )}
          </div>
        </div>

        {/* Review Modal */}
        {showModal && (
          <Modal
            id='edit-review-modal'
            modalClass='p-0'
            body={
              currentReview && (
                <ReviewModal review={currentReview} onSave={handleReviewUpdate} onClose={() => setShowModal(false)} />
              )
            }
          />
        )}
      </div>
    </div>
  )
}
