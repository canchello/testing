// components/common/CarouselCard.tsx
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface CardProps {
  title: string;
  location: string;
  distance: string;
  rating: number;
  image: string;
}

const CarouselCard: React.FC<CardProps> = ({
  title,
  location,
  distance,
  rating,
  image,
}) => {
  return (
    <div className="rounded-lg shadow-lg bg-white overflow-hidden">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Rating */}
        <div className="flex items-center space-x-1">
          {/* <FaStar className="text-yellow-400" /> */}
          <span className="text-sm font-medium">{rating}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold">{title}</h3>

        {/* Location */}
        <div className="flex items-center space-x-2 text-gray-500">
          <FontAwesomeIcon icon={faLocation}/>
          <span className="text-sm">{location}</span>
        </div>

        {/* Distance */}
        <p className="text-sm text-gray-400">{distance}</p>
      </div>
    </div>
  );
};

export default CarouselCard;
