import CustomButton from "@/components/common/CustomButton";
import Axios from "@/libs/axios";
import { PAYMENT_STATUS } from "@/libs/constants";
import { deleteUserReviewURL } from "@/services/APIs/review";
import { faCheck, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);


const BookingInfoCard = ({ bookingDetails }) => {
  const findduration = (checkIn, checkOut) => {

    const diff = dayjs(checkOut).diff(dayjs(checkIn), 'day');

    // Convert the difference into a duration
    // const durationFormatted = Math.round(dayjs.duration(diff).asDays());
    return `${diff + 1} days`
  }

  const removeReview = async () => {
    try {
      const { data } = await Axios({ ...deleteUserReviewURL(bookingDetails?.reviewId) })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Booking Info</h2>
      <div className="mb-4">
        {bookingDetails?.status === PAYMENT_STATUS.CONFIRMED ?
          <div className="badge badge-success flex rounded-md gap-2 font-semibold mb-2">
            <FontAwesomeIcon icon={faCheck} />
            Booking Confirmed
          </div>
          :
          <div className="badge badge-warning flex rounded-md gap-2 font-semibold mb-2">
            <FontAwesomeIcon icon={faWarning} />
            Booking Pending
          </div>
        }
        <p className="text-xl">
          Booking ID: <span className="font-bold">{bookingDetails?._id}</span>
          {/* Booking ID: <span className="font-bold">LG-B00109</span> */}
        </p>
        <p className="text-xs text-gray-500">
          {dayjs(bookingDetails?.createdAt).format('MMMM D, YYYY, h:mm A')}
        </p>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { title: "Room Type", value: bookingDetails?.rooms[0]?.roomType?.name || "-" },
          { title: "Room Number", value: bookingDetails?.rooms[0]?.roomNumber || "-" },
          { title: "Price", value: `${bookingDetails?.totalPrice} $` },
          { title: "Guest", value: `${bookingDetails?.rooms[0].roomType.numberOfGuest} Guest${bookingDetails?.rooms[0].roomType?.numberOfGuest > 1 && "s"}` },
          { title: "Request", value: bookingDetails?.specialRequest || "-" },
          { title: "Check In", value: dayjs(bookingDetails?.checkIn).format("MMMM DD, YYYY") },
          { title: "Check Out", value: dayjs(bookingDetails?.checkOut).format("MMMM DD, YYYY") },
          { title: "Duration", value: findduration(bookingDetails?.checkIn, bookingDetails?.checkOut) },
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
          {/* <div className="">
            <p className="text-xs text-gray-500">Loyalty Program</p>
            <p className="text-base">Platinum Member</p>
          </div> */}
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
        {/* <div className="">
          <p className="text-xs text-gray-500">Extras</p>
          <p className="text-base">-</p>
        </div> */}
      </div>
      <div>
        <div className="flex justify-end gap-3">
          {/* <CustomButton title="Edit" className="rounded-md !bg-custom-offwhite !text-gray-700" /> */}
          <CustomButton title="Cancel Booking" className="rounded-md !bg-custom-orange !text-gray-700" />
        </div>
      </div>
      {/* <div className="divider my-2" />
      <div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">Review</p>
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className='bg-white py-2 px-4 rounded-lg'>
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 mt-1 p-2 shadow">
              <li onClick={() => removeReview()}>
                Remove Review
              </li>
            </ul>
          </div>
        </div>
        <div className='flex flex-wrap justify-between items-center gap-2'>
          <Rating rating={bookingDetails?.review?.rating} total={5} disabled />
          <div>{dayjs(bookingDetails?.review?.createdAt).format('MMMM D, YYYY')}</div>
        </div>
        <p className='text-xs'>{bookingDetails?.review?.description}</p>
      </div> */}
    </div>
  );
};

export default BookingInfoCard;
