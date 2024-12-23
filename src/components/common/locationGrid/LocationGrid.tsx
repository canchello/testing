import React from "react";
import LocationGridCard from "@/components/common/locationGrid/LocationGridCard";

interface Location {
  id: number;
  title: string;
  image: string;
}

interface LocationCardGridProps {
  locations: Location[];
}

const LocationGrid: React.FC<LocationCardGridProps> = ({ locations }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {locations.map((location) => (
        <div
          key={location.id}
          className="break-inside-avoid mb-4 rounded-lg shadow-lg overflow-hidden"
        >
          <LocationGridCard
            title={location.title}
            image={location.image}
            onClick={() => alert(`Clicked on ${location.title}`)}
          />
        </div>
      ))}
    </div>
  );
};

export default LocationGrid;
