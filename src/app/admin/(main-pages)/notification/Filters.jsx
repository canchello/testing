'use client';
import React, { useState, useRef, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
import CustomButton from '@/components/common/CustomButton';

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
    onFiltersChange({
      filterRange: [newRange.startDate, newRange.endDate],
    });
    setShowDatePicker(false); // Close the picker after selecting dates
  };

  return (
    <div className="flex items-center gap-2 h-12">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search notification"
        value={searchInput}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="input bg-gray-100 w-full max-w-xs"
      />

      {/* Add Booking Button */}
      {/* <CustomButton title="Search" className="rounded-lg !px-4 !py-2" /> */}
    </div>
  );
};

export default Filters;
