// import React from "react";
// import PropTypes from "prop-types";
// // import { TimePicker } from "antd";
// import dayjs, { Dayjs } from "dayjs";
// import { TimePicker } from "antd";

// interface CustomTimePickerProps {
//     allowClear?: boolean;
//     className?: string;
//     cellRender?: (current: Dayjs, info: { isToday: boolean }) => React.ReactNode;
//     disabled?: boolean;
//     format?: string; // dayjs date format string
//     placeholder?: string;
//     size?: "large" | "middle" | "small";
//     value?: Dayjs | null;
//     onChange?: (time: Dayjs | null, timeString: string) => void;
//     error?: string;
//     use12Hours?: boolean;
// }

// const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
//     allowClear = true,
//     className = "",
//     cellRender,
//     disabled = false,
//     format = undefined,
//     placeholder = "",
//     size = "middle",
//     value = null,
//     onChange = () => {},
//     error = "",
//     use12Hours = true,
// }) => {
//     return (
//         <>
//             <TimePicker
//                 allowClear={allowClear}
//                 className={`w-full rounded-2 py-2 fs-6 ${className}`}
//                 // cellRender={cellRender}
//                 disabled={disabled}
//                 format={format}
//                 placeholder={placeholder}
//                 size={size}
//                 value={value ? dayjs(value) : null}
//                 onChange={disabled ? () => {} : onChange}
//                 status={error ? "error" : undefined}
//                 use12Hours={use12Hours}
//             />
//             {error && <span className="invalid-feedback">{error}</span>}
//         </>
//     );
// };

// CustomTimePicker.propTypes = {
//     allowClear: PropTypes.bool,
//     cellRender: PropTypes.func,
//     format: PropTypes.string,
//     placeholder: PropTypes.string,
//     size: PropTypes.oneOf(["large", "middle", "small"]),
//     value: PropTypes.any,
//     className: PropTypes.string,
//     onChange: PropTypes.func,
//     disabled: PropTypes.bool,
//     error: PropTypes.string,
//     use12Hours: PropTypes.bool,
// };

// export default CustomTimePicker;
