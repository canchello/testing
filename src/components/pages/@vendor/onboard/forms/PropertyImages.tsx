'use client'

import React, { useState } from 'react'
import CustomButton from '@/components/common/CustomButton'
import userStore from '@/stores/userStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import FileUpload from '@/components/form/FileUpload'
import Loader from '@/components/common/Loader'
import { toast } from 'sonner'
import Axios from '@/libs/axios'
import { attachmentCreateURL } from '@/services/APIs/vendor'
import { getImage } from '@/utils/helper'

const PropertyImages = ({ onNext = () => {}, onPrev = () => {} }) => {
  const { user = {}, updateUserProfile, setUser, property = {} }: any = userStore()
  const [loading, setLoading] = useState<Boolean>(false)
  const [files, setFiles] = useState<Array<any>>(user?.primaryProperty?.attachment || [])
  const [formLoading, setFormLoading] = useState<Boolean>(false)
  const [previewImages, setPreviewImages] = useState<Array<any>>(user?.primaryProperty?.attachment || [])

  const onSubmit = async () => {
    try {
      const newImages = files.filter((file: any) => !file?.fileUrl)
      if (newImages.length < 1 && !user.primaryProperty?.attachment?.length) {
        return toast.error('Please upload at least one image.')
      }
      if (!newImages.length) return onNext()

      setFormLoading(true)
      const formData = new FormData()
      formData.append(`propertyId`, user.primaryProperty?._id)
      newImages.forEach((file: any, index) => {
        formData.append(`attachment[${index}]`, file)
      })
      const { data: res }: any = await Axios({
        ...attachmentCreateURL,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      })
      await updateUserProfile()
      onNext()
    } catch (error) {
      console.log('error', error)
      setFormLoading(false)
    }
  }

  const handleDeleteImage = (index: number) => {
    setFiles(files.filter((item, i) => i !== index))
    setPreviewImages(previewImages.filter((item, i) => i !== index))
  }

  const handleUpload = (acceptedFiles: any) => {
    const newAcceptedFiles = acceptedFiles.map((file: any) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    )
    setFiles(prev => [...(prev || []), ...newAcceptedFiles])
    setPreviewImages(prev => [...(prev || []), ...acceptedFiles.map((file: any) => URL.createObjectURL(file))])
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold mb-2'>
        Property Images<span className='text-red-600'>*</span>
      </h2>
      <p className='mb-6 text-lg'>Show us how your place look like</p>

      <form className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <div className='bg-custom-orange rounded-lg p-4'>
              <div className='space-y-4'>
                <div className=''>
                  <label className='text-xl font-bold'>
                    Media Upload
                    <span className='text-red-500'>*</span>
                  </label>
                  <p>Add your images here, and you can upload upto 5 images.</p>
                </div>
                <div className='bg-white rounded-lg'>
                  <FileUpload setFiles={handleUpload} shouldPreview={false} />
                </div>
                <p className='text-muted'>Only support .jpg, .png files</p>
              </div>
              <div className='divider text-muted'>OR</div>
              <div className='space-y-3'>
                <label className='text-xl font-bold'>
                  Upload from URL
                  <span className='text-red-500'>*</span>
                </label>
                <div className='bg-white p-2 rounded-lg'>https://sharefile.com/file.jpg</div>
                <CustomButton variant='secondary' title='Upload' />
              </div>
            </div>
          </div>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {!previewImages.length && (
                <div className='flex justify-center col-span-full'>
                  <p>Please upload at least one image to preview</p>
                </div>
              )}
              {previewImages.map((item: any, index) => {
                return (
                  <div key={index} className='relative bg-base-200 rounded-lg p-3 h-40'>
                    <img
                      src={((item?.fileUrl && getImage(item.fileUrl)) || item || '') as string}
                      className='w-full h-full object-cover rounded-md'
                      alt=''
                    />
                    {/* delete preview image */}
                    <FontAwesomeIcon
                      icon={faTrash}
                      className='absolute text-muted bg-base-200 right-0 top-0 rounded-full cursor-pointer p-3'
                      onClick={() => handleDeleteImage(index)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
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
            onClick={onSubmit}
            isLoading={Boolean(loading || formLoading)}
            title='Continue'
            variant='primary'
            className='mt-6 min-w-44'
          />
        </div>
      </form>
    </div>
  )
}

export default PropertyImages
