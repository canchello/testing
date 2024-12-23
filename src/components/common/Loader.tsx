import React from 'react'

const Loader = ({ className = '' }) => {
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}

export default Loader
