import React from 'react'
import basicCar from "@/assets/images/basic-car.jpg"
import standardCar from "@/assets/images/standard-car.jpg"
import luxuryCar from "@/assets/images/luxury-car.jpg"
import CarCard from './Card'

const carsTypes = [
  {
    id: "basic",
    title: "Affordable Everyday Travel",
    description: "Designed for everyday travel, the Basic package ensures reliable transportation at an affordable price. Cars Included like Toyota Corolla, Hyundai Accent, Suzuki Swift and many more.",
    image: basicCar
  },
  {
    id: "standard",
    title: "Standard Travel",
    description: "Designed for everyday travel, the Basic package ensures reliable transportation at an affordable price. Cars Included like Toyota Corolla, Hyundai Accent, Suzuki Swift and many more.",
    image: standardCar
  },
  {
    id: "luxury",
    title: "Finest in Travel",
    description: "Designed for everyday travel, the Basic package ensures reliable transportation at an affordable price. Cars Included like Toyota Corolla, Hyundai Accent, Suzuki Swift and many more.",
    image: luxuryCar
  },
]

export default function CarTypes() {
  return (
    <div className='flex justify-center flex-wrap gap-4'>
      {carsTypes.map(car => (
        <CarCard key={car.id} item={car} />
      ))}
    </div>
  )
}
