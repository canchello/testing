import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomButton from '@/components/common/CustomButton'
import Axios from '@/libs/axios'
import { emailCompaignURL } from '@/services/APIs/admin'
import { toast } from 'sonner'
import CustomTextArea from '@/components/form/TextareaInput'
import { USER_ROLES } from '@/libs/constants'

interface FormData {
  title: string
  body: string
  subject: string
  targetAudience: string
}

export default function EmailCompaign() {
  const [loading, setLoading] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setFocus,
    reset, // To reset the form with updated values
    getValues
  } = useForm<FormData>({
    defaultValues: {
      targetAudience: 'all_users'
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const { data: res }: any = await Axios({ ...emailCompaignURL, data })
      if (res.status === 1) {
        toast.success(res.message)
        reset()
        setFormKey(prev => prev + 1)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form key={formKey} onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='bg-white rounded-lg py-4'>
          <div className='grid grid-cols-1 gap-4'>
            {/* <h1 className='text-lg font-bold col-span-full'>General</h1> */}
            <Controller
              name='title'
              control={control}
              rules={{ required: 'Campaign name is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Campaign Name'
                  placeholder='Enter Campaign Name'
                  error={errors?.title?.message}
                  required
                />
              )}
            />
            <Controller
              name='subject'
              control={control}
              rules={{ required: 'Subject is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Email Subject'
                  placeholder='Enter Email Subject'
                  error={errors?.subject?.message}
                  required
                />
              )}
            />
            <Controller
              name='body'
              control={control}
              rules={{ required: 'Body is required' }}
              render={({ field }) => (
                <CustomTextArea
                  {...field}
                  label='Email Body'
                  placeholder='Enter Email Body'
                  error={errors?.body?.message}
                  required
                />
              )}
            />
            <Controller
              name='targetAudience'
              control={control}
              rules={{ required: 'Audience is required' }}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  label='Target Audience'
                  placeholder='Select target audience'
                  options={[
                    { label: 'All', value: 'all_users' },
                    { label: 'User', value: USER_ROLES.USER },
                    { label: 'Merchant', value: USER_ROLES.VENDOR }
                  ]}
                  error={errors?.targetAudience?.message}
                  required
                />
              )}
            />

            <div className='col-span-full'>
              <CustomButton
                type='submit'
                isLoading={loading}
                title='Send Email'
                variant='secondary'
                className='mt-6 min-w-44'
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
