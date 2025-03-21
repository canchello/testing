'use client'
import CustomButton from "@/components/common/CustomButton";
import { ROUTES } from "@/libs/constants";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Filters = ({ filters = {}, onChangeFilter = (data) => { } }) => {

  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        placeholder="Search room type, price, etc."
        value={filters.search}
        onChange={(e) => onChangeFilter({ search: e.target.value })}
        className="input bg-gray-100 w-full max-w-xs"
      />
      <div className="flex items-center space-x-2">
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1">
            Sort by
            <FontAwesomeIcon icon={faChevronDown} />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={() => onChangeFilter({ sort: 'rating' })}>
              <a className="flex justify-between">
                <span>Popular</span>
                {filters.sort === 'rating' && <FontAwesomeIcon icon={faCheck} />}
              </a>
            </li>
            <li onClick={() => onChangeFilter({ sort: 'price' })}>
              <a className="flex justify-between">
                <span>Price</span>
                {filters.sort === 'price' && <FontAwesomeIcon icon={faCheck} />}
              </a>
            </li>
          </ul>
        </div>
        {/* <div className="dropdown">
          <label tabIndex={0} className="btn m-1">
            All Types
            <FontAwesomeIcon icon={faChevronDown} />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Single</a></li>
            <li><a>Suite</a></li>
          </ul>
        </div> */}
        <Link href={`${ROUTES.VENDOR.ONBOARD}?step=2`}>
          <CustomButton
            title="Add Room"
            className="rounded-md"
          />
        </Link>
      </div>
    </div>
  );
};

export default Filters;

