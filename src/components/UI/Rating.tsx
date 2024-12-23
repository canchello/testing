'use client'
import React from 'react'

interface RatingProps {
  rating: number // Current rating
  total: number // Total number of stars
  color?: string // Custom star color
  disabled?: boolean // Disable input
  onChange?: (newRating: number) => void // Callback for rating change
}

const Rating: React.FC<RatingProps> = ({ rating = 1, total, color = 'bg-yellow-400', disabled = true, onChange }) => {
  const fullStars = Math.floor(rating) // Number of full stars
  const hasHalfStar = rating % 1 !== 0 // Check for a half star
  const emptyStars = total - fullStars - (hasHalfStar ? 1 : 0) // Empty stars count

  const handleRatingChange = (index: number, half: number) => {
    if (!disabled) {
      const newRating = index + 1 - 0.5 * (1 - half) // Calculate new rating based on index and half
      onChange?.(newRating)
    }
  }

  return (
    <div className='rating rating-sm rating-half'>
      {Array.from({ length: fullStars }).map((_, i) => (
        <React.Fragment key={`full-${i}`}>
          <input type='radio' disabled={disabled} name={`rating-${i}`} className='rating-hidden' />
          <input
            type='radio'
            disabled={disabled}
            name={`rating-${i}`}
            className={`mask mask-star-2 mask-half-1 bg-yellow-400`}
            onChange={() => handleRatingChange(i, 1)} // Full star click
          />
          <input
            type='radio'
            disabled={disabled}
            name={`rating-${i}`}
            className={`mask mask-star-2 mask-half-2 bg-yellow-400`}
            defaultChecked
            onChange={() => handleRatingChange(i, 0)} // Full star (default checked)
          />
        </React.Fragment>
      ))}

      {hasHalfStar && (
        <React.Fragment>
          <input type='radio' disabled={disabled} name='half-star' className='rating-hidden' />
          <input
            type='radio'
            disabled={disabled}
            name='half-star'
            className={`mask mask-star-2 mask-half-1 bg-yellow-400`}
            onChange={() => handleRatingChange(fullStars, 1)} // Half star click
          />
          <input
            type='radio'
            disabled={disabled}
            name='half-star'
            className={`mask mask-star-2 mask-half-2 bg-yellow-400`}
            defaultChecked
            onChange={() => handleRatingChange(fullStars, 0)} // Half star (default checked)
          />
        </React.Fragment>
      )}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <React.Fragment key={`empty-${i}`}>
          <input type='radio' disabled={disabled} name={`empty-${i}`} className='rating-hidden' />
          <input
            type='radio'
            disabled={disabled}
            name={`empty-${i}`}
            className='mask mask-star-2 mask-half-1'
            onChange={() => handleRatingChange(fullStars + i, 1)} // Empty star click
          />
          <input
            type='radio'
            disabled={disabled}
            name={`empty-${i}`}
            className='mask mask-star-2 mask-half-2'
            onChange={() => handleRatingChange(fullStars + i, 0)} // Empty star (default checked)
          />
        </React.Fragment>
      ))}
    </div>
  )
}

export default Rating
