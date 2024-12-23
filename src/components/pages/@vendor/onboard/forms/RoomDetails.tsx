'use client'

import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomRadio from '@/components/form/RadioGroup'
import CustomButton from '@/components/common/CustomButton'
import { useState } from 'react'

interface RoomData {
  roomName: string
  roomSize: string
  guests: number
  noOfBeds: number
  bedType: string
  noOfBathrooms: number
  amenities: string[]
  breakfast: string
}

interface FormData {
  rooms: RoomData[]
}

const RoomDetailsForm = ({ onPrev = () => {}, onNext = () => {} }) => {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      rooms: [
        {
          roomName: '',
          roomSize: '',
          guests: undefined,
          noOfBeds: undefined,
          bedType: '',
          noOfBathrooms: undefined,
          amenities: [],
          breakfast: ''
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rooms'
  })

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data)
  }

  return (
    <div className='container mx-auto'>
      <div className='flex flex-wrap gap-4 justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Room Type</h2>
        <CustomButton
          variant='secondary'
          title='Add Another Room'
          onClick={() =>
            append({
              roomName: '',
              roomSize: '',
              guests: 0,
              noOfBeds: 0,
              bedType: '',
              noOfBathrooms: 0,
              amenities: [],
              breakfast: ''
            })
          }
        />
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
                      { label: '2', value: '2' }
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
                      { label: 'Single', value: 'single' },
                      { label: 'Double', value: 'double' }
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
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              {/* Amenities */}
              <div className=''>
                <label className='font-semibold'>
                  Select the aminities that are available in this room?
                  <span className='text-red-500'>*</span>
                </label>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mt-2'>
                  <Controller
                    control={control}
                    name={`rooms.${index}.amenities`}
                    render={({ field }) => (
                      <>
                        {['Air Conditioning', 'Heating', 'Swimming Pool', 'Free-Wifi'].map(amenity => (
                          <div key={amenity}>
                            <input
                              type='checkbox'
                              value={amenity}
                              checked={field.value.includes(amenity)}
                              onChange={e => {
                                const checked = e.target.checked
                                const value = e.target.value
                                const newAmenities = checked
                                  ? [...field.value, value]
                                  : field.value.filter(item => item !== value)
                                field.onChange(newAmenities)
                              }}
                            />
                            <label className='ml-2'>{amenity}</label>
                          </div>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Breakfast */}
              <div className=''>
                <Controller
                  control={control}
                  name={`rooms.${index}.breakfast`}
                  render={({ field }) => (
                    <CustomRadio
                      {...field}
                      label='Do you serve breakfast?'
                      options={[
                        { label: 'Yes', value: 'yes' },
                        { label: 'No', value: 'no' }
                      ]}
                      required
                    />
                  )}
                />
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
