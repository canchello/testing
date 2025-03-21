import React from 'react'
import PropTypes from 'prop-types'

interface CustomFieldLabelProps {
  className?: string
  label?: any
  isRequired?: boolean
  name: string
  fieldProps: {
    customNote?: string
  }
  customComponents?: any
}

const CustomFieldLabel: React.FC<CustomFieldLabelProps> = ({
  className = '',
  label,
  isRequired = false,
  name,
  fieldProps = {},
  customComponents = {}
}) => {
  const labelNode = (
    <label htmlFor={name} className={`text-base font-medium ${className}`}>
      {label ?? name}
      {isRequired && <span className='ml-1 text-red-600'>*</span>}
    </label>
  )
  if (fieldProps.customNote) {
    return (
      <div className='flex justify-between items-baseline my-1'>
        {labelNode}
        {customComponents[fieldProps.customNote] && customComponents[fieldProps.customNote]}
      </div>
    )
  }
  return labelNode
}

CustomFieldLabel.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired
}

export default CustomFieldLabel
