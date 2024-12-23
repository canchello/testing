'use client'
import RaiseTicketComponent from '@/components/pages/user/customer-support/RaiseTicketComponent'
import Axios from '@/libs/axios'
import { getRaiseTicketDetailsURL } from '@/services/APIs/customerSupport'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const TicketDetails = () => {
  const router = usePathname()
  const paths = router.split('/')
  const id = paths[paths.length - 1]

  const [ticketDetails, setTicketDetails] = useState({})
  const fetchTicketDetails = async (id) => {
    try {
      const { data } = await Axios({ ...getRaiseTicketDetailsURL(id) })
      setTicketDetails(data.data)
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    fetchTicketDetails(id)
  }, [id])
  return <RaiseTicketComponent mode='edit' ticketDetails={ticketDetails} />
}

export default TicketDetails
