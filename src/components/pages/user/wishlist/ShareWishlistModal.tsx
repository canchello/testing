import CustomButton from '@/components/common/CustomButton'
import TextInput from '@/components/form/LabelInput'
import CustomTextArea from '@/components/form/TextareaInput'
import CustomTextInput from '@/components/form/TextField'
import Rating from '@/components/UI/Rating'
import { CLIENT_URL } from '@/libs/constants'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface FormData {
  wishlistLink: string
}

const ShareWishlistModal = ({shareDetails}:any) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      wishlistLink: ""
    }
  })

  useEffect(()=>{
    if(shareDetails){
      setValue("wishlistLink",`${process.env.NEXT_PUBLIC_CLIENT_URL}/wishlist?user=${shareDetails?.userId}&wishlist=${shareDetails?.wishlistId}`)
    }
  },[shareDetails])


  const onSubmit = (data:any) => {
    navigator.clipboard.writeText(data.wishlistLink)
    toast.success('Share Link Copied')
  }

  return (
    <div className='flex flex-col justify-center'>
      <div className='text-center rounded-lg p-2 w-80 md:w-[620px] max-w-full'>
        <h2 className='text-xl font-bold text-center mb-2'>Share Your Wishlist</h2>
        <p className='text-center text-base'>
          Invite friends and family to view your saved hotels! Share your wishlist with others to get their input and
          plan the perfect trip together.
        </p>
      </div>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='wishlistLink'
          control={control}
          rules={{
            required: 'Wishlist Name is required'
          }}
          render={({ field }) => (
            <CustomTextInput
              {...field}
              label='Wishlist Link'
              placeholder='wishlist link'
              error={errors.wishlistLink?.message}
              isDisabled
            />
          )}
        />
        <div className='justify-items-center'>
          <CustomButton title='Copy Link' type='submit' />
        </div>
      </form>
    </div>
  )
}

export default ShareWishlistModal
