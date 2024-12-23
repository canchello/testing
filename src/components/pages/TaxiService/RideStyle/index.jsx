'use client'
import React from 'react';
import Image from 'next/image';
import carImage from '@/assets/images/audi.png';
import CustomButton from '@/components/common/CustomButton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RideStyle() {
  const router = useRouter()
  return (
    <div className='justify-items-center my-10'>
      <div className="container mx-auto bg-custom-dark-blue px-6 py-10 md:py-16 rounded-lg flex flex-col md:flex-row items-center gap-8 overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 text-white space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Ride in Style, Save Big!</h2>
          <p className="text-gray-300">
            Take advantage of exclusive offers and seasonal discounts to elevate your travel experience. Visit this section
            often to catch the latest special deals!
          </p>
          <div>
            <Link href={"/login"}>
              <CustomButton
                title="Book Now"
              />
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 relative">
          <div className="bg-primary w-full h-full rounded-lg absolute -right-20 z-0"></div>
          <div className="relative z-10">
            <Image
              src={carImage}
              alt="Audi Car"
              width={400}
              height={300}
              className=""
              priority={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
