'use client'
// Type Imports
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Axios from '@/libs/axios'
import { getCityListURL } from '@/services/APIs/user'
import appStore from '@/stores/appStore'
import type { ChildrenType } from '@/types'
import { useEffect } from 'react'

const HomeLayout = ({ children }: ChildrenType) => {
  const { setCities, cities }: any = appStore()
  useEffect(() => {
    ;(async () => {
      const { data }: any = await Axios({ ...getCityListURL })
      setCities(data.data || [])
    })()
  }, [])

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex justify-center flex-1'>
        <main className='w-full'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default HomeLayout
