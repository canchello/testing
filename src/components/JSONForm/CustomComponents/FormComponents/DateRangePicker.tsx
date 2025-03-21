// import React from "react";
// import PropTypes from "prop-types";
// import { DatePicker } from "antd";
// import dayjs, { Dayjs } from "dayjs";

// interface CustomDateRangePickerProps {
//     allowClear?: boolean;
//     className?: string;
//     cellRender?: (current: Dayjs, info: { from?: Dayjs }) => React.ReactNode;
//     disabled?: boolean | boolean[];
//     disabledDate?: (current: Dayjs) => boolean;
//     disabledTime?: () => { disabledHours?: number[]; disabledMinutes?: number[]; disabledSeconds?: number[] };
//     format?: string;
//     minDate?: Dayjs | null;
//     maxDate?: Dayjs | null;
//     picker?: "date" | "week" | "month" | "quarter" | "year";
//     placeholder?: string | string[];
//     size?: "large" | "middle" | "small";
//     showTime?: boolean;
//     value?: [Dayjs | null, Dayjs | null];
//     onChange?: (values: [Dayjs | null, Dayjs | null], strings: [string, string], info: any) => void;
//     error?: string;
//     allowEmpty?: boolean;
//     separator?: React.ReactNode;
// }

// const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
//     allowClear = true,
//     className = "",
//     cellRender,
//     disabled = false,
//     disabledDate = () => false,
//     disabledTime = () => ({}),
//     format = "DD-MM-YYYY",
//     minDate = null,
//     maxDate = null,
//     picker = "date",
//     placeholder = "",
//     size = "middle",
//     showTime = false,
//     value = [null, null],
//     onChange = () => {},
//     error = "",
//     allowEmpty = false,
//     separator = null,
// }) => {
//     return (
//         <>
//             <DatePicker.RangePicker
//                 allowClear={allowClear}
//                 className={`w-100 rounded-2 py-2 fs-6 ${className}`}
//                 // cellRender={cellRender}
//                 // disabled={disabled}
//                 disabledDate={disabledDate}
//                 disabledTime={disabledTime}
//                 // format={showTime ? false : format}
//                 minDate={minDate}
//                 maxDate={maxDate}
//                 picker={picker}
//                 // placeholder={placeholder}
//                 size={size}
//                 showTime={showTime}
//                 // value={value.map((a) => (a ? dayjs(a) : null))}
//                 onCalendarChange={(values, strings, info) => {
//                     if (
//                         info.range === "start" &&
//                         (Array.isArray(disabled) ? !disabled[0] : !disabled)
//                     ) {
//                         onChange(values as [Dayjs | null, Dayjs | null], strings as [string, string], info);
//                     }
//                     if (
//                         info.range === "end" &&
//                         (Array.isArray(disabled) ? !disabled[1] : !disabled)
//                     ) {
//                         onChange(values as [Dayjs | null, Dayjs | null], strings as [string, string], info);
//                     }
//                 }}
//                 status={error ? "error" : undefined}
//                 allowEmpty={allowEmpty}
//                 separator={separator}
//             />
//             {error && <span className="invalid-feedback">{error}</span>}
//         </>
//     );
// };

// CustomDateRangePicker.propTypes = {
//     allowClear: PropTypes.bool,
//     cellRender: PropTypes.func,
//     disabledDate: PropTypes.func,
//     format: PropTypes.string,
//     minDate: PropTypes.any,
//     maxDate: PropTypes.any,
//     picker: PropTypes.oneOf(["date", "week", "month", "quarter", "year"]),
//     placeholder: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.arrayOf(PropTypes.string),
//     ]),
//     size: PropTypes.oneOf(["large", "middle", "small"]),
//     showTime: PropTypes.bool,
//     value: PropTypes.any,
//     className: PropTypes.string,
//     onChange: PropTypes.func,
//     disabled: PropTypes.oneOfType([
//         PropTypes.bool,
//         PropTypes.arrayOf(PropTypes.bool),
//     ]),
//     error: PropTypes.string,
//     allowEmpty: PropTypes.bool,
//     separator: PropTypes.node,
// };

// export default CustomDateRangePicker;
