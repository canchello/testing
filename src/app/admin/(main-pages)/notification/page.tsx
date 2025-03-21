'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/libs/tailwind'
import PushNotification from './PushNotification'
import EmailCompaign from './EmailCompaign'

const tabs = [
  { id: 'push-notification', title: 'Push Notification' },
  { id: 'email-compaigns', title: 'Email Compaigns' }
]

const Notification = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState(tabs[0].id)

  return (
    <div role='tablist' className='tabs tabs-lifted'>
      <input
        type='radio'
        name={tabs[0].id}
        role='tab'
        className='tab'
        aria-label={tabs[0].title}
        onClick={() => setActiveTab(tabs[0].id)}
        checked={activeTab === tabs[0].id}
      />
      <div role='tabpanel' className='tab-content bg-base-100 border-base-300 rounded-box p-6'>
        {activeTab === tabs[0].id && <PushNotification />}
      </div>

      <input
        type='radio'
        name={tabs[1].id}
        role='tab'
        className='tab'
        aria-label={tabs[1].title}
        onClick={() => setActiveTab(tabs[1].id)}
        checked={activeTab === tabs[1].id}
      />
      <div role='tabpanel' className='tab-content bg-base-100 border-base-300 rounded-box p-6'>
        {activeTab === tabs[1].id && <EmailCompaign />}
      </div>
    </div>
  )

  return (
    <div className='space-y-8'>
      <div role='tablist' className='flex tabs tabs-boxed'>
        {tabs.map((tab, index) => (
          <a
            key={index}
            role='tab'
            className={cn('tab', activeTab === tab.id && 'tab-active')}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </a>
        ))}
      </div>
      <div>
        {activeTab === tabs[0].id && <PushNotification />}
        {activeTab === tabs[1].id && <EmailCompaign />}
      </div>
    </div>
  )
}

export default Notification
