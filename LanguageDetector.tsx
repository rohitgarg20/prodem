import i18n, { ModuleType } from 'i18next'
import { initReactI18next } from 'react-i18next'

import de from './src/common/translation/de'
import en from './src/common/translation/en'
import it from './src/common/translation/it'
import ro from './src/common/translation/ro'
import { getLanguage, setLanguage } from './src/utils/auth-utils'
import { log } from './src/common/config/log'

const languageDetectorPlugin = {
  type: 'languageDetector' as ModuleType,
  async: true,
  init: () => { },
  detect: async function (callback: (lang: string) => void) {
    try {
      // get stored language from Async storage
      // put your own language detection logic here

      const language = getLanguage()
      log('languagelanguage is =', language)
      if (language) {
        // if language was stored before, use this language in the app
        return callback(language)
      } else {
        // if language was not stored yet, use english
        return callback('en')
      }
    } catch (error) {
      console.log('Error reading language', error)
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      // save a user's language choice in Async storage
      setLanguage(language)
    } catch (error) {
      //
    }
  }
}
export const resources = {
  en: {
    translation: en
  },
  de: {
    translation: de
  },
  it: {
    translation: it
  },
  ro: {
    translation: ro
  }
}

i18n.use(initReactI18next).use(languageDetectorPlugin).init({
  resources,
  compatibilityJSON: 'v3',
  // fallback language is set to english
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})