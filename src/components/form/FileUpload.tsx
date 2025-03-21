import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'sonner'
import { getImage } from '@/utils/helper'

const FileUpload = ({ file, setFiles, shouldPreview = true, multiple = false }: any) => {
  const [preview, setPreview] = useState<any>()

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles[0].size > 2 * 1024 * 1024) {
      return toast.error('File size should not exceed 2MB.')
    }
    console.log('Dropped files:', acceptedFiles)
    setFiles(acceptedFiles || [])
    setPreview(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true // Avoid triggering file select on Enter key
  })

  return (
    <div className='flex items-center justify-center'>
      <div
        {...getRootProps()}
        className='border-2 border-dashed border-gray-300 p-4 rounded-lg w-full text-center cursor-pointer'
        onClick={open}
      >
        <input {...getInputProps()} multiple={multiple} accept='image/*' className='hidden' />

        {shouldPreview && (preview || file?.fileUrl) ? (
          <img
            className='w-auto max-w-full h-56 mx-auto mb-4'
            src={preview || getImage(file?.fileUrl)}
            alt='Uploaded file'
          />
        ) : (
          <>
            <div className='text-5xl text-primary mb-4'>
              <FontAwesomeIcon icon={faCloudUpload} />
            </div>
            <p>Drag your file(s) or browse</p>
            <p className='text-sm text-gray-500 mt-2'>Max 10 MB files are allowed</p>
          </>
        )}
      </div>
    </div>
  )
}

export default FileUpload
