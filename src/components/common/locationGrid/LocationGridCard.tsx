import React from "react";

interface CardProps {
  title: string;
  image: string;
  onClick: () => void;
}

const LocationGridCard: React.FC<CardProps> = ({ title, image, onClick }) => {
  return (
    <div
      className="relative bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow-md flex items-center space-x-2">
          <span className="text-sm font-semibold">{title}</span>
          <span className="text-gray-500">→</span>
        </div>
      </div>
    </div>
  );
};

export default LocationGridCard;
