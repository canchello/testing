import React, { useEffect, useState } from 'react'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from '@/libs/axios'
import { getHotelByIdURL } from '@/services/APIs/hotel'
import dayjs from 'dayjs'
import { getImage } from '@/utils/helper'

export default function HotelDetailCard({bookingDetails}:any) {

  const[hotelDetails,setHotelDetails]=useState<any | null>({});

    function getStayDuration(details: any): string {
     
      const checkInDate = dayjs(details?.checkIn).format("MMM DD");
      const checkOutDate = dayjs(details?.checkOut).format("MMM DD");
      const rooms = bookingDetails?.roomId?.length
      return `${checkInDate} - ${checkOutDate} | ${rooms} ${rooms > 1 ? "Rooms" : "Room"}`;
    }
  const fetchPropertyDetails =async()=>{
    try {
      const {data:res}:any = await Axios({...getHotelByIdURL(bookingDetails?.propertyId)})
      
      setHotelDetails(res.data as any)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(()=>{
    if(bookingDetails){
      fetchPropertyDetails();
    }
  },[bookingDetails])


  return (
    <div className='bg-gray-100 shadow-sm rounded-lg p-4 space-y-4'>
      <div className='flex flex-col xs:flex-row md:flex-col lg:flex-row gap-4 items-start'>
        <img src={hotelDetails && getImage(hotelDetails?.attachment?.[0]?.fileUrl)} alt='Hotel Image' className='w-28 h-28 rounded-lg object-cover' />
        <div className='space-y-2'>
          <h3 className='text-lg font-semibold'>{hotelDetails?.title}</h3>
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faLocationDot} />
            <p className='text-gray-600'>{hotelDetails?.address}</p>
          </div>
          <p className='text-gray-600 text-sm font-semibold'>{getStayDuration(bookingDetails)}</p>
        </div>
      </div>

      <div className='space-y-3'>
        <h4 className='font-semibold text-gray-800 text-2xl'>Cancellation Policy</h4>
        <p className='text-sm text-gray-600'>
          You’re about to cancel your entire booking - review the details below before canceling.
        </p>
      </div>
    </div>
  )
}
