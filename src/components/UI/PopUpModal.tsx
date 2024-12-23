import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/libs/tailwind'
import CustomButton from '../common/CustomButton'

interface ModalProps {
  title: string
  message: string
  buttonText: string
  onClose: () => void
  type: string
  isOpen: boolean
}

const PopUpModal: FC<ModalProps> = ({ title, message, buttonText, isOpen, type = 'default', onClose }) => {
  if (!isOpen) return null

  let classes = {
    iconClass: '',
    button: '',
    title: ''
  }
  if (type === 'error')
    classes = {
      iconClass: 'text-error',
      title: 'text-error',
      button: 'bg-error text-white'
    }
  else if (type === 'success')
    classes = {
      iconClass: 'text-success',
      title: 'text-success',
      button: 'bg-error text-white'
    }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
        <div className='justify-items-center text-center'>
          <div className={cn('text-5xl mb-4', classes.iconClass)}>
            <FontAwesomeIcon icon={faCircleExclamation} />
          </div>
          <h2 className={cn('text-xl font-bold mb-2', classes.title)}>{title}</h2>
          <p className='mb-4'>{message}</p>
          {buttonText && (
            <div className=''>
              <CustomButton
                className={cn('btn rounded-3xl shadow-2xl', classes.button)}
                onClick={onClose}
                title={buttonText}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PopUpModal
