import Messages from '@/app/vendor/(main-pages)/messages/page'
import no_messages from '@/assets/images/no_messages.jpg'
import Loader from '@/components/common/Loader'
import Axios from '@/libs/axios'
import { getChatListURL } from '@/services/APIs/vendor'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const MessagesDropDown = () => {

  const [chats, setChats] = useState([])
  const [chatsLoading, setChatsLoading] = useState(false)

  // Fetch chat list
  useEffect(() => {
    const fetchChats = async () => {
      try {
        setChatsLoading(true)
        const { data } = await Axios({
          ...getChatListURL, data: {
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
        }
        )
        setChats(data.data?.data || [])
      } catch (error) {
        console.error('Error fetching chat list:', error)
      } finally {
        setChatsLoading(false)
      }
    }
    fetchChats()
  }, [])

  return (
    <div
      tabIndex={0}
      className='flex dropdown-content menu bg-base-100 text-black rounded-box z-[1] mt-4 w-96 p-4 shadow'
    >
      {chatsLoading ?
        <Loader /> :
        (!!chats?.length ?
          <Messages />
          :
          <div className='flex flex-col justify-center items-center text-center'>
            <Image src={no_messages} alt='' />
            <p className='text-xl font-bold'>No Messages!</p>
            <p className='text-lg'>It seems like you don't have any messages at the moment.</p>
          </div>)
      }
    </div>
  )
}
