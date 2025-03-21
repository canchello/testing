import Loader from "@/components/common/Loader";
import RoomCard from "./RoomCard";

const RoomList = ({ loading = false, rooms, setSelectedRoom }) => {
  if (loading)
    return <div className="flex justify-center">
      {<Loader />}
    </div>
  return (
    <div>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} setSelectedRoom={setSelectedRoom} />
      ))}
    </div>
  );
};

export default RoomList;
