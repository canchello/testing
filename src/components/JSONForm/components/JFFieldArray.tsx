// import React, { Fragment, useCallback, useEffect } from "react";
// import { useController, useFieldArray, useFormContext } from "react-hook-form";

// import AddIcon from "@mui/icons-material/Add";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import CancelIcon from "@mui/icons-material/Cancel";

// import JFLabel from "./JFLabel";
// import { getDefaultFieldValue, getDefaultFormValue } from "../utils/common";
// import JFSection from "./JFSection";
// import JFSubSection from "./JFSubSection";
// import JFRow from "./JFRow";
// import useDisplayCheck from "../useDisplayCheck";
// import CustomButton from "../../CustomComponents/Button";
// import { Card } from "@mui/material";
// import FaiBox from "MuiComponents/FaiBox";
// import JFField from "./JFField";

// interface JFFieldArrayProps {
// 	field: {
// 		subType: string;
// 		type: string;
// 		name: string;
// 		classes?: any;
// 		label: string;
// 		arrayValidations?: { max?: [number] };
// 		addBtnText?: string;
// 		removeBtnText?: string;
// 		showDefault?: boolean;
// 		isEdit?: boolean;
// 		visible?: boolean;
// 		shouldDefault?: boolean;
// 		modelName?: string;
// 		children?: any;
// 	};
// 	customComponents?: { [key: string]: React.ReactNode };
// }

// const JFFieldArray: React.FC<JFFieldArrayProps> = ({
// 	field,
// 	customComponents,
// }) => {
// 	const {
// 		subType,
// 		name,
// 		classes,
// 		label,
// 		arrayValidations = {},
// 		addBtnText = "Add More",
// 		removeBtnText = "Remove",
// 		showDefault = true,
// 		isEdit,
// 		shouldDefault = false,
// 		modelName = "Model",
// 	} = field;

// 	const display = useDisplayCheck(field?.visible);
// 	const max = arrayValidations?.max ? arrayValidations.max[0] : null;

// 	const { control, setValue } = useFormContext();
// 	const {
// 		fieldState: { error },
// 	} = useController({
// 		name,
// 		control,
// 	});

// 	const { fields, append, remove } = useFieldArray({
// 		control,
// 		name,
// 	});

// 	const appendHandler = useCallback(() => {
// 		if (subType === "field") {
// 			const defaultValue = getDefaultFieldValue(field);
// 			append([defaultValue]);
// 		}
// 		if (subType === "section") {
// 			const defaultValue = getDefaultFormValue([field]);
// 			append(defaultValue[name]);
// 		}
// 	}, [append, field, name, subType]);

// 	useEffect(() => {
// 		if (!fields.length && showDefault) {
// 			appendHandler();
// 		}
// 	}, [appendHandler, fields.length, showDefault]);

// 	useEffect(() => {
// 		if (!isEdit && !showDefault) {
// 			setValue(name, []);
// 		}
// 	}, [isEdit, name, setValue, showDefault]);

// 	const errorMessage =
// 		error?.message || error?.root?.message ? (
// 			<span className="invalid-feedback">
// 				{label}:
// 				<span className="ms-1">{error?.message || error?.root?.message}</span>
// 			</span>
// 		) : null;

