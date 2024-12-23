import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FileUpload = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log('Dropped files:', acceptedFiles)
    // Handle dropped files here
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
        className='border-2 border-dashed border-gray-300 p-8 rounded-lg w-full text-center cursor-pointer'
        onClick={open}
      >
        <input {...getInputProps()} />

        <div className='text-5xl text-primary mb-4'>
          <FontAwesomeIcon icon={faCloudUpload} />
        </div>
        <p>Drag your file(s) or browse</p>
        <p className='text-sm text-gray-500 mt-2'>Max 10 MB files are allowed</p>
      </div>
    </div>
  )
}

export default FileUpload
