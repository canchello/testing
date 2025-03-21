// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import AddIcon from "@mui/icons-material/Add";

// import useDisplayCheck from "../useDisplayCheck";
// import CustomButton from "../../CustomComponents/Button";
// import { Button, Divider } from "@mui/material";
// import FaiButton from "MuiComponents/FaiButton";
// import FaiBox from "MuiComponents/FaiBox";

// interface JFSectionProps {
// 	field: {
// 		label: string;
// 		isFieldArray?: boolean;
// 		addBtnText?: string;
// 		onAdd?: () => void;
// 		classes?: string;
// 		visible?: boolean;
// 	};
// }

// const JFSection: React.FC<JFSectionProps> = ({ field }) => {
// 	const {
// 		label,
// 		isFieldArray = false,
// 		addBtnText = "Add",
// 		onAdd = () => {},
// 		classes,
// 	} = field;

// 	const display = useDisplayCheck(field?.visible);

// 	return display ? (
// 		<div className={`my-3 ${classes ? classes : ""}`}>
// 			<div className="flex items-center flex-wrap">
// 				<h4 className="font-bold mb-0 flex-1">{label}</h4>
// 				{isFieldArray && (
// 					<Button
// 						variant="outlined"
// 						onClick={onAdd}
// 						sx={{ borderColor: "#E97A36", borderRadius: "0.5rem" }}
// 					>
// 						<FaiBox className="flex items-center">
// 							<FaiBox
// 								component="span"
// 								className="flex items-center"
// 								sx={{
// 									justifyContent: "center",
// 									border: "2px solid #E97A36",
// 									borderRadius: "50%",
// 									width: "24px",
// 									height: "24px",
// 									marginRight: "8px",
// 									color: "#E97A36",
// 								}}
// 							>
// 								+
// 							</FaiBox>
// 							<FaiBox
// 								component="span"
// 								sx={{
// 									color: "#E97A36",
// 									fontSize: "14px",
// 									fontWeight: "500",
// 									textTransform: "none",
// 								}}
// 							>
// 								{addBtnText}
// 							</FaiBox>
// 						</FaiBox>
// 					</Button>
// 				)}
// 			</div>
// 			{/* <Divider className="mt-2" /> */}
// 		</div>
// 	) : (
// 		<></>
// 	);
// };

// export default JFSection;
