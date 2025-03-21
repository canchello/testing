import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
// import useJSONForm from "components/JSONForm/useJSONForm";
import { couponDetailFormSchema } from "./FormSchema";
import useJSONForm from "@/components/JSONForm/useJSONForm";
import CustomButton from "@/components/common/CustomButton";
import appStore from "@/stores/appStore";
import Axios from "@/libs/axios";
import { createCouponURL, updateCouponURL } from "@/services/APIs/admin";
import { useMount } from "react-use";
import { getHotelListURL, getRoomTypeListURL } from "@/services/APIs/hotel";
import { toast } from "sonner";
// import BackIcon from "components/AppIcons/BackIcon";

export default function CouponDetails({ options, couponData = false, refetch }) {
  const { setCouponData } = appStore();
  const [loading, setLoading] = useState(false);

  const goBack = () => setCouponData();

  console.log('{     ', {
    ...couponData,
    startDate: couponData?.validityFrom,
    endDate: couponData?.validityUntil,
    // property: (options.PropertyOptions || []).filter(i => couponData.property?.includes(i._id)).map(i => ({ label: i.title, value: i._id })),
    // typeOfRooms: (options.roomsOptions || []).filter(i => couponData.roomTypeId?.includes(i._id)).map(i => ({ label: i.name, value: i._id }))
  })

  // Form
  const { Form } = useJSONForm({
    defaultValue: couponData?._id && {
      ...couponData,
      startDate: couponData?.validityFrom,
      endDate: couponData?.validityUntil,
      // property: (options.PropertyOptions || []).filter(i => couponData.property.includes(i._id)).map(i => ({ label: i.title, value: i._id })),
      // typeOfRooms: (options.roomsOptions || []).filter(i => couponData.roomTypeId.includes(i._id)).map(i => ({ label: i.name, value: i._id }))
    },
    formSchema: couponDetailFormSchema(options),
    customComponents: {
      actionBtn: (
        <div className="w-full flex justify-start mt-5 gap-2 px-2">
          <CustomButton title="Save" className='rounded-md' type="submit" />
          <CustomButton title="Cancel" variant="outline" className='rounded-md' onClick={goBack} />
        </div>
      ),
    },
  });

  const onSubmit = async (data) => {
    const validityFrom = new Date(data.startDate).toISOString()
    const validityUntil = new Date(data.endDate).toISOString()
    // const property = (data.property || []).map(i => i.value)
    // const roomTypeId = (data.typeOfRooms || []).map(i => i.value)
    // delete data.typeOfRooms
    const payload = {
      ...data,
      validityFrom,
      validityUntil,
      // property,
      // roomTypeId,
    }
    try {
      setLoading(true)
      const { data } = await Axios({ ...(couponData?._id ? updateCouponURL(couponData._id) : createCouponURL), data: payload })
      toast.success(data.message)
      refetch()
      goBack(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button onClick={goBack} className="flex items-center gap-2 text-primary">
          <FontAwesomeIcon icon={faChevronLeft} className="bg-primary px-3 py-2 text-white rounded-full" />
          Back to Coupons
        </button>
      </div>

      {/* Coupon Title */}
      {couponData?._id && (
        <div className="mt-6 px-2">
          <h6 className="text-xl font-semibold">
            {couponData.title}{" "}
            <span className="text-slate-500">- Flat {couponData.discount}{couponData.discountType === "percentage_off" ? "% Off" : " Rs. Off"}</span>
          </h6>
        </div>
      )}

      {/* Form Section */}
      <div className="mt-6">
        <Form customFormActions onSubmit={onSubmit} />
      </div>
    </div>
  );
}
