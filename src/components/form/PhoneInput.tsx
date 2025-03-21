import React, { forwardRef } from 'react'
import CustomTextInput from './TextField'
import CustomSelect from './SelectField'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  required?: boolean
  error?: string
  countryCodeOptions?: string[]
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, label, placeholder, required, error, countryCodeOptions = ['+218', '+44', '+91'] }, ref) => {
    // Extract the existing country code from value
    const existingCode = countryCodeOptions.find(code => value.startsWith(code))
    const numberWithoutCode = existingCode ? value.replace(existingCode, '') : value

    const [selectedCode, setSelectedCode] = React.useState(existingCode || countryCodeOptions[0])

    // Handle phone number input change
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const phoneNumber = e.target.value
      onChange(`${selectedCode}${phoneNumber}`)
    }

    // Handle country code change
    const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCode = e.target.value
      setSelectedCode(newCode)
      onChange(`${newCode}${numberWithoutCode}`) // Keep only the number and add the new code
    }

    return (
      <div className='flex flex-col gap-2'>
        {label && (
          <label className='text-base font-bold'>
            {label}
            {required && <span className='text-red-500'>*</span>}
          </label>
        )}
        <div className='flex h-full gap-2 items-center rounded-md overflow-hidden'>
          {/* Country Code Dropdown */}
          <CustomSelect
            options={countryCodeOptions.map(item => ({
              label: item,
              value: item
            }))}
            wrapperClass='max-w-24'
            className='!outline-none'
            value={selectedCode}
            onChange={handleCodeChange} // Handle change properly
          />

          {/* Phone Number Input */}
          <CustomTextInput
            type='number'
            ref={ref} // Attach ref for focusing
            value={numberWithoutCode} // Ensure only the number is displayed
            onChange={handleNumberChange}
            placeholder={placeholder}
            wrapperClass='flex-1'
            className='flex-1 px-3 w-full py-3 !outline-none border border-gray-300'
          />
        </div>
        {error && <span className='text-red-500 text-xs'>{error}</span>}
      </div>
    )
  }
)

PhoneInput.displayName = 'PhoneInput'

export default PhoneInput
