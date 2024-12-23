import CustomButton from "@/components/common/CustomButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";

const BookingInfoCard = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Booking Info</h2>
      <div className="mb-4">
        <div className="badge badge-success flex rounded-md gap-2 font-semibold mb-2">
          <FontAwesomeIcon icon={faCheck} />
          Booking Confirmed
        </div>
        <p className="text-xl">
          Booking ID: <span className="font-bold">LG-B00109</span>
        </p>
        <p className="text-xs text-gray-500">
          {dayjs().format('MMMM D, YYYY, h:mm A')}
        </p>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { title: "Room Type", value: "Delux" },
          { title: "Room Number", value: "555" },
          { title: "Price", value: "-" },
          { title: "Guest", value: "2 Adults" },
          { title: "Request", value: "Late Checkout" },
          { title: "Check In", value: "Late Checkout" },
          { title: "Check Out", value: "Late Checkout" },
          { title: "Duration", value: "3 nights" },
          { title: "Notes", value: "Guest requested extra pillows and towels. Ensure room service is available upon arrival." },
        ].map((item, index) => (
          <div key={index} className="">
            <p className="text-xs text-gray-500">{item.title}</p>
            <p className="text-base">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="divider my-2" />
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <div className="space-y-4">
          <div className="">
            <p className="text-xs text-gray-500">Loyalty Program</p>
            <p className="text-base">Platinum Member</p>
          </div>
          <div className="">
            <p className="text-xs text-gray-500">Transportation</p>
            <p className="text-base">Airport pickup arranged</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Special Amenities</p>
          <div className="space-y-1">
            {[
              "Complimentary breakfast",
              "Free Wi-Fi",
              "Access to gym and pool",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="text-success" />
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <p className="text-xs text-gray-500">Extras</p>
          <p className="text-base">-</p>
        </div>
      </div>
      <div>
        <div className="flex justify-end gap-3">
          <CustomButton title="Edit" className="rounded-md !bg-custom-offwhite !text-gray-700" />
          <CustomButton title="Cancel Booking" className="rounded-md !bg-custom-orange !text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default BookingInfoCard;