// 	return name ? (
// 		<>
// 			{display ? (
// 				<>
// 					{subType === "field" && (
// 						<>
// 							{fields.length ? (
// 								fields.map((arrField, index) => (
// 									<Fragment key={arrField.id}>
// 										<div className={`${classes?.wrapper || ""} flex`}>
// 											<div className="w-full">
// 												<JFField
// 													field={{
// 														...field,
// 														type: subType,
// 														name: `${name}.${index}`,
// 														label: `${field.label || ""} ${
// 															index ? index + 1 : ""
// 														}`,
// 													}}
// 													isFieldArray={true}
// 												/>
// 												{index === 0 && errorMessage}
// 											</div>
// 											{index === 0 && (max ? fields.length < max : true) && (
// 												<div className="self-center">
// 													<CustomButton
// 														color=""
// 														className="add_more_btn rounded-circle"
// 														onClick={appendHandler}
// 													>
// 														<AddCircleOutlineIcon />
// 													</CustomButton>
// 												</div>
// 											)}
// 											{index !== 0 && (
// 												<div className="self-center">
// 													<CustomButton
// 														color=""
// 														className="rounded-circle text-danger fs-5"
// 														onClick={() => remove(index)}
// 													>
// 														<CancelIcon />
// 													</CustomButton>
// 												</div>
// 											)}
// 										</div>
// 									</Fragment>
// 								))
// 							) : (
// 								<div className={classes?.wrapper || ""}>
// 									<JFLabel field={field} />
// 									<div>
// 										<CustomButton
// 											type="button"
// 											onClick={appendHandler}
// 											icon={<AddIcon />}
// 										>
// 											<span>Add {label}</span>
// 										</CustomButton>
// 									</div>
// 									{errorMessage}
// 									{Array.isArray(error) && (
// 										<span className="invalid-feedback">
// 											<span className="ms-1">{error[0]?.message}</span>
// 										</span>
// 									)}
// 								</div>
// 							)}
// 						</>
// 					)}
// 					{subType === "section" && (
// 						<>
// 							<JFSection
// 								field={{
// 									label,
// 									isFieldArray: max ? fields.length < max : true,
// 									addBtnText,
// 									classes,
// 									onAdd: appendHandler,
// 								}}
// 							/>
// 							{errorMessage}
// 							{fields.map((arrField, index) => {
// 								const content = (
// 									<FaiBox key={arrField.id} className="mb-3 py-2">
// 										<JFSubSection
// 											index={index}
// 											field={{
// 												isDefault: shouldDefault && !index,
// 												// label: `${modelName || ""} #${index}`,
// 												label,
// 												modelName,
// 												isFieldArray: true,
// 												removeBtnText,
// 												onRemove: () => remove(index),
// 											}}
// 										/>
// 										{!!index && (
// 											<JFSubSection
// 												index={index}
// 												field={{
// 													isDefault: shouldDefault && !index,
// 													label: `${modelName || ""} #${index}`,
// 													textSmall: true,
// 													modelName,
// 													isFieldArray: false,
// 													removeBtnText,
// 													onRemove: () => remove(index),
// 												}}
// 											/>
// 										)}
// 										<JFRow
// 											field={{
// 												type: field.type,
// 												children: field.children
// 													.filter(
// 														(fc) => !(index === 0 && fc.fieldProps?.hideDefault)
// 													)
// 													.map((fc) => {
// 														if (["field", "fieldArray"].includes(fc.type)) {
// 															const newName = `${name}.${index}.${fc.name}`;
// 															if (Array.isArray(fc?.visible)) {
// 																fc.visible = fc.visible.map((cond) => {
// 																	if (cond[0].startsWith("_."))
// 																		cond[0] = cond[0].replace(
// 																			"_.",
// 																			`${name}.${index}.`
// 																		);
// 																	return cond;
// 																});
// 															}
// 															return { ...fc, name: newName };
// 														}
// 														return fc;
// 													}),
// 											}}
// 											customComponents={customComponents}
// 										/>
// 									</FaiBox>
// 								);
// 								return !index && shouldDefault ? (
// 									content
// 								) : (
// 									<Card
// 										key={index}
// 										sx={{ background: "#f4f4f4" }}
// 										className="p-2 mb-3"
// 									>
// 										{content}
// 									</Card>
// 								);
// 							})}
// 						</>
// 					)}
// 				</>
// 			) : (
// 				<></>
// 			)}
// 		</>
// 	) : (
// 		<div>Please provide name of the field</div>
// 	);
// };

// export default JFFieldArray;
