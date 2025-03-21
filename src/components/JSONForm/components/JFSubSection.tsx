// import useDisplayCheck from '../useDisplayCheck'
// import { Button, Divider } from '@mui/material'
// import DeleteIcon from '@mui/icons-material/Delete'

// interface JFSubSectionProps {
//   index?: number
//   field: {
//     label?: string
//     isFieldArray?: boolean
//     onRemove?: () => void
//     removeBtnText?: string
//     classes?: string
//     isDisplayDivider?: boolean
//     visible?: boolean
//     isDefault?: boolean
//     modelName?: string
//     textSmall?: boolean
//   }
// }

// const JFSubSection: React.FC<JFSubSectionProps> = ({ index, field }) => {
//   const {
//     label = '',
//     isFieldArray = false,
//     onRemove = () => {},
//     removeBtnText,
//     classes = '',
//     isDisplayDivider = false,
//     isDefault = false,
//     modelName = '',
//     textSmall = false
//   } = field

//   const display = useDisplayCheck(field?.visible)

//   return display ? (
//     <div className={`w-full flex justify-between px-2 ${textSmall ? 'text-sm my-2' : 'font-semibold'}`}>
//       {
//         isDisplayDivider ? (
//           <div className='mx-3'>
//             <div className='fw-bold fs-5'>{label}</div>
//             <Divider className='border-primary-subtle subtopic-heading'></Divider>
//           </div>
//         ) : // <Divider className={`${isFieldArray ? "mb-0" : ""} ${classes} ${textSmall ? 'text-sm':''}`}>
//         isDefault ? (
//           <span className='text-sm m-1 font-semibold text-red-500'>
//             *Default {modelName}{' '}
//             <span className='text-slate-500 lowercase'>(atleast one {modelName} is mandatory)</span>
//           </span>
//         ) : (
//           label
//         )
//         // </Divider>
//       }
//       {!!index && isFieldArray && (
//         <div className='text-end'>
//           <Button
//             variant='text'
//             onClick={onRemove}
//             startIcon={<DeleteIcon />}
//             style={{
//               color: '#ff0000'
//             }}
//           >
//             <span>{removeBtnText}</span>
//           </Button>
//         </div>
//       )}
//     </div>
//   ) : null
// }

// export default JFSubSection
