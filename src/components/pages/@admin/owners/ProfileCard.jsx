import { getImage } from "@/utils/helper";
import { faEllipsis, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { UserAdminDropDown } from "../../@vendor/main/Reservations/details/ProfileCard";
import { useRouter } from "next/navigation";
import { USER_ROLES } from "@/libs/constants";
import userStore from "@/stores/userStore";

const ProfileCard = ({ user, property }) => {
  const router = useRouter();
  const { user: loggedInUser } = userStore();
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-2">Property Details</h2>
        {/* Options Menu (Three Dots) */}
        {loggedInUser?.role === USER_ROLES.ADMIN &&
          <div className='dropdown dropdown-end'>
            <button
              aria-label='Options'
              className='flex items-center justify-center w-6 h-6 text-gray-600 hover:text-gray-800'
            >
              <FontAwesomeIcon icon={faEllipsis} size='lg' />
            </button>
            <UserAdminDropDown user={user} onSuccess={() => router.back()} />
          </div>
        }
      </div>
      <div className="flex items-center mb-2">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={getImage(user?.profilePicture) || "https://via.placeholder.com/150"} alt="Profile" />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold">Property Name</h3>
          <p className="text-sm text-gray-600">{`${user?.firstName || ""} ${user?.lastName || ""}`}</p>
        </div>
      </div>
      <div className="divider my-2" />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-custom-orange rounded-md w-8">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <p className="break-all">
            {user?.phoneNumber}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-custom-orange rounded-md w-8">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <p className="break-all">
            {user?.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-custom-orange rounded-md w-8">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <p className="break-words">
            {user?.primaryProperty?.address}
          </p>
        </div>
      </div>
      <div className="divider my-2" />
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">General Information</h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          {[
            { title: "Date of Registration", value: dayjs(user?.primaryProperty?.createdAt).format("MMM DD, YYYY") },
            { title: "POC Name", value: user?.pocName },
            { title: "Nationality", value: user?.nationality },
          ].map((item, index) => (
            <div key={index} className="">
              <p className="text-xs text-gray-500">{item.title}</p>
              <p className="text-base font-semibold">{item.value || "-"}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="divider my-2" />
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Bank Details</h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          {[
            { title: "Account Holder", value: user?.bankDetail?.holderName },
            { title: "Account Type", value: user?.bankDetail?.accountType },
            { title: "IFSC Code", value: user?.bankDetail?.IFSC },
            { title: "Account Number", value: user?.bankDetail?.accountNumber },
          ].map((item, index) => (
            <div key={index} className="">
              <p className="text-xs text-gray-500">{item.title}</p>
              <p className="text-base font-semibold">{item.value || "-"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
