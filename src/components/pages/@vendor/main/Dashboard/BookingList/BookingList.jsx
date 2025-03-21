'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { faChevronDown, faEdit, faEye, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '@/components/common/TableComponent';
import { vendorBookingList } from '@/services/APIs/vendor';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { BOOKING_STATUS, PAYMENT_STATUS } from '@/libs/constants';
import CustomButton from '@/components/common/CustomButton';
import { cn } from '@/libs/tailwind';
import Axios from '@/libs/axios';

dayjs.extend(duration);

const BookingList = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: '',
    status: 'All Status',
  });
  const [refetchData, setRefetchData] = useState(true); // Set to true initially to call API on load
  const debounceTimeout = useRef(null);

  const findDuration = (checkIn, checkOut) => {
    const diff = dayjs(checkOut).diff(dayjs(checkIn), 'day');
    // const durationFormatted = Math.round(dayjs.duration(diff).asDays());
    return `${diff + 1 || 0} days`;
  };

  const getStatusBadge = (status) => {
    return (
      <div
        className={`p-1 border text-center rounded-full ${status === PAYMENT_STATUS.CONFIRMED ? 'bg-[#D5F6E5]' : 'bg-[#FFEEEE]'
          }`}
      >
        {status}
      </div>
    );
  };

  // Debounce logic for search
  const handleSearchChange = (value) => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: value }));
      setRefetchData(true); // Trigger API call after debounce
    }, 500); // 500ms delay
  };

  // Handle status change
  const handleStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status }));
    setRefetchData(true); // Trigger API call
  };

  useEffect(() => {
    // Reset refetch flag after the data has been fetched
    // if (refetchData) {
    setRefetchData(false);
    // }
  }, []);


  const updateBookingStatus = async (bookingId, status) => {
    // try {
    //   const { data } = await Axios({ ...updateBookingStatusURL, data: { status } })
    // } catch (error) {
    //   console.error(error);
    // }
  }

  const columns = [
    {
      name: 'Guest',
      dataKey: 'guestUser',
      sortable: true,
      cell: (row) => <div>{`${row?.user?.firstName || ""} ${row?.user?.lastName || ""}`}</div>,
    },
    {
      name: 'Room',
      dataKey: 'roomType',
      cell: (row) => <div>{row?.rooms[0]?.roomType?.name}</div>,
      sortable: true,
    },
    {
      name: 'Request',
      dataKey: 'specialRequest',
      sortable: true,
    },
    {
      name: 'Duration',
      cell: (row) => <div>{findDuration(row.checkIn, row.checkOut)}</div>,
      sortable: true,
    },
    {
      name: 'Check-in & Check-out',
      cell: (row) => (
        <div>{`${dayjs(row.checkIn).format('MMMM DD, YYYY')} - ${dayjs(row.checkOut).format(
          'MMMM DD, YYYY'
        )}`}</div>
      ),
      dataKey: 'checkIn',
      sortable: true,
    },
    {
      name: 'Status',
      dataKey: 'status',
      cell: (row) => <div className="capitalize">{getStatusBadge(row.status)}</div>,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-4">
          <div
            className="cursor-pointer"
            onClick={() => router.push(`/vendor/reservations/${row._id}`)}
          >
            <FontAwesomeIcon icon={faEye} />
          </div>
          {BOOKING_STATUS.CANCELLED !== row?.status &&
            <div className={cn("py-1 px-2 rounded-md cursor-pointer", row?.status === BOOKING_STATUS.PENDING ? 'bg-[#D5F6E5]' : 'bg-[#FFEEEE]')}
              onClick={() => updateBookingStatus(row?._id, row?.status === BOOKING_STATUS.PENDING ? BOOKING_STATUS.CONFIRMED : BOOKING_STATUS.CANCELLED)}
            >
              {row?.status === BOOKING_STATUS.PENDING ? 'Confirm' : 'Cancel'}
            </div>}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white space-y-4 w-full">
      {/* Header with Filters */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Booking List</h2>

        <div className='flex gap-5'>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search guest, status, etc"
            defaultValue={filters.search} // Use defaultValue to avoid input lag
            onChange={(e) => handleSearchChange(e.target.value)}
            className="input bg-gray-100 w-full max-w-xs"
          />

          {/* Status Dropdown */}
          <div className="dropdown dropdown-end h-12">
            <label
              tabIndex={0}
              className="flex justify-between items-center px-4 min-w-44 h-full gap-2 bg-primary text-white rounded-md cursor-pointer"
            >
              <FontAwesomeIcon icon={faFilter} />
              {filters.status}
              <FontAwesomeIcon icon={faChevronDown} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 mt-2 shadow bg-base-100 rounded-box"
            >
              {['All Status', 'Confirmed', 'Pending', 'Cancelled'].map((option) => (
                <li key={option}>
                  <div onClick={() => handleStatusChange(option)}>{option}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Booking List Section */}
      <div>
        <Table
          columns={columns}
          refetchData={refetchData}
          enablePagination={true}
          dataURL={vendorBookingList}
          payloadObj={{
            additionalFilters: {
              status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
              searchColumns: [
                'specialRequest',
                'user.firstName',
                'user.lastName',
                'user.email',
                'user.gender',
              ],
              search: filters.search,
            },
            optionFilters: {
              populate: 'rooms user',
              lean: true,
            },
          }}
        />
      </div>
    </div>
  );
};

export default BookingList;
