import CustomButton from "@/components/common/CustomButton";
import Axios from "@/libs/axios";
import { USER_ROLES, USER_STATUS } from "@/libs/constants";
import { cn } from "@/libs/tailwind";
import { deleteAccountURL, suspendAccountURL } from "@/services/APIs/admin";
import userStore from "@/stores/userStore";
import { getImage } from "@/utils/helper";
import { faClose, faEnvelope, faExclamationCircle, faPhone, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ProfileCard = ({ user }) => {
  const router = useRouter()
  const { user: usr } = userStore()

  return (
    <div className="p-4">
      <div className="flex justify-between">

        <h2 className="text-xl font-semibold mb-2">
          Property Details
        </h2>

        {/* Options Menu (Three Dots) */}
        {/* <div className='dropdown dropdown-end'>
          <button
            aria-label='Options'
            className='flex items-center justify-center w-6 h-6 text-gray-600 hover:text-gray-800'
          >
            <FontAwesomeIcon icon={faEllipsis} size='lg' />
          </button>
          <UserAdminDropDown user={user} onSuccess={() => router.back()} />
        </div> */}
      </div>
      <div className="flex items-center mb-2">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={getImage(user?.profilePicture) || "https://via.placeholder.com/150"} alt="Profile" />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold">{user?.firstName + " " + user?.lastName}</h3>
          <p className="text-sm text-gray-600"></p>
        </div>
      </div>
      {[USER_STATUS.DELETED, USER_STATUS.SUSPENDED].includes(user?.status) &&
        <div className="badge badge-error text-white ml-auto">
          User {user.status}
        </div>
      }
      <div className="divider my-2" />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-custom-orange rounded-md">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <p className="break-all">
            +1 555 798-1234
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-custom-orange rounded-md">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <p className="break-all">
            {user?.email}
          </p>
        </div>
        {usr?.role === USER_ROLES.VENDOR &&
          <CustomButton title="Start Chat" variant="light_text" className="w-full" onClick={() => createChat()} />}
      </div>
      <div className="divider my-2" />
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Personal Information</h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          {[
            { title: "Date of Birth", value: dayjs(user?.dob).format("DD/MM/YYYY") },
            { title: "Gender", value: user?.gender },
            { title: "Nationality", value: user?.nationality },
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
        <h1 className="text-lg font-semibold">Bank Details</h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          {[
            { title: "Account Holder", value: user?.bankDetail?.holderName },
            { title: "Account Type", value: user?.bankDetail?.accountType },
            { title: "IFSC Code", value: user?.bankDetail?.IFSC },
            { title: "Account Number", value: user?.bankDetail?.accountNumber },
            { title: "Country", value: user?.nationality },
          ].map((item, index) => (
            <div key={index} className="">
              <p className="text-xs text-gray-500">{item.title}</p>
              <p className="text-base font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="divider my-2" /> */}
      {/* <div className="space-y-2">
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
      </div> */}
    </div>
  );
};


export const UserAdminDropDown = ({ user, onSuccess }) => {
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const suspendModalRef = useRef(null);
  const deleteModalRef = useRef(null);

  // Suspend handlers
  const handleSuspendClick = () => setIsSuspendModalOpen(true);

  const closeSuspendModal = () => {
    setIsSuspendModalOpen(false);
    setReason("");
    setLoading(false);
  };

  const handleSuspendAccount = async () => {
    try {
      if (!reason) return toast.error('Please add reason to suspend');
      setLoading(true);
      const { data } = await Axios({
        ...suspendAccountURL, data: {
          userId: user._id,
          suspendReason: reason
        }
      });
      toast.success(data.message);
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      closeSuspendModal();
    }
  };

  // Delete handlers
  const handleDeleteClick = () => setIsDeleteModalOpen(true);

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const { data } = await Axios({
        ...deleteAccountURL, data: {
          userId: user._id,
        }
      });
      toast.success(data.message);
      onSuccess();
    } catch (error) {
      console.error(error)
    } finally {
      closeDeleteModal();
    }
  };

  const handleOutsideClick = (e, ref, closeModal) => {
    if (ref.current && !ref.current.contains(e.target)) {
      closeDeleteModal();
      closeSuspendModal();
    }
  };

  return (
    <>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 text-black rounded-box z-50 mt-4 w-52 p-2 shadow"
      >
        {[
          { title: 'Suspend Account', icon: faUser, onClick: handleSuspendClick, view: user?.status !== USER_STATUS.SUSPENDED },
          { title: 'Delete Account', icon: faTrash, className: 'text-red-500', onClick: handleDeleteClick, view: user?.status !== USER_STATUS.DELETED },
        ]
          .filter(item => item.view)
          .map((item, index) => (
            <li
              key={index + item.title}
              className={cn('flex flex-row items-center rounded-lg cursor-pointer', item.className)}
              onClick={item.onClick}
            >
              <div className="w-full flex items-center gap-2">
                <FontAwesomeIcon icon={item.icon} className="hover:bg-transparent" />
                <span className="font-semibold hover:bg-transparent focus:bg-transparent p-0">
                  {item.title}
                </span>
              </div>
            </li>
          ))}
      </ul>

      {/* Suspend Account Modal */}
      {isSuspendModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={(e) => handleOutsideClick(e, suspendModalRef, closeSuspendModal)}
        >
          <div ref={suspendModalRef} className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
            <h3 className="font-bold text-lg text-center">Declaration</h3>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={closeSuspendModal}>
              <FontAwesomeIcon icon={faClose} />
            </button>
            <div className="mt-4">
              <label className="text-red-500 font-semibold">
                Why Suspending Account<span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full h-24 mt-2 border rounded-lg p-2"
                placeholder="Write reason here"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <CustomButton
                className="btn bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={handleSuspendAccount}
                title="Suspend Account"
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={(e) => handleOutsideClick(e, deleteModalRef, closeDeleteModal)}
        >
          <div ref={deleteModalRef} className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={closeDeleteModal}>
              <FontAwesomeIcon icon={faClose} />
            </button>
            <div className="text-center">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-4xl" />
              <h3 className="font-bold text-lg mt-2">Are you sure to delete the account?</h3>
              <p className="text-sm text-gray-600 mt-2">
                This action cannot be undone. All data will be permanently deleted.
              </p>
              <div className="mt-4 flex justify-center">
                <CustomButton
                  className="btn bg-red-500 text-white rounded-full hover:bg-red-600"
                  onClick={handleDeleteAccount}
                  title="Delete Account"
                  isLoading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
