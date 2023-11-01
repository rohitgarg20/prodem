import { forEach } from 'lodash'

import { onApiFetchStartedReducer, onLoginApiSuccessReducer, onLoginApiFailedResponseReducer } from './LoginSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { log } from '../../common/config/log'
import { LoginFormKeys } from '../../common/Constant'
import { INCORRECT_EMAIL_ID } from '../../common/ErrorMessages'
import { IUserFormItem } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { emailIdValidator, validateFormFieldsEmpty } from '../../common/validators/validation-utils'
import { apiDispatch } from '../../network/DispatchApiCall'
import { capitalizeFirstChar } from '../../utils/app-utils'


export const onLoginUserReducer = (loginForm: Record<LoginFormKeys, IUserFormItem>) => {
  log('onSignupUserReducer', loginForm)
  const emptyFieldName = validateFormFieldsEmpty(loginForm)

  if(emptyFieldName.length) {
    return showAndroidToastMessage(`${capitalizeFirstChar(emptyFieldName)} is empty`)
  }

  if (!emailIdValidator(loginForm.userName?.inputValue)) {
    return showAndroidToastMessage(INCORRECT_EMAIL_ID)
  }

  const formData = new FormData()

  forEach(Object.keys(loginForm), (formItem) => {
    const { apiKey, inputValue  } = loginForm[formItem]
    formData.append(apiKey, inputValue)
  })
  return new Promise((resolve, reject) => {
    const apiResponse = apiDispatch({
      endPoint: API_END_POINT.LOGIN_USER,
      method: 'POST',
      body: formData,
      onStart: onApiFetchStartedReducer.type,
      onFailure: onLoginApiSuccessReducer.type,
      showLoaderOnScreen: true,
      onSuccess: onLoginApiFailedResponseReducer.type
    })
    try {
      resolve(apiResponse)
    } catch(err) {
      reject(err)
    }
  })

}