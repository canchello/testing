'use client'
import React, { useEffect, useState } from 'react'
import { cn } from '@/libs/tailwind'
import BasicDetails from '@/components/pages/@vendor/onboard/forms/BasicDetails'
import PropertyDetails from '@/components/pages/@vendor/onboard/forms/PropertyDetails'
import BankDetails from '@/components/pages/@vendor/onboard/forms/BankDetails'
import PropertyImages from '@/components/pages/@vendor/onboard/forms/PropertyImages'
import RoomDetails from '@/components/pages/@vendor/onboard/forms/RoomDetails'
import userStore from '@/stores/userStore'
import { useSearchParams } from 'next/navigation'

const steps = ['Basic Details', 'Property Details', 'Room Type', 'Property Images', 'Bank Details']

export default function OnBoard() {
  const { user } = userStore()
  const params = useSearchParams()
  const [currentStep, setCurrentStep] = useState(params.get("step") || 0)

  useEffect(() => {
    if (!user) return;
    if (!user.firstName || !user.lastName || !user.email || !user.phoneNumber || !user.gender || !user.designationId) {
      setCurrentStep(0)
    }
    else if (user.primaryProperty) {
      if (!user.primaryProperty?.roomType?.length) setCurrentStep(2)
      else if (!user.primaryProperty?.attachment?.length) setCurrentStep(3)
      else if (!user?.bankDetail) setCurrentStep(4)
      // else router.push(ROUTES.VENDOR.DASHBOARD)
    } else if (!user.primaryProperty)
      setCurrentStep(1)
  }, [user])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className='m-4 space-y-4'>
      <ul className='steps w-full'>
        {steps.map((step, index) => (
          <li
            key={index}
            className={cn("step text-sm cursor-pointer", index <= currentStep && "step-primary")}
            onClick={() => setCurrentStep(index)}>
            {step}
          </li>
        ))}
      </ul>
      <div className='w-full justify-items-center'>
        {!currentStep &&
          <div className='container m-4'>
            <BasicDetails onNext={handleNext} />
          </div>}
        {!!currentStep &&
          <div className='container bg-white m-4 p-8 rounded-lg'>
            {steps[currentStep] === steps[1] && <PropertyDetails onNext={handleNext} onPrev={handlePrev} />}
            {steps[currentStep] === steps[2] && <RoomDetails onNext={handleNext} onPrev={handlePrev} />}
            {steps[currentStep] === steps[3] && <PropertyImages onNext={handleNext} onPrev={handlePrev} />}
            {steps[currentStep] === steps[4] && <BankDetails onPrev={handlePrev} />}
          </div>}
      </div>
    </div>
  )
}
