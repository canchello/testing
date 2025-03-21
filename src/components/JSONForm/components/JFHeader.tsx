// import AddIcon from '@mui/icons-material/Add';

// import CustomButton from "../../CustomComponents/Button";
// import useDisplayCheck from "../useDisplayCheck";

// interface JFHeaderProps {
//     field: {
//         label: string;
//         isFieldArray?: boolean;
//         addBtnText?: string;
//         onAdd?: () => void;
//         classes?: string;
//         icon?: any; // Adjust the type as necessary for your icon
//         visible?: boolean;
//     };
// }

// const JFHeader: React.FC<JFHeaderProps> = ({ field }) => {
//     const {
//         label,
//         isFieldArray = false,
//         addBtnText = "Add",
//         onAdd = () => {},
//         classes,
//     } = field;

//     const display = useDisplayCheck(field?.visible);

//     return display ? (
//         <div className={`my-3 ${classes ? classes : ""}`}>
//             <div className="flex items-center">
//                 <div className="px-2 py-2 topic-heading">
//                     <span className="mb-0">
//                         {/* {field.icon && (
//                             <Icon icon={field.icon} className={"pe-2"} />
//                         )} */}
//                         {field.icon}
//                         {label}
//                     </span>
//                 </div>
//                 {isFieldArray && (
//                     <CustomButton
//                         type="button"
//                         onClick={onAdd}
//                         icon={<AddIcon />}
//                     >
//                         <span>{addBtnText}</span>
//                     </CustomButton>
//                 )}
//             </div>
//         </div>
//     ) : (
//         <></>
//     );
// };

// export default JFHeader;
