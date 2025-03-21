'use client'

import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomTextArea from '@/components/form/TextareaInput'
import Axios from '@/libs/axios'
import PhoneInput from '@/components/form/PhoneInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import FileUpload from '@/components/form/FileUpload'
import { createPropertyURL, policyListURL, ruleListURL, updatePropertyURL } from '@/services/APIs/vendor'
import { toast } from 'sonner'
import { useMount } from 'react-use'
import appStore from '@/stores/appStore'
import Loader from '@/components/common/Loader'
import { cities, POLICY } from '@/libs/constants'
import dynamic from 'next/dynamic'
// import MapOption from '@/components/pages/hotels/car-rental/MapOption'

const MapComp = dynamic(() => import('@/components/common/Map/selectMapLocation.jsx'), { ssr: false })

interface FormData {
  title: string
  email: string
  phoneNumber: string
  address: string
  city: string
  document: object | null
  facilityId: string[]
  rules: object[]
  staffLanguageSpeak: string[]
  cancellationPolicy: string
  coordinates?: any
}

const PropertyDetails = ({ onNext = () => {}, onPrev = () => {} }) => {
  const { fetchFacility, facilites = [], fetchingFacility }: any = appStore()
  const { updateUserProfile, user = {} }: any = userStore()
  const [submitLoading, setSubmitLoading] = useState<Boolean>(false)
  const [formLoading, setFormLoading] = useState<Boolean>(false)
  const { primaryProperty: property } = user

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<FormData>({
    defaultValues: {
      title: property?.title || '',
      email: property?.email || '',
      phoneNumber: property?.phoneNumber || '',
      address: property?.address || '',
      city: property?.city || '',
      cancellationPolicy: property?.cancellationPolicy || '',
      document: property?.document?.[0] || null,
      staffLanguageSpeak: property?.staffLanguageSpeak,
      coordinates: property?.coordinates,
      facilityId: property?.facilities.map((facility: any) => facility?._id),
      rules: []
    }
  })
  const {
    fields: rulesList,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'rules'
  })

  const onSubmit = async (data: any) => {
    try {
      let { cancellationPolicy, facilityId, rules, ...payload } = data || {}
      if (!payload?.document) return toast.error('Please upload a registration document')
      if (payload?.document?.fileUrl) delete payload.document
      setSubmitLoading(true)

      const formData = new FormData()
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      let propertyId = user?.primaryProperty?._id
      let responseData

      if (!propertyId) {
        // Create new property if it doesn't exist
        const { data: res }: any = await Axios({
          ...createPropertyURL,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
        propertyId = res.data._id
        responseData = res
      } else {
        // Update existing property
        const { data: res }: any = await Axios({
          ...updatePropertyURL(propertyId),
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        })
        responseData = res
      }

      // Update rules and policies after property creation or update
      await Axios({
        ...updatePropertyURL(propertyId),
        data: {
          facilityId,
          policy: [{ type: POLICY.CANCELLATION_POLICY, description: cancellationPolicy }],
          rules,
          location: data?.coordinates
        }
      })

      await updateUserProfile()
      onNext()
    } catch (error) {
      console.log('error', error)
      toast.error('Failed to submit property details')
    } finally {
      setSubmitLoading(false)
    }
  }

  useMount(async () => {
    try {
      setFormLoading(true)
      await fetchFacility()
      // fetch rules
      if (user?.primaryProperty?._id) {
        const { data: rulesData }: any = await Axios({
          ...ruleListURL,
          data: { query: { propertyId: user?.primaryProperty?._id } }
        })
        setValue('rules', rulesData?.data?.data || [])

        // fetch policy data
        const { data: policyData }: any = await Axios({
          ...policyListURL,
          data: { query: { propertyId: user?.primaryProperty?._id }, options: { findOne: true } }
        })
        setValue('cancellationPolicy', policyData?.data?.description)
      }
      if (property?.facilities) {
        setValue('facilityId', property.facilities.map((facility: any) => facility?._id) || [])
      }
      // setValue(
      //   'cancellationPolicy',
      //   policyData?.data?.data.find((i: any) => i.propertyId === user?.primaryProperty?._id)?.description || ''
      // )
    } catch (error) {
      console.error(error)
    } finally {
      setFormLoading(false)
    }
  })

  if (formLoading) {
    return <Loader />
  }
  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-2'>
        Property Details<span className='text-red-600'>*</span>
      </h2>
      <p className='mb-6 text-lg'>
        Please fill in the essential property details to help us showcase your listing effectively to potential guests.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Controller
            name='title'
            control={control}
            rules={{ required: 'Property name is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label='Property Name'
                placeholder='Enter Property Name'
                error={errors?.title?.message}
                required
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <TextInput {...field} label='Email' placeholder='Enter email' error={errors?.email?.message} required />
            )}
          />
          <Controller
            name='phoneNumber'
            control={control}
            rules={{ required: 'Help-desk Number is required' }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                label='Hotel Help-desk Number'
                placeholder='Enter Help-desk Number'
                error={errors.phoneNumber?.message}
                required
              />
            )}
          />
        </div>
        <Controller
          name='address'
          control={control}
          rules={{ required: 'Address is required' }}
          render={({ field }) => (
            <CustomTextArea
              {...field}
              label='Address'
              placeholder='Enter Address'
              error={errors?.address?.message}
              required
            />
          )}
        />
        <Controller
          name='city'
          control={control}
          rules={{ required: 'City is required' }}
          render={({ field }) => (
            <CustomSelect {...field} label='City' options={cities} error={errors?.city?.message} required />
          )}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-3'>
            <p className='font-bold'>
              Upload Document<span className='text-red-500'>*</span>
            </p>
            <p>Please upload your property registration document to complete your listing verification.</p>
            <div className='flex justify-between'>
              <span className='text-muted'>Only support .jpg, .png files</span>
              {getValues('document') && (
                <CustomButton
                  variant='default'
                  title='Delete'
                  className='text-red-500'
                  icon={<FontAwesomeIcon icon={faTrash} />}
                  onClick={() => setValue('document', null)}
                  ImageIcon={false}
                />
              )}
            </div>
          </div>
          <div>
            <FileUpload file={getValues('document')} setFiles={(files: any) => setValue('document', files?.[0])} />
          </div>
        </div>

        {/* facilityId */}
        <div className='mt-4'>
          <label className='font-semibold'>Select the available facilites</label>
          <div className='flex flex-col w-full flex-wrap mt-2'>
            <Controller
              control={control}
              name={`facilityId`}
              render={({ field }) => (
                <>
                  {fetchingFacility && <Loader />}
                  {!facilites && !fetchingFacility && <p className='text-muted'>No Facility available</p>}
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-2'>
                    {(facilites || []).map((amenity: any) => (
                      <div key={amenity._id}>
                        <input
                          type='checkbox'
                          value={amenity._id}
                          checked={field.value?.includes(amenity._id)}
                          onChange={e => {
                            const checked = e.target.checked
                            const value = e.target.value
                            const newFacility = checked
                              ? [...field.value, value]
                              : field.value.filter(item => item !== value)
                            field.onChange(newFacility)
                          }}
                        />
                        <label className='ml-2'>{amenity.title}</label>
                      </div>
                    ))}
                  </div>
                </>
              )}
            />
          </div>
        </div>

        <PropertyRules rules={rulesList} {...{ control, append, remove }} />

        <Controller
          name='cancellationPolicy'
          control={control}
          rules={{ required: 'Cancellation policy is required' }}
          render={({ field }) => (
            <CustomTextArea
              {...field}
              label='Cancellation Policy'
              placeholder='Enter Cancellation Policy'
              error={errors?.cancellationPolicy?.message}
              required
            />
          )}
        />
        <div>
          {/* <MapOption
            onSelectLocation={(location: any) => {
              setValue('coordinates', location)
            }}
          /> */}
          <MapComp
            className='max-h-[50vh]'
            defaultCoordinates={user.primaryProperty?.location?.coordinates}
            onSelectLocation={(location: any) => setValue('coordinates', location)}
          />
        </div>

        <div className='flex items-center space-x-2'>
          <CustomButton
            title='Back'
            variant='default'
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
            ImageIcon={false}
            iconPosition='left'
            className='mt-6'
            onClick={onPrev}
          />
          <CustomButton
            // isDisabled={!isDirty && !photoUpdated} // Enable if form is dirty or photo updated
            type='submit'
            isLoading={Boolean(submitLoading)}
            title='Continue'
            variant='primary'
            className='mt-6 min-w-44'
          />
        </div>
      </form>
    </div>
  )
}

