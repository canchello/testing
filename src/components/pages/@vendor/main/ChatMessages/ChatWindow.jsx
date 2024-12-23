import React from 'react';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import dayjs from 'dayjs';

export default function ChatWindow({ state, setState }) {
  const activeChat = state.activeChat || {
    id: 5,
    name: 'Jane Smith',
    message: 'Is breakfast included in my reservation?',
    time: '10:15 AM',
    unread: false
  };

  const messages = [
    { id: 1, type: 'received', content: 'Can I request a late check-out for Room 305?', time: '9:15 PM' },
    { id: 2, type: 'sent', content: 'Hi Alice, we can accommodate a late check-out for you. How late would you like to stay?', time: '9:20 AM' },
    { id: 3, type: 'received', content: 'I was hoping to stay until 2 PM. Is that possible?', time: '9:22 AM' },
    { id: 4, type: 'sent', content: 'Let me check the availability for Room 305. One moment, please.', time: '9:25 AM' },
    { id: 5, type: 'sent', content: 'Good news, Alice! We can extend your check-out time to 2 PM.', time: '9:30 AM' },
    { id: 6, type: 'received', content: 'Thank you so much! That really helps.', time: '9:32 AM' },
    { id: 7, type: 'sent', content: 'You’re welcome! If you need anything else, feel free to let us know.', time: '9:35 AM' }
  ];

  if (activeChat) {
    return (
      <div className="w-2/3 bg-gray-100 rounded-lg p-2 flex flex-col">
        {/* Top header */}
        <ChatHeader {...{ activeChat }} />
        <div className="divider my-0" />

        {/* Message List */}
        <div className="space-y-3 flex-1 overflow-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat ${message.type === 'sent' ? 'chat-end' : 'chat-start'}`}
            >
              <div
                className={`chat-bubble ${message.type === 'sent'
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-200 text-gray-700'
                  }`}
              >
                {message.content}
              </div>
              <div className="chat-footer text-xs opacity-70">{message.time}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <ChatFooter {...{ activeChat }} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-lg">
      <p className="text-gray-500">Select chat to start conversation</p>
    </div>
  );
}

export function getTimeAgo(givenTime) {
  const now = dayjs();
  const time = dayjs(givenTime);

  // Calculate differences
  const diffInSeconds = now.diff(time, 'second');
  const diffInMinutes = now.diff(time, 'minute');
  const diffInHours = now.diff(time, 'hour');
  const diffInDays = now.diff(time, 'day');

  // Return a human-readable sentence
  if (diffInSeconds < 60) {
    return diffInSeconds <= 1 ? 'a second ago' : `${diffInSeconds} seconds ago`;
  } else if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? 'a minute ago' : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? 'an hour ago' : `${diffInHours} hours ago`;
  } else if (diffInDays === 1) {
    return 'a day ago';
  } else {
    return `${diffInDays} days ago`;
  }
}
