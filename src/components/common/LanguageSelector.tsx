import React from 'react'
import '@/utils/i18n' // Import i18n configuration
import { useTranslation } from 'react-i18next'

export default function LanguageSelector() {
  const { t, i18n } = useTranslation()

  const onChangeLang = (lng: string) => i18n.changeLanguage(lng)

  return (
    <div
      tabIndex={0}
      className='dropdown-content menu mt-2 w-60 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
    >
      <div className='py-2'>
        <h3 className='px-4 text-gray-700 font-semibold'>Select Language</h3>

        <div className='mt-2 space-y-1'>
          <label className='flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100'>
            <input
              type='radio'
              name='language'
              className='radio radio-orange-500'
              onChange={() => onChangeLang('ar')}
            />
            <span className='text-gray-700'>{t('arabic')}</span>
          </label>
          <label className='flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100'>
            <input
              type='radio'
              name='language'
              className='radio radio-orange-500'
              defaultChecked
              onChange={() => onChangeLang('en')}
            />
            <span className='text-gray-700'>{t('english')}</span>
          </label>
        </div>
      </div>
    </div>
  )
}
