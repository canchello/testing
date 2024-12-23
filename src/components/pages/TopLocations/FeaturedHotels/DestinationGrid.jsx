import React from "react";

const destinations = [
  { name: "Tripoli", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-2" },
  { name: "Leptis Magna", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-1" },
  { name: "The Acacus Mountains", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-2" },
  { name: "Ghamades", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-1" },
  { name: "Sabratha", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-1" },
  { name: "Cyrene", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-1" },
  { name: "Benghazi", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-1" },
  { name: "Red Castle", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-2" },
  { name: "Al-Khums", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-2" },
  { name: "Nalut Ksar", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-1" },
  { name: "Tobruk", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-1" },
  { name: "Waw an Namus", image: "https://res.cloudinary.com/dndsypilw/image/upload/v1730369795/c4qa9jb7hyjfkfybdyc9.jpg", className: "col-span-1 row-span-2" },
];

const DestinationGrid = () => {
  return (
    <div className="justify-items-center">
      <div className="container p-6">
        <h1 className="text-4xl font-bold text-center mb-6">
          Libya's Top Destinations
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg ${destination.className}`}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25"></div>
              <div className="absolute bottom-2 left-2 text-center">
                <p className="bg-white text-black font-semibold text-sm px-4 py-2 rounded-full shadow">
                  {destination.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationGrid;
