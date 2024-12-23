import React from 'react'
import DigitalCoupon from './DigitalCoupon'

export default function MyCoupons() {
  return (
    <div className='mb-10'>
      <h1 className='text-xl font-bold'>My Coupons</h1>
      <div className='flex my-4'>
        {coupons.map((data, index) => {
          return (
            <DigitalCoupon
              discount={data.discount}
              couponCode={data.couponCode}
              variant={'red'}
              title={data.title}
              subtitle={data.subtitle}
              isActive={data.isActive}
            />
          )
        })}
      </div>
    </div>
  )
}

const coupons = [
  {
    discount: '30%',
    couponCode: 'INDDAY2024',
    variant: 'red',
    title: 'INDEPENDENCE DAY SALE 2024',
    subtitle: 'Min Order Amount : Rs. 2,000',
    isActive: true
  }
]
