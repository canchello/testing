import { faBed, faExpand, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomCard = ({ room }) => {
  const { name, size, bed, guests, price, availability, status, image } = room;

  return (
    <div className="flex items-center p-4 border rounded-lg mb-4">
      {/* Image */}
      <div className="w-44 h-36 rounded-lg overflow-hidden">
        <img src={image || "https://via.placeholder.com/150"} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Room Info */}
      <div className="flex-1 ml-4 space-y-2">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold">{name}</h3>
          <div className="badge bg-custom-orange rounded-md">Occupied</div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faExpand} size="sm" />
            <p className="text-sm">35 m²</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBed} size="sm" />
            <p className="text-sm">King Bed</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUserGroup} size="sm" />
            <p className="text-sm">2 Guest</p>
          </div>
        </div>
        <p className="text-xs">
          Comfortable, affordable stay for solo travelers or couples. Queen bed, en-suite bathroom, work desk, essential amenities.
        </p>
        <div className="flex justify-between items-end">
          <p className="text-sm">
            <span className="text-gray-500">Availability:</span> 22/30 Rooms
          </p>
          <p>
            <span className="text-xl font-semibold">$100</span>
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
