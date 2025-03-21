// import React from "react";
// import PropTypes from "prop-types";
// import { InputNumber } from "antd";

// interface CustomNumberInputProps {
//     name: string;
//     value?: string | number;
//     onChange?: (value: number | string | null) => void;
//     onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
//     onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
//     placeholder?: string;
//     className?: string;
//     disabled?: boolean;
//     error?: string;
//     addonAfter?: React.ReactNode;
//     addonBefore?: React.ReactNode;
//     prefix?: React.ReactNode;
//     suffix?: React.ReactNode;
//     size?: "large" | "middle" | "small";
//     formatter?: (value: number | string) => string;
//     precision?: number;
// }

// const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
//     name,
//     value = "",
//     onChange = () => {},
//     onBlur = () => {},
//     onFocus = () => {},
//     placeholder = "",
//     className = "",
//     disabled = false,
//     error = "",
//     addonAfter = false,
//     addonBefore = false,
//     prefix = false,
//     suffix = false,
//     size = "middle",
//     formatter = undefined,
//     precision = 0,
// }) => {
//     return (
//         <>
//             <InputNumber
//                 id={name}
//                 name={name}
//                 placeholder={placeholder}
//                 className={`w-100 ${className}`}
//                 disabled={disabled}
//                 readOnly={disabled}
//                 value={value}
//                 onChange={disabled ? () => {} : onChange}
//                 onBlur={onBlur}
//                 onFocus={onFocus}
//                 addonAfter={addonAfter}
//                 addonBefore={addonBefore}
//                 prefix={prefix}
//                 suffix={suffix}
//                 size={size}
//                 status={error ? "error" : undefined}
//                 changeOnWheel={false}
//                 formatter={formatter}
//                 precision={precision}
//             />
//             {error && <span className="text-xs text-red-500">{error}</span>}
//         </>
//     );
// };

// CustomNumberInput.propTypes = {
//     name: PropTypes.string.isRequired,
//     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     onChange: PropTypes.func,
//     onBlur: PropTypes.func,
//     onFocus: PropTypes.func,
//     placeholder: PropTypes.string,
//     className: PropTypes.string,
//     disabled: PropTypes.bool,
//     error: PropTypes.string,
//     addonAfter: PropTypes.node,
//     addonBefore: PropTypes.node,
//     prefix: PropTypes.node,
//     suffix: PropTypes.node,
//     size: PropTypes.oneOf(["large", "middle", "small"]),
//     formatter: PropTypes.func,
//     precision: PropTypes.number,
// };

// export default CustomNumberInput;
