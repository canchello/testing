'use client'
import { useState } from 'react'
import CustomButton from './CustomButton'
import { closeModal } from '../UI/Modal'
import Axios from '@/libs/axios'
import { updateUserProfileURL } from '@/services/APIs/userDetails'
import userStore from '@/stores/userStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const ProfilePhotoModal = ({ defaultImage = null }: { defaultImage: any }) => {
  const { setUser }: any = userStore()
  const [newProfilePhoto, setNewPhoto] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<Boolean>(false)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    if (file) {
      const validTypes = ['image/jpeg', 'image/png']
      const maxSize = 10 * 1024 * 1024 // 10MB

      if (!validTypes.includes(file.type)) {
        setError('Please upload a PNG or JPEG image.')
        return
      }
      if (file.size > maxSize) {
        setError('File size should not exceed 10MB.')
        return
      }

      setNewPhoto(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
    }
  }
  const handleSavePhoto = async () => {
    if (!newProfilePhoto) {
      setError('No changes made to the profile photo.')
      return
    }

    // Prevent API call if the preview image hasn't changed
    if (previewUrl === defaultImage) {
      setError('No changes made to the profile photo.')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('profilePicture', newProfilePhoto as File)

    try {
      const { data: res }: any = await Axios({
        ...updateUserProfileURL,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setUser(res.data)
      setLoading(false)
      closeModal('upload-profile-photo')
    } catch (error) {
      console.log('error', error)
      setLoading(false)
      closeModal('upload-profile-photo')
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='rounded-lg p-6 w-80 md:w-[400px] max-w-full'>
        <h2 className='text-xl font-bold text-center mb-4'>Upload Profile Photo</h2>
        <p className='text-center text-base mb-4'>
          Please upload a profile image in PNG or JPEG format. Ensure that the file size does not exceed 10MB.
        </p>

        {/* Profile Photo Preview */}
        <div className='flex justify-center mb-4'>
          <div className='w-24 h-24 md:w-44 md:h-44 rounded-full overflow-hidden bg-gray-200'>
            {previewUrl || defaultImage ? (
              <img src={previewUrl || defaultImage} alt='Profile' className='w-full h-full object-cover' />
            ) : (
              <div className='flex justify-center items-center h-full'>
                <FontAwesomeIcon icon={faUser} size='2xl' />
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && <p className='text-center text-red-500 mb-4'>{error}</p>}

        {/* Action Buttons */}
        <div className='flex justify-center space-x-4'>
          {newProfilePhoto && (
            <CustomButton variant='primary' isLoading={!!loading} title='Save Photo' onClick={handleSavePhoto} />
          )}
          <CustomButton
            className='!p-0'
            variant='outlined'
            isLoading={!!loading}
            title={
              <label className='px-6 py-2 cursor-pointer'>
                Upload File
                <input type='file' className='hidden' accept='.jpg, .jpeg, .png' onChange={handlePhotoUpload} />
              </label>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePhotoModal
