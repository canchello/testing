import { cn } from '@/libs/tailwind'
import React, { useState } from 'react'

interface ToggleProps {
  label?: any
  isChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

const ToggleInput: React.FC<ToggleProps> = ({
  label = <></>,
  disabled,
  isChecked = false,
  onChange,
  className = ''
}) => {
  const [checked, setChecked] = useState(isChecked)

  const handleToggleChange = () => {
    setChecked(!checked)
    onChange && onChange(!checked)
  }

  return (
    <div className={`form-control ${className}`}>
      <label className='label cursor-pointer flex items-center gap-2 px-0'>
        <span className='label-text'>{label}</span>
        <input
          type='checkbox'
          className={cn('toggle !bg-white border-none', isChecked ? '[--tglbg:#15253B]' : '[--tglbg:#b9b9b9]')}
          checked={checked}
          onChange={handleToggleChange}
          disabled={disabled}
          aria-label={label}
        />
      </label>
    </div>
  )
}

export default ToggleInput
