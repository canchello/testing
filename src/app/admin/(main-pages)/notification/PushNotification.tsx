import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import duration from 'dayjs/plugin/duration'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomButton from '@/components/common/CustomButton'
import Filters from './Filters'
import TableComponent from '@/components/common/TableComponent'
import { vendorBookingList } from '@/services/APIs/vendor'
import CustomTextArea from '@/components/form/TextareaInput'
import { notificationListURL, notificationPushURL } from '@/services/APIs/admin'
import { toast } from 'sonner'
import Axios from '@/libs/axios'
import { USER_ROLES } from '@/libs/constants'
import { useDebounce } from 'react-use'

dayjs.extend(duration)
interface Filters {
  filterRange: [Date | undefined, Date | undefined]
  search: string
  status: string
}

interface FormData {
  title: string
  body: string
  targetAudience: string
}

export default function PushNotification() {
  const [refetchData, setRefetchData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const [filters, setFilters] = useState<Filters>({
    filterRange: [undefined, undefined],
    search: '',
    status: 'All Status'
  })
  const [newSearch, setNewSearch] = useState('')
  useDebounce(() => setNewSearch(filters.search), 500, [filters.search])

  const handleFiltersChange = (newFilters: any) => {
    setFilters((prev: any) => ({ ...prev, ...newFilters }))
  }

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

  useEffect(() => {
    setRefetchData(true)
  }, [newSearch])

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const { data: res }: any = await Axios({ ...notificationPushURL, data })
      if (res.status === 1) {
        reset()
        toast.success(res.message)
        setRefetchData(true)
        setFormKey(prev => prev + 1)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      name: 'Title',
      dataKey: 'title',
      sortable: true,
      cell: (row: any) => <div>{row?.title}</div>
    },
    {
      name: 'Notification Body',
      dataKey: 'body',
      cell: (row: any) => <div className='line-clamp-1'>{row?.body}</div>,
      sortable: true
    },
    {
      name: 'Audience',
      dataKey: 'audience',
      cell: (row: any) => <div>{row?.targetAudience}</div>,
      sortable: true
    },
    {
      name: 'Status',
      dataKey: 'status',
      cell: (row: any) => <div>{row.status}</div>
    },
    {
      name: 'Date',
      cell: (row: any) => <div>{`${dayjs(row?.createdAt).format('MMM DD, YYYY')}`}</div>,
      dataKey: 'createdAt',
      sortable: true
    },
    {
      name: 'Action',
      dataKey: 'action',
      cell: (row: any) => <div className='capitalize'></div>,
      sortable: true
    }
  ]
  return (
    <>
      <form key={formKey} onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mb-8'>
        <div className='bg-white rounded-lg'>
          <div className='grid grid-cols-1 gap-4'>
            <h1 className='text-lg font-bold col-span-full'>General</h1>
            <Controller
              name='title'
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Notification Title'
                  placeholder='Enter Notification Title'
                  error={errors?.title?.message}
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
                  label='Notification Body'
                  placeholder='Enter Notification Body'
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
                title='Send Notification'
                variant='secondary'
                className='mt-6 min-w-44'
              />
            </div>
          </div>
        </div>
      </form>
      <div>
        <div className='flex flex-wrap items-center justify-between'>
          <div>
            <h1 className='text-lg font-medium'>Scheduled Notifications</h1>
          </div>
          <Filters filters={filters} onFiltersChange={handleFiltersChange} />
        </div>
        <div className='w-full py-7 rounded-lg'>
          <TableComponent
            columns={columns}
            refetchData={refetchData}
            setRefetchData={setRefetchData}
            enablePagination={true}
            dataURL={notificationListURL}
            recordPerPage={10}
            payloadObj={{
              // optionFilters: {
              //   populate: 'rooms user',
              //   lean: true
              // },
              additionalFilters: {
                // status: filters.status === 'All Status' ? undefined : filters.status.toLowerCase(),
                searchColumns: ['body', 'title', 'subject', 'targetAudience'],
                search: filters.search ? filters.search : undefined,
                type: 'push_notification' // ["push_notification", "email_campaign" ]
                // filterRange: filters.filterRange[0]
                //   ? [filters.filterRange[0]?.toISOString(), filters.filterRange[1]?.toISOString()]
                //   : undefined
              }
            }}
          />
        </div>
      </div>
    </>
  )
}
