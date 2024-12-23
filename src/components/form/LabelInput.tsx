'use client'

import { cn } from '@/libs/tailwind'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface InputProps {
  placeholder?: string
  className?: string
  variant?: 'primary' | 'secondary'
  isDisabled?: boolean
  label?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  type?: string
  required?: boolean
  showLabel?: boolean
  countryCode?: string
  onCountryCodeChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const TextInput: React.FC<InputProps> = ({
  onChange = () => {},
  placeholder,
  className = '',
  value,
  error,
  type = 'text',
  isDisabled = false,
  label,
  required = false,
  showLabel = true,
  countryCode = '+91',
  onCountryCodeChange
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type

  return (
    <div className='flex flex-col gap-2 text-left'>
      {showLabel && label && (
        <label className='text-base font-bold'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <div className={cn('flex items-center gap-2', className)}>
        {/* If countryCode is provided, render a select input for it */}
        {countryCode && onCountryCodeChange && (
          <select
            value={countryCode}
            onChange={onCountryCodeChange}
            className={cn('select select-bordered w-auto', error ? 'border border-red-500' : '')}
            disabled={isDisabled}
          >
            {/* Add other options as needed */}
            <option value='+91'>+91</option>
            <option value='+1'>+1</option>
            <option value='+44'>+44</option>
          </select>
        )}
        <input
          type={inputType}
          value={value}
          className={cn(
            'input input-bordered grow',
            error ? 'border border-red-500' : '',
            type === 'password' ? 'pr-10' : ''
          )}
          placeholder={placeholder}
          disabled={isDisabled}
          onChange={onChange}
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='text-gray-500 hover:text-gray-700'
            disabled={isDisabled}
          >
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
          </button>
        )}
      </div>
      {error && <span className='text-red-500 text-sm'>{error}</span>}
    </div>
  )
}

export default TextInput
