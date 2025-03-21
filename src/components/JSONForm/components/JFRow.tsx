// import { Fragment } from 'react'

// // import JFFieldArray from "./JFFieldArray";
// import JFCustom from './JFCustom'
// import useDisplayCheck from '../useDisplayCheck'
// import JFField from './JFField'

// interface JFRowProps {
//   field: any
//   customComponents?: Record<string, React.ReactNode>
// }

// const JFRow: React.FC<JFRowProps> = ({ field = {}, customComponents }) => {
//   const display = useDisplayCheck(field?.visible)

//   return display ? (
//     <div className={`flex flex-wrap ${field.classes ? field.classes : ''}`}>
//       {Array.isArray(field.children) &&
//         field.children.map((fc, i) => (
//           <Fragment key={`${field?.type}--${fc.type}--${i}`}>
//             {fc.type === 'field' && <JFField field={fc} customComponents={customComponents} />}
//             {/* {fc.type === "fieldArray" && (
// 							<JFFieldArray field={fc} customComponents={customComponents} />
// 						)} */}
//             {fc.type === 'custom' && <JFCustom field={fc} customComponents={customComponents} />}
//           </Fragment>
//         ))}
//     </div>
//   ) : (
//     <></>
//   )
// }

// export default JFRow
