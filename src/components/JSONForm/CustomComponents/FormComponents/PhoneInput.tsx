// import React from "react";
// // import PhoneInput from "react-phone-input-2";
// import PropTypes from "prop-types";

// interface CustomPhoneInputProps {
//     value?: string;
//     placeholder?: string;
//     disabled?: boolean;
//     onChange?: (value: string) => void;
//     error?: string;
// }

// const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
//     value = "",
//     placeholder = "",
//     disabled = false,
//     onChange = () => {},
//     error = "",
// }) => {
//     return (
//         <>
//             {/* <PhoneInput
//                 country={"us"}
//                 value={value}
//                 placeholder={placeholder}
//                 onChange={(...args) => {
//                     if (!disabled) onChange(...args);
//                 }}
//                 disabled={disabled}
//                 inputClass={error ? "border-danger" : ""}
//                 buttonClass={error ? "border-danger" : ""}
//             />
//             {error && <span className="invalid-feedback">{error}</span>} */}
//         </>
//     );
// };

// CustomPhoneInput.propTypes = {
//     value: PropTypes.string,
//     placeholder: PropTypes.string,
//     onChange: PropTypes.func,
//     disabled: PropTypes.bool,
//     error: PropTypes.string,
// };

// export default CustomPhoneInput;
