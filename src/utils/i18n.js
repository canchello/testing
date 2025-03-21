import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translation files
import en from '../locales/en/translation.json'
import ar from '../locales/ar/translation.json'

const resources = {
  en: { translation: en },
  ar: { translation: ar }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
