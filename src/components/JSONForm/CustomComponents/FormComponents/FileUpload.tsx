// import React, { Fragment, useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
// // import { useDropzone } from "react-dropzone";
// import defaultImage from "assets/images/Default-User-Image.jpeg";
// // import { IMAGE_URL } from "services/api/routes/common";
// import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
// import FileIcon from "@mui/icons-material/InsertDriveFileRounded";
// import AttachmentIcon from "@mui/icons-material/AttachmentRounded";
// import UploadIcon from "@mui/icons-material/CloudUploadRounded";
// import FaiDropzone from "MuiComponents/FaiDropzone";

// // import { getFileBase64Object } from "utils/common";

// const getDefaultValue = (data: any) =>
// 	data ? (Array.isArray(data) ? data : [data]) : [];

// interface CustomFileUploadProps {
// 	onChange: (files: File[] | File) => void;
// 	fileData?: any;
// 	disabled?: boolean;
// 	multiple?: boolean;
// 	filePreview?: boolean;
// 	imageDisplayType?: "regular" | "round";
// 	maxSize?: number;
// 	maxFiles?: number;
// 	note?: string;
// 	caption?: string;
// 	accept?: string;
// 	error?: string;
// }

// const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
// 	onChange,
// 	fileData,
// 	disabled = false,
// 	multiple = false,
// 	filePreview = false,
// 	imageDisplayType = "", // regular, round
// 	maxSize = 5000000,
// 	maxFiles = 1,
// 	note = "",
// 	caption = "",
// 	accept = "",
// 	error = "",
// }) => {
// 	const [files, setFiles] = useState<File[]>(getDefaultValue(fileData) || []);
// 	const fileRef = useRef<HTMLInputElement | null>(null);
// 	const [errorList, setErrorList] = useState<string[]>([]);

// 	useEffect(() => {
// 		setFiles(getDefaultValue(fileData));
// 	}, [fileData]);

// 	const onDrop = async (acceptedFiles: File[], fileRejections: any) => {
// 		setErrorList([]);

// 		if (acceptedFiles.length > 0) {
// 			setFiles(
// 				acceptedFiles.map((file) =>
// 					Object.assign(file, {
// 						preview: URL.createObjectURL(file),
// 					})
// 				)
// 			);
// 			// const files = await Promise.all(
// 			// 	acceptedFiles.map(async (attachment) => {
// 			// 		attachment.document = await getFileBase64Object(attachment);
// 			// 		return attachment;
// 			// 	})
// 			// );
// 			onChange(multiple ? files : files[0]);
// 		}

// 		if (fileRejections.length > 0) {
// 			const errors = fileRejections.flatMap((item: any) =>
// 				item.errors.map((error: any) => `${item.file.name} - ${error.message}`)
// 			);
// 			setErrorList(errors);
// 		}
// 	};

// 	// const {
// 	// 	getRootProps,
// 	// 	getInputProps,
// 	// 	isDragActive,
// 	// 	isDragAccept,
// 	// 	isDragReject,
// 	// } = useDropzone({
// 	// 	onDrop,
// 	// 	accept,
// 	// 	multiple,
// 	// 	maxSize,
// 	// 	maxFiles,
// 	// 	disabled,
// 	// });

// 	// const additionalClass = isDragAccept
// 	// 	? "accept"
// 	// 	: isDragReject
// 	// 	? "reject"
// 	// 	: "";

// 	const deleteFile = (index: number) => {
// 		const deleted = files.filter((_, i) => i !== index);
// 		setFiles(deleted);
// 		onChange(multiple ? deleted : deleted[0]);
// 	};

