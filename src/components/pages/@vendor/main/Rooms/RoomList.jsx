import RoomCard from "./RoomCard";

const RoomList = ({ rooms }) => {
  return (
    <div>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
