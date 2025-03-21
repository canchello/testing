// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Select, Spin } from "antd";
// import PropTypes from "prop-types";

// import { debounce, getDataFromObject } from "utils/common";
// import Axios from "services/api/config";
// import { fetchOptions } from "../../../store/options/actions";

// interface LabeledValue {
//     label: string;
//     value: string | number;
// }

// interface CustomAutoCompleteProps {
//     allowClear?: boolean;
//     disabled?: boolean;
//     labelInValue?: boolean;
//     loading?: boolean;
//     maxCount?: number;
//     multiple?: boolean;
//     notFoundContent?: React.ReactNode;
//     options?: LabeledValue[];
//     optionRender?: (label: React.ReactNode) => React.ReactNode;
//     placeholder?: string;
//     size?: "large" | "middle" | "small";
//     labelRender?: (label: React.ReactNode) => React.ReactNode;
//     value?: string | number | LabeledValue | LabeledValue[];
//     onChange?: (value: any) => void;
//     error?: string;
//     mode?: "normal" | "api" | "asyncfunction" | "searchAPI" | "searchAsyncFunction" | "store" | "searchStore";
//     apiConfig?: any; // Define a more specific type based on your API config structure
//     asyncFunction?: (search: string, dependency?: any) => Promise<LabeledValue[]>;
//     dependency?: object | boolean;
//     storeSelector?: string;
// }

// const CustomAutoComplete: React.FC<CustomAutoCompleteProps> = ({
//     allowClear = false,
//     disabled = false,
//     labelInValue = false,
//     loading = false,
//     maxCount,
//     multiple = false,
//     notFoundContent = null,
//     options: propOptions = [],
//     optionRender,
//     placeholder = "Select...",
//     size = "middle",
//     labelRender,
//     value,
//     onChange = () => {},
//     error = "",
//     mode = "normal",
//     apiConfig = null,
//     asyncFunction = async () => [],
//     dependency = false,
//     storeSelector = "",
// }) => {
//     const store = useSelector((state: any) => state.options); // Adjust the state type if necessary
//     const storeData = useMemo(() => store[storeSelector]?.options, [store, storeSelector]);

//     const dispatch = useDispatch();

//     const [isOptionsLoading, setIsOptionsLoading] = useState(false);
//     const [options, setOptions] = useState<LabeledValue[]>(propOptions);

//     const apiConfigRef = useRef(apiConfig);
//     const asyncFunctionRef = useRef(asyncFunction);

//     useEffect(() => {
//         asyncFunctionRef.current = asyncFunction;
//     }, [asyncFunction]);

//     useEffect(() => {
//         apiConfigRef.current = apiConfig;
//     }, [apiConfig]);

//     useEffect(() => {
//         if (storeData && ["store", "searchStore"].includes(mode)) {
//             setOptions(storeData);
//         }
//     }, [mode, storeData]);

//     const getOptions = useCallback(
//         async (search: string, mode: string, dependency: any) => {
//             try {
//                 setIsOptionsLoading(true);
//                 setOptions([]);
//                 if (["searchStore", "searchAPI", "searchAsyncFunction"].includes(mode) && !search) {
//                     return;
//                 }

//                 let ops: LabeledValue[] | undefined;
//                 if (["store", "searchStore"].includes(mode)) {
//                     ops = await dispatch(fetchOptions(storeSelector, dependency, mode === "searchStore", search));
//                 }

//                 if (["api", "searchAPI"].includes(mode) && apiConfigRef.current) {
//                     const { url, method = "GET", body = "{}", labelField = "", valueField = "", dataKey = "" } = apiConfigRef.current;
//                     const parseBody = JSON.parse(body);
//                     const reqBody = dependency ? { ...dependency } : {};

//                     const { data } = await Axios({
//                         url,
//                         method,
//                         data: { ...parseBody, ...reqBody },
//                     });

//                     const list = getDataFromObject(data, dataKey);
//                     if (list) {
//                         ops = list.map((item: any) => ({
//                             label: labelField ? item[labelField] : item,
//                             value: valueField ? item[valueField] : item,
//                         }));
//                     }
//                 }

//                 if (["asyncfunction", "searchAsyncFunction"].includes(mode)) {
//                     ops = await asyncFunctionRef.current(search, dependency);
//                 }

//                 setOptions(ops || []);
//             } catch (err) {
//                 console.error(`Error fetching options: `, err);
//             } finally {
//                 setIsOptionsLoading(false);
//             }
//         },
//         [dispatch, storeSelector]
//     );

//     useEffect(() => {
//         if (mode !== "normal") {
//             getOptions("", mode, dependency);
//         }
//     }, [dependency, getOptions, mode]);

//     const filterOption = (input: string, option: any) => {
//         return (option?.label || "").toLowerCase().includes(input.toLowerCase());
//     };

//     const searchHandler = debounce((searchTerm: string) => {
//         getOptions(searchTerm, mode, dependency);
//     });

//     return (
//         <>
//             <Select
//                 className="w-100 min-h-40"
//                 allowClear={allowClear}
//                 disabled={disabled}
//                 labelInValue={labelInValue}
//                 loading={loading || isOptionsLoading}
//                 maxCount={maxCount}
//                 mode={multiple ? "multiple" : undefined}
//                 notFoundContent={
//                     isOptionsLoading ? (
//                         <div className="text-center">
//                             <Spin size="small" />
//                         </div>
//                     ) : notFoundContent
//                 }
//                 options={options}
//                 // optionRender={optionRender}
//                 placeholder={placeholder}
//                 optionFilterProp="children"
//                 showSearch={true}
//                 filterOption={filterOption}
//                 size={size}
//                 // labelRender={labelRender}
//                 value={value}
//                 onChange={disabled ? () => {} : onChange}
//                 status={error ? "error" : undefined}
//                 onSearch={(value) => {
//                     if (value.length > 2 && ["searchAPI", "searchAsyncFunction", "searchStore"].includes(mode)) {
//                         searchHandler(value);
//                     }
//                 }}
//             />
//             {["searchAPI", "searchAsyncFunction", "searchStore"].includes(mode) && (
//                 <span className="small">Enter at least 3 characters to search</span>
//             )}
//             {error && <span className="invalid-feedback">{error}</span>}
//         </>
//     );
// };

// CustomAutoComplete.propTypes = {
//     allowClear: PropTypes.bool,
//     disabled: PropTypes.bool,
//     labelInValue: PropTypes.bool,
//     loading: PropTypes.bool,
//     maxCount: PropTypes.number,
//     multiple: PropTypes.bool,
//     notFoundContent: PropTypes.node,
//     options: PropTypes.array,
//     optionRender: PropTypes.func,
//     placeholder: PropTypes.string,
//     size: PropTypes.oneOf(["large", "middle", "small"]),
//     labelRender: PropTypes.func,
//     value: PropTypes.any,
//     onChange: PropTypes.func,
//     error: PropTypes.string,
//     mode: PropTypes.oneOf([
//         "normal",
//         "api",
//         "asyncfunction",
//         "searchAPI",
//         "searchAsyncFunction",
//         "store",
//         "searchStore",
//     ]),
//     apiConfig: PropTypes.object,
//     asyncFunction: PropTypes.func,
//     dependency: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
//     storeSelector: PropTypes.string,
// };

// export default CustomAutoComplete;
