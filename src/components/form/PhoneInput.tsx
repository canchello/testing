import React from 'react'
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

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  required,
  error,
  countryCodeOptions = ['218', '44']
}) => {
  const [selectedCode, setSelectedCode] = React.useState(countryCodeOptions[0])

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value
    onChange(`${selectedCode}${phoneNumber}`)
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
            label: '+' + item,
            value: item
          }))}
          wrapperClass='max-w-24'
          className='!outline-none'
          value={selectedCode}
          onChange={e => setSelectedCode(e.target.value)}
        />

        {/* Phone Number Input */}
        <CustomTextInput
          type='number'
          value={value.replace(selectedCode, '')}
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

export default PhoneInput
