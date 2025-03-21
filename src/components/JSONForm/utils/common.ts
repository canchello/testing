import { FIELD_TYPES } from '../constants'
import dayjs from 'dayjs'

// Helper function to set nested object properties safely
export const setDataToObj = (obj: Record<string, any>, key: string, value: any = ''): Record<string, any> => {
  if (!obj || !key || typeof obj !== 'object') return obj
  const keyAtt = key.split('.')

  if (keyAtt.length === 1) {
    obj[keyAtt[0]] = value
  } else {
    obj[keyAtt[0]] = setDataToObj(obj[keyAtt[0]] ?? {}, keyAtt.slice(1).join('.'), value)
  }
  return { ...obj }
}

// Retrieves nested values from an object safely
export const getDataFromObject = (data: Record<string, any>, key: string): any => {
  if (!data || !key || typeof data !== 'object') return undefined
  key = key.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')

  return key.split('.').reduce((acc, curr) => (acc && acc[curr] !== undefined ? acc[curr] : undefined), data)
}

// Type for FIELD_TYPES keys
type FieldType = keyof typeof FIELD_TYPES

type Field = {
  type: string
  subType?: string
  name: string
  children?: Field[]
  fieldType?: FieldType
  fieldProps?: Record<string, any>
  validations?: Record<string, any>
  isRequired?: boolean
}

type Schema = Field[]

// Formats date using dayjs
export const printDate = (date: Date | string, format: string = 'DD-MM-YYYY hh:mm A'): string =>
  dayjs(date).format(format)

// Retrieves default values from schema
export const getDefaultFormValue = (
  schema: Schema | null,
  defaultValue: Record<string, any> = {}
): Record<string, any> => {
  if (!schema || !Array.isArray(schema)) return {}

  const fieldsArr = getArrayOfFields(schema)

  return fieldsArr.reduce<Record<string, any>>((prev, field) => {
    const { type, subType = '', name, children = [] } = field
    let defaultVal = getDataFromObject(defaultValue, name)

    if (defaultVal === undefined) {
      defaultVal =
        type === 'fieldArray' && subType === 'field'
          ? [getDefaultFieldValue(field)]
          : type === 'fieldArray' && subType === 'section'
          ? [getDefaultFormValue(children)]
          : getDefaultFieldValue(field)
    }

    return setDataToObj(prev, name, defaultVal)
  }, {})
}

// Determines default value for a field
export const getDefaultFieldValue = (field: Field): any => {
  const { fieldType, fieldProps = {} }: any = field

  if (fieldType && [FIELD_TYPES.dateRange, FIELD_TYPES.timeRange].includes(fieldType)) {
    return [null, null]
  }
  if (
    fieldType &&
    ([FIELD_TYPES.tags, FIELD_TYPES.checkbox].includes(fieldType) ||
      (fieldType === FIELD_TYPES.select && fieldProps.multiple) ||
      (fieldType === FIELD_TYPES.fileUpload && fieldProps.multiple))
  ) {
    return []
  }
  if (fieldType && [FIELD_TYPES.select, FIELD_TYPES.fileUpload].includes(fieldType)) {
    return null
  }
  if (fieldType === FIELD_TYPES.switch) {
    return false
  }
  return ''
}

// Determines if a field is required
export const checkIfFieldIsRequired = (field: Field): boolean => {
  const { isRequired, validations = {}, fieldType, fieldProps = {} }: any = field

  if (isRequired || validations.hasOwnProperty('required')) {
    return true
  }

  if (
    fieldType &&
    ([
      FIELD_TYPES.tags,
      FIELD_TYPES.fileUpload,
      FIELD_TYPES.checkbox,
      FIELD_TYPES.dateRange,
      FIELD_TYPES.timeRange
    ].includes(fieldType) ||
      (fieldType === FIELD_TYPES.select && fieldProps.multiple)) &&
    validations.hasOwnProperty('min')
  ) {
    return true
  }

  return false
}

// Flattens schema and extracts only field-related elements
export const getArrayOfFields = (schema: Schema): Field[] => {
  return schema.reduce<Field[]>((prev, field) => {
    if (field.type === 'row' && field.children) {
      prev.push(...field.children.filter(f => f.type === 'field' || (f.type === 'fieldArray' && f.subType === 'field')))
    }
    if (field.type === 'field' || field.type === 'fieldArray') {
      prev.push(field)
    }
    return prev
  }, [])
}