// 	return (
// 		<div>
// 			<FaiDropzone
// 				note={note}
// 				options={{
// 					addRemoveLinks: true,
// 					uploadMultiple: multiple,
// 					maxFiles: maxFiles,
// 				}}
// 			/>
// 			{caption && (
// 				<span className="text-sm text-slate-400 font-medium">{caption}</span>
// 			)}
// 			{error && (
// 				<span className="text-sm text-red-500 font-medium">{error}</span>
// 			)}
// 			{/* {multiple || (!multiple && imageDisplayType === "regular") ? (
// 				<Fragment>
// 					<div
// 						{...(disabled
// 							? {
// 									className: `droparea rounded-2 ${additionalClass} ${
// 										error ? "text-danger" : ""
// 									}`,
// 							  }
// 							: getRootProps({
// 									className: `droparea rounded-2 ${additionalClass} ${
// 										error ? "text-danger" : ""
// 									}`,
// 							  }))}
// 					>
// 						{!disabled && <input {...getInputProps()} />}
// 						<span>
// 							{isDragActive ? (
// 								// <FontAwesomeIcon icon={faUpload} size="2x" />
// 								<UploadIcon />
// 							) : (
// 								// <FontAwesomeIcon icon={faFile} size="2x" />
// 								<FileIcon />
// 							)}
// 						</span>
// 						<p className="mb-0">Drag'n'drop images, or click to select files</p>
// 					</div>
// 					{filePreview && files.length > 0 && (
// 						<div className="d-flex flex-wrap">
// 							{files.map((file, index) => (
// 								<div className="file-preview" key={index}>
// 									<CancelRoundedIcon
// 										className="text-danger"
// 										onClick={() => deleteFile(index)}
// 									/>
// 									<img
// 										src={
// 											file.preview || file.signedUrl || `${'IMAGE_URL'}/${file}`
// 										}
// 										className="w-100"
// 										alt={file.name || file}
// 									/>
// 								</div>
// 							))}
// 						</div>
// 					)}
// 				</Fragment>
// 			) : imageDisplayType === "round" ? (
// 				<div className="profile-container">
// 					<img
// 						src={files.length > 0 ? files[0].preview || files[0] : defaultImage}
// 						alt="sample-pic"
// 						className="profileCover"
// 					/>
// 					<div {...getRootProps({ className: `avatar-upload` })}>
// 						<input {...getInputProps()} />
// 						<span />
// 					</div>
// 				</div>
// 			) : (
// 				<div>
// 					<AttachmentIcon
// 						className="cursor-pointer"
// 						onClick={() => fileRef.current?.click()}
// 						sx={{ color: "#777" }}
// 					/>
// 					<div {...getRootProps()} className="d-none">
// 						<input {...getInputProps()} ref={fileRef} />
// 					</div>
// 				</div>
// 			)} */}

// 			{/* {imageDisplayType !== "round" && (
// 				<ul>
// 					{files.map((file, index) => (
// 						<li key={index}>
// 							<div className="d-flex align-items-center gap-2">
// 								<span className="text-overflow-ellipsis">
// 									{file.name || file}
// 								</span>
// 								<span className="cursor-pointer">
// 									<CancelRoundedIcon
// 										className="text-danger"
// 										onClick={() => deleteFile(index)}
// 									/>
// 								</span>
// 							</div>
// 						</li>
// 					))}
// 				</ul>
// 			)}

// 			{errorList.map((error, index) => (
// 				<div className="file-errors" key={index}>
// 					<span className="invalid-feedback">{error}</span>
// 				</div>
// 			))}
// 			{error && <span className="invalid-feedback">{error}</span>} */}
// 		</div>
// 	);
// };

// CustomFileUpload.propTypes = {
// 	onChange: PropTypes.func.isRequired,
// 	fileData: PropTypes.any,
// 	disabled: PropTypes.bool,
// 	multiple: PropTypes.bool,
// 	filePreview: PropTypes.bool,
// 	imageDisplayType: PropTypes.oneOf(["regular", "round"]),
// 	maxSize: PropTypes.number,
// 	maxFiles: PropTypes.number,
// 	accept: PropTypes.string,
// 	error: PropTypes.string,
// };

// export default CustomFileUpload;
