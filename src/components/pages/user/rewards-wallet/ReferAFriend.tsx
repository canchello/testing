import React, { useState } from 'react'
import ReferAFriendSvg from '@/assets/svg/ReferAFriend.svg'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'sonner'

export default function ReferAFriend() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('https://libyastays.com/refer?code=FRIEND123')
    setCopied(true)
    toast.success('Refer Link Copied')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='bg-gray-100 rounded-xl p-4 md:p-8 w-full flex justify-around items-center'>
      <div className='flex flex-col gap-2 w-full'>
        <h1 className='text-2xl font-bold'>Refer a Friend and get Paid</h1>
        <p className='text-gray-500'>
          Invite your friends to join us, and both of you can enjoy exclusive rewards! Share your unique referral link
          or code, and start earning when your friends book with us.
        </p>
        <div className='my-4'>
          <div className='flex items-center justify-between bg-white rounded-md'>
            <span className='text-sm text-gray-700 truncate px-3 py-2 break-all w-full'>
              https://libyastays.com/refer?code=FRIEND123
            </span>
            <button onClick={handleCopy} className='ml-2 btn btn-square bg-custom-dark-blue rounded-l-none'>
              {<FontAwesomeIcon icon={copied ? faCheck : faCopy} className='text-white' />}
            </button>
          </div>
        </div>
      </div>
      <div className='mx-10 hidden sm:flex justify-center'>
        <Image src={ReferAFriendSvg} alt='' className='h-52 w-72' />
      </div>
    </div>
  )
}
