import React from 'react'
import carImg from "@/assets/images/car.png"
import driverImg from "@/assets/images/driver.png"
import bookingImg from "@/assets/images/booking.png"
import Image from 'next/image'

const serviceTypes = [
  {
    id: "premium",
    title: "Premium vehicles",
    description: "Our fleet includes a range of high-end vehicles ensuring a comfortable, stylish journey.",
    image: carImg
  },
  {
    id: "professional",
    title: "Professional Chauffeurs",
    description: "Trained drivers with a focus on safety, professionalism, and local expertise.",
    image: driverImg
  },
  {
    id: "booing",
    title: "Easy Online Booking",
    description: "Book your rental online in just a few steps.",
    image: bookingImg
  },
]

export default function CarServices() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-custom-orange rounded-lg p-4'>
      {serviceTypes.map(service => (
        <div key={service.id} className='flex gap-2'>
          <Image src={service.image} className='w-14 h-14' />
          <div className=''>
            <p className='text-xl font-bold'>{service.title}</p>
            <p>{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
