/* eslint-disable guard-for-in */
import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'

import { API_STATUS_CODE, BASE_URL } from '../../common/ApiConstant'
import { log } from '../../common/config/log'
import {  ReducerName } from '../../common/Constant'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { showAndroidToastMessage } from '../../common/Toast'
import { onLoginApiSuccessReducer } from '../login/LoginSlice'


const initialState: IUserProfileDetail = {
  isFetchingData: false,
  hasApiError: false,
  userDetails: {}
}


const onProfileDataApiInitiateReducer = (state: IUserProfileDetail) => {
  state.isFetchingData = true
  state.hasApiError = false

}

const getUserDetails = (payload) => {
  const { responseData : { data: responseData = {} } = {} } = payload
  const userDetails = responseData?.details || responseData?.userDetails
  const userData = { }
  for(let key in userDetails) {
    userData[key] = (userDetails[key] === 'undefined' || !userDetails[key]) ? '' : userDetails[key]
    if(key === 'p_user_photo') {
      userData[key] = `${BASE_URL}imagecache/thumb/uploads__profile-photo/400x400/${userDetails[key]}`
    }
  }
  return userData

}

const onProfileDataApiSuccessReducer = (state: IUserProfileDetail, { payload }) => {
  // const { responseData : { data: responseData = {} } = {} } = payload
  // log('Hey responseData : ', payload)

  // const userDetails = responseData?.details
  // const userData = { }
  // for(let key in userDetails) {
  //   userData[key] = (userDetails[key] === 'undefined' || !userDetails[key]) ? '' : userDetails[key]
  //   if(key === 'p_user_photo') {
  //     userData[key] = `${BASE_URL}imagecache/thumb/uploads__profile-photo/400x400/${userDetails[key]}`
  //   }
  // }

  // log('*** userData userData : ', userData)


  state.userDetails = getUserDetails(payload)
  log('userDetailsuserDetailsuserDetails', state.userDetails)
  state.isFetchingData = false
  state.hasApiError = false
}

const onProfileDataApiFailureReducer = (state: IUserProfileDetail) => {
  state.isFetchingData = false
  state.hasApiError = true
}

const updateUserNameReducer = (state: IUserProfileDetail, { payload }) => {
  const { responseData : { data: responseData = {} } = {} } = payload
  const userDetails = responseData?.details

  state.isFetchingData = false
  state.hasApiError = true
  state.userDetails.p_user_name = userDetails?.p_user_name || ''

}


const onUpdateApiFailedReducer = (state: IUserProfileDetail, { payload }) => {

  const message = payload?.error?.message  || 'Something Went Wrong!!'

  log('!!!! payload errror ', payload)
  showAndroidToastMessage(message)

}

const resetData = (state: IUserProfileDetail) => {
  state.isFetchingData = false
  state.hasApiError = false
  state.userDetails = {}

}

const logoutUser = (state: IUserProfileDetail, { payload }) => {

}

const logoutUserFailure = (state: IUserProfileDetail, { payload }) => {
  log('logoutUserFailure', payload)
  const errorCode = get(payload, 'error.code')
  const authStatus = get(payload, 'error.authStatus')
  if(errorCode !== API_STATUS_CODE.LOGOUT && authStatus !== false) {
    showAndroidToastMessage(SOMETHING_WENT_WRONG)
  }
}


export const ratingSlice = createSlice({
  name: ReducerName.PROFILE,
  initialState,
  reducers: {
    onProfileDataApiInitiate: onProfileDataApiInitiateReducer,
    onProfileDataApiSuccess: onProfileDataApiSuccessReducer,
    onProfileDataApiFailure: onProfileDataApiFailureReducer,
    updateUserName: updateUserNameReducer,
    onProfileUpdateApiFailed: onUpdateApiFailedReducer,
    resetDataReducer: resetData,
    logoutUserSuccessReducer: logoutUser,
    logoutUserFailureReducer: logoutUserFailure
  },
  extraReducers: (builder) => {
    builder.addCase(onLoginApiSuccessReducer.type, (state, action) => {
      const payload = get(action, 'payload', {})
      log('payloadpayloadpayloadpayloadpayload', payload, action)
      state.userDetails = getUserDetails(payload)
    })
  }
})

export const {
  onProfileDataApiInitiate, onProfileDataApiSuccess, onProfileDataApiFailure, resetDataReducer,
  updateUserName, onProfileUpdateApiFailed, logoutUserSuccessReducer, logoutUserFailureReducer } = ratingSlice.actions

export default ratingSlice.reducer