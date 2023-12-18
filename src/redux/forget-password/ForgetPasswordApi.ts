import { API_END_POINT } from '../../common/ApiConstant'
import { showAndroidToastMessage } from '../../common/Toast'
import { emailIdValidator } from '../../common/validators/validation-utils'
import { apiDispatch } from '../../network/DispatchApiCall'

export const callForgetPasswordApi = (emailId: string) => {

  if(!emailId?.length) {
    showAndroidToastMessage('EMAIL_ID_REQUIRED')
  } else if(!emailIdValidator(emailId)) {
    showAndroidToastMessage('INCORRECT_EMAIL_ID')
  } else {

    const formData = new FormData()
    formData.append('username', emailId)

    return new Promise((resolve, reject) => {
      const apiRespData = apiDispatch({
        endPoint: API_END_POINT.FORGET_PASSWORD,
        method: 'POST',
        body: formData,
        showLoaderOnScreen: true
      })
      try {
        resolve(apiRespData)
      } catch(err) {
        reject(err)
      }
    })

  }
}

export const dispatchSetPasswordApi = (emailId: string, newPassword: string, verificationCode: string) => {

  const formData = new FormData()
  formData.append('email', emailId)
  formData.append('verification_code', verificationCode)
  formData.append('new_password', newPassword)
  return new Promise((resolve, reject) => {
    const apiRespData = apiDispatch({
      endPoint: API_END_POINT.RESET_PASSWORD,
      method: 'POST',
      body: formData,
      showLoaderOnScreen: true
    })
    try {
      resolve(apiRespData)
    } catch(err) {
      reject(err)
    }
  })

}