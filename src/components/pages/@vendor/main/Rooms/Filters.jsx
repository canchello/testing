'use client'
import CustomButton from "@/components/common/CustomButton";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Filters = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        placeholder="Search room type, number, etc"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input bg-gray-100 w-full max-w-xs"
      />
      <div className="flex items-center space-x-2">
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1">
            Sort by
            <FontAwesomeIcon icon={faChevronDown} />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Popular</a></li>
            <li><a>Price</a></li>
          </ul>
        </div>
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1">
            All Types
            <FontAwesomeIcon icon={faChevronDown} />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Single</a></li>
            <li><a>Suite</a></li>
          </ul>
        </div>
        <CustomButton
          title="Add Room"
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default Filters;

