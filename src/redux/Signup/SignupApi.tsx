import { forEach, get } from 'lodash'

import { onApiFailedResponseReducer, onApiFetchStartedReducer, onSignupSuccessReducer } from './SignupSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { FormKeys } from '../../common/Constant'
import { INCORRECT_EMAIL_ID, SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { IUserFormItem } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { emailIdValidator, validateFormFieldsEmpty } from '../../common/validators/validation-utils'
import { apiDispatch } from '../../network/DispatchApiCall'
import { capitalizeFirstChar } from '../../utils/app-utils'


export const isSignUpFormValid = (signupForm: Record<FormKeys, IUserFormItem>) => {
  const emptyFieldName = validateFormFieldsEmpty(signupForm)

  if(emptyFieldName.length) {
    showAndroidToastMessage(`${capitalizeFirstChar(emptyFieldName)} is empty`)
    return false
  }

  if (!emailIdValidator(signupForm.email?.inputValue)) {
    showAndroidToastMessage(INCORRECT_EMAIL_ID)
    return false
  }
  return true
}

export const onSignupUserReducer = (signupForm: Record<FormKeys, IUserFormItem>) => {
  const formData = new FormData()

  forEach(Object.keys(signupForm), (formItem) => {
    const { apiKey, inputValue  } = signupForm[formItem]
    formData.append(apiKey, inputValue)
  })

  return new Promise((resolve, reject) => {
    const apiResponse = apiDispatch({
      endPoint: API_END_POINT.CREATE_USER,
      method: 'POST',
      body: formData,
      onStart: onApiFetchStartedReducer.type,
      onFailure: onApiFailedResponseReducer.type,
      showLoaderOnScreen: true,
      onSuccess: onSignupSuccessReducer.type
    })
    try {
      resolve(apiResponse)
    } catch(err) {
      showAndroidToastMessage(get(err, 'message', SOMETHING_WENT_WRONG))
      reject(err)
    }
  })

}