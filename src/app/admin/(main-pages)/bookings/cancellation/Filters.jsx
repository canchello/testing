'use client';
import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
import { format } from 'date-fns';
import CustomButton from '@/components/common/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChevronDown, faFilter } from '@fortawesome/free-solid-svg-icons';

const Filters = ({ filters, onFiltersChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchInput, setSearchInput] = useState(filters?.search || ''); // Local state for input value
  const datePickerRef = useRef(null); // Ref to detect clicks outside the picker
  const debounceTimeout = useRef(null); // Ref for debounce timeout

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle debounced search
  const handleSearchChange = (value) => {
    setSearchInput(value); // Update local state
    clearTimeout(debounceTimeout.current); // Clear previous timeout
    debounceTimeout.current = setTimeout(() => {
      onFiltersChange({ search: value }); // Call parent function after debounce delay
    }, 500); // 500ms debounce delay
  };

  // Handle date range change
  const handleDateChange = (ranges) => {
    const newRange = ranges.selection;

    // Convert startDate and endDate to start and end of the day
    const startDate = startOfDay(newRange.startDate);
    const endDate = endOfDay(newRange.endDate);

    // Keep picker open until both dates are selected
    if (newRange.startDate !== newRange.endDate) setShowDatePicker(false);

    onFiltersChange({
      filterRange: [startDate, endDate],
    });
  };

  return (
    <div className="flex items-center gap-2 h-12">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search guest, status, etc"
        value={searchInput}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="input bg-gray-100 w-full max-w-xs"
      />

      {/* Status Dropdown */}
      <div className="dropdown dropdown-end h-12">
        <label
          tabIndex={0}
          className="flex justify-between items-center px-4 min-w-44 h-full gap-2 bg-gray-100 rounded-md"
        >
          <FontAwesomeIcon icon={faFilter} />
          {filters?.status}
          <FontAwesomeIcon icon={faChevronDown} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 mt-2 shadow bg-base-100 rounded-box"
        >
          {['All Status', 'Confirmed', 'Pending', 'Cancelled'].map((option) => (
            <li key={option}>
              <div onClick={() => onFiltersChange({ status: option })}>{option}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Date Range Picker */}
      <div className="dropdown dropdown-end h-12 relative" ref={datePickerRef}>
        <button
          aria-label="Options"
          className="flex items-center gap-2 px-4 bg-gray-100 rounded-md min-w-52 h-full"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <FontAwesomeIcon icon={faCalendar} />
          {filters?.filterRange[0]
            ? `${format(filters?.filterRange[0], 'dd MMM')} - ${format(filters?.filterRange[1], 'dd MMM')}`
            : 'Select Date'}
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        {showDatePicker && (
          <div
            className="absolute z-[1] mt-1 p-2 bg-white shadow-md rounded-lg"
            style={{ top: '100%', left: 0 }}
          >
            <DateRange
              ranges={[
                {
                  startDate: filters?.filterRange[0] || new Date(),
                  endDate: filters?.filterRange[1] || new Date(),
                  key: 'selection',
                },
              ]}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
            />
          </div>
        )}
      </div>

      {/* Add Booking Button */}
      <CustomButton title="Search" className="rounded-lg !px-4 !py-2" />
    </div>
  );
};

export default Filters;
