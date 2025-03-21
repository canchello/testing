'use client'
import TableComponent from "@/components/common/TableComponent";
// import Filters from "../Filters";
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { getOwnerRoomListURL } from "@/services/APIs/admin";
import CustomButton from "@/components/common/CustomButton";
import { BED_TYPES } from "@/libs/constants";
import { useDebounce } from "react-use";
dayjs.extend(duration);

const RoomListingTable = ({ property }) => {
  const [searchInput, setSearchInput] = useState(''); // Local state for input value
  const [refetchData, setRefetchData] = useState(false)
  const [newSearch, setNewSearch] = useState('');
  useDebounce(() => setNewSearch(searchInput), 500, [searchInput]);

  // Handle debounced search
  // const handleSearchChange = (value) => {
  //   setSearchInput(value); // Update local state
  //   clearTimeout(debounceTimeout.current); // Clear previous timeout
  //   debounceTimeout.current = setTimeout(() => {
  //     onFiltersChange({ search: value }); // Call parent function after debounce delay
  //   }, 500); // 500ms debounce delay
  // };

  const columns = [
    {
      name: 'Room Type',
      dataKey: 'roomType',
      cell: row => <div>{row?.name}</div>,
      sortable: true,
    },
    {
      name: 'Total bed',
      cell: row => <div>{row?.numberOfBed || 0}</div>,
      sortable: true,
    },
    {
      name: 'Bed type',
      cell: row => <div>{BED_TYPES?.[row?.bedType]?.replace(/_/g, ' ') || "-"}</div>,
      sortable: true,
    },
    {
      name: 'No. Person Stay',
      cell: row => <div>{row?.numberOfGuest || 0}</div>,
      sortable: true,
    },
    {
      name: 'No. of Bathroom',
      cell: row => <div>{row?.numberOfBathrooms || 0}</div>,
      sortable: true,
    },
  ]

  useEffect(() => {
    setRefetchData(true)
  }, [newSearch])

  console.log('property', property)

  return (
    <div className="py-4">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-semibold">Property Listing</h2>
        <div className="flex items-center gap-2 h-12">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="input bg-gray-100 w-full max-w-xs"
          />

          {/* <CustomButton title="Search" className="rounded-lg !px-4 !py-2" /> */}
        </div>
      </div>
      <TableComponent
        columns={columns}
        refetchData={refetchData}
        enablePagination={true}
        dataURL={getOwnerRoomListURL(property?._id)}
        // rowClickable={getSubdomain() === USER_ROLES.ADMIN}
        // onRowClick={(row) => getSubdomain() === USER_ROLES.ADMIN && router.push(`/admin/bookings/${row._id}`)}
        payloadObj={{
          additionalFilters: {
            // userId: property?.userId,
            searchColumns: [
              'name',
              'size',
            ],
            search: newSearch ? newSearch : undefined,
          },
          optionFilters: {
            // "populate": "rooms user", // [property]
            // "lean": true,
            // "findOne": true
          }
        }}
      />
    </div>
  );
};

export default RoomListingTable;