export default PropertyDetails

const PropertyRules = ({ control, fetchingRules = false, rules = [], append, remove }: any) => {
  return (
    <>
      <label className='font-semibold'>Property Rules</label>
      {fetchingRules && <Loader />}
      {!rules?.length && !fetchingRules && (
        <div className='flex flex-col items-center'>
          <p className='text-muted'>No Rules added yet</p>
          <CustomButton title='Add Rule' variant='default' onClick={() => append({ name: '', value: '' })} />
        </div>
      )}

      {!!rules?.length && (
        <div className='bg-custom-offwhite p-4 rounded-lg space-y-2'>
          {rules.map((field: any, index: any) => (
            <div key={field.id} className=''>
              <div className='flex items-end gap-2'>
                <div className='flex-1 grid grid-cols-2 gap-4'>
                  {/* Name */}
                  <Controller
                    control={control}
                    name={`rules.${index}.name`}
                    // rules={{ required: 'Rule Name is required' }}
                    render={({ field, fieldState }) => (
                      <TextInput
                        {...field}
                        label='Rule Name'
                        placeholder='Enter Rule Name'
                        error={fieldState.error?.message}
                        // required
                      />
                    )}
                  />
                  {/* Name */}
                  <Controller
                    control={control}
                    name={`rules.${index}.value`}
                    rules={{ required: 'Rule is required' }}
                    render={({ field, fieldState }) => (
                      <TextInput
                        {...field}
                        label='Rule value'
                        placeholder='Enter Rule Value'
                        error={fieldState.error?.message}
                        required
                      />
                    )}
                  />
                </div>
                <CustomButton
                  variant='default'
                  title='Delete'
                  className='text-red-500'
                  icon={<FontAwesomeIcon icon={faTrash} />}
                  ImageIcon={false}
                  iconPosition='left'
                  onClick={() => remove(index)}
                />
              </div>
            </div>
          ))}
          <div className='flex justify-center'>
            <CustomButton title='Add Rule' variant='default' onClick={() => append({ name: '', value: '' })} />
          </div>
        </div>
      )}
    </>
  )
}
