'use client'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/common/CustomButton'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Img } from 'react-image'
import Axios from '@/libs/axios'
import { getChatListURL, readChatMessages } from '@/services/APIs/vendor'
import userStore from '@/stores/userStore'
import dayjs from 'dayjs'
import { getImage } from '@/utils/helper'
import { cn } from '@/libs/tailwind'
import Loader from '@/components/common/Loader'
import Image from 'next/image'

const ChatList = ({ state, setState, activeChat, setActiveChat }) => {
  const { user } = userStore()

  // Mark chat as read
  const handleChatClick = async (chat) => {
    setActiveChat(chat)
    try {
      const { data } = await Axios({ ...readChatMessages, data: { chatId: chat._id } })
      setState(prev => ({ ...prev, chatList: prev.chatList.map(c => c._id === chat._id ? { ...c, ...data.data } : c) }))
    } catch (error) {
      console.error('Error marking chat as read:', error)
    }
  }

  const handleSearch = (e) => {
    setState(prev => ({ ...prev, search: e.target.value }))
  }

  return (
    <div className={cn('w-full md:w-1/3 flex flex-col space-y-4', activeChat && "hidden md:flex")}>
      {/* Search Bar and Filter */}
      <div className='flex items-center space-x-4'>
        <input
          type='text'
          placeholder='Search name, chat, etc'
          className='input w-full bg-base-200'
          value={state.search || ""}
          onChange={handleSearch}
        />
        <CustomButton
          title={<FontAwesomeIcon icon={faFilter} className='text-muted' />}
          className='!bg-custom-orange'
        />
      </div>
      {/* Chat List */}
      <div className='flex-1 overflow-auto'>
        {state.chatsLoading ?
          <div>
            <Loader />
          </div>
          :
          (!!state.chatList?.length ?
            state.chatList.map(chat => {
              const privateUser = chat?.users?.find(usr => usr.userId !== user._id)?.details;
              const meUser = chat?.users?.find(usr => usr.userId === user._id);
              if (state.search && !`${privateUser?.firstName || ""} ${privateUser?.lastName || ""}`.toLowerCase().includes(state.search.toLowerCase())) return
              return (
                <div
                  key={chat._id}
                  onClick={() => handleChatClick(chat)}
                  className={cn(`flex gap-4 items-center p-4 border-b last:border-none cursor-pointer hover:bg-gray-200 rounded-md transition`,
                    chat.unread && 'bg-gray-100',
                    chat._id === activeChat?._id && '!bg-custom-orange'
                  )}
                >
                  <div className='avatar'>
                    <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold'>
                      <Image width={32} height={32} src={getImage(privateUser?.profilePicture)} alt='' />
                    </div>
                  </div>
                  <div className='flex-1 '>
                    <div className='flex justify-between items-center'>
                      <h3 className='font-semibold max-w-[50%] truncate'>{privateUser ? privateUser?.userName || `${privateUser?.firstName || ""} ${privateUser?.lastName || ""}` : "Unknown User"}</h3>
                      <span className='text-xs text-gray-500'>{getLastMessageTime(chat?.updatedAt)}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <p className='text-sm text-gray-600 max-w-[90%] line-clamp-1'>{chat?.lastMessage?.text}</p>
                      {!!meUser?.unreadMessageCount && <span className='badge badge-warning'>
                        {meUser?.unreadMessageCount}
                      </span>}
                    </div>
                  </div>
                </div>
              )
            })
            :
            <div className='text-center my-10'>
              <span className='text-gray-500'>No Chats Available!</span>
            </div>)
        }
      </div>
    </div>
  )
}

export const getLastMessageTime = (time = new Date()) => {
  const today = dayjs().startOf('day')
  const yesterday = today.subtract(1, 'day')
  const messageTime = dayjs(time)

  if (messageTime.isSame(today, 'day')) {
    return messageTime.format('hh:mm A')
  }

  if (messageTime.isSame(yesterday, 'day')) {
    return 'Yesterday'
  }

  return messageTime.format('DD MMM YYYY')
}

export default ChatList
