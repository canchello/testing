import { useState } from 'react'

const OTPInput = ({ length = 4, onComplete = (a: string) => {} }) => {
  const [otp, setOtp] = useState(Array(length).fill(''))

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only keep the last character
    setOtp(newOtp)

    if (value && index < length - 1) {
      document?.getElementById?.(`otp-${index + 1}`)?.focus()
    }

    if (newOtp.join('').length === length) {
      onComplete(newOtp.join(''))
    }
  }

  const handleBackspace = (index: number) => {
    if (otp[index] === '') {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  return (
    <div className='flex space-x-2'>
      {otp.map((_, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type='number'
          value={otp[index]}
          onChange={e => handleChange(e.target.value, index)}
          onKeyDown={e => e.key === 'Backspace' && handleBackspace(index)}
          className='input input-bordered w-12 text-center font-bold text-xl'
          maxLength={1}
          autoFocus={!index}
        />
      ))}
    </div>
  )
}

export default OTPInput
