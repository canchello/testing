import CustomButton from '@/components/common/CustomButton';
import hotelStore from '@/stores/hotelStore';
import { getImage } from '@/utils/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useMemo, useState, useEffect } from 'react';
import { toast } from 'sonner';

const maxFacilities = 2;

export default function RoomData({ room, selectedRooms: bookingRooms = [], isDisableControls = false }) {
  const { hotelFilters, setSelectedRooms, selectedRooms } = hotelStore();
  const { nightCount, totalPrice, totalGuest } = useMemo(() => {
    const daysDiff = dayjs(hotelFilters.checkOut).diff(dayjs(hotelFilters.checkIn), 'days');
    const totalPrice = (room?.price || 0) * (daysDiff > 0 ? daysDiff : 1);
    const totalGuest = Number(hotelFilters.adults || 0) + Number(hotelFilters.children || 0);
    return { nightCount: daysDiff, totalPrice, totalGuest };
  }, [hotelFilters.checkIn, hotelFilters.checkOut, hotelFilters.adults, hotelFilters.children]);

  const handleIncrement = (id) => {
    // Find the current room in the selectedRooms state
    const currentRoom = selectedRooms.find((room) => room.id === id);
    const currentCount = currentRoom ? currentRoom.count : 0;
    // Check if the current count exceeds the available rooms
    if (currentCount < room.room.length) {
      // If the room already exists, increment its count
      if (currentRoom) {
        setSelectedRooms(
          selectedRooms.map((room) =>
            room.id === id ? { ...room, count: room.count + 1 } : room
          )
        );
      } else {
        // If the room doesn't exist, add it to the list with count 1
        setSelectedRooms([...selectedRooms, { id, count: 1 }]);
      }
    } else {
      if (!!room.room?.length)
        // Show a warning if the user tries to add more rooms than available
        toast.warning(`Sorry, only ${room.room.length} ${room?.name} are available at the moment.`);
      if (!room.room?.length)
        // Show a warning if the user tries to add more rooms than available
        toast.warning(`Sorry, ${room?.name} is not available at the moment.`);
    }
  };

  const getRoomCount = (id) => {
    if (!!bookingRooms?.length) {
      return bookingRooms.length
    }
    const room = selectedRooms?.find((room) => room.id === id);
    return room ? room.count : 0;
  };
  const handleDecrement = (id) => {
    const currentRoom = selectedRooms.find((room) => room.id === id);

    if (currentRoom) {
      if (currentRoom.count > 1) {
        // Decrement the count if it's greater than 1
        setSelectedRooms(
          selectedRooms.map((room) =>
            room.id === id ? { ...room, count: room.count - 1 } : room
          )
        );
      } else {
        // Remove the room from the list if count is 1
        setSelectedRooms(selectedRooms.filter((room) => room.id !== id));
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg">
      <div className="w-full md:w-1/3">
        <img
          src={room?.attachment ? getImage(room.attachment.fileUrl) : "https://via.placeholder.com/150"}
          alt="Hotel Room"
          className="h-60 rounded-lg w-full object-cover"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between flex-1 p-4 gap-4 h-full w-full">
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold capitalize">{room.name}</h2>
            <p className="text-sm text-gray-500">{createDescription(room)}</p>
          </div>

          <div className="space-x-2">
            <span className="font-medium">{nightCount || 0} Nights</span>
            <span className="font-medium">{totalGuest || 0} Guests</span>
          </div>

          {/* <div className="flex flex-wrap gap-2">
            {room?.amenities?.slice(0, 2).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-300 py-2 px-4 rounded-full"
              >
                <FontAwesomeIcon icon={item.icon} />
                <p>{item.title}</p>
              </div>
            ))}
          </div> */}
        </div>

        <div className="flex flex-col justify-between items-end gap-4">
          <div>
            <div className="flex flex-wrap gap-2 justify-end items-center">
              {room?.amenities?.slice(0, maxFacilities).map((item, index) => (
                <div key={index} className="border border-primary text-primary rounded-full px-2 py-1">
                  <FontAwesomeIcon icon={item.icon} />
                  <p>{item.title}</p>
                </div>
              ))}
              {room?.amenities?.length > maxFacilities &&
                <div class="tooltip tooltip-bottom" data-tip={room?.amenities?.map((facility) => facility.title).join(', ')}>
                  <span className='border border-primary rounded-full text-primary px-2 py-1' >
                    +{room?.amenities.length - maxFacilities} Amenities
                  </span>
                </div>}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xl font-semibold">${room.price}</div>
          </div>
          {
            isDisableControls ? <div className="flex items-center space-x-2">
              <span className="text-lg font-medium px-4 py-2">
                Selected {getRoomCount(room._id)} {getRoomCount(room._id) > 1 ? "rooms" : "room"}
              </span>
            </div> :
              <div className="flex items-center space-x-2">
                <CustomButton title="-" variant="secondary" isDisabled={selectedRooms?.find((r) => r.id !== room._id)} onClick={() => handleDecrement(room._id)} />
                <span className="text-lg font-medium border rounded-xl px-4 py-2">
                  {getRoomCount(room._id)}
                </span>
                <CustomButton title="+" variant="secondary" isDisabled={selectedRooms?.find((r) => r.id !== room._id)} onClick={() => handleIncrement(room._id)} />
              </div>
          }
        </div>
      </div>
    </div>
  );
}

function createDescription(data) {
  const parts = [];
  if (data.numberOfBad > 0) {
    parts.push(`${data.numberOfBad}x bed`);
  }
  if (data.numberOfBathrooms > 0) {
    parts.push(`${data.numberOfBathrooms}x bathroom`);
  }
  return parts.join(' • ');
}
