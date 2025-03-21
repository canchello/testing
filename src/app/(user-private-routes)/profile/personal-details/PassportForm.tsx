import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import TextInput from '@/components/form/LabelInput'
import CustomDateInput from '@/components/form/DateField'
import CustomSelect from '@/components/form/SelectField'
import CustomCheckbox from '@/components/form/CheckBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/libs/tailwind'

interface PassportFormProps {
  control: any
  errors: any
  fieldPrefix?: string // Optional field prefix (default is empty string)
}

const PassportForm: React.FC<PassportFormProps> = ({ control, errors, fieldPrefix = '' }) => {
  const getFieldName = (field: string) => (fieldPrefix ? `${fieldPrefix}.${field}` : field)
  const [isOpen, setIsOpen] = useState(true)

  // Open accordion if there are validation errors
  useEffect(() => {
    const formErrors = errors?.[fieldPrefix] || {}
    const hasErrors =
      Object.keys(formErrors).length > 0 &&
      Object.keys(formErrors).some(errorKey =>
        ['firstName', 'lastName', 'issuingCountry', 'passportNumber', 'expiryDate', 'agreedPolicy'].includes(errorKey)
      )
    if (hasErrors) {
      setIsOpen(true)
    }
  }, [errors])

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='mt-8'>
      <button
        className='w-full flex justify-between items-center py-4 text-left text-lg font-bold text-primary'
        onClick={toggleAccordion}
        type='button'
      >
        Passport Details
        <span>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </span>
      </button>
      <hr className='mb-4' />

      <div className={cn(!isOpen ? 'hidden' : '')}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Passport First Name */}
          <Controller
            name={getFieldName('firstName')}
            control={control}
            rules={{ required: 'First Name is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label='First Name'
                placeholder='Enter Passport First Name'
                error={errors?.[fieldPrefix]?.firstName?.message}
                required
              />
            )}
          />
          {/* Passport Last Name */}
          <Controller
            name={getFieldName('lastName')}
            control={control}
            rules={{ required: 'Last Name is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label='Last Name'
                placeholder='Enter Passport Last Name'
                error={errors?.[fieldPrefix]?.lastName?.message}
                required
              />
            )}
          />
          {/* Issuing Country */}
          <Controller
            name={getFieldName('issuingCountry')}
            control={control}
            rules={{ required: 'Issuing Country is required' }}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label='Issuing Country'
                options={[
                  { label: 'Libya', value: 'libya' },
                  { label: 'India', value: 'india' },
                  { label: 'USA', value: 'usa' }
                ]}
                error={errors?.[fieldPrefix]?.issuingCountry?.message}
                required
              />
            )}
          />
          {/* Passport Number */}
          <Controller
            name={getFieldName('passportNumber')}
            control={control}
            rules={{ required: 'Passport Number is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label='Passport Number'
                placeholder='Enter Passport Number'
                error={errors?.[fieldPrefix]?.passportNumber?.message}
                required
              />
            )}
          />
          {/* Expiry Date */}
          <Controller
            name={getFieldName('expiryDate')}
            control={control}
            rules={{ required: 'Expiry Date is required' }}
            render={({ field }) => (
              <CustomDateInput
                {...field}
                label='Expiry Date'
                placeholder='Enter Expiry Date'
                error={errors?.[fieldPrefix]?.expiryDate?.message}
                required
              />
            )}
          />
        </div>
        {/* Consent Checkbox */}
        <Controller
          name={getFieldName('agreedPolicy')}
          control={control}
          rules={{ required: 'Your consent is required to proceed' }}
          render={({ field }) => (
            <CustomCheckbox
              {...field}
              checked={field.value} // Bind the checkbox state to the field value
              className='my-3'
              label={
                <p className='text-base font-normal'>
                  I consent to LibyaBooking.com storing my Passport Information in accordance with the{' '}
                  <span className='text-primary text-link'>Privacy Policy</span>.
                </p>
              }
              error={errors?.[fieldPrefix]?.consent?.message}
            />
          )}
        />
        {/* Note */}
      </div>
      <p className='text-gray-500 italic'>
        For foreign nationals, providing your passport information is important for a smooth check-in process. While
        it’s not mandatory to fill in this information now, you will need to provide it at checkout.
      </p>
    </div>
  )
}

export default PassportForm
