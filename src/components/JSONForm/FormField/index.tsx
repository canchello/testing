import { FC } from 'react'

interface FormFieldProps {
  label: string
  note?: string
  error?: string | boolean
  isRequired?: boolean
  caption?: string
  [key: string]: any // Allow any additional props
}

const FormField: FC<FormFieldProps> = ({
  label,
  note = null,
  caption = null,
  isRequired = false,
  error = '',
  ...rest
}) => {
  return (
    <div className='w-full'>
      {/* Label and Tooltip */}
      {label && (
        <div className='flex justify-between items-center mb-1'>
          <label className='text-base font-medium capitalize'>
            {label} {isRequired && <span className='text-red-600'>*</span>}
          </label>
          {note && (
            <div className='tooltip tooltip-left' data-tip={note}>
              <span className='text-gray-400 cursor-pointer'>ℹ</span>
            </div>
          )}
        </div>
      )}

      {/* Input Field */}
      <input className={`input input-bordered w-full ${error ? 'border-red-500' : ''}`} {...rest} />

      {/* Caption & Error */}
      {caption && <span className='text-gray-500 text-sm'>{caption}</span>}
      {error && typeof error === 'string' && <div className='text-red-500 text-sm'>{error}</div>}
    </div>
  )
}

export default FormField
