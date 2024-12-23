import React from 'react'

export default function GuestDetails({bookingDetails}:any) {
  return (
    <div className='bg-white shadow-md rounded-lg p-6 space-y-6'>
      <div className='flex flex-wrap justify-between gap-4'>
        <div className='flex items-center '>
          <div className='w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center'>
            <span className='text-gray-500 text-xl font-bold'>{bookingDetails?.user?.firstName?.charAt(0)}</span>
          </div>

          <div className='flex flex-col gap-2 ml-4'>
            <h3 className='text-lg font-semibold'>{bookingDetails?.user?.firstName + " " + bookingDetails?.user?.lastName}</h3>
            <span className='py-2 px-4 rounded-xl bg-gray-200'>Platinum Membership</span>
          </div>
        </div>
        <div>
          <span className='text-gray-500 text-sm'>Gender</span>
          <p className='text-gray-800 capitalize'>{bookingDetails?.user?.gender}</p>
        </div>
        <div className=''>
          <span className='text-gray-500 text-sm'>Contact Number</span>
          <p className='text-gray-800'>+91-9876543210</p>
        </div>
        <div className=''>
          <span className='text-gray-500 text-sm'>Email</span>
          <p className='text-gray-800'>{bookingDetails?.user?.email}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 border-t pt-4'>
        <div>
          <span className='text-gray-500 text-sm'>Traveling for work?</span>
          <p className='text-gray-800'>{bookingDetails?.travellingForWork=== true ? "Yes": "No" }</p>
        </div>
        <div className='col-span-3'>
          <span className='text-gray-500 text-sm'>Special Request</span>
          <p className='text-gray-800'>
           {bookingDetails?.specialRequest ?? "N/A"}
          </p>
        </div>
      </div>
    </div>
  )
}
