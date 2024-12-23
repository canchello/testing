import React from 'react'

export default function LanguageSelector() {
  return (
    <div
      tabIndex={0}
      className='dropdown-content menu mt-2 w-60 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
    >
      <div className='py-2'>
        <h3 className='px-4 text-gray-700 font-semibold'>Select Language</h3>

        <div className='mt-2 space-y-1'>
          <label className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100'>
            <input type='radio' name='language' className='radio radio-orange-500 mr-2' onChange={() => {}} />
            <span className='text-gray-700'>Arabic</span>
          </label>
          <label className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100'>
            <input
              type='radio'
              name='language'
              className='radio radio-orange-500 mr-2'
              defaultChecked
              onChange={() => {}}
            />
            <span className='text-gray-700'>English</span>
          </label>
        </div>
      </div>
    </div>
  )
}
