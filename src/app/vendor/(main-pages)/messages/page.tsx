'use client'
import React, { useState } from 'react'
import ChatList from '@/components/pages/@vendor/main/ChatMessages/ChatList'
import ChatWindow from '@/components/pages/@vendor/main/ChatMessages/ChatWindow'

const Messages = () => {
  const [state, setState] = useState({
    activeChat: null,
    chatList: []
  })

  return (
    <div className='flex gap-3 h-full max-h-[80vh] 2xl:max-h-[90vh]'>
      <ChatList {...{ state, setState }} />
      <ChatWindow {...{ state, setState }} />
    </div>
  )
}

export default Messages
