import { BED_TYPES, BOOKING_STATUS, PAYMENT_METHOD } from "@/libs/constants";
import { getImage } from "@/utils/helper";
import { faBed, faExpand, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomInfoCard = ({ bookingDetails }) => {
  const roomDetails = bookingDetails?.rooms[0]
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Room Info</h2>
        {/* <p className="text-muted text-sm">
          View Details
        </p> */}
      </div>
      <div className="bg-custom-orange p-2 rounded-lg">
        <img className="rounded-lg" src={getImage(roomDetails?.roomType?.attachment?.fileUrl)} />
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faExpand} size="sm" />
          <p className="text-sm">{roomDetails?.roomType.size} m²</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBed} size="sm" />
          <p className="text-sm">{roomDetails?.roomType?.bedType === BED_TYPES.KING_SIZE_BED ? "King size bed" : "Normal"}</p>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUserGroup} size="sm" />
          <p className="text-sm">{roomDetails?.roomType?.numberOfGuest} Guest{roomDetails?.roomType?.numberOfGuest > 1 && "s"} </p>
        </div>
      </div>
      <div className="divider" />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Price Summary</h3>
          {bookingDetails?.status === BOOKING_STATUS.CONFIRMED &&
            bookingDetails?.paymentMethod !== PAYMENT_METHOD.CASH_ON_DELIVERY &&
            <div className="badge bg-custom-orange rounded-md">Paid</div>}
          {bookingDetails?.status === BOOKING_STATUS.CONFIRMED &&
            bookingDetails?.paymentMethod === PAYMENT_METHOD.CASH_ON_DELIVERY &&
            <div className="badge bg-green-200 rounded-md">Cash</div>}
        </div>
        <div className="space-y-2">
          {[
            { name: "Room and offer", price: bookingDetails?.originalPrice || 0 },
            { name: "Platform Charge", price: bookingDetails?.platformCharge || 0 },
            { name: "Discount", price: bookingDetails?.discountAmount || 0 },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{item.name}</p>
              <p className="text-sm font-normal">${(item.price).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <p className="">Total Price</p>
            <p className="font-bold">
              ${((bookingDetails?.totalPrice || 0) + (bookingDetails?.platformCharge || 0)).toFixed(2)}</p>
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
