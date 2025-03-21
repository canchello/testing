// import React, { useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
// import { Input, Tag } from "antd";
// import AddIcon from '@mui/icons-material/Add';

// interface CustomTagsInputProps {
//     value?: (string | number)[];
//     onChange?: (tags: (string | number)[]) => void;
//     placeholder?: string;
//     disabled?: boolean;
//     error?: string;
// }

// const CustomTagsInput: React.FC<CustomTagsInputProps> = ({
//     value = [],
//     onChange = () => {},
//     placeholder = "",
//     disabled = false,
//     error = "",
// }) => {
//     const [tags, setTags] = useState<(string | number)[]>(value);
//     const [inputVisible, setInputVisible] = useState(false);
//     const [inputValue, setInputValue] = useState("");
//     // const inputRef = useRef<Input>(null);
//     const changeHandlerRef = useRef(onChange);

//     useEffect(() => {
//         if (inputVisible) {
//             // inputRef.current?.focus();
//         }
//     }, [inputVisible]);

//     useEffect(() => {
//         changeHandlerRef.current = onChange;
//     }, [onChange]);

//     useEffect(() => {
//         changeHandlerRef.current(tags);
//     }, [tags]);

//     const handleClose = (removedTag: string | number) => {
//         setTags((prev) => prev.filter((tag) => tag !== removedTag));
//     };

//     const showInput = () => {
//         setInputVisible(true);
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setInputValue(e.target.value);
//     };

//     const handleInputConfirm = () => {
//         if (inputValue && !tags.includes(inputValue)) {
//             setTags([...tags, inputValue]);
//         }
//         setInputVisible(false);
//         setInputValue("");
//     };

//     return (
//         <>
//             <div className="flex flex-wrap gap-2 py-2 form-control">
//                 {tags.map((tag, index) => (
//                     <span key={`${tag}--${index}`}>
//                         <Tag
//                             className="me-0"
//                             closable={!disabled}
//                             onClose={(e) => {
//                                 e.preventDefault();
//                                 handleClose(tag);
//                             }}
//                             color={error ? "red" : ""}
//                         >
//                             {tag}
//                         </Tag>
//                     </span>
//                 ))}
//                 {!disabled && (
//                     <>
//                         {inputVisible ? (
//                             <Input
//                                 // ref={inputRef}
//                                 type="text"
//                                 size="small"
//                                 style={{ width: 78 }}
//                                 value={inputValue}
//                                 onChange={handleInputChange}
//                                 onBlur={handleInputConfirm}
//                                 onPressEnter={handleInputConfirm}
//                             />
//                         ) : (
//                             <Tag
//                                 className="me-0"
//                                 onClick={showInput}
//                                 style={{ borderStyle: "dashed" }}
//                                 color={error ? "red" : ""}
//                             >
//                                 <span className="me-1">
//                                     <AddIcon />
//                                 </span>
//                                 {placeholder || "Add New Tag"}
//                             </Tag>
//                         )}
//                     </>
//                 )}
//             </div>
//             {error && <span className="invalid-feedback">{error}</span>}
//         </>
//     );
// };

// CustomTagsInput.propTypes = {
//     value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
//     onChange: PropTypes.func,
//     disabled: PropTypes.bool,
//     error: PropTypes.string,
//     placeholder: PropTypes.string,
// };

// export default CustomTagsInput;
