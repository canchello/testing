import { array, boolean, mixed, object, string, ref, number } from 'yup'
import { checkIfFieldIsRequired, getArrayOfFields, getDefaultFormValue } from './common'
import { FIELD_TYPES } from '../constants'

interface Field {
  name: string
  validations?: Record<string, any>
  type?: string
  subType?: string
  arrayValidations?: Record<string, any>
  children?: Field[]
  label?: string
  fieldType?: string
  fieldProps?: Record<string, any>
}

export const createJSONFormValidationSchema = (
  formSchema: Field[],
  formInitialStructure: Record<string, any> | null = null,
  prefix: string = ''
): object => {
  if (!formSchema || !Array.isArray(formSchema)) return object().shape({}) // Changed to return an empty schema

  let formStruct = formInitialStructure
  if (!formInitialStructure) {
    formStruct = getDefaultFormValue(formSchema as any)
  }
  if (!formStruct) return object().shape({}) // Changed to return an empty schema

  const fieldsArr = getArrayOfFields(formSchema as any)
  const finalSchemaObj: Record<string, any> = {}

  Object.entries(formStruct).forEach(([key, value]) => {
    const keyWithPrefix = prefix ? `${prefix}.${key}` : key
    const field = fieldsArr.find(f => f.name === keyWithPrefix)

    if (field) {
      const { validations = {}, type = '', subType = '', children = [] } = field
      const arrayValidations = field.validations ?? {}
      const isFieldArray = type === 'fieldArray' && subType === 'field'
      const isSectionArray = type === 'fieldArray' && subType === 'section'
      let fieldSchema = isSectionArray
        ? createJSONFormValidationSchema(children, value[0])
        : getFieldBasicValidations(field)

      if (typeof validations === 'object' && !isSectionArray) {
        Object.entries(validations).forEach(([type, valArr = []]) => {
          const validatedValArr = valArr as any[]
          if (type === 'matches') {
            const [regexStr, ...rest] = validatedValArr as [string, ...any[]]
            const [, str, flags] = regexStr.split('/')
            fieldSchema = fieldSchema[type](new RegExp(str, flags), ...rest)
          } else if (type === 'compareValue') {
            const [fieldName, message] = validatedValArr as [string | string[], ...any[]]
            if (typeof fieldName === 'string') {
              fieldSchema = fieldSchema.oneOf([ref(fieldName), null], message)
            } else if (Array.isArray(fieldName)) {
              fieldName.forEach((field: string) => {
                fieldSchema = fieldSchema.oneOf([ref(field), null], message)
              })
            }
          } else if (type) {
            fieldSchema = fieldSchema[type](...validatedValArr)
          }
        })
      }

      if (isFieldArray || isSectionArray) {
        fieldSchema = array(fieldSchema)
        if (typeof arrayValidations === 'object') {
          Object.entries(arrayValidations).forEach(([type, valArr = []]) => {
            if (type) {
              const validatedValArr = valArr as any[]
              fieldSchema = fieldSchema[type](...validatedValArr)
            }
          })
        }
      }

      if (fieldSchema) {
        finalSchemaObj[key] = fieldSchema
      }
    } else if (typeof value === 'object') {
      const fields = fieldsArr.filter(f => f.name.startsWith(keyWithPrefix))
      if (fields.length) {
        const schema = createJSONFormValidationSchema(fields, value, keyWithPrefix)
        finalSchemaObj[key] = schema
      }
    }
  })

  return object().shape(finalSchemaObj)
}

const getFieldBasicValidations = (field: Field): any => {
  const { validations = {}, label } = field

  const isFieldRequired = checkIfFieldIsRequired(field as any)
  let requiredMessage = ''
  if (isFieldRequired) {
    if (typeof validations.required === 'string') {
      requiredMessage = validations.required
    } else if (Array.isArray(validations.required)) {
      requiredMessage = validations.required[0]
    } else if (label) {
      requiredMessage = `${label} is required.`
    }
  }

  let fieldSchema: any = null
  switch (field.fieldType) {
    case FIELD_TYPES.textarea:
      fieldSchema = string().trim().nullable()
      if (isFieldRequired) {
        fieldSchema = fieldSchema.required(requiredMessage)
      }
      break
    case FIELD_TYPES.numberRange:
      fieldSchema = array()
        .of(number().required('Field must be a number'))
        .length(2, 'Field range must contain two values.')
        .test('valid-price-range', 'Minimum field must be less than maximum field.', value => {
          if (Array.isArray(value) && value.length === 2) {
            return value[0] < value[1]
          }
          return false
        })
        .nullable()
      if (isFieldRequired) {
        fieldSchema = fieldSchema.required(requiredMessage)
      }
      break
    case FIELD_TYPES.select:
      if (field?.fieldProps?.isMulti) {
        fieldSchema = array().of(
          object().shape({
            label: string().required('Label is required.'),
            value: string().required('Value is required.')
          })
        )
        if (isFieldRequired) {
          fieldSchema = fieldSchema.required(requiredMessage).min(1, requiredMessage)
        }
      } else {
        fieldSchema = object()
          .shape({
            label: string().required('Label is required.'),
            value: string().required('Value is required.')
          })
          .nullable()
        if (isFieldRequired) {
          fieldSchema = fieldSchema.required(requiredMessage)
        }
      }
      break
    case FIELD_TYPES.switch:
      fieldSchema = boolean()
      break
    case FIELD_TYPES.tags:
    case FIELD_TYPES.checkbox:
      const elemType = object().shape({
        label: string().required('Label is required.'),
        value: string().required('Value is required.')
      })
      fieldSchema = array(isFieldRequired ? elemType.required(requiredMessage) : elemType.nullable())
      if (isFieldRequired) {
        fieldSchema = fieldSchema.nullable().min(1, requiredMessage)
      } else {
        fieldSchema = fieldSchema.nullable()
      }
      break
    case FIELD_TYPES.fileUpload:
      const fileElemType = mixed()
      if (field?.fieldProps?.multiple) {
        fieldSchema = array(isFieldRequired ? fileElemType.required(requiredMessage) : fileElemType.nullable())
        if (isFieldRequired) {
          fieldSchema = fieldSchema.nullable().min(1, requiredMessage)
        } else {
          fieldSchema = fieldSchema.nullable()
        }
      } else {
        fieldSchema = fileElemType
      }
      break
    default:
      fieldSchema = string().transform(value => (typeof value === 'string' ? value.trim() : value))
      if (isFieldRequired) {
        fieldSchema = fieldSchema.required(requiredMessage)
      }
      break
  }

  return fieldSchema
  // .typeError('Invalid type of input.')
  // return fieldSchema ? fieldSchema.typeError('Invalid type of input.') : string().typeError('Invalid type of input.')
}
