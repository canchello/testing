'use client'
import TableComponent from "@/components/common/TableComponent";
import Filters from "../Filters";
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from "react";
import { vendorBookingList } from "@/services/APIs/vendor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { getImage, getSubdomain } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { USER_ROLES } from "@/libs/constants";
import { useDebounce } from "react-use";
import { getOwnerBookingListURL } from "@/services/APIs/admin";
dayjs.extend(duration);

const BookingHistoryTable = ({ bookingDetails, userDetails }) => {
  const router = useRouter()
  const [filters, setFilters] = useState({
    search: '',
    status: 'All Status',
    filterRange: [],
  });
  const [refetchData, setRefetchData] = useState(true); // Set to true initially to call API on load
  const [newSearch, setNewSearch] = useState('');
  useDebounce(() => setNewSearch(filters.search), 500, [filters.search]);

  const columns = [
    {
      name: 'Image',
      dataKey: 'attachment',
      sortable: true,
      cell: row => <img className="h-16 w-16" src={getImage(row?.rooms[0].roomType?.attachment?.fileUrl)} />
    },
    {
      name: 'Booking ID',
      dataKey: '_id',
      cell: row => <div>{row?._id}</div>,
      sortable: true,
    },
    {
      name: 'Booking date',
      cell: row => <div>{`${dayjs(row.createdAt).format("MMMM DD, YYYY")}`}</div>,
      dataKey: 'createdAt',
      sortable: true,
    },
    {
      name: 'Room Type',
      dataKey: '_id',
      cell: row => <div>{row?.rooms[0].roomType?.name}</div>,
      sortable: true,
    },
    {
      name: 'Room Number',
      dataKey: '_id',
      cell: row => <div>{row?.rooms[0]?.roomNumber}</div>,
      sortable: true,
    },
    {
      name: 'Check-In',
      cell: row => <div>{`${dayjs(row.checkIn).format("MMMM DD, YYYY")}`}</div>,
      dataKey: 'checkIn',
      sortable: true,
    },
    {
      name: 'Check-Out',
      cell: row => <div>{`${dayjs(row.checkOut).format("MMMM DD, YYYY")}`}</div>,
      dataKey: 'checkIn',
      sortable: true,
    },
    {
      name: 'Guests',
      cell: row => <div>{`${row?.rooms[0].roomType.numberOfGuest} Guest${row?.rooms[0].roomType?.numberOfGuest > 1 && "s"}`}</div>,
      dataKey: 'rooms',
      sortable: true,
    },
    // {
    //   name: "",
    //   cell: row => (<div className='flex gap-4'>
    //     <div className="cursor-pointer" onClick={() => { }}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
    //   </div>)
    // }
  ]

  useEffect(() => {
    setRefetchData(true)
  }, [newSearch, filters.filterRange])

  const isAdmin = getSubdomain() === USER_ROLES.ADMIN

  return (
    <div className="py-4">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-semibold">Booking History</h2>
        <Filters
          filters={filters}
          onFiltersChange={(data) => setFilters(prev => ({ ...prev, ...data }))}
          showStatus={false}
        />
      </div>
      <TableComponent
        columns={columns}
        refetchData={refetchData}
        setRefetchData={setRefetchData}
        enablePagination={true}
        dataURL={isAdmin ? getOwnerBookingListURL : vendorBookingList}
        rowClickable={isAdmin}
        onRowClick={(row) => isAdmin && router.push(`/admin/bookings/${row._id}`)}
        payloadObj={{
          additionalFilters: {
            userId: bookingDetails?.userId || userDetails?._id,
            searchColumns: [
              'id',
              'paymentMethod',
              'specialRequest',
              'guestUser.email',
              'guestUser.firstName',
              'guestUser.lastName',
              'user.email',
              'user.firstName',
              'user.lastName',
              'roomNumber',
            ],
            search: newSearch ? newSearch : undefined,
            dateRange: filters.filterRange?.[0] && filters.filterRange?.[1] ?
              {
                checkIn: [filters.filterRange[0], filters.filterRange[1]]
              } : undefined,
          },
          optionFilters: {
            "populate": "rooms user", // [property]
            "lean": true,
          }
        }}
      />
    </div>
  );
};

export default BookingHistoryTable;
