// import React from "react";
// import PropTypes from "prop-types";
// import { Row, Col, InputNumber, Typography } from "antd";

// interface NumberRangeProps {
// 	name: string; // Single name for the array
// 	value?: [number | null, number | null]; // Array for min and max values
// 	onChange?: (value: [number | null, number | null]) => void;
// 	placeholder?: string;
// 	className?: string;
// 	disabled?: boolean;
// 	error?: string;
// 	size?: "large" | "middle" | "small";
// 	precision?: number;
// }

// const NumberRange: React.FC<NumberRangeProps> = ({
// 	name,
// 	value = [null, null],
// 	onChange = () => {},
// 	placeholder = "Enter price",
// 	className = "",
// 	disabled = false,
// 	error = "",
// 	size = "middle",
// 	precision = 0,
// }) => {
// 	const handleMinChange = (minValue: number | null) => {
// 		onChange([minValue, value[1]]);
// 	};

// 	const handleMaxChange = (maxValue: number | null) => {
// 		onChange([value[0], maxValue]);
// 	};

// 	return (
// 		<div className={className}>
// 			<div className="w-full flex flex-wrap">
// 				<div className="w-full md:w-1/2 pr-2">
// 					<InputNumber
// 						id={`${name}-min`}
// 						name={`${name}[0]`}
// 						value={value[0]}
// 						onChange={handleMinChange}
// 						placeholder="Minimum Price"
// 						disabled={disabled}
// 						size={size}
// 						addonBefore="₹"
// 						precision={precision}
// 						status={error ? "error" : undefined}
// 						style={{ width: "100%", height: "40px", borderRadius: "4px" }}
// 						rootClassName="fai-input-number"
// 					/>
// 				</div>
// 				{/* <Col span={1} style={{ textAlign: "center" }}>
//           <Typography.Text style={{ fontSize: "16px", color: "#666" }}>-</Typography.Text>
//         </Col> */}
// 				<div className="w-full md:w-1/2 pl-2">
// 					<InputNumber
// 						id={`${name}-max`}
// 						name={`${name}[1]`}
// 						value={value[1]}
// 						onChange={handleMaxChange}
// 						placeholder="Maximum Price"
// 						disabled={disabled}
// 						size={size}
// 						addonBefore="₹"
// 						precision={precision}
// 						status={error ? "error" : undefined}
// 						style={{ width: "100%", height: "40px", borderRadius: "4px" }}
// 						rootClassName="fai-input-number"
// 					/>
// 				</div>
// 			</div>
// 			{error && <span className="text-sm text-red-500">{error}</span>}
// 		</div>
// 	);
// };

// NumberRange.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	value: PropTypes.any,
// 	onChange: PropTypes.func,
// 	placeholder: PropTypes.string,
// 	className: PropTypes.string,
// 	disabled: PropTypes.bool,
// 	error: PropTypes.string,
// 	size: PropTypes.oneOf(["large", "middle", "small"]),
// 	precision: PropTypes.number,
// };

// export default NumberRange;
