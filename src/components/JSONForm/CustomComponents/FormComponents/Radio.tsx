// import React, { Fragment } from "react";
// import { Radio, Space } from "antd";
// import PropTypes from "prop-types";

// interface Option {
//     label: string;
//     value: string | number;
//     disabled?: boolean;
// }

// interface CustomRadioProps {
//     name: string;
//     value?: string | number;
//     onChange?: (e: any) => void;
//     options?: (string | number | Option)[];
//     disabled?: boolean;
//     error?: string;
//     direction?: "vertical" | "horizontal";
// }

// const CustomRadio: React.FC<CustomRadioProps> = ({
//     name,
//     value = "",
//     onChange = () => {},
//     options = [],
//     disabled = false,
//     error = "",
//     direction = "horizontal",
// }) => {
//     return (
//         <>
//             <Radio.Group
//                 onChange={disabled ? () => {} : onChange}
//                 value={value}
//                 disabled={disabled}
//             >
//                 <Space direction={direction} wrap>
//                     {options.map((option, index) => (
//                         <Fragment key={`${name}-${index}`}>
//                             <Radio
//                                 value={
//                                     typeof option === "object"
//                                         ? option.value
//                                         : option
//                                 }
//                                 disabled={
//                                     typeof option === "object"
//                                         ? option.disabled
//                                         : disabled
//                                 }
//                                 className={error ? "text-danger" : ""}
//                             >
//                                 {typeof option === "object"
//                                     ? option.label
//                                     : option}
//                             </Radio>
//                         </Fragment>
//                     ))}
//                 </Space>
//             </Radio.Group>
//             {error && <span className="text-sm text-red-500">{error}</span>}
//         </>
//     );
// };

// CustomRadio.propTypes = {
//     name: PropTypes.string.isRequired,
//     disabled: PropTypes.bool,
//     onChange: PropTypes.func,
//     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     options: PropTypes.array,
//     error: PropTypes.string,
//     direction: PropTypes.oneOf(["vertical", "horizontal"]),
// };

// export default CustomRadio;
