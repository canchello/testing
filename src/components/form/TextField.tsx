'use client'

import { cn } from '@/libs/tailwind'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, forwardRef } from 'react'

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

// ✅ Using forwardRef to allow external focus control
const CustomTextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { onChange, placeholder, className = '', wrapperClass = '', value, error, type = 'text', isDisabled = false },
    ref
  ) => {
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
            ref={ref} // ✅ Attaching ref to input for external focus control
            className='grow'
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={onChange}
            onWheel={e => {
              if (inputType === 'number') e.currentTarget.blur()
            }} // Prevents scrolling inside the input
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
)

CustomTextInput.displayName = 'CustomTextInput' // Required for forwardRef components

export default CustomTextInput
