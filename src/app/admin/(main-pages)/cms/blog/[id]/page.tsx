'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import TableComponent from '@/components/common/TableComponent'
import { vendorBookingList } from '@/services/APIs/vendor'
import duration from 'dayjs/plugin/duration'
import { PAYMENT_STATUS, ROUTES } from '@/libs/constants'
import Filters from '../../Filters'
import { Controller, useForm } from 'react-hook-form'
import TextInput from '@/components/form/LabelInput'
import CustomSelect from '@/components/form/SelectField'
import CustomTextArea from '@/components/form/TextareaInput'
import CustomButton from '@/components/common/CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import FileUpload from '@/components/form/FileUpload'
import Axios from '@/libs/axios'
import { createBlogURL, getBlogURL, updateBlogURL } from '@/services/APIs/admin'
import { toast } from 'sonner'
import { useMount } from 'react-use'
import Loader from '@/components/common/Loader'
import Editor from 'react-simple-wysiwyg'

// import AppCKEditor from '@/components/common/CkEditor/Editor'

dayjs.extend(duration)

interface FormData {
  title: string
  slug: string
  category: string
  visibility: string
  content: string
  fileUrl: string
  pageTitle: string
  pageDescription: string
  keywords: string
  attachment: File | string
}

const AddNewBlog = () => {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [blog, setBlog] = useState()

  useMount(async () => {
    if (params.id && params.id !== 'new') {
      setLoading(true)
      const { data }: any = await Axios({ ...getBlogURL(params.id) })
      setBlog(data.data)
      setLoading(false)
    }
  })

  if (loading) return <Loader />
  return <Form {...{ blog }} />
}

const Form = ({ blog }: any) => {
  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setFocus,
    reset, // To reset the form with updated values
    getValues,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      // category: 'culture',
      category: 'culture',
      visibility: 'hidden',
      ...(blog || {}),
      pageTitle: blog?.metaOptions?.title || '',
      pageDescription: blog?.metaOptions?.content || '',
      keywords: blog?.metaOptions?.keywords?.join(',')
    }
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    const formData = new FormData()
    if (params.id && params.id !== 'new') data = { ...data, _id: params.id }
    const payload: any = {
      ...data,
      title: data.title,
      content: data.content,
      visibility: data.visibility,
      category: data.category,
      slug: data.slug,
      avg_read_time: data.avg_read_time || 0,
      attachment: !data.attachment?._id ? data.attachment : undefined,
      ['metaOptions.title']: data.pageTitle,
      ['metaOptions.content']: data.pageDescription
    }
    Object.keys(payload).forEach((key: any) => {
      formData.append(key, payload[key] as any)
    })
    ;(data?.keywords || [])
      .split(',')
      .map((item: any, index: any) => formData.append(`metaOptions.keywords[${index}]`, item))
    try {
      const { data: res }: any = await Axios({
        ...(blog?._id ? updateBlogURL(blog?._id) : createBlogURL),
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast.success(res.message)
      router.push(ROUTES.ADMIN.CMS)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-8'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='bg-white rounded-lg p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <h1 className='text-lg font-bold col-span-full'>General</h1>
            <Controller
              name='title'
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Post Title'
                  placeholder='Enter post title'
                  error={errors?.title?.message}
                  required
                />
              )}
            />
            <Controller
              name='slug'
              control={control}
              rules={{ required: 'URL slug is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='URL Slug'
                  placeholder='Enter URL Slug'
                  error={errors?.slug?.message}
                  required
                />
              )}
            />
            <Controller
              name='category'
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  label='Category'
                  options={[
                    { label: 'culture', value: 'culture' },
                    { label: 'Dream Vacation', value: 'dream_vacation' },
                    { label: 'Travel Soul', value: 'travel_soul' }
                  ]}
                  error={errors?.category?.message}
                  required
                />
              )}
            />
            <Controller
              name='visibility'
              control={control}
              rules={{ required: 'Visibility is required' }}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  label='Visibility'
                  options={[
                    { label: 'Public', value: 'publish' },
                    { label: 'Hidden', value: 'hidden' }
                  ]}
                  error={errors?.visibility?.message}
                  required
                />
              )}
            />
            <div className='col-span-full space-y-2'>
              <Controller
                name='content'
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <>
                    <label className='text-base font-bold'>Description</label>
                    <Editor value={field.value} onChange={field.onChange} />
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 xs:grid-cols-2 gap-4'>
          <div className='grid grid-cols-1 bg-white rounded-lg p-4 gap-4'>
            <h1 className='text-lg font-bold'>Meta Options</h1>
            <Controller
              name='pageTitle'
              control={control}
              rules={{ required: 'Page title is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Page Title'
                  placeholder='Enter Page Title'
                  error={errors?.pageTitle?.message}
                  required
                />
              )}
            />
            <Controller
              name='pageDescription'
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Description'
                  placeholder='Type your description...'
                  error={errors?.pageDescription?.message}
                  required
                />
              )}
            />
            <Controller
              name='keywords'
              control={control}
              rules={{ required: 'Keywords is required' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label='Keywords'
                  placeholder='keywords (e.g. software, online, marketing)'
                  error={errors?.keywords?.message}
                  required
                />
              )}
            />
          </div>
          <div className='bg-white rounded-lg p-4 space-y-8'>
            <h1 className='text-lg font-bold'>Media</h1>
            {/* <div className='space-y-3'>
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
                      onClick={() => setValue('document', '')}
                      ImageIcon={false}
                    />
                  )}
                </div>
              </div> */}
            <FileUpload file={getValues('attachment')} setFiles={(files: any) => setValue('attachment', files?.[0])} />
          </div>
        </div>
        <div>
          <CustomButton title='Save' type='submit' variant='primary' isLoading={loading} className='min-w-40' />
        </div>
      </form>
    </div>
  )
}

export default AddNewBlog
