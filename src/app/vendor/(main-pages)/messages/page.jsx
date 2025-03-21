'use client'
import React, { useEffect, useRef, useState } from 'react'
import ChatList from '@/components/pages/@vendor/main/ChatMessages/ChatList'
import ChatWindow from '@/components/pages/@vendor/main/ChatMessages/ChatWindow'
import Axios from '@/libs/axios'
import { getChatListURL, listenChatMethod } from '@/services/APIs/vendor'
import userStore from '@/stores/userStore'
import { useSearchParams } from 'next/navigation'

const Messages = () => {
  const { user } = userStore()
  const searchParams = useSearchParams()

  const [activeChat, setActiveChat] = useState(null)
  const [state, setState] = useState({
    search: "",
    chatList: [],
    messageList: [],
    chatsLoading: false
  })

  const controllerRef = useRef(null)  // This will store AbortController for stopping SSE

  useEffect(() => {
    !state.chatList.length && fetchChatList()
    startSSE()
    return () => {
      stopSSE()  // Stop SSE when component unmounts
    }
  }, [activeChat?._id])

  const fetchChatList = async () => {
    try {
      setState(prev => ({ ...prev, chatsLoading: true }))
      const { data } = await Axios({
        ...getChatListURL,
        data: {
          query: {},
          options: {
            sort: { updatedAt: -1 },
            populate: 'users.details lastMessage',
            lean: true,
            page: 1,
            limit: 10,
            pagination: false
          }
        }
      })
      setState(prev => ({ ...prev, chatList: data.data?.data || [] }))

      const defaultChatId = searchParams.get('chat')
      if (defaultChatId && !activeChat) {
        setActiveChat(data.data?.data.find(chat => chat._id === defaultChatId))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setState(prev => ({ ...prev, chatsLoading: false }))
    }
  }

  const updateNewMessage = (data = {}, chat) => {
    if (!data.chatId) return

    if (data.chatId && activeChat && data.chatId === activeChat?._id) {
      setState(prev => ({
        ...prev,
        messageList: [...prev.messageList, data],
      }))
      setActiveChat(prev => ({ ...prev, lastMessage: data }))
    }

    setState(prev => ({
      ...prev,
      chatList: prev.chatList.map(chat => (
        chat._id === data.chatId ? { ...chat, lastMessage: data } : chat
      ))
    }))
  }

  const startSSE = () => {
    stopSSE() // Stop any previous SSE before starting new one

    const controller = new AbortController()  // Create new controller
    controllerRef.current = controller

    fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/chat/listeners/${user._id}`, {
      ...listenChatMethod(),
      signal: controller.signal  // Pass signal to fetch
    })
      .then(res => {
        if (!res.ok || !res.body) throw new Error('Failed to connect to the stream')
        return res.body
      })
      .then(async (data) => {
        const reader = data.getReader()
        const decoder = new TextDecoder()
        let done = false

        while (!done) {
          const { value, done: readerDone } = await reader.read()
          done = readerDone

          try {
            if (value) {
              const chunk = decoder.decode(value, { stream: true })
              const jsonString = chunk.replace(/^data: /, '')
              const data = JSON.parse(jsonString)
              updateNewMessage(data, activeChat)
            }
          } catch (error) {
            console.error(error)
          }
        }
        reader.releaseLock()
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('SSE ERROR:', err)
        }
      })
  }

  const stopSSE = () => {
    if (controllerRef.current) {
      controllerRef.current.abort()  // Abort any ongoing fetch request
      controllerRef.current = null   // Reset ref
    }
  }

  return (
    <div className='flex gap-3 h-full overflow-auto max-h-[80vh] 2xl:max-h-[90vh]'>
      <ChatList {...{ state, setState, activeChat, setActiveChat }} />
      <ChatWindow {...{ state, setState, activeChat, setActiveChat }} />
    </div>
  )
}

export default Messages
