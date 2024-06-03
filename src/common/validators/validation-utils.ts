import {
  INCORRECT_MOBILE_NUMBER, PASSWORD_EMPTY, NAME_MIN_LENGTH_INVALID, PASSWORD_MISMATCHES
} from '../ErrorMessages'
import { IUserFormItem } from '../Interfaces'

const REGEX_NUMBERS_ONLY = /^[0-9]*$/
const REGEX_VALID_OTP = /^[0-9]{4}$/
const USER_NAME_MIN_LENGTH = 2
const REGEX_VALID_EMAIL =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i


export function validateRegex(input, regex) {
  if (regex.test(input)) {
    return true
  }
  return false
}

export function isNumbers(userName) {
  if (userName && userName.length > 0) {
    if (validateRegex(userName, REGEX_NUMBERS_ONLY)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }

}

export function isPhoneNumberValid(phoneNumber) {
  if (phoneNumber && phoneNumber.length === 10) {
    return true
  }
  return false

}

export const isOTPValid = (otpVal: any) => {
  let isValidOpt = validateRegex(otpVal, REGEX_VALID_OTP)
  return isValidOpt ? true : false
}

export const getInValidPhoneNumberErrorMsg = (phoneNumber) => {
  return isPhoneNumberValid(phoneNumber) ? '' : INCORRECT_MOBILE_NUMBER
}

export const getPasswordEmptyErrorMsg = (password) => {
  if (password.length === 0) {
    return PASSWORD_EMPTY
  }
  return ''
}

export const isCreatePasswordValid = (password, confirmPassword) => {
  if (password.length === 0 || password !== confirmPassword){
    return false
  }
  return true
}


export const isUserNameValid = (userName) => {
  userName = userName.trim()
  if (userName.length < USER_NAME_MIN_LENGTH) {
    return false
  }
  return true
}

export const getInValidUserNameErrorMsg = (userName) => {
  return isUserNameValid(userName) ? '' : NAME_MIN_LENGTH_INVALID
}

export const getCreatePasswordErrorMsg = (password, confirmPass) => {
  if (password.length === 0) {
    return PASSWORD_EMPTY
  }
  return  (isCreatePasswordValid(password, confirmPass) ? '' : PASSWORD_MISMATCHES)
}

export function emailIdValidator(emailId) {
  emailId = emailId && emailId.trim()
  if (emailId &&  emailId.length === 0) {
    return false
  }
  if (validateRegex(emailId, REGEX_VALID_EMAIL)) {
    return true
  }
  return false
}

export const validateFormFieldsEmpty = (formData: Record<any, IUserFormItem>) => {
  let fieldName = ''
  Object.keys(formData).forEach((item) => {
    if(!fieldName.length && !formData[item]?.inputValue?.length) {
      fieldName = item
    }
  })
  return fieldName
}

export const isValidUrl = (url: string) => {
  if(url.includes('http')) return true
  return false
}