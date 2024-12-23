import { faEllipsis, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileCard = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
      <div className="flex items-center mb-2">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src="https://via.placeholder.com/150" alt="Profile" />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold">Angus Copper</h3>
          <p className="text-sm text-gray-600">CO11-28754321</p>
        </div>
      </div>
      <div className="divider my-2" />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-custom-orange rounded-md">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <p className="">
            +1 555 798-1234
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-custom-orange rounded-md">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <p className="">
            anguscopper@email.com
          </p>
        </div>
      </div>
      <div className="divider my-2" />
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Personal Information</h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          {[
            { title: "Date of Birth", value: "-" },
            { title: "Gender", value: "-" },
            { title: "Nationality", value: "-" },
            { title: "Passport No.", value: "-" },
          ].map((item, index) => (
            <div key={index} className="">
              <p className="text-xs text-gray-500">{item.title}</p>
              <p className="text-base font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="divider my-2" />
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Loyalty Program</h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          <div className="col-span-2">
            <p className="text-xs text-gray-500">Membership Status</p>
            <div className="">
              <span className="text-sm px-2 py-1 rounded-lg bg-custom-orange">
                Platinum Member
              </span>
            </div>
          </div>
          <div className="">
            <p className="text-xs text-gray-500">Points Balance</p>
            <p className="text-base font-semibold">
              15,000 points
            </p>
          </div>
          <div className="">
            <p className="text-xs text-gray-500">Tier Level</p>
            <p className="text-base font-semibold">
              Elite
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
