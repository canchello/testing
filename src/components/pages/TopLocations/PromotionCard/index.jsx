import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import promotionImg from "@/assets/images/promotion.jpg"
import appQrSvg from "@/assets/svg/appQR.svg"
import googlePlaySvg from "@/assets/svg/GooglePlay.svg"
import appleSvg from "@/assets/svg/apple.svg"
import { cn } from "@/libs/tailwind";

const AppPromotionCard = ({ className = "" }) => {
  return (
    <div className={cn("flex items-center justify-center py-6 mx-6", className)}>
      <div className="bg-custom-dark-blue text-white rounded-lg flex flex-col lg:flex-row items-center justify-between p-6">
        {/* Text Content */}
        <div className="flex flex-col space-y-4 lg:max-w-[60%]">
          <h2 className="text-2xl font-bold">
            Exclusive Deals & More Perks Are On The App
          </h2>
          <p className="text-xl">
            Unlock exclusive deals, special discounts, and app-only perks when you book
            through our mobile app.
          </p>
          <div className="flex flex-col xs:flex-row gap-4 justify-between">
            <div className="flex flex-1 flex-col gap-4">
              {/* App Store Button */}
              <button
                className="w-full flex gap-4 justify-center items-center px-4 py-2 bg-white text-black shadow hover:bg-gray-200 transition rounded-full"
              >
                <Image src={appleSvg} alt="" />
                <div className="text-left">
                  <p className="text-xs">Download on the</p>
                  <p className="text-xl font-medium">App Store</p>
                </div>
              </button>
              {/* Google Play Button */}
              <button
                className="w-full flex gap-4 justify-center items-center px-4 py-2 bg-white text-black shadow hover:bg-gray-200 transition rounded-full"
              >
                <Image src={googlePlaySvg} alt="" />
                <div className="text-left">
                  <p className="text-xs">Get it on</p>
                  <p className="text-xl font-medium">Google Play</p>
                </div>
              </button>
            </div>
            <div className="h-40 w-40">
              <Image
                className="w-full h-full object-cover"
                src={appQrSvg}
                alt="App Promo"
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="items-center space-x-4 p-4 hidden lg:flex">
          <div className="max-w-96 max-h-96 rounded-full overflow-hidden">
            <Image
              className="w-full h-full object-cover"
              src={promotionImg}
              alt="App Promo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPromotionCard;
