// import React from "react";
// import Select from "react-select";
// import PropTypes from "prop-types";
// import FaiBox from "MuiComponents/FaiBox";
// import FaiTypography from "MuiComponents/FaiTypography";
// import FaiSelect from "MuiComponents/FaiSelect";

// interface LabeledValue {
// 	label: string;
// 	value: string | number;
// }

// interface CustomSelectProps {
// 	label?: string;
// 	isRequired?: boolean;
// 	allowClear?: boolean;
// 	disabled?: boolean;
// 	labelInValue?: boolean;
// 	loading?: boolean;
// 	multiple?: boolean;
// 	notFoundContent?: React.ReactNode;
// 	options?: LabeledValue[] | string[];
// 	optionRender?: (option: LabeledValue) => React.ReactNode;
// 	placeholder?: string;
// 	size?: "large" | "middle" | "small";
// 	labelRender?: (label: React.ReactNode) => React.ReactNode;
// 	value?: string | number | LabeledValue | (string | number | LabeledValue)[];
// 	onChange?: (
// 		value: string | number | LabeledValue | (string | number | LabeledValue)[]
// 	) => void;
// 	error?: string;
// 	caption?: string;
// }

// const CustomSelect: React.FC<CustomSelectProps> = ({
// 	label,
// 	isRequired = false,
// 	allowClear = false,
// 	disabled = false,
// 	labelInValue = false,
// 	loading = false,
// 	multiple = false,
// 	notFoundContent = null,
// 	options = [],
// 	optionRender,
// 	placeholder = "Select...",
// 	size = "middle",
// 	labelRender,
// 	value,
// 	onChange = () => {},
// 	error = "",
// 	caption = "",
// }) => {
// 	// Convert string options to objects if necessary
// 	const formattedOptions =
// 		typeof options[0] === "string"
// 			? options.map((option) => ({ label: option, value: option }))
// 			: options;

// 	const customStyles = {
// 		control: (base: any) => ({
// 			...base,
// 			minHeight: size === "large" ? 50 : 40, // Example size control
// 			height: "auto",
// 		}),
// 	};

// 	return (
// 		<FaiBox>
// 			<FaiSelect
// 				// className="w-100"
// 				isClearable={allowClear}
// 				isDisabled={disabled}
// 				isLoading={loading}
// 				isMulti={multiple}
// 				options={formattedOptions}
// 				formatOptionLabel={optionRender}
// 				placeholder={placeholder}
// 				isSearchable
// 				styles={customStyles}
// 				value={value}
// 				error={!!error}
// 				onChange={disabled ? () => {} : onChange}
// 			/>
// 			{caption && <span className="text-slate-500 text-sm">{caption}</span>}
// 			{error && <div className="text-red-500 text-sm mt-2">{error}</div>}
// 		</FaiBox>
// 	);
// };

// CustomSelect.propTypes = {
// 	label: PropTypes.string.isRequired,
// 	isRequired: PropTypes.bool,
// 	allowClear: PropTypes.bool,
// 	disabled: PropTypes.bool,
// 	labelInValue: PropTypes.bool,
// 	loading: PropTypes.bool,
// 	multiple: PropTypes.bool,
// 	notFoundContent: PropTypes.node,
// 	options: PropTypes.array,
// 	optionRender: PropTypes.func,
// 	placeholder: PropTypes.string,
// 	size: PropTypes.oneOf(["large", "middle", "small"]),
// 	labelRender: PropTypes.func,
// 	value: PropTypes.any,
// 	onChange: PropTypes.func,
// 	error: PropTypes.string,
// };

// export default CustomSelect;
