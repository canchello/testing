// import React, { Fragment } from "react";
// import { Checkbox } from "antd";
// import PropTypes from "prop-types";

// interface CheckboxOption {
//     label: string;
//     value: string | number;
//     disabled?: boolean;
// }

// interface CustomCheckboxProps {
//     name: string;
//     disabled?: boolean;
//     onChange?: (checkedValues: any) => void;
//     value?: (string | number)[];
//     options?: (string | number | CheckboxOption)[];
//     error?: string;
// }

// const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
//     name,
//     disabled = false,
//     onChange = () => {},
//     value = [],
//     options = [],
//     error = "",
// }) => {
//     return (
//         <>
//             <Checkbox.Group
//                 name={name}
//                 value={value}
//                 disabled={disabled}
//                 onChange={!disabled ? onChange : () => {}}
//                 className="gap-2"
//             >
//                 {options.map((option, index) => (
//                     <Fragment key={`${name}-${index}`}>
//                         <Checkbox
//                             value={typeof option === "object" ? option.value : option}
//                             disabled={typeof option === "object" ? option.disabled : disabled}
//                             className={error ? "text-danger" : ""}
//                         >
//                             {typeof option === "object" ? option.label : option}
//                         </Checkbox>
//                     </Fragment>
//                 ))}
//             </Checkbox.Group>
//             {error && <span className="invalid-feedback">{error}</span>}
//         </>
//     );
// };

// CustomCheckbox.propTypes = {
//     name: PropTypes.string.isRequired,
//     disabled: PropTypes.bool,
//     onChange: PropTypes.func,
//     value: PropTypes.any,
//     options: PropTypes.array,
//     error: PropTypes.string,
// };

// export default CustomCheckbox;
