import { getImage } from "@/utils/helper";
import { faBed, faExpand, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomCard = ({ room, setSelectedRoom }) => {
  return (
    <div className="flex items-center p-4 border rounded-lg mb-4" onClick={() => setSelectedRoom(room)}>
      {/* Image */}
      <div className="w-44 h-36 rounded-lg overflow-hidden">
        <img src={getImage(room?.attachment?.fileUrl) || "https://via.placeholder.com/150"} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Room Info */}
      <div className="flex-1 ml-4 space-y-2">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold">{room?.name}</h3>
          {
            !!room.room.length ?
              <div className="badge bg-green-200 rounded-md">Available</div>
              :
              <div className="badge bg-custom-orange rounded-md">Occupied</div>
          }
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faExpand} size="sm" />
            <p className="text-sm">{room?.size} m²</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBed} size="sm" />
            <p className="text-sm">{room?.bedType}</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUserGroup} size="sm" />
            <p className="text-sm">{room?.numberOfGuest} Guest{room?.numberOfGuest > 1 ? "s" : ""}</p>
          </div>
        </div>
        <p className="text-xs">
          Comfortable, affordable stay for solo travelers or couples. Queen bed, en-suite bathroom, work desk, essential amenities.
        </p>
        <div className="flex justify-between items-end">
          <p className="text-sm">
            {
              room?.numberOfRooms > 0 ?
                <><span className="text-gray-500">Availability:</span> <span>{room?.room?.length}/{room.numberOfRooms} Rooms </span></>
                : <span>No room added for this room type</span>
            }
          </p>
          <p>
            <span className="text-xl font-semibold">${(room?.price || 0).toFixed(0)}</span>
            <span className="text-sm text-gray-500">/night</span>
          </p>
        </div>
      </div>

      {/* Price and Status */}
      {/* <div className="text-right">
        <p className="text-xl font-bold">${price}<span className="text-sm text-gray-500">/night</span></p>
        <span className={`badge ${status === "Available" ? "badge-success" : "badge-error"}`}>
          {status}
        </span>
      </div> */}
    </div>
  );
};

export default RoomCard;
