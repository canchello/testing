'use client'
import { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import appStore from '@/stores/appStore'
import CustomButton from '@/components/common/CustomButton'

interface PositionTypes {
  label: string
  value: string
}

type FormData = {
  name: string
  email: string
  position_id: string
  resume_link?: string
  resume: File | null
}

const ApplyForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      position_id: '',
      resume_link: '',
      resume: null
    }
  })
  const [positionOptions, setPositionOptions] = useState<PositionTypes[]>([])
  const { isLoading, fetchPositionsOptions, applyForPosition }: any = appStore()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const res = await applyForPosition(data)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (file: File | null) => void) => {
    const selectedFile = e.target.files ? e.target.files[0] : null
    onChange(selectedFile)
    setUploadedFile(selectedFile)
  }

  const getPositionOptions = async () => {
    try {
      const res = await fetchPositionsOptions({
        query: {
          is_active: true
        }
      })
      setPositionOptions(
        res.data.map((d: any) => ({
          label: d.name,
          value: d._id
        }))
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPositionOptions()
  }, [])

  return (
    <section className='relative w-full h-full p-10'>
      <div className='absolute inset-x-0 top-0 bg-custom-dark-blue h-[600px] w-full'></div>
      <div className='relative z-10 max-w-3xl mx-auto pt-2 pb-12 text-center text-white'>
        <h2 className='text-3xl font-semibold mb-2'>Apply for a Position</h2>
        <p className='text-lg mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>
      </div>

      <div className='relative z-10 max-w-xl mx-auto px-4 py-6 xs:p-8 bg-[#faf3e0] rounded-lg shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
          {/* Full Name */}
          <div>
            <label className='block text-gray-700'>Full Name*</label>
            <Controller
              name='name'
              control={control}
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  className='w-full p-3 border border-gray-300 rounded-lg'
                  placeholder='Full Name'
                />
              )}
            />
            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className='block text-gray-700'>Email Address*</label>
            <Controller
              name='email'
              control={control}
              rules={{
                required: 'Email Address is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Enter a valid email address'
                }
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type='email'
                  className='w-full p-3 border border-gray-300 rounded-lg'
                  placeholder='Email Address'
                />
              )}
            />
            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          </div>

          {/* Position */}
          <div>
            <label className='block text-gray-700'>Position*</label>
            <Controller
              name='position_id'
              control={control}
              rules={{ required: 'Position is required' }}
              render={({ field }) => (
                <select {...field} className='w-full p-3 border border-gray-300 rounded-lg'>
                  <option value=''>Select a Position</option>
                  {positionOptions?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.position_id && <p className='text-red-600'>{errors.position_id.message}</p>}
          </div>

          {/* Resume Link */}
          <div>
            <label className='block text-gray-700'>Resume Link</label>
            <Controller
              name='resume_link'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='url'
                  className='w-full p-3 border border-gray-300 rounded-lg'
                  placeholder='Resume Link (optional)'
                />
              )}
            />
          </div>

          {/* Separator */}
          <div className='flex items-center justify-center space-x-2'>
            <span className='h-px bg-gray-300 flex-grow' />
            <span className='text-gray-500'>OR</span>
            <span className='h-px bg-gray-300 flex-grow' />
          </div>

          {/* Upload Resume */}
          <div className='space-y-2'>
            <label className='block text-gray-700'>Upload Resume*</label>
            <div className='border border-dashed bg-white border-gray-300 p-6 rounded-lg'>
              <Controller
                name='resume'
                control={control}
                rules={{
                  required: 'Resume is required',
                  validate: file => !file || file.size <= 10 * 1024 * 1024 || 'File size should not exceed 10MB'
                }}
                render={({ field }) => (
                  <input
                    type='file'
                    accept='.pdf,.doc,.docx'
                    onChange={e => handleFileChange(e, field.onChange)}
                    className='w-full p-3'
                  />
                )}
              />
              <p className='text-gray-500 mt-2'>Max 10 MB files are allowed.</p>
              {uploadedFile && (
                <p className='text-green-600 mt-2'>
                  Uploaded: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
              {errors.resume && <p className='text-red-600'>{errors.resume.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className='text-center'>
            <CustomButton
              type='submit'
              title='Submit Button'
              isLoading={isLoading}
              className={`!bg-[#1e293b] w-full !text-white px-8 py-3 rounded-lg hover:bg-[#14233a] transition`}
            />
          </div>
        </form>
      </div>
    </section>
  )
}

export default ApplyForm
