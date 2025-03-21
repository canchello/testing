import { cn } from '@/libs/tailwind'
import React from 'react'

const Loader = ({ className = '', loaderClass = '' }) => {
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div
        className={cn('w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin', loaderClass)}
      ></div>
    </div>
  )
}

export default Loader
