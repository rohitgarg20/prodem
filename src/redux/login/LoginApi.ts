import { forEach } from 'lodash'
import { ToastAndroid } from 'react-native'

import { onApiFetchStartedReducer, onLoginApiSuccessReducer, onLoginApiFailedResponseReducer } from './LoginSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { LoginFormKeys } from '../../common/Constant'
import { IUserFormItem } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { emailIdValidator, validateFormFieldsEmpty } from '../../common/validators/validation-utils'
import { apiDispatch } from '../../network/DispatchApiCall'
import { capitalizeFirstChar, tString } from '../../utils/app-utils'


export const onLoginUserReducer = (loginForm: Record<LoginFormKeys, IUserFormItem>) => {
  const emptyFieldName = validateFormFieldsEmpty(loginForm)

  if(emptyFieldName.length) {
    return showAndroidToastMessage(`${capitalizeFirstChar(tString(emptyFieldName))} ${tString('MultiLanguageString.IS_EMPTY')}`, ToastAndroid.SHORT, false)
  }

  if (!emailIdValidator(loginForm.userName?.inputValue)) {
    return showAndroidToastMessage('INCORRECT_EMAIL_ID')
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
      onFailure: onLoginApiFailedResponseReducer.type,
      showLoaderOnScreen: true,
      onSuccess: onLoginApiSuccessReducer.type
    })
    try {
      resolve(apiResponse)
    } catch(err) {
      reject(err)
    }
  })

}