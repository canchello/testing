'use client';
import React, { useState, useRef, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS file
import CustomButton from '@/components/common/CustomButton';

const Filters = ({ filters, onFiltersChange }) => {
  const [searchInput, setSearchInput] = useState(filters?.search || ''); // Local state for input value
  const debounceTimeout = useRef(null); // Ref for debounce timeout

  // Handle debounced search
  const handleSearchChange = (value) => {
    setSearchInput(value); // Update local state
    clearTimeout(debounceTimeout.current); // Clear previous timeout
    debounceTimeout.current = setTimeout(() => {
      onFiltersChange({ search: value }); // Call parent function after debounce delay
    }, 500); // 500ms debounce delay
  };

  return (
    <div className="flex items-center gap-2 h-12">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
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
