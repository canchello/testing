'use client'
import React, { useEffect, useState } from 'react'
import CouponList from './Coupons'
import ReferalBonus from './ReferalBonus'
import { cn } from '@/libs/tailwind'

const tabs = ['coupons', 'referral-bonus']
const Marketing = () => {
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <>
      <div role='tablist' className='tabs tabs-boxed'>
        <a
          role='tab'
          className={cn('tab', activeTab === tabs[0] && 'bg-primary text-white')}
          onClick={() => setActiveTab(tabs[0])}
        >
          Coupons
        </a>
        <a
          role='tab'
          className={cn('tab', activeTab === tabs[1] && 'bg-primary text-white')}
          onClick={() => setActiveTab(tabs[1])}
        >
          Referral Bonus
        </a>
      </div>
      <div className='p-4'>
        {activeTab === tabs[0] && <CouponList />}
        {activeTab === tabs[1] && <ReferalBonus />}
      </div>
    </>
  )
}

export default Marketing
