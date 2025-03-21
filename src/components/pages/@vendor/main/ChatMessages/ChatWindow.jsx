'use client'
import React, { useEffect, useRef, useState } from 'react'
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import dayjs from 'dayjs';
import { getChatMessages, sendChatMessage } from '@/services/APIs/vendor';
import Axios from '@/libs/axios';
import userStore from '@/stores/userStore';

export default function ChatWindow({ state, setState, activeChat, setActiveChat }) {
  const { user } = userStore()
  const endRef = useRef()
  const { messageList } = state;

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat._id);
    }
  }, [activeChat]);

  const fetchMessages = async (chatId) => {
    try {
      const { data } = await Axios({
        ...getChatMessages, data: {
          query: { chatId },
          options: {
            sort: { createdAt: 1 },
            populate: 'createdByUser',
            lean: true,
            page: 1,
            limit: 50,
            pagination: false
          }
        }
      });
      setState(prev => ({ ...prev, messageList: data.data?.data || [] }));
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200)
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (text) => {
    if (!activeChat) return;
    try {
      const { data } = await Axios({
        ...sendChatMessage,
        data: {
          chatId: activeChat._id,
          text
        }
      });
      setState(prev => ({ ...prev, messageList: [...prev.messageList, data.data] }));
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200)
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!activeChat) {
    return (
      <div className="hidden md:flex flex-1 justify-center items-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select a chat to start conversation</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-2/3 bg-gray-100 rounded-lg p-2 flex flex-col">
      <ChatHeader {...{ activeChat, setActiveChat }} />
      <div className="divider my-0" />
      <div className="space-y-3 flex-1 overflow-auto">
        {!!messageList.length ?
          messageList.map((message, index) => {
            const isMe = message.createdBy === user._id
            return (
              <div key={message._id} className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}>
                <div
                  className={`chat-bubble ${isMe
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-200 text-gray-700'
                    }`}
                >
                  {message.text}
                </div>
                {
                  dayjs(message?.updatedAt).diff(dayjs(messageList?.[index - 1]?.updatedAt), 'day') > 1 ?
                    <div className="chat-footer text-xs opacity-70">
                      {getTimeAgo(message.updatedAt)}
                    </div>
                    : <></>
                }
              </div>
            )
          })
          :
          <div className='flex items-center justify-center h-full'>
            <span className='text-gray-500'>
              Send message to start conversation
            </span>
          </div>
        }
        <div ref={endRef} />
      </div>
      <ChatFooter {...{ activeChat, sendMessage }} />
    </div>
  );
}

export function getTimeAgo(givenTime) {
  const now = dayjs();
  const time = dayjs(givenTime);
  const diffInSeconds = now.diff(time, 'second');
  const diffInMinutes = now.diff(time, 'minute');
  const diffInHours = now.diff(time, 'hour');
  const diffInDays = now.diff(time, 'day');

  if (diffInSeconds < 60) return diffInSeconds <= 1 ? 'a second ago' : `${diffInSeconds} seconds ago`;
  if (diffInMinutes < 60) return diffInMinutes === 1 ? 'a minute ago' : `${diffInMinutes} minutes ago`;
  if (diffInHours < 24) return diffInHours === 1 ? 'an hour ago' : `${diffInHours} hours ago`;
  if (diffInDays === 1) return 'a day ago';
  return `${diffInDays} days ago`;
}
