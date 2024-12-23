// components/common/Carousel.tsx
'use client';

import { faCaretLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';

interface CarouselProps {
  items: React.ReactNode[]; // Accept any ReactNode as items
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        onClick={scrollLeft}
      >
       <FontAwesomeIcon icon={faChevronLeft}/>
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none w-[300px] snap-center"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        onClick={scrollRight}
      >
        <FontAwesomeIcon icon={faChevronRight}/>
      </button>
    </div>
  );
};

export default Carousel;
