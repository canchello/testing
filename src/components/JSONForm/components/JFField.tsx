import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

// import CustomInput from "components/CustomComponents/FormComponents/Input";
// import CustomInput from '../../CustomComponents/FormComponents/Input'
// import CustomRadio from '../../CustomComponents/FormComponents/Radio'
// import CustomDatePicker from '../../CustomComponents/FormComponents/DatePicker'
// import CustomTimePicker from '../../CustomComponents/FormComponents/TimePicker'
// import CustomSelect from '../../CustomComponents/FormComponents/Select'

import { FIELD_TYPES } from '../constants'
import JFLabel from './JFLabel'
import useDisplayCheck from '../useDisplayCheck'
// import CustomInput from '../CustomComponents/FormComponents/Input'
import CustomRadio from '@/components/form/RadioGroup'
import FormField from '../FormField'
import CustomDatePicker from '../CustomComponents/FormComponents/DatePicker'
// import CustomTimePicker from '../CustomComponents/FormComponents/TimePicker'
import CustomSelect from '@/components/form/SelectField'
import TextInput from '@/components/form/LabelInput'
import CustomTextArea from '@/components/form/TextareaInput'
// import FormField from 'components/FormField'

interface JFFieldProps {
  field: any
  isFieldArray?: boolean
  customComponents?: any
}

const JFField: React.FC<JFFieldProps> = ({ field, isFieldArray, customComponents = {} }) => {
  const { name, label = '', classes, fieldProps, fieldType, placeholder = '' } = field
  const firstRender = useRef(true)

  const { control, resetField, getValues, setValue } = useFormContext()

  const display = useDisplayCheck(field?.visible)

  const [dependency, setDependency] = useState<{ [key: string]: any }>({})

  // const watchers = useWatch({
  // 	control,
  // 	name: Object.values(fieldProps?.dependency || {}),
  // });

  useEffect(() => {
    if (firstRender.current && fieldType === FIELD_TYPES.select && name) {
      firstRender.current = false
      const value = getValues(name)
      const newValue = Array.isArray(value)
        ? value.map(a => (typeof a === 'object' ? a.value : a))
        : typeof value === 'object'
        ? value?.value || null
        : value || null
      setValue(name, newValue, { shouldValidate: false })
    }
  }, [fieldType, getValues, name, setValue])

  // useEffect(() => {
  // 	// To reset the fields
  // 	if (watchers && watchers.length) {
  // 		resetField(name);
  // 		setDependency(
  // 			Object.entries(fieldProps?.dependency || {}).reduce(
  // 				(prev, [key], index) => {
  // 					prev[key] = watchers[index];
  // 					return prev;
  // 				},
  // 				{} as { [key: string]: any }
  // 			)
  // 		);
  // 	}
  // }, [fieldProps?.dependency, name, resetField, watchers]);

  return name ? (
    <>
      {display ? (
        <div className={`pb-3 ${!isFieldArray ? classes?.wrapper : 'w-full'}`}>
          <JFLabel field={field} customComponents={customComponents} />
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, name, value, onBlur }, fieldState: { error } }) => {
              switch (fieldType) {
                case FIELD_TYPES.input:
                  return (
                    <TextInput
                      type={fieldProps?.type ?? 'text'}
                      name={name}
                      value={value}
                      onChange={(e: any) => onChange(e.target.value)}
                      error={error?.message}
                      {...fieldProps}
                      // placeholder={fieldProps?.placeholder}
                      // note={fieldProps?.note}
                      // disabled={fieldProps?.disabled}
                      // autoComplete={fieldProps?.autoComplete}
                    />
                  )
                // case FIELD_TYPES.numberRange:
                //   return (
                //     <NumberRange
                //       name={name}
                //       placeholder={fieldProps?.placeholder}
                //       value={value}
                //       onChange={e => onChange(e)}
                //       disabled={fieldProps?.disabled}
                //       error={error?.message}
                //     />
                //   )
                // case FIELD_TYPES.phone:
                //   return (
                //     <CustomPhoneInput
                //       placeholder={fieldProps?.placeholder}
                //       value={value}
                //       onChange={e => onChange(e)}
                //       disabled={fieldProps?.disabled}
                //       error={error?.message}
                //     />
                //   )
                case FIELD_TYPES.radio:
                  return (
                    <div className='py-2'>
                      <CustomRadio
                        name={name}
                        value={value}
                        onChange={(e: any) => {
                          onChange(e.target?.value || e.value || e)
                        }}
                        options={fieldProps?.options}
                        disabled={fieldProps?.disabled}
                        error={error?.message}
                        direction={fieldProps?.direction}
                      />
                    </div>
                  )
                // case FIELD_TYPES.checkbox:
                //   return (
                //     <div className='py-2'>
                //       <CustomCheckbox
                //         name={name}
                //         value={value}
                //         onChange={(value: any) => onChange(value)}
                //         options={fieldProps?.options}
                //         disabled={fieldProps?.disabled}
                //         error={error?.message}
                //       />
                //     </div>
                //   )
                case FIELD_TYPES.textarea:
                  return (
                    // <FormField
                    //   multiline
                    //   label={fieldProps?.label}
                    //   name={name}
                    //   onChange={(value: any) => onChange(value)}
                    //   isRequired
                    //   error={error?.message}
                    //   {...fieldProps}
                    // />
                    <CustomTextArea
                      multiline
                      label={fieldProps?.label}
                      name={name}
                      onChange={(value: any) => onChange(value)}
                      isRequired
                      error={error?.message}
                      {...fieldProps}
                    />
                  )
                // case FIELD_TYPES.tags:
                // 	return (
                // 		<CustomTagsInput
                // 			value={value}
                // 			onChange={(e) => onChange(e)}
                // 			disabled={fieldProps?.disabled}
                // 			placeholder={fieldProps?.placeholder}
                // 			className={fieldProps?.className}
                // 			error={error?.message}
                // 		/>
                // 	);
                // case FIELD_TYPES.switch:
                //   return (
                //     <div className='py-2'>
                //       <CustomSwitch
                //         value={value}
                //         onChange={e => onChange(e)}
                //         label={fieldProps?.label}
                //         disabled={fieldProps?.disabled}
                //         className={fieldProps?.className}
                //         error={error?.message}
                //       />
                //     </div>
                //   )
                case FIELD_TYPES.date:
                  return (
                    <CustomDatePicker
                      value={value}
                      onChange={(e: any) => {
                        onChange(e)
                      }}
                      error={error?.message}
                      {...fieldProps}
                    />
                  )
                // case FIELD_TYPES.dateRange:
                //   return (
                //     <CustomDateRangePicker
                //       value={value}
                //       onChange={e => onChange(e)}
                //       error={error?.message}
                //       {...fieldProps}
                //     />
                //   )
                // case FIELD_TYPES.time:
                //   return (
                //     <CustomTimePicker
                //       value={value}
                //       onChange={(e: any) => onChange(e)}
                //       error={error?.message}
                //       {...fieldProps}
                //     />
                //   )
                // case FIELD_TYPES.timeRange:
                //   return (
                //     <CustomTimeRangePicker
                //       value={value}
                //       onChange={e => onChange(e)}
                //       error={error?.message}
                //       {...fieldProps}
                //     />
                //   )
                case FIELD_TYPES.select:
                  return (
                    <CustomSelect
                      value={value}
                      onChange={selectedValue => {
                        setValue(name, selectedValue) // Normalize value
                      }}
                      error={error?.message}
                      placeholder={placeholder}
                      {...fieldProps}
                    />
                  )
                // case FIELD_TYPES.fileUpload:
                //   return (
                //     <CustomFileUpload
                //       fileData={value}
                //       onChange={e => onChange(e)}
                //       error={error?.message}
                //       {...fieldProps}
                //     />
                //   )
                // case FIELD_TYPES.ckEditor:
                // 	return (
                // 		<CustomCKEditor
                // 			name={name}
                // 			value={value}
                // 			onChange={({ data }) => onChange(data)}
                // 			error={error?.message}
                // 			{...fieldProps}
                // 		/>
                // 	);
                default:
                  return <div className='text-danger'>No Such Form Field Exist</div>
              }
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  ) : (
    <div>Please provide name of the field</div>
  )
}

export default JFField
