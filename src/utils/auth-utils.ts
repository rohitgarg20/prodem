import { storage } from './AppStorage'

let authToken: any = ''

export const setAuthToken = (token: string) => {
  authToken = token
  storage.set('authToken', token)
}

export const getAuthToken = () => {
  authToken = storage.getString('authToken')
  return authToken
}

export const clearAll = () => {
  authToken = ''
  storage.clearAll()
}

export const getToken = () => {
  return authToken
}

export const setLanguage = (language: string) => {
  storage.set('language', language)
}

export const getLanguage = () => {
  return storage.getString('language') || 'en'
}