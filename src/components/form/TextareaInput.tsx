'use client'

import React from 'react'
import { cn } from '@/libs/tailwind'

interface CustomTextAreaProps {
  label?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  placeholder?: string
  required?: boolean
  isDisabled?: boolean
  rows?: number
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder = 'Enter your text here',
  required = false,
  isDisabled = false,
  rows = 4
}) => (
  <div className='flex flex-col gap-2 text-left'>
    {label && (
      <label className='text-base font-bold'>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>
    )}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={isDisabled}
      rows={rows}
      className={cn('textarea textarea-bordered w-full', error ? 'border-red-500' : '')}
    />
    {error && <span className='text-red-500 text-sm'>{error}</span>}
  </div>
)

export default CustomTextArea
