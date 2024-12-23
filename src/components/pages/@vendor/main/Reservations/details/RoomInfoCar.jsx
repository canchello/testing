import { faBed, faExpand, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomInfoCard = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Room Info</h2>
        <p className="text-muted text-sm">
          View Details
        </p>
      </div>
      <div className="bg-custom-orange p-4 rounded-lg">

      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
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
      <div className="divider" />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Price Summary</h3>
          <div className="badge bg-custom-orange rounded-md">Paid</div>
        </div>
        <div className="space-y-2">
          {[
            { name: "Room and offer", price: 100 },
            { name: "Extras", price: 100 },
            { name: "8% VAT", price: 100 },
            { name: "City Tax", price: 100 },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{item.name}</p>
              <p className="text-sm font-normal">${item.price}</p>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <p className="">Total Price</p>
            <p className="font-bold">${300}</p>
          </div>
        </div>
        <div className="">
          <p className="text-xs text-gray-500">Notes</p>
          <p className="text-xs">
            Invoice sent to corporate account; payment confirmed by BIG Corporation
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomInfoCard;
