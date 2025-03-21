import React from 'react'
import PropTypes from 'prop-types'
import dayjs, { Dayjs } from 'dayjs'
import { cn } from '@/libs/tailwind'

interface CustomDatePickerProps {
  allowClear?: boolean
  type?: string
  className?: string
  disabled?: boolean
  disabledDate?: (current: Dayjs) => boolean
  format?: string
  minDate?: Dayjs | null
  maxDate?: Dayjs | null
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year'
  placeholder?: string
  size?: 'large' | 'middle' | 'small'
  multiple?: boolean
  showTime?: boolean
  value?: Dayjs | Dayjs[] | null
  onChange?: (date: Dayjs | Dayjs[] | null) => void
  error?: string
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  type = 'date',
  allowClear = true,
  className = '',
  disabled = false,
  disabledDate = () => false,
  format = 'DD-MM-YYYY',
  minDate = null,
  maxDate = null,
  picker = 'date',
  placeholder = '',
  size = 'middle',
  multiple = false,
  showTime = false,
  value = null,
  onChange = () => {},
  error = ''
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    if (!newValue) {
      onChange(null)
    } else {
      // Parse date correctly based on type
      const parsedDate = type === 'datetime-local' ? dayjs(newValue) : dayjs(newValue, format)
      onChange(parsedDate)
    }
  }

  // Format value correctly for input field
  const formattedValue = Array.isArray(value)
    ? value
        .map(v => (dayjs.isDayjs(v) ? v.format(type === 'datetime-local' ? 'YYYY-MM-DDTHH:mm' : format) : ''))
        .join(', ')
    : dayjs.isDayjs(value)
    ? value.format(type === 'datetime-local' ? 'YYYY-MM-DDTHH:mm' : format)
    : ''

  return (
    <div className={cn('flex flex-col gap-2 text-left', className)}>
      <input
        type={type || 'date'}
        disabled={disabled}
        placeholder={placeholder}
        value={formattedValue}
        onChange={handleChange}
        className={cn('input input-bordered w-full', error ? 'border-red-500' : '')}
      />
      {error && <span className='text-red-500 text-sm'>{error}</span>}
    </div>
  )
}

export default CustomDatePicker
