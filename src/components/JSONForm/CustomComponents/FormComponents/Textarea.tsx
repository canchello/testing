import React from 'react'
import PropTypes from 'prop-types'
// import { Input } from "antd";

interface CustomTextAreaProps {
  name: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: string
  size?: 'large' | 'middle' | 'small'
  autoSize?: boolean | { maxRows?: number; minRows?: number }
  rows?: number
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  name,
  value = '',
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  placeholder = '',
  className = '',
  disabled = false,
  error = '',
  size = 'middle',
  autoSize = false,
  rows = 4
}) => {
  return (
    <>
      {/* <Input.TextArea
                rows={rows}
                id={name}
                name={name}
                placeholder={placeholder}
                className={`rounded-2 py-2 fs-6 ${className}`}
                disabled={disabled}
                value={value}
                onChange={
                    disabled
                        ? () => {}
                        : (e) => {
                              onChange(e);
                          }
                }
                onBlur={onBlur}
                onFocus={onFocus}
                size={size}
                status={error ? "error" : undefined}
                autoSize={autoSize}
            /> */}
      {error && <span className='invalid-feedback'>{error}</span>}
    </>
  )
}

CustomTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  size: PropTypes.oneOf(['large', 'middle', 'small']),
  // autoSize: PropTypes.oneOfType([
  //     PropTypes.bool,
  //     PropTypes.shape({
  //         maxRows: PropTypes.number,
  //         minRows: PropTypes.number,
  //     }),
  // ]),
  rows: PropTypes.number
}

export default CustomTextArea
