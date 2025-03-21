// components/DigitalCoupon.tsx

import React from 'react'

interface DigitalCouponProps {
  variant: 'red' | 'yellow' | 'green' // Variants for background color
  discountType?: string // Coupon code
  code: string // Coupon code
  title: string // Title of the coupon
  subtitle?: string // Additional subtitle or info
  discount: string
  isActive: boolean
}

const textStyles = {
  red: 'text-red-600',
  yellow: 'text-yellow-500',
  green: 'text-green-500',
  inactive: 'text-slate-400'
}

const variantStyles = {
  red: 'bg-red-600',
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
  inactive: 'bg-slate-400'
}

const variantBorder = {
  red: 'border-red-600',
  yellow: 'border-yellow-500',
  green: 'border-green-500',
  inactive: 'border-slate-400'
}

const DigitalCoupon: React.FC<DigitalCouponProps> = ({
  variant = 'red',
  discountType = '',
  code = '',
  title = '',
  subtitle = '',
  discount = '',
  isActive = false
}) => {
  return (
    <div
      className={`relative max-w-[450px]
        ${variantStyles[isActive ? variant : 'inactive']}
        w-full h-[140px] overflow-hidden mx-auto text-white flex items-stretch`}
    >
      {/* Shadow Effect */}
      <div
        className='absolute inset-x-0 -top-1 h-1'
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
        }}
      />
      <div
        className='absolute inset-x-0 -bottom-1 h-1'
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
        }}
      />

      {/* Left Circles */}
      <div className='absolute left-[-22px] top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2'>
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`bg-white rounded-full ${
              index === 3 ? 'w-10 h-10' : 'w-4 h-3'
            } shadow-[0_3px_5px_rgba(0,0,0,0.5)]`}
          />
        ))}
      </div>

      {/* Right Circles */}
      <div className='absolute right-[-22px] top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2'>
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`bg-white rounded-full ${
              index === 3 ? 'w-10 h-10' : 'w-4 h-3'
            } shadow-[0_3px_5px_rgba(0,0,0,0.5)]`}
          />
        ))}
      </div>

      {/* Left Section */}
      <div
        className={`flex items-center justify-center w-[30%] border-r-2 border-dashed bg-white text-black ${
          variantBorder[isActive ? variant : 'inactive']
        }`}
      >
        <div className='transform -rotate-90 whitespace-nowrap ml-3 text-center space-y-2'>
          <p className='text-xs font-semibold uppercase'>Coupon</p>
          <h2 className={`text-4xl font-semibold custom-font ${textStyles[isActive ? variant : 'inactive']}`}>
            {discountType === 'flat_amount_off' && `Rs.${discount}`}
            {discountType === 'percentage_off' && `${discount}%`}
          </h2>
        </div>
      </div>

      {/* Center Section */}
      <div className='flex-grow flex flex-col items-center w-[70%] justify-around p-4 text-center'>
        <div className='font-medium leading-5 uppercase'>{title}</div>
        <div className='text-3xl font-bold leading-8 uppercase'>{code}</div>
        <div className='font-normal leading-5'>{subtitle}</div>
      </div>
    </div>
  )
}

export default DigitalCoupon
