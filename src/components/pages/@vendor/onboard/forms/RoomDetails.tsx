'use client'

import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomRadio from '@/components/form/RadioGroup'
import CustomButton from '@/components/common/CustomButton'
import { useEffect, useState } from 'react'
import { useMount } from 'react-use'
import { attachmentUploadURL, facilityListURL, vendorPropertyUpdateURL } from '@/services/APIs/vendor'
import Axios from '@/libs/axios'
import FileUpload from '@/components/form/FileUpload'
import userStore from '@/stores/userStore'
import { BED_TYPES, facilityTypes } from '@/libs/constants'
import appStore from '@/stores/appStore'
import Loader from '@/components/common/Loader'
import { cn } from '@/libs/tailwind'

interface RoomData {
  roomName: string
  roomSize: string
  guests: number
  noOfBeds: number
  bedType: string
  noOfBathrooms: number
  amenitiesId: string[]
  attachments: any
  serveBreakfast: boolean
  price: number
  numberOfRooms: number
}

interface FormData {
  rooms: RoomData[]
}

const roomDefaultValue = {
  roomName: '',
  roomSize: '',
  guests: 1,
  noOfBeds: 1,
  bedType: BED_TYPES.SINGLE,
  noOfBathrooms: 0,
  amenitiesId: [],
  attachments: null,
  serveBreakfast: false,
  price: 0,
  numberOfRooms: 1
}

const RoomDetailsForm = ({ onPrev = () => {}, onNext = () => {} }) => {
  const { user, updateUserProfile }: any = userStore()
  const { fetchVendorRoomList, vendorRoomsList, fetchingRoomsList }: any = appStore()
  const [loading, setLoading] = useState(false)
  const [facilityList, setFacilityList] = useState([])
  const [uploading, setUploading] = useState<any>(false)
  const { control, handleSubmit, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      rooms: [roomDefaultValue]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rooms'
  })

  useMount(async () => {
    try {
      const { data }: any = await Axios({
        ...facilityListURL,
        data: {
          query: { type: facilityTypes.AMENITY },
          options: { pagination: false }
        }
      })
      setFacilityList(data.data?.data || [])
    } catch (error) {
      console.error(error)
    }
    const payload = {
      options: {
        populate: ['attachments', 'amenities'],
        lean: true
      }
    }
    fetchVendorRoomList(payload)
  })

  useEffect(() => {
    if (vendorRoomsList?.length) {
      const prefilledRooms = vendorRoomsList.map((room: any) => ({
        id: room._id,
        roomName: room.name || '',
        roomSize: room.size || '',
        guests: room.numberOfGuest || 1,
        noOfBeds: room.numberOfBed || 1,
        bedType: room.bedType || BED_TYPES.SINGLE,
        noOfBathrooms: room.numberOfBathrooms || 0,
        amenitiesId: room.amenitiesId,
        attachments: room.attachments?.[0] || null,
        // ?.map((att: any) => att.fileUrl) ,
        serveBreakfast: room.serveBreakfast,
        price: room.price || 0,
        numberOfRooms: room.numberOfRooms || 1
      }))
      setValue('rooms', prefilledRooms)
    }
  }, [vendorRoomsList, setValue, append])

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      // const formData = new FormData()
      // data.rooms.forEach((room: any, index) => {
      //   if ('attachments' in room) {
      //     formData.append(`attachment[${index}]`, room.attachments)
      //   }
      // })
      // const { data: resAttachments }: any = await Axios({
      //   ...attachmentUploadURL,
      //   data: formData,
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // })
      let payload = data.rooms.map((room: any, index) => ({
        ...room,
        name: room.roomName,
        size: room.roomSize,
        numberOfGuest: room.guests,
        numberOfBed: room.noOfBeds,
        bedType: room.bedType,
        numberOfBathrooms: room.noOfBathrooms,
        serveBreakfast: room.serveBreakfast,
        amenitiesId: room.amenitiesId,
        attachments: room.attachments?.fileUrl ? [room.attachments?.fileUrl] : undefined
      }))
      const { data: resRooms }: any = await Axios({
        ...vendorPropertyUpdateURL(user.primaryProperty?._id),
        data: { roomTypes: payload }
      })
      await updateUserProfile()
      onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChangeRoomImage = async (files: any, index: any) => {
    try {
      setUploading(index)
      const formData = new FormData()
      formData.append(`attachment[0]`, files?.[0])

      const { data: resAttachments }: any = await Axios({
        ...attachmentUploadURL,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setValue(`rooms.${index}.attachments`, resAttachments.data?.[0])
    } catch (error) {
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='container mx-auto'>
      <div className='flex flex-wrap gap-4 justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Room Type</h2>
        <CustomButton variant='secondary' title='Add Another Room' onClick={() => append(roomDefaultValue)} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {fields.map((field, index) => (
          <div key={field.id} className='p-4 rounded-lg bg-custom-offwhite'>
            {!!index && (
              <div className='justify-items-end'>
                {/* Delete Button */}
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
            )}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {/* Room Name */}
              <Controller
                control={control}
                name={`rooms.${index}.roomName`}
                rules={{ required: 'Room Name is required' }}
                render={({ field, fieldState }) => (
                  <TextInput
                    {...field}
                    label='Room Name'
                    placeholder='Enter Room Name'
                    error={fieldState.error?.message}
                    required
                  />
                )}
              />

              {/* Room Size */}
              <Controller
                control={control}
                name={`rooms.${index}.roomSize`}
                render={({ field }) => <TextInput {...field} label='Room Size' placeholder='Enter Room Dimensions' />}
              />

              {/* Guests */}
              <Controller
                control={control}
                name={`rooms.${index}.guests`}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label='Guests'
                    value={String(field.value)}
                    options={[
                      { label: '1', value: '1' },
                      { label: '2', value: '2' },
                      { label: '3', value: '3' },
                      { label: '4', value: '4' },
                      { label: '5', value: '5' }
                    ]}
                  />
                )}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
              {/* Number of Beds */}
              <Controller
                control={control}
                name={`rooms.${index}.noOfBeds`}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label='No. of Beds'
                    value={String(field.value)}
                    options={[
                      { label: '1', value: '1' },
                      { label: '2', value: '2' }
                    ]}
                  />
                )}
              />

              {/* Bed Type */}
              <Controller
                control={control}
                name={`rooms.${index}.bedType`}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label='Bed Type'
                    value={String(field.value)}
                    options={[
                      { label: 'Single Bed', value: BED_TYPES.SINGLE },
                      { label: 'Kingsize Bed', value: BED_TYPES.KING_SIZE_BED },
                      { label: 'Bunk Bed', value: BED_TYPES.BUNK_BED }
                    ]}
                  />
                )}
              />

              {/* Number of Bathrooms */}
              <Controller
                control={control}
                name={`rooms.${index}.noOfBathrooms`}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    label='No. of Bathrooms'
                    value={String(field.value)}
                    options={[
                      { label: '1', value: '1' },
                      { label: '2', value: '2' }
                    ]}
                  />
                )}
              />

              <Controller
                control={control}
                name={`rooms.${index}.price`}
                rules={{ required: 'Room price is required' }}
                render={({ field, fieldState }) => (
                  <TextInput
                    {...field}
                    type='number'
                    label='Room Price'
                    placeholder='Enter Room Price'
                    error={fieldState.error?.message}
                    required
                  />
                )}
              />

              <Controller
                control={control}
                name={`rooms.${index}.numberOfRooms`}
                rules={{ required: 'Available Rooms is required' }}
                render={({ field, fieldState }) => (
                  <TextInput
                    {...field}
                    type='number'
                    label='No. of rooms available'
                    placeholder='Enter available rooms'
                    error={fieldState.error?.message}
                    required
                  />
                )}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              {/* amenitiesId */}
              <div className=''>
                <label className='font-semibold'>
                  Select the Amenities that are available for this room?
                  <span className='text-red-500'>*</span>
                </label>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-2'>
                  <Controller
                    control={control}
                    name={`rooms.${index}.amenitiesId`}
                    render={({ field }) => (
                      <>
                        {facilityList.map((amenity: any) => (
                          <div key={amenity._id}>
                            <input
                              type='checkbox'
                              value={amenity._id}
                              checked={field.value.includes(amenity._id)}
                              onChange={e => {
                                const checked = e.target.checked
                                const value = e.target.value
                                const newAmenities = checked
                                  ? [...field.value, value]
                                  : field.value.filter(item => item !== value)
                                field.onChange(newAmenities)
                              }}
                            />
                            <label className='ml-2'>{amenity.title}</label>
                          </div>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* serveBreakfast */}
              <div className=''>
                <Controller
                  control={control}
                  name={`rooms.${index}.serveBreakfast`}
                  render={({ field }) => (
                    <CustomRadio
                      {...field}
                      label='Do you serve breakfast?'
                      options={[
                        { label: 'Yes', value: true },
                        { label: 'No', value: false }
                      ]}
                      onChange={(data: any) => setValue(`rooms.${index}.serveBreakfast`, data)}
                      required
                    />
                  )}
                />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              <div className='space-y-3'>
                <p className='font-bold'>
                  Upload Document<span className='text-red-500'>*</span>
                </p>
                <p>Please upload room image here.</p>
                <div className='flex justify-between items-center'>
                  <span className='text-muted'>Only support .jpg, .png files</span>
                  {/* {getValues(`rooms.${index}.attachments`) && (
                    <CustomButton
                      variant='default'
                      title='Delete'
                      className='text-red-500'
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      ImageIcon={false}
                      onClick={() => setValue(`rooms.${index}.attachments`, null)}
                    />
                  )} */}
                </div>
              </div>
              <div className='relative'>
                <FileUpload
                  file={getValues(`rooms.${index}.attachments`)}
                  setFiles={(files: any) => handleChangeRoomImage(files, index)}
                />
                <div
                  className={cn(
                    'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                    uploading === index && 'bg-[#ffffff50]'
                  )}
                >
                  {uploading === index && <Loader />}
                </div>
              </div>
            </div>
          </div>
        ))}

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
            isLoading={Boolean(loading)}
            isDisabled={uploading !== false}
            title='Continue'
            variant='primary'
            className='mt-6 min-w-44'
          />
        </div>
      </form>
    </div>
  )
}

export default RoomDetailsForm
