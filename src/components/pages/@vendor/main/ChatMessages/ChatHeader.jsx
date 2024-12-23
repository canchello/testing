import React from 'react'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Img } from 'react-image'
import { getTimeAgo } from './ChatWindow'

export default function ChatHeader({ activeChat }) {
  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='flex items-center gap-4'>
        <Img src={'https://via.placeholder.com/150'} alt='' className='w-12 h-12 rounded-full' />
        <div>
          <p className='font-semibold'>{activeChat.name}</p>
          <p className='text-xs'>{getTimeAgo(new Date())}</p>
        </div>
      </div>
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className='bg-white py-2 px-4 rounded-lg'>
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 mt-1 p-2 shadow">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </div>
    </div>
  )
}
