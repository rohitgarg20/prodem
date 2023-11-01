import { onStart, onApiResponse, onApiFailed } from './UserExistanceSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { EMAIL_ID_REQUIRED, INCORRECT_EMAIL_ID } from '../../common/ErrorMessages'
import { showAndroidToastMessage } from '../../common/Toast'
import { emailIdValidator } from '../../common/validators/validation-utils'
import { apiDispatch } from '../../network/DispatchApiCall'


const { CHECK_USER_EXISTENCE } = API_END_POINT

export const checkUserExistanceApi = async (emailId: string) => {

  if(!emailId?.length) {
    showAndroidToastMessage(EMAIL_ID_REQUIRED)
  } else if(!emailIdValidator(emailId)) {
    showAndroidToastMessage(INCORRECT_EMAIL_ID)
  } else {

    const formData = new FormData()
    formData.append('email', emailId)

    return apiDispatch({
      endPoint: CHECK_USER_EXISTENCE,
      method: 'POST',
      body: formData,
      onStart: onStart.type,
      onSuccess: onApiResponse.type,
      onFailure: onApiFailed.type,
      showLoaderOnScreen: true
    })
    // log('responseresponse after api call', response)
  }
}