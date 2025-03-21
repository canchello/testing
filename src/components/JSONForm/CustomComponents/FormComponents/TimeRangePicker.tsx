// import React from "react";
// import PropTypes from "prop-types";
// import dayjs, { Dayjs } from "dayjs";

// interface CustomTimeRangePickerProps {
// 	allowClear?: boolean;
// 	className?: string;
// 	cellRender?: (current: Dayjs, info: { isToday: boolean }) => React.ReactNode;
// 	disabled?: boolean | boolean[];
// 	format?: string; // dayjs date format string
// 	placeholder?: string | string[];
// 	size?: "large" | "middle" | "small";
// 	value?: [Dayjs | null, Dayjs | null];
// 	onChange?: (
// 		values: [Dayjs | null, Dayjs | null],
// 		strings: [string, string],
// 		info: { range: "start" | "end" }
// 	) => void;
// 	error?: string;
// 	use12Hours?: boolean;
// }

// const CustomTimeRangePicker: React.FC<CustomTimeRangePickerProps> = ({
// 	allowClear = true,
// 	className = "",
// 	cellRender,
// 	disabled = false,
// 	format = undefined,
// 	placeholder = "",
// 	size = "middle",
// 	value = [null, null],
// 	onChange = () => {},
// 	error = "",
// 	use12Hours = true,
// }) => {
// 	return (
// 		<>
// 			{/* <TimePicker.RangePicker
//                 allowClear={allowClear}
//                 className={`w-100 rounded-2 py-2 fs-6 ${className}`}
//                 cellRender={cellRender}
//                 disabled={disabled}
//                 format={format}
//                 placeholder={Array.isArray(placeholder) ? placeholder : [placeholder, placeholder]}
//                 size={size}
//                 value={value.map((a) => (a ? dayjs(a) : null))}
//                 onCalendarChange={(values, strings, info) => {
//                     if (
//                         info.range === "start" &&
//                         (Array.isArray(disabled) ? !disabled[0] : !disabled)
//                     ) {
//                         onChange(values, strings, info);
//                     }
//                     if (
//                         info.range === "end" &&
//                         (Array.isArray(disabled) ? !disabled[1] : !disabled)
//                     ) {
//                         onChange(values, strings, info);
//                     }
//                 }}
//                 status={error ? "error" : undefined}
//                 use12Hours={use12Hours}
//             /> */}
// 			{error && <span className="invalid-feedback">{error}</span>}
// 		</>
// 	);
// };

// CustomTimeRangePicker.propTypes = {
// 	allowClear: PropTypes.bool,
// 	cellRender: PropTypes.func,
// 	format: PropTypes.string,
// 	placeholder: PropTypes.oneOfType([
// 		PropTypes.string,
// 		PropTypes.arrayOf(PropTypes.string),
// 	]),
// 	size: PropTypes.oneOf(["large", "middle", "small"]),
// 	value: PropTypes.any,
// 	className: PropTypes.string,
// 	onChange: PropTypes.func,
// 	disabled: PropTypes.oneOfType([
// 		PropTypes.bool,
// 		PropTypes.arrayOf(PropTypes.bool),
// 	]),
// 	error: PropTypes.string,
// 	use12Hours: PropTypes.bool,
// };

// export default CustomTimeRangePicker;
