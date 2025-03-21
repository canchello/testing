// import React from "react";
// import PropTypes from "prop-types";
// import { Switch } from "antd";

// interface CustomSwitchProps {
//     value?: boolean;
//     onChange?: (checked: boolean) => void;
//     label?: string;
//     disabled?: boolean;
//     error?: string;
//     className?: string;
// }

// const CustomSwitch: React.FC<CustomSwitchProps> = ({
//     value = false,
//     onChange = () => {},
//     label = "",
//     disabled = false,
//     error = "",
//     className = "",
// }) => {
//     return (
//         <>
//             <div>
//                 <Switch
//                     disabled={disabled}
//                     checked={value}
//                     onChange={disabled ? () => {} : onChange}
//                     className={`${className} ${error ? "text-bg-danger" : ""}`}
//                 />
//                 {label && <span className="form-label ms-2">{label}</span>}
//             </div>
//             {error && <span className="invalid-feedback">{error}</span>}
//         </>
//     );
// };

// CustomSwitch.propTypes = {
//     label: PropTypes.string,
//     className: PropTypes.string,
//     value: PropTypes.bool,
//     onChange: PropTypes.func,
//     disabled: PropTypes.bool,
//     error: PropTypes.string,
// };

// export default CustomSwitch;
