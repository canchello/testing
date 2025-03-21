import CouponIllustration from "@/assets/images/NoCoupons.png";
import { PageHeader } from ".";
import Image from "next/image";
import CustomButton from "@/components/common/CustomButton";

function NoCoupons({ onAddNew = () => { } }) {
  return (
    <div className="container flex h-full mx-auto bg-white rounded-md p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="flex flex-col gap-5">
          <PageHeader
            title="No Active Coupons"
            content="It looks like you don't have any active coupons at the moment. Add a coupon to start offering discounts to your customers."
          />
          <div>
            <CustomButton title="Add new Coupon" className="rounded-md w-full" onClick={onAddNew} />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center">
          <Image
            className="w-auto h-auto max-h-96"
            src={CouponIllustration}
            alt="No Coupons"
          />
        </div>
      </div>
    </div>
  );
}

export default NoCoupons;
