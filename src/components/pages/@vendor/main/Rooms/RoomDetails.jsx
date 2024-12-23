import CustomButton from "@/components/common/CustomButton";
import { faBed, faCheck, faExpand, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomDetail = ({ room }) => {
  const { name, size, bed, guests, price, description, features, facilities, amenities, image } = room;

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <div className="flex justify-between gap-2">
        <p>Room Detail</p>
        <CustomButton
          title="Edit"
          className="rounded-md h-8 min-h-0"
        />
      </div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className="badge bg-green-200 rounded-md">Available</div>
        </div>
        <p className="text-xl font-bold ml-auto">${price}<span className="text-sm text-gray-500">/night</span></p>
      </div>
      <p className="text-sm">
        <span className="text-gray-500">Occupied:</span> 22/30 Rooms
      </p>

      <div>
        Photo Grid
      </div>
      <div className="flex gap-4">
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
      <div>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, tempora.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Features</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 text-sm text-gray-700">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-green-200 rounded-full px-2 py-1">
                <FontAwesomeIcon icon={faCheck} size="sm" />
              </div>
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Facilities</h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-sm text-gray-700">
          {facilities.map((facility, index) => (
            <div key={index}>{facility}</div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Amenities</h3>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-green-200 rounded-full px-2 py-1">
                <FontAwesomeIcon icon={faCheck} size="sm" />
              </div>
              {amenity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
