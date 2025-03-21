import React from 'react'
import DigitalCoupon from './DigitalCoupon'

export default function MyCoupons({ coupons }: any) {
  return (
    <div className='mb-10 mx-8'>
      <h1 className='text-xl font-bold'>My Coupons</h1>
      <div className='flex justify-center my-4'>
        {!!coupons?.length ? (
          coupons.map((data: any) => {
            return (
              <DigitalCoupon
                key={data._id}
                discount={data.discount}
                discountType={data.discountType}
                code={data.code}
                variant={'red'}
                title={data.title}
                subtitle={data.subtitle}
                isActive={data.status === 'active'}
              />
            )
          })
        ) : (
          <div className='flex justify-center my-4'>
            <p className='text-gray-500'>No Coupons Available!</p>
          </div>
        )}
      </div>
    </div>
  )
}

// const coupons = [
//   {
//     discount: '30%',
//     couponCode: 'INDDAY2024',
//     variant: 'red',
//     title: 'INDEPENDENCE DAY SALE 2024',
//     subtitle: 'Min Order Amount : Rs. 2,000',
//     isActive: true
//   }
// ]
