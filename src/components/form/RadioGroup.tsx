'use client'

import React from 'react'

interface RadioOption {
  value: any
  label: string
}

interface CustomRadioProps {
  label?: string
  options: RadioOption[]
  value: any
  onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | ((value: any) => void)
  error?: string
  required?: boolean
  disabled?: boolean
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  disabled = false
}) => {
  // Handle both ChangeEvent-based and value-based onChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, optionValue: any) => {
    if (typeof onChange === 'function') {
      if (onChange.length === 1) {
        // If onChange expects only one argument (value)
        ;(onChange as (value: any) => void)(optionValue)
      } else {
        // If onChange expects a ChangeEvent
        ;(onChange as (e: React.ChangeEvent<HTMLInputElement>) => void)(e)
      }
    }
  }

  return (
    <div className='flex flex-col gap-2 text-left'>
      {label && (
        <label className='text-base font-bold'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <div className='flex flex-wrap gap-4'>
        {options.map(option => (
          <label key={option.value} className='cursor-pointer flex items-center space-x-2'>
            <input
              type='radio'
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={e => handleChange(e, option.value)}
              className='radio'
              disabled={disabled}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className='text-red-500 text-sm'>{error}</span>}
    </div>
  )
}

export default CustomRadio
