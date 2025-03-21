import CustomButton from "@/components/common/CustomButton";
import { ROUTES } from "@/libs/constants";
import { faBed, faCheck, faExpand, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const RoomDetail = ({ room }) => {

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <div className="flex justify-between gap-2">
        <p>Room Detail</p>
        <Link href={`${ROUTES.VENDOR.ONBOARD}?step=2`}>
          <CustomButton
            title="Edit"
            className="rounded-md h-8 min-h-0"
          />
        </Link>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{room?.name}</h2>
          {
            !!room.room.length ?
              <div className="badge bg-green-200 rounded-md">Available</div>
              :
              <div className="badge bg-custom-orange rounded-md">Occupied</div>
          }
        </div>
        <p className="text-xl font-bold ml-auto">${(room?.price || 0).toFixed(0)}<span className="text-sm text-gray-500">/night</span></p>
      </div>
      <p className="text-sm">
        {
          room?.numberOfRooms > 0 ?
            <><span className="text-gray-500">Availability:</span> <span>{room?.room?.length || 0}/{room.numberOfRooms} Rooms </span></>
            : <span>No room added for this room type</span>
        }
      </p>

      <div>
        Photo Grid
      </div>
      <div className="flex gap-4">
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
      <div>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, tempora.
        </p>
      </div>

      <div className="mt-6">
        {/* <h3 className="font-semibold text-lg mb-2">Features</h3> */}
        <div className="grid grid-cols-1 xs:grid-cols-2 text-sm text-gray-700">
          {/* {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-green-200 rounded-full px-2 py-1">
                <FontAwesomeIcon icon={faCheck} size="sm" />
              </div>
              {feature}
            </div>
          ))} */}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Amenities</h3>
        <div className="flex flex-wrap gap-2 text-sm text-gray-700">
          {room?.amenities?.map((data, index) => (
            <div className="badge bg-green-200 rounded-md p-3" key={index}>{data?.title}</div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {/* <h3 className="font-semibold text-lg mb-2">Amenities</h3> */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          {/* {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-green-200 rounded-full px-2 py-1">
                <FontAwesomeIcon icon={faCheck} size="sm" />
              </div>
              {amenity}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
