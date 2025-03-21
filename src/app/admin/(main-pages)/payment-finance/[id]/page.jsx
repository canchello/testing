"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import Axios from '@/libs/axios'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { getOwnerDataURL } from '@/services/APIs/admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomButton from '@/components/common/CustomButton';
import Loader from '@/components/common/Loader';
import ProfileCard from './ProfileCard';
import BookingHistoryTable from './BookingHoistory';

export default function ReservationDetails() {
  const params = useParams()
  const [ownerDetails, setOwnerDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchOwnerDetails = async () => {
    try {
      setLoading(true)
      const { data } = await Axios({ ...getOwnerDataURL(params.id) })
      setOwnerDetails(data?.data)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOwnerDetails();
  }, [])

  if (loading) return <Loader />
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Profile Card */}
        <div className="lg:col-span-6">
          <ProfileCard user={ownerDetails} />
        </div>
        <div className='lg:col-span-6 space-y-6 p-4'>
          <h2 className="text-xl font-semibold mb-2">Ownership document</h2>
          <div className='space-y-2'>
            <div className="">
              <p className="text-xs text-gray-500">Title Deed</p>
              <div className='text-blue-600 flex gap-2'>
                <p className="text-base font-semibold">Document </p>
                <FontAwesomeIcon icon={faDownload} />
              </div>
            </div>
            <div className="">
              <p className="text-xs text-gray-500">Property Tax Receipts</p>
              <div className='text-blue-600 flex gap-2'>
                <p className="text-base font-semibold">Document </p>
                <FontAwesomeIcon icon={faDownload} />
              </div>
            </div>
            <div className="">
              <p className="text-xs text-gray-500">Encumbrance Certificate (EC)</p>
              <div className='text-blue-600 flex gap-2'>
                <p className="text-base font-semibold">Document </p>
                <FontAwesomeIcon icon={faDownload} />
              </div>
            </div>
          </div>
          <div className='flex gap-2'>
            <CustomButton variant="error" title="Disble Auto Payment" onClick={() => { }} />
            <CustomButton variant="secondary" title="Download Invoice" onClick={() => { }} />
          </div>
        </div>
        {/* Suspend Account Modal */}
        {/* {isSuspendModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={(e) => handleOutsideClick(e, suspendModalRef, closeSuspendModal)}
          >
            <div ref={suspendModalRef} className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
              <h3 className="font-bold text-lg text-center">Declaration</h3>
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={closeSuspendModal}>
                <FontAwesomeIcon icon={faClose} />
              </button>
              <div className="mt-4">
                <label className="text-red-500 font-semibold">
                  Why Reject Property<span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full h-24 mt-2 border rounded-lg p-2"
                  placeholder="Write reason here"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div className="mt-4 flex justify-center">
                <CustomButton
                  className="btn bg-red-500 text-white rounded-full hover:bg-red-600"
                  onClick={RejectOwner}
                  title="Reject Property"
                  isLoading={rejecting}
                />
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Booking History Section */}
      <div className="mt-8">
        <BookingHistoryTable ownerDetails={ownerDetails} />
      </div>
    </div>
  )
}
