import { getImage } from '@/utils/helper';
import React from 'react';

export default function HotelPicGrid({ images = [] }) {
  // Handle the case when no images are provided
  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center h-[400px] bg-gray-100 rounded-lg">
        <p className="text-gray-500 text-lg font-semibold">
          No hotel images available
        </p>
      </div>
    );
  }

  // Conditional rendering based on the number of images
  if (images.length === 1) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <ImageCard image={images[0].image} />
      </div>
    );
  }

  // Render grid layout for multiple images
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-full">
      {images.map((image, index) => (
        <div
          key={index}
          className={
            index === 1
              ? 'md:col-span-3 sm:row-span-2 h-[400px]'
              : 'h-full max-h-52'
          }
        >
          <ImageCard image={image.image} />
        </div>
      ))}
    </div>
  );
}

const ImageCard = ({ image = '', title = '' }) => {
  return (
    <img
      src={getImage(image)}
      alt={title}
      loading="lazy"
      className="w-full h-full rounded-lg object-cover"
    />
  );
};
