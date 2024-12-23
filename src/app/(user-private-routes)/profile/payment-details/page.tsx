'use client'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@/components/form/TextField'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomDateInput from '@/components/form/DateField'
import CustomRadio from '@/components/form/RadioGroup'
import CustomTextArea from '@/components/form/TextareaInput'
import ToggleInput from '@/components/UI/ToggleInput'
import CardList from './details'
import AddCardForm from './AddCardForm'
import Axios from '@/libs/axios'
import { deleteUserCardDetailURL, userCardDetailsURL } from '@/services/APIs/userDetails'
import Loader from '@/components/common/Loader'

interface FormData {
  newPassword: string
  confirmPassword: string
}

interface SelectedCardProps {
  _id: string
}

const PaymentDetails = () => {
  // const cardsData = [
  //   {
  //     bankName: 'HDFC Bank Pvt. Ltd.',
  //     cardNumber: '1234 **** **** 6789',
  //     cardHolderName: 'Prachi Saini',
  //     expiryDate: '12/29'
  //   },
  //   {
  //     bankName: 'HDFC Bank Pvt. Ltd.',
  //     cardNumber: '1234 **** **** 6789',
  //     cardHolderName: 'Prachi Saini',
  //     expiryDate: '12/29'
  //   }
  // ]
  const { setUser, user }: any = userStore()
  const [cardDetails, setCardDetails] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [selectedCard, setSelectedCard] = useState<SelectedCardProps | null>(null)
  const [isCardCreated, setIsCardCreated] = useState<boolean>(false)

  const onSubmit = () => {}
  const fetchUserCardDetails = async () => {
    setLoading(true)
    const payload = {
      query: {},
      options: {
        // "page": 1,
        // "limit": 3,
        // "populate": "userId",
        lean: true
      }
    }
    try {
      const { data: res }: any = await Axios({ ...userCardDetailsURL, data: payload })
      setCardDetails(res.data)
      setLoading(false)
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const cardId = selectedCard?._id as string
      const response: any = await Axios({ ...deleteUserCardDetailURL(cardId) })
      if (response) {
        fetchUserCardDetails()
        setLoading(false)
      }
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserCardDetails()
    setIsCardCreated(false)
  }, [isCardCreated])

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-2'>Payment Details</h2>
      <p className='mb-6 text-lg'>
        For a faster checkout experience, please add your payment information. This will help streamline your future
        transactions and save you time during your bookings.
      </p>

      <div className='mb-8'>
        {isLoading ? (
          <Loader />
        ) : (
          <CardList cards={cardDetails} onDelete={handleDelete} setSelectedCard={setSelectedCard} />
        )}
      </div>

      <AddCardForm setIsCardCreated={setIsCardCreated} />
    </div>
  )
}

export default PaymentDetails
