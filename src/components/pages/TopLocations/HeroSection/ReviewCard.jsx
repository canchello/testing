import Rating from '@/components/UI/Rating';
import React from 'react'

const ReviewCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        {/* Rating and Header */}
        <div className="space-y-2 mb-4">
          <div className="">
            <span className='bg-green-500 text-white text-sm px-2 py-1 rounded-full'>
              4.0
            </span>
          </div>
          <p className="text-gray-700 font-bold text-lg">
            Book your trip today and create unforgettable memories!
          </p>
        </div>

        {/* Hotel Image */}
        <img
          className="w-full h-40 object-cover rounded-md"
          src="https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg"
          alt="Hotel"
        />
      </div>

      {/* Review Section */}
      <div className="flex justify-between gap-2 rounded-lg p-4 mt-4 shadow-lg">
        <div className="space-y-3 min-w-[25%] max-w-[30%]">
          <img
            className="w-10 h-10 rounded-full"
            src="https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg"
            alt="Emily S."
          />
          <p className="text-gray-800 font-bold break-all">Emily S.</p>
        </div>

        <div>
          <Rating rating={4} total={5} />

          {/* Review Text */}
          <p className="text-gray-600 mt-2 text-sm">
            Booking our entire trip through Libutel was the best decision we made. From
            seamless hotel reservations to guided tours of Leptis Magna, everything was
            perfectly organized.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
