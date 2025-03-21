import React from "react";
import DigitalCoupon from "./DigitalCoupon";
import appStore from "@/stores/appStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "@/components/common/CustomButton";
import dayjs from "dayjs";

export default function CouponCard({ data = {}, onDeleteCoupon }) {
  const { setCouponData } = appStore();

  return (
    <div className="flex bg-[#f9f2eb] rounded-lg shadow-md p-4 my-4">
      {/* Left Side - Coupon Display */}
      <div className="min-w-[45%] max-w-[200px] mr-4">
        <div className="flex flex-col gap-4">
          <DigitalCoupon
            {...{ ...data }}
            discount={data.discount}
            code={data.code}
            variant={data.variant}
            title={data.title}
            subtitle={data.subtitle}
            isActive={data.status === "active"}
          />
        </div>
      </div>

      {/* Right Side - Details */}
      <div className="card flex-grow p-3 bg-white">
        <div className="collapse collapse-arrow border-none">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold flex items-center justify-between">
            <span>
              {data.title}{" "}
              <span className="text-gray-500">- Flat {data.discount}{data.discountType === "percentage_off" ? "% Off" : " Rs. Off"}</span>
            </span>
            {/* <CaretRightOutlined /> */}
          </div>

          <div className="collapse-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* <div>
                <h6 className="text-sm font-medium text-gray-400">Brand:</h6>
                <p className="text-base font-medium">House of Fashion</p>
              </div> */}
              <div>
                <h6 className="text-sm font-medium text-gray-400">Coupon Code:</h6>
                <p className="text-base font-medium uppercase">{data.code}</p>
              </div>
              {/* <div>
                <h6 className="text-sm font-medium text-gray-400">Min. Order:</h6>
                <p className="text-base font-medium">Rs. 2,000</p>
              </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h6 className="text-sm font-medium text-gray-400">Start On:</h6>
                <p className="text-base font-medium">{dayjs(data.validityFrom).format('DD/MM/YYYY, hh:mm A')}</p>
              </div>
              <div>
                <h6 className="text-sm font-medium text-gray-400">End On:</h6>
                <p className="text-base font-medium">{dayjs(data.validityUntil).format('DD/MM/YYYY, hh:mm A')}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <CustomButton title="Edit" className='rounded-md' onClick={() => setCouponData(data)} />
                <CustomButton title="Deactivate Coupon" variant="outline" className='rounded-md' />
              </div>
              <button
                className="btn btn-circle bg-black text-white hover:bg-gray-800"
                onClick={() => onDeleteCoupon(data._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
