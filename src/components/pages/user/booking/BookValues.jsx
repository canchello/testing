import React, { useMemo } from 'react';
import CustomButton from '@/components/common/CustomButton';
import CustomDateInput from '@/components/form/DateField';
import hotelStore from '@/stores/hotelStore';
import userStore from '@/stores/userStore';
import { faBaby, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

export default function BookValues({ propertyData }) {
  const params = useParams();
  const router = useRouter();
  const { hotelFilters, setHotelFilters } = hotelStore();
  const { user } = userStore();

  const lowestPrice = useMemo(() => {
    if (!propertyData) return null;
    const prices = propertyData?.roomType?.map((i) => i.price);
    return Math.min(...(prices || [0]));
  }, [propertyData]);

  const handleBookingClick = () => {
    const { checkIn, checkOut, adults, children } = hotelFilters;

    if (!checkIn || !checkOut) {
      toast.warning('Please select check-in and check-out dates, and specify the number of guests before proceeding.');
      return;
    }
    if ((!adults && !children)) {
      toast.warning('Please select number of guests before proceeding.');
      return;
    }
    // Redirect to the checkout page if all conditions are met
    router.push(`/booking/checkout/${params.id}`);
  };

  return (
    <div className="">
      <div className="bg-custom-dark-blue flex p-4 rounded-lg">
        <div className="w-full space-y-4">
          <div className="flex justify-around flex-wrap gap-2 bg-white p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="flex justify-center items-center bg-custom-orange p-2 rounded-full w-8 h-8">
                <FontAwesomeIcon icon={faPeopleGroup} className="text-primary" />
              </div>
              <span>Adults: {hotelFilters?.adults || '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex justify-center items-center bg-custom-orange p-2 rounded-full w-8 h-8">
                <FontAwesomeIcon icon={faBaby} className="text-primary" />
              </div>
              <span>Children: {hotelFilters?.children || '-'}</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg space-y-2">
            <CustomDateInput
              label="Check-In Date"
              placeholder="Enter Check-In Date"
              value={hotelFilters?.checkIn}
              // min={new Date()}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                if (hotelFilters?.checkOut && dayjs(e.target.value).isAfter(hotelFilters?.checkOut)) {
                  return toast.error('Check-in date must be before check-out date')
                  // return setHotelFilters({ ...hotelFilters, checkIn: e.target.value, checkOut: e.target.value })
                }
                setHotelFilters({ ...hotelFilters, checkIn: e.target.value })
              }}
            />
            <CustomDateInput
              label="Check-Out Date"
              placeholder="Enter Check-Out Date"
              value={hotelFilters?.checkOut}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                if (hotelFilters?.checkIn && dayjs(e.target.value).isBefore(hotelFilters?.checkIn)) {
                  return toast.error('Check-Out date must be after check-in date')
                }
                setHotelFilters({ ...hotelFilters, checkOut: e.target.value })
              }}
            />
          </div>
          {lowestPrice && (
            <div className="flex flex-col items-center justify-center bg-white p-3 rounded-lg gap-2">
              <p className="text-sm font-medium">Price starts from</p>
              <div className="flex items-center gap-2">
                <h1 className="text-primary text-3xl font-semibold">${lowestPrice}</h1>
                <span className="font-medium">per night</span>
              </div>
            </div>
          )}
          <div>
            {user ? (
              <CustomButton title="Book Now" className="w-full" onClick={handleBookingClick} />
            ) : (
              <Link href="/login">
                <CustomButton title="Login to Book" className="w-full" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
