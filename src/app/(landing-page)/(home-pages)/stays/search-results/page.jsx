'use client'
import React, { useEffect, useState } from 'react'
import Filters from '@/components/pages/user/search-results/filters'
import Results from '@/components/pages/user/search-results/results'
import appStore from '@/stores/appStore'
import Loader from '@/components/common/Loader'
import hotelStore from '@/stores/hotelStore'
import FacilityFilters from '@/components/pages/user/search-results/facilityFilters'

const SearchResults = () => {
  const { locationCords } = appStore()
  const { hotelFilters, fetchHotelList, hotelList, loadinghotels } = hotelStore()
  const [state, setState] = useState({})
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null); // Single selection

  useEffect(() => {
    if (hotelFilters) {
      const payload = {
        query: {
          search: hotelFilters?.location?.toLowerCase(),
          "searchColumns": ["city", "state", "country"],
          checkIn: new Date(hotelFilters?.checkIn),
          checkOut: new Date(hotelFilters?.checkOut),
          numberOfGuest: (Number(hotelFilters?.adults) + Number(hotelFilters?.children)) ?? 0,
          priceRange: selectedPriceRange ? selectedPriceRange : undefined,
          facilityId: !!selectedFacilities?.length ? selectedFacilities : undefined
          // location: [String(locationCords.latitude), String(locationCords.longitude)]
        },
        options: {
          page: 1,
          limit: 10,
          populate: ["primaryAttachment", "facilities"],
          lean: true
        }
      }
      fetchHotelList(payload)
      setState(prev => ({
        ...(prev || {}),
        checkIn: new Date(hotelFilters?.checkIn),
        checkOut: new Date(hotelFilters?.checkOut)
      }))
    }
    else {
      fetchHotelList({})
    }
  }, [locationCords])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col md:flex-row gap-4'>
        <div>
          <Filters
            state={state}
            setState={setState}
            {...{ selectedFacilities, selectedPriceRange }}
          />
          <FacilityFilters
            {...{
              selectedFacilities, setSelectedFacilities,
              selectedPriceRange, setSelectedPriceRange
            }}
          />
        </div>
        <div className='flex-1'>
          {loadinghotels ?
            <Loader />
            :
            <Results
              data={hotelList || []}
              checkIn={state.checkIn}
              checkOut={state.checkOut}
            />}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
