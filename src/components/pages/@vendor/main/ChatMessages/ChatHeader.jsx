import React from 'react'
import { faArrowLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Img } from 'react-image'
import { getImage } from '@/utils/helper'
import { getLastMessageTime } from './ChatList'
import userStore from '@/stores/userStore'

export default function ChatHeader({ activeChat, setActiveChat }) {
  const { user } = userStore()
  const privateUser = activeChat?.users?.find(usr => usr.userId !== user._id)?.details

  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='flex items-center gap-4'>
        <div className='flex md:hidden'>
          <FontAwesomeIcon icon={faArrowLeft} className='mx-2 cursor-pointer' onClick={() => setActiveChat()} />
        </div>
        <Img src={getImage(privateUser?.profilePicture) || 'https://via.placeholder.com/150'} alt='' className='w-12 h-12 rounded-full' />
        <div>
          <p className='font-semibold'>{privateUser ? privateUser?.userName || `${privateUser?.firstName || ""} ${privateUser?.lastName || ""}` : "Unknown User"}</p>
          <p className='text-xs'>{getLastMessageTime(activeChat?.updatedAt)}</p>
        </div>
      </div>
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className='bg-white py-2 px-4 rounded-lg'>
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 mt-1 p-2 shadow">
          <li><a>Option 1</a></li>
          <li><a>Option 2</a></li>
        </ul>
      </div>
    </div>
  )
}
