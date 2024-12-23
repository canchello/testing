'use client'

import { cn } from '@/libs/tailwind'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
// import { FiEye, FiEyeOff } from 'react-icons/fi' // Using react-icons for eye icons

interface InputProps {
  placeholder?: string
  className?: string
  wrapperClass?: string
  variant?: 'primary' | 'secondary'
  isDisabled?: boolean
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  type?: string
}

const CustomTextInput: React.FC<InputProps> = ({
  onChange,
  placeholder,
  className = '',
  wrapperClass = '',
  value,
  error,
  type = 'text',
  isDisabled = false
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type

  return (
    <div className={cn('flex flex-col gap-2 text-left', wrapperClass)}>
      <label className={cn(`input input-bordered flex items-center gap-2`, className, error ? 'border-error' : '')}>
        <input
          type={inputType}
          value={value}
          className='grow'
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
      </label>
      {error && <span className='text-red-500 text-sm'>{error}</span>}
    </div>
  )
}

export default CustomTextInput
