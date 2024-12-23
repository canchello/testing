'use client'

import React from 'react'
import { cn } from '@/libs/tailwind'

interface SelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  label?: string
  options: SelectOption[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
  required?: boolean
  wrapperClass?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = '',
  wrapperClass = '',
  className = '',
  required = false,
  disabled = false
}) => (
  <div className={cn('flex flex-col gap-2 text-left', wrapperClass)}>
    {label && (
      <label className='text-base font-bold'>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>
    )}
    <select
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={cn('select select-bordered w-full', className, error ? 'border-red-500' : '')}
    >
      <option value='' disabled>
        {placeholder || 'Select an option'}
      </option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <span className='text-red-500 text-sm'>{error}</span>}
  </div>
)

export default CustomSelect
