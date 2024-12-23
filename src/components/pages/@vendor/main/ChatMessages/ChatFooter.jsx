import React, { useState } from 'react'
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ChatFooter() {
  const [state, setState] = useState({
    message: ""
  })
  return (
    <div className='bg-white rounded-lg p-2 flex items-center gap-2 max-h-32'>
      <div className='flex gap-2 items-center flex-1 bg-gray-100 p-2 rounded-lg'>
        <button className='px-2'>
          <FontAwesomeIcon icon={faFaceSmile} />
        </button>
        <textarea
          rows={Math.min(state.message.split("\n").length, 3)}
          className='bg-transparent outline-none text-black flex-1 h-auto'
          placeholder='Type a message...' />
      </div>
      <button className='bg-custom-orange rounded-lg py-2 px-4'>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  )
}
