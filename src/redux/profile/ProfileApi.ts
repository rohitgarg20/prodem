import { API_END_POINT } from "../../common/ApiConstant"
import { apiDispatch } from "../../network/DispatchApiCall"
import { onProfileDataApiInitiate, onProfileDataApiSuccess, onProfileDataApiFailure, updateUserName, onProfileUpdateApiFailed } from './ProfileSlice'

export const fetchUserProfileData = () => {
  
    apiDispatch({
      endPoint: API_END_POINT.PROFILE_DETAILS,
      method: 'POST',
      onStart: onProfileDataApiInitiate.type,
      onSuccess: onProfileDataApiSuccess.type,
      onFailure: onProfileDataApiFailure.type,
      showLoaderOnScreen: true
    })
  
  }

  export const updateUserNameApi = (name) => {
    const formData = new FormData()
    formData.append('name', name)
    apiDispatch({
      endPoint: API_END_POINT.UPDATE_USER_NAME,
      method: 'POST',
      body: formData,
      onStart: '',
      onSuccess: updateUserName.type,
      onFailure: onProfileUpdateApiFailed.type,
      showLoaderOnScreen: true
    })
  }

  export const updateUserPasswordApi = ({
    currentPassword,
    newPassword
  }) => {
    const formData = new FormData()
    formData.append('current_password', currentPassword)
    formData.append('new_password', newPassword)
    apiDispatch({
      endPoint: API_END_POINT.UPDATE_PASSWORD,
      method: 'POST',
      body: formData,
      onStart: '',
      onSuccess: '',
      onFailure: onProfileUpdateApiFailed.type,
      showLoaderOnScreen: true
    })
  }

  export const updateUserDetailsApi = (userDetails) => {
    const formData = new FormData()
    for(let key in userDetails) {
      formData.append(key, userDetails[key])
    }
   
    apiDispatch({
      endPoint: API_END_POINT.UPDATE_USER_INFO,
      method: 'POST',
      body: formData,
      onStart: '',
      onSuccess: onProfileDataApiSuccess.type,
      onFailure: onProfileUpdateApiFailed.type,
      showLoaderOnScreen: true
    })
  }


  
  