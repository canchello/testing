'use client'
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
import { format } from 'date-fns';
import CustomButton from '@/components/common/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChevronDown, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

const Filters = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Status');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  let formattedDateRange;
  if (dateRange.endDate) {
    const startMonth = format(dateRange.startDate, 'MMMM');
    const endMonth = format(dateRange.endDate, 'MMMM');
    const endDateString = endMonth === startMonth ? format(dateRange.endDate, 'dd') : format(dateRange.endDate, 'dd MMM, yyyy');
    formattedDateRange = `${format(dateRange.startDate, 'dd MMM')} - ${endDateString}`;
  } else {
    formattedDateRange = format(dateRange.startDate || new Date(), 'dd MMM, yyyy');
  }

  const handleDateChange = (ranges) => {
    setDateRange(ranges.selection);
    setShowDatePicker(false);
  };

  return (
    <div className="flex items-center gap-2 h-12">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search guest, status, etc"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input bg-gray-100 w-full max-w-xs"
      />

      {/* Status Dropdown */}
      <div className="dropdown dropdown-end h-12">
        <label tabIndex={0} className="flex justify-between items-center px-4 min-w-44 h-full gap-2 whitespace-nowrap bg-gray-100 rounded-md text-gray-800">
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faFilter} />
            {status}
          </div>
          <FontAwesomeIcon icon={faChevronDown} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 mt-2 shadow bg-base-100 rounded-box"
        >
          {['All Status', 'Confirmed', 'Pending', 'Cancelled'].map((option) => (
            <li key={option}>
              <div onClick={() => setStatus(option)}>{option}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Date Picker */}
      <div className='dropdown dropdown-end h-12'>
        <button
          aria-label='Options'
          className='flex items-center justify-center gap-2 min-w-16 px-4 h-full whitespace-nowrap bg-gray-100 rounded-md text-gray-800'
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <FontAwesomeIcon icon={faCalendar} />
          {formattedDateRange}
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {showDatePicker && (
          <div tabIndex={0} className='dropdown-content menu z-[1] mt-1 p-2'>
            <DateRange
              ranges={[dateRange]}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
            />
          </div>
        )}
      </div>

      {/* Add Booking Button */}
      <CustomButton
        title="Add Booking"
        className='rounded-lg !px-4 !py-2'
      />
    </div>
  );
};

export default Filters;
