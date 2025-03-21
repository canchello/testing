"use client";
import React, { useEffect, useState } from "react";
import Axios from "@/libs/axios";
import { getFacilityList } from "@/services/APIs/hotel";
import hotelStore from "@/stores/hotelStore";
import CustomCheckbox from "@/components/form/CheckBox";
import { FACILITY_FILTER_PRICE_RANGE, facilityTypes } from "@/libs/constants";

const FacilityFilters = ({
  selectedFacilities, setSelectedFacilities,
  selectedPriceRange, setSelectedPriceRange
}) => {
  const { hotelFilters, fetchHotelList } = hotelStore();
  const [facilities, setFacilities] = useState([]);

  const fetchFacilityList = async () => {
    try {
      const { data } = await Axios({
        ...getFacilityList,
        data: {
          query: { type: facilityTypes.FACILITY },
          options: { pagination: false }
        }
      });
      setFacilities(data?.data?.data || []);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const handleCheckboxChange = async (id) => {
    const updatedFacilities = selectedFacilities.includes(id)
      ? selectedFacilities.filter((facilityId) => facilityId !== id)
      : [...selectedFacilities, id];

    setSelectedFacilities(updatedFacilities);

    // const payload = {
    //   query: {
    //     search: hotelFilters?.location?.toLowerCase(),
    //     searchColumns: ["city", "state", "country"],
    //     checkIn: new Date(hotelFilters?.checkIn),
    //     checkOut: new Date(hotelFilters?.checkOut),
    //     numberOfGuest:
    //       Number(hotelFilters?.adults) + Number(hotelFilters?.children) ?? 0,
    //     facilityId: !!updatedFacilities.length ? updatedFacilities : undefined,
    //     priceRange: selectedPriceRange, // Add selected price range to the payload
    //   },
    //   options: {
    //     page: 1,
    //     limit: 10,
    //     populate: ["primaryAttachment", "attachment"],
    //     sort: { "ratingCount": hotelFilters?.sort || -1 },
    //     lean: true,
    //   },
    // };
    // fetchHotelList(payload);
  };

  const handlePriceRangeChange = async (range) => {
    const updatedPriceRange = selectedPriceRange === range ? null : range; // Toggle selection
    setSelectedPriceRange(updatedPriceRange);

    // const payload = {
    //   query: {
    //     search: hotelFilters?.location?.toLowerCase(),
    //     searchColumns: ["city", "state", "country"],
    //     checkIn: new Date(hotelFilters?.checkIn),
    //     checkOut: new Date(hotelFilters?.checkOut),
    //     numberOfGuest:
    //       Number(hotelFilters?.adults) + Number(hotelFilters?.children) ?? 0,
    //     facilityId: selectedFacilities,
    //     priceRange: updatedPriceRange, // Send only the selected price range
    //   },
    //   options: {
    //     page: 1,
    //     limit: 10,
    //     populate: ["primaryAttachment", "attachment"],
    //     lean: true,
    //   },
    // };
    // fetchHotelList(payload);
  };

  useEffect(() => {
    fetchFacilityList();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Popular Filter</h2>
      <hr className="mb-4" />
      {facilities.length > 0 ? (
        <div className="space-y-2">
          {facilities.map((facility) => (
            <label key={facility._id} className="flex items-center space-x-2">
              <CustomCheckbox
                checked={selectedFacilities.includes(facility._id)}
                className="items-center"
                labelClassName="!text-sm !font-medium mt-1"
                label={<div>{facility.title}</div>}
                onChange={() => handleCheckboxChange(facility._id)}
              />
            </label>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No facilities available</div>
      )}
      <hr className="my-4" />
      <h2 className="text-lg font-bold mb-2">Price Per Night</h2>
      <div className="space-y-2">
        {FACILITY_FILTER_PRICE_RANGE.map((range, index) => (
          <label key={index} className="flex items-center space-x-2">
            <CustomCheckbox
              checked={selectedPriceRange === range.value}
              className="items-center"
              labelClassName="!text-sm !font-medium mt-1"
              label={<div>{range.title}</div>}
              onChange={() => handlePriceRangeChange(range.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default FacilityFilters;
