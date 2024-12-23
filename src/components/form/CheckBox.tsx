'use client'

import { cn } from '@/libs/tailwind'
import React from 'react'

interface CheckboxProps {
  label?: React.ReactNode
  checked?: boolean
  onChange?: (checked: boolean) => void
  error?: string
  isDisabled?: boolean
  className?: string
  labelClassName?: string
}

const CustomCheckbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange = () => {},
  labelClassName = '',
  className = '',
  error,
  isDisabled = false
}) => {
  const baseStyles = 'flex items-center gap-2 cursor-pointer rounded-md'

  const checkboxStyles = `min-w-6 max-w-6 min-h-6 max-h-6 mt-1 border-2 border-gray-500 transition-all duration-200 rounded-md flex items-center justify-center mr-2 ${
    isDisabled ? 'bg-gray-200 border-gray-500' : checked ? 'bg-transparent text-black text-center' : 'border-gray-500'
  }`

  const checkMarkStyles = 'text-black font-bold w-full'

  return (
    <div className={cn(className)}>
      <label className='label cursor-pointer justify-normal gap-4'>
        <input
          type='checkbox'
          checked={checked}
          className='checkbox'
          disabled={isDisabled}
          onChange={e => onChange(e.target.checked)}
        />
        <span className={cn('label-text', labelClassName)}>{label}</span>
      </label>
      {/* <label className={`${baseStyles} ${className}`} onClick={() => !isDisabled && onChange(!checked)}>
        <div className={checkboxStyles}>{checked && <span className={checkMarkStyles}>✓</span>}</div>
        {label && <span className={`text-black text-sm md:text-xl font-semibold ${labelClassName}`}>{label}</span>}
      </label> */}
      {error && <span className='text-red-500 text-sm'>{error}</span>}
    </div>
  )
}

export default CustomCheckbox
