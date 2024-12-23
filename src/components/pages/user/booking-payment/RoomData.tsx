import CustomButton from '@/components/common/CustomButton'
import { faCarSide, faMugSaucer, faPersonSwimming, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function RoomData() {
  return (
    <div className='flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg'>
      <div className='w-full lg:w-1/3'>
        <img
          src='https://res.cloudinary.com/dndsypilw/image/upload/v1730369796/hfvz03ujeezwcth7nboo.jpg'
          alt='Hotel Room'
          className='h-60 rounded-lg w-full object-cover'
        />
      </div>
      <div className='flex fle justify-between flex-1 p-4 gap-4 h-full'>
        <div className='flex flex-col justify-between gap-4'>
          <div className='space-y-1'>
            <h2 className='text-lg font-semibold'>Single Room</h2>
            <p className='text-sm text-gray-500'>1x king size bed • 1x bathroom</p>
          </div>

          <div className='space-x-2'>
            <span className='font-medium'>2 Nights</span>
            <span className='font-medium'>2 Guests</span>
          </div>

          <div className='flex flex-wrap gap-2'>
            {[
              { title: 'swimming pool', icon: faPersonSwimming },
              { title: 'Good Breakfast', icon: faMugSaucer },
              { title: 'Car Parking', icon: faCarSide },
              { title: 'Restaurant', icon: faUtensils }
            ]
              .slice(0, 2)
              .map((item, index) => (
                <div key={index} className='flex items-center gap-3 bg-gray-300 py-2 px-4 rounded-full'>
                  <FontAwesomeIcon icon={item.icon} />
                  <p>{item.title}</p>
                </div>
              ))}
          </div>
        </div>

        <div className='flex flex-col justify-between items-end gap-4'>
          <div className=''>
            <div className='flex flex-wrap gap-2 justify-end'>
              <div className='border border-primary rounded-full px-4 py-1'>
                <span className='text-primary'>Free Cancellation</span>
              </div>
              <div className='border border-primary rounded-full px-4 py-1'>
                <span className='text-primary'>Breakfast Included</span>
              </div>
            </div>
          </div>

          <div className='text-right'>
            <div className='text-xl font-semibold'>$50</div>
          </div>

          <div className='flex items-center space-x-2'>
            <CustomButton title='-' variant='secondary' />
            <span className='text-lg font-medium border rounded-xl px-4 py-2'>1</span>
            <CustomButton title='+' variant='secondary' />
          </div>
        </div>
      </div>
    </div>
  )
}
