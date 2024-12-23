'use client'
import React, { useState } from 'react'
import CustomButton from '@/components/common/CustomButton'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Img } from 'react-image'

const ChatList = ({ state, setState }: any) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      message: 'Can I request a late check-out for Room 305?',
      time: '09:15 AM',
      unread: true
    },
    {
      id: 2,
      name: 'Michael Brown',
      message: "The air conditioning in my room isn't working.",
      time: '09:30 AM',
      unread: true
    },
    {
      id: 3,
      name: 'Emily Davis',
      message: 'Can you confirm my airport pickup for tomorrow?',
      time: '07:45 AM',
      unread: true
    },
    {
      id: 4,
      name: 'John Doe',
      message: 'I need extra towels and pillows in Room 501.',
      time: '10:00 AM',
      unread: false
    },
    {
      id: 4,
      name: 'John Doe',
      message: 'I need extra towels and pillows in Room 501.',
      time: '10:00 AM',
      unread: false
    },
    {
      id: 4,
      name: 'John Doe',
      message: 'I need extra towels and pillows in Room 501.',
      time: '10:00 AM',
      unread: false
    },
    {
      id: 4,
      name: 'John Doe',
      message: 'I need extra towels and pillows in Room 501.',
      time: '10:00 AM',
      unread: false
    },
    {
      id: 5,
      name: 'Jane Smith',
      message: 'Is breakfast included in my reservation?',
      time: '10:15 AM',
      unread: false
    }
    // Add more dummy data as needed
  ])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredChats = chats.filter(
    chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='w-1/3 flex flex-col space-y-4'>
      {/* Search Bar and Filter */}
      <div className='flex items-center space-x-4'>
        <input
          type='text'
          placeholder='Search name, chat, etc'
          className='input w-full bg-base-200'
          value={searchQuery}
          onChange={handleSearch}
        />

        <CustomButton
          title={<FontAwesomeIcon icon={faFilter} className='text-muted' />}
          className='!bg-custom-orange'
        />
      </div>

      {/* Chat List */}
      <div className='flex-1 overflow-auto'>
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            className={`flex gap-4 items-center p-4 border-b last:border-none ${
              chat.unread ? 'bg-gray-100' : ''
            } hover:bg-gray-200 transition`}
          >
            {/* User Avatar */}
            <div className='avatar'>
              <div className='w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold'>
                {/* {chat.name.charAt(0)} */}
                <Img src={'https://via.placeholder.com/150'} alt='' />
              </div>
            </div>
            {/* Chat Info */}
            <div className='flex-1 '>
              <div className='flex justify-between items-center'>
                <h3 className='font-semibold max-w-[50%] truncate'>{chat.name}</h3>
                <span className='text-xs text-gray-500'>{chat.time}</span>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-600 max-w-[90%] line-clamp-1'>{chat.message}</p>
                {chat.unread && <span className='badge badge-error badge-sm'>!</span>}
              </div>
            </div>
            {/* Unread Indicator */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatList
