import React from 'react'
import Carousel from './carousel'

export default function SpecialUniqueStays() {
  return (
    <div className=''>
      <h2 className='text-2xl font-bold mb-2'>Special Stays and Unique Accommodations</h2>
      <p className='mb-6 text-lg'>
        Explore a collection of extraordinary stays and one-of-a-kind accommodations across Libya.
      </p>
      <div className='container'>
        <Carousel />
      </div>
    </div>
  )
}
