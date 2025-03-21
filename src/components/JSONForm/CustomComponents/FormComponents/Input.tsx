// import React from "react";
// import PropTypes from "prop-types";
// import { Input } from "antd";
// import ErrorIcon from "@mui/icons-material/ErrorRounded";
// import EyeIcon from "@mui/icons-material/RemoveRedEyeRounded";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOffRounded";

// interface CustomInputProps {
// 	name: string;
// 	type?: "text" | "number" | "email" | "password";
// 	value?: string | number;
// 	note?: string;
// 	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// 	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
// 	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
// 	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
// 	placeholder?: string;
// 	className?: string;
// 	disabled?: boolean;
// 	error?: string;
// 	addonAfter?: React.ReactNode;
// 	addonBefore?: React.ReactNode;
// 	prefix?: React.ReactNode;
// 	suffix?: React.ReactNode;
// 	size?: "large" | "middle" | "small";
// 	autoComplete?: string;
// 	maxLength?: number;
// }

// const CustomInput: React.FC<CustomInputProps> = ({
// 	name,
// 	type = "text",
// 	value = "",
// 	note = "",
// 	onChange = () => {},
// 	onBlur = () => {},
// 	onFocus = () => {},
// 	onKeyDown = () => {},
// 	placeholder = "",
// 	className = "",
// 	disabled = false,
// 	error = "",
// 	addonAfter = false,
// 	addonBefore = false,
// 	prefix = false,
// 	suffix = <></>,
// 	size = "middle",
// 	autoComplete = "off",
// 	maxLength = undefined,
// }) => {
// 	const Comp = type === "password" ? Input.Password : Input;

// 	const passwordProps =
// 		type === "password"
// 			? {
// 					iconRender: (visible: boolean) =>
// 						visible ? <VisibilityOffIcon /> : <EyeIcon />,
// 					// <FontAwesomeIcon
// 					//     icon={visible ? faEyeSlash : faEye}
// 					//     color="#555"
// 					//     cursor="pointer"
// 					// />
// 					visibilityToggle: true,
// 			  }
// 			: {};

// 	return (
// 		<>
// 			<Comp
// 				id={name}
// 				name={name}
// 				type={type}
// 				placeholder={placeholder}
// 				className={`rounded-2 py-2 fs-6 ${className}`}
// 				disabled={disabled}
// 				value={value}
// 				onChange={
// 					disabled
// 						? () => {}
// 						: (e) => {
// 								onChange(e);
// 						  }
// 				}
// 				onBlur={onBlur}
// 				onFocus={onFocus}
// 				onKeyDown={onKeyDown}
// 				addonAfter={addonAfter}
// 				addonBefore={addonBefore}
// 				prefix={prefix}
// 				suffix={error ? <ErrorIcon /> : suffix}
// 				size={size}
// 				status={error ? "error" : undefined}
// 				autoComplete={autoComplete}
// 				maxLength={maxLength}
// 				{...passwordProps}
// 				styles={{
// 					input: {},
// 				}}
// 			/>
// 			{!error && note && (
// 				<span className="text-slate-400 text-sm font-medium">{note}</span>
// 			)}
// 			{error && (
// 				<span className="text-red-500 text-sm font-medium">{error}</span>
// 			)}
// 		</>
// 	);
// };

// CustomInput.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	type: PropTypes.oneOf(["text", "number", "email", "password"]),
// 	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// 	onChange: PropTypes.func,
// 	onBlur: PropTypes.func,
// 	onKeyDown: PropTypes.func,
// 	onFocus: PropTypes.func,
// 	placeholder: PropTypes.string,
// 	className: PropTypes.string,
// 	disabled: PropTypes.bool,
// 	error: PropTypes.string,
// 	addonAfter: PropTypes.node,
// 	addonBefore: PropTypes.node,
// 	prefix: PropTypes.node,
// 	suffix: PropTypes.node,
// 	size: PropTypes.oneOf(["large", "middle", "small"]),
// 	autoComplete: PropTypes.string,
// };

// export default CustomInput;
