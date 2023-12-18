/* eslint-disable guard-for-in */
import { onProfileDataApiInitiate, onProfileDataApiSuccess, onProfileDataApiFailure,
  updateUserName, onProfileUpdateApiFailed, logoutUserFailureReducer, logoutUserSuccessReducer, onSuccessPasswordUpdatedReducer } from './ProfileSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { showAndroidToastMessage } from '../../common/Toast'
import { apiDispatch } from '../../network/DispatchApiCall'

export const fetchUserProfileData = (showLoaderOnScreen = true) => {

  apiDispatch({
    endPoint: API_END_POINT.PROFILE_DETAILS,
    method: 'POST',
    onStart: onProfileDataApiInitiate.type,
    onSuccess: onProfileDataApiSuccess.type,
    onFailure: onProfileDataApiFailure.type,
    showLoaderOnScreen
  })

}

export const updateUserNameApi = (name) => {
  const formData = new FormData()
  formData.append('name', name)
  return new Promise((resolve, reject) => {
    const apiResp = apiDispatch({
      endPoint: API_END_POINT.UPDATE_USER_NAME,
      method: 'POST',
      body: formData,
      onStart: '',
      onSuccess: updateUserName.type,
      onFailure: onProfileUpdateApiFailed.type,
      showLoaderOnScreen: true
    })
    try {
      resolve(apiResp)
    }catch(err) {
      reject(err)
    }
  })
}

export const updateUserPasswordApi = ({
  currentPassword,
  newPassword
}) => {
  const formData = new FormData()
  formData.append('current_password', currentPassword)
  formData.append('new_password', newPassword)
  return new Promise((resolve, reject) => {
    const apiResp = apiDispatch({
      endPoint: API_END_POINT.UPDATE_PASSWORD,
      method: 'POST',
      body: formData,
      onStart: '',
      onSuccess: onSuccessPasswordUpdatedReducer.type,
      onFailure: onProfileUpdateApiFailed.type,
      showLoaderOnScreen: true
    })
    try {
      resolve(apiResp)
    }catch(err) {
      showAndroidToastMessage('MultiLanguageString.ERROR_PASSWORD')
      reject(err)
    }
  })
}

export const updateUserDetailsApi = (userDetails) => {
  const formData = new FormData()
  for(let key in userDetails) {
    formData.append(key, userDetails[key])
  }

  return new Promise((resolve, reject) => {
    const apiResp = apiDispatch({
      endPoint: API_END_POINT.UPDATE_USER_INFO,
      method: 'POST',
      body: formData,
      onStart: '',
      onSuccess: onProfileDataApiSuccess.type,
      onFailure: onProfileUpdateApiFailed.type,
      showLoaderOnScreen: true
    })
    try {
      resolve(apiResp)
    } catch(err) {
      reject(err)
    }
  })
}

export const updateUserProfilePhotoApi = (photoBase64) => {
  const formData = new FormData()
  formData.append('photo_base64', photoBase64)

  apiDispatch({
    endPoint: API_END_POINT.UPDATE_PROFILE_PHOTO,
    method: 'POST',
    body: formData,
    onStart: '',
    onSuccess: onProfileDataApiSuccess.type,
    onFailure: onProfileUpdateApiFailed.type,
    showLoaderOnScreen: true
  })
}

export const fetchCountryApi = async () => {
  return await apiDispatch({
    endPoint: API_END_POINT.FETCH_PART_REQUEST_FILTER_LIST,
    method: 'POST',
    onStart: '',
    onSuccess: '',
    onFailure: '',
    showLoaderOnScreen: true
  })
}

export const fetchCityApi = async () => {
  return await apiDispatch({
    endPoint: API_END_POINT.CITY_API,
    method: 'POST',
    onStart: '',
    onSuccess: '',
    onFailure: '',
    showLoaderOnScreen: true
  })
}

export const logoutUser = () => {
  apiDispatch({
    endPoint: API_END_POINT.LOGOUT_USER,
    method: 'POST',
    // onStart: logoutUserSuccessReducer.type,
    onSuccess: logoutUserSuccessReducer.type,
    onFailure: logoutUserFailureReducer.type,
    showLoaderOnScreen: true
  })
}

