import React from 'react';
import Image from 'next/image';
import carImage from '@/assets/images/texi1.jpg';
import chauffeurImage from '@/assets/images/texi2.jpg';
import bookingImage from '@/assets/images/texi3.jpg';
import chauffer from '@/assets/svg/chauffer.svg';
import signal from '@/assets/images/signal.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTaxi } from '@fortawesome/free-solid-svg-icons';

export default function WhyWeStandOut() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why we Stand Out?</h2>
          <p className="text-gray-600">
            Experience travel like never before with our professional car services. Whether you’re heading to the airport,
            transferring between hotels, or exploring the city, we ensure your journey is seamless, stylish, and stress-free.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto] gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center space-y-4 col-span-1 row-span-2">
            <Image src={carImage} alt="Premium Vehicles" className="w-full h-64 rounded-lg object-cover" />
            <div>
              <FontAwesomeIcon icon={faTaxi} className='bg-primary text-white p-2 rounded-full' />
              <h3 className="text-lg font-semibold flex items-center gap-2">
                Premium Vehicles
              </h3>
              <p className="text-gray-600">
                Our fleet includes a range of high-end vehicles ensuring a comfortable, stylish journey.
              </p>
            </div>
          </div>


          {/* Card 2 */}
          <div className="flex flex-col xs:flex-row items-center space-y-4 xs:space-y-0 xs:space-x-4 col-span-1 row-span-1">
            <Image src={chauffeurImage} alt="Professional Chauffeurs" className="w-full xs:w-2/5 h-64 xs:h-full rounded-lg object-cover" />
            <div className='space-y-4'>
              <div className=''>
                <Image src={chauffer} alt="Professional Chauffeurs" className="w-8 h-8 bg-primary text-white p-1 rounded-full" />
              </div>
              <h3 className="text-2xl font-bold">
                Professional Chauffeurs
              </h3>
              <p className="text-gray-600 text-lg">
                All drivers are vetted and trained, with a focus on safety, professionalism, and local expertise.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col xs:flex-row items-center space-y-4 xs:space-y-0 xs:space-x-4 col-span-1 row-span-1">
            <Image src={bookingImage} alt="Easy Online Booking" className="w-full xs:w-2/5 h-64 xs:h-full rounded-lg object-cover" />
            <div className='space-y-4'>
              <div className=''>
                <Image src={signal} alt="Easy Online Booking" className="w-8 h-8 bg-primary text-white p-1 rounded-full" />
              </div>
              <h3 className="text-2xl font-bold">
                Easy Online Booking
              </h3>
              <p className="text-gray-600 text-lg">
                Book your rental online in just a few steps with flexible payment options and transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
