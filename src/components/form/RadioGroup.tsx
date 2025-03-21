'use client'

import React from 'react'

interface RadioOption {
  value: any
  label: string
}

interface CustomRadioProps {
  name?: string
  label?: string
  options: RadioOption[]
  value: any
  onChange: (value: any) => void
  error?: string
  required?: boolean
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  direction = 'horizontal'
}) => {
  return (
    <div className='flex flex-col gap-2 text-left'>
      {label && (
        <label className='text-base font-bold'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <div className={`flex ${direction === 'vertical' ? 'flex-col' : 'flex-wrap'} gap-4`}>
        {options.map(option => (
          <label key={option.value} className='cursor-pointer flex items-center space-x-2'>
            <input
              type='radio'
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
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
