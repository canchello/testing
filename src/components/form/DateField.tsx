'use client'

import React from 'react'
import { cn } from '@/libs/tailwind'

interface CustomDateInputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  type?: string
  wrapperClass?: string
  required?: boolean
  disabled?: boolean
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  wrapperClass = '',
  error,
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
    <input
      type={type || 'date'}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={cn('input input-bordered w-full', error ? 'border-red-500' : '')}
    />
    {error && <span className='text-red-500 text-sm'>{error}</span>}
  </div>
)

export default CustomDateInput;