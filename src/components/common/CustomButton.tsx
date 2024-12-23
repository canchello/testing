'use client'

import React, { ReactNode } from 'react'
import Image from 'next/image'

interface ButtonProps {
  onClick?: () => void
  title?: string | ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'light' | 'default' | 'outlined' | 'error' | 'success'
  isDisabled?: boolean
  isLoading?: boolean
  icon?: any
  ImageIcon?: boolean
  type?: 'submit' | 'reset' | 'button'
  iconPosition?: 'left' | 'right'
  wrap?: boolean
}

const CustomButton: React.FC<ButtonProps> = ({
  onClick,
  title,
  className = '',
  variant = 'primary',
  isDisabled = false,
  isLoading,
  type = 'button',
  icon,
  ImageIcon = true,
  iconPosition = 'right',
  wrap = true
}) => {
  const baseStyles =
    'btn px-6 py-2 rounded-3xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 transform'

  const variantStyles = {
    primary: 'bg-primary text-white border-none focus:outline-none focus:ring-2 focus:ring-opacity-50',
    secondary: 'btn-neutral text-white focus:outline-none focus:ring-2 focus:ring-opacity-50',
    default:
      'text-primary border-none bg-transparent hover:bg-transparent hover:shadow-none shadow-none focus:outline-none focus:ring-2 focus:ring-gray-500',
    outlined: '!bg-white text-primary border !border-primary',
    error: '!bg-[#BD4040] text-white',
    success: '!bg-success text-white',
    light: 'bg-custom-orange text-black focus:outline-none focus:ring-2 focus:ring-opacity-50'
  }

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}
        ${!isDisabled && !isLoading ? 'hover:scale-105 hover:shadow-lg' : 'opacity-50 cursor-not-allowed'}`}
    >
      {isLoading ? (
        <>
          <span className='loading loading-spinner loading-xs'></span>
          {title && <span>{title}</span>}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className='mr-2'>
              <IconComp ImageIcon={ImageIcon} icon={icon} />
            </span>
          )}
          {title && (wrap ? <span>{title}</span> : title)}
          {icon && iconPosition === 'right' && (
            <span className='ml-2'>
              <IconComp ImageIcon={ImageIcon} icon={icon} />
            </span>
          )}
        </>
      )}
    </button>
  )
}

export default CustomButton

const IconComp = ({ ImageIcon, icon }: any) => {
  if (ImageIcon) return <Image src={icon} alt='icon' width={16} height={16} />
  return icon
}
