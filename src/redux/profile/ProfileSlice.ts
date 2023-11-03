import { createSlice } from '@reduxjs/toolkit'
import {  ReducerName } from '../../common/Constant'
import { log } from '../../common/config/log'
import { showAndroidToastMessage } from '../../common/Toast'


const initialState: IUserProfileDetail = {
    isFetchingData: false,
    hasApiError: false,
    userDetails: {}
}



const onProfileDataApiInitiateReducer = (state: IUserProfileDetail) => {
    state.isFetchingData = true
    state.hasApiError = false

}

const onProfileDataApiSuccessReducer = (state: IUserProfileDetail, { payload }) => {
    const { responseData : { data: responseData = {} } = {} } = payload
    log('Hey responseData : ', payload)

    const userDetails = responseData?.details
    const userData = { }
    for(let key in userDetails) {
      userData[key] = (userDetails[key] === 'undefined' || !userDetails[key]) ? '' : userDetails[key]
    }

    log('*** userData userData : ', userData)

    
    state.userDetails = userData
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


export const ratingSlice = createSlice({
  name: ReducerName.PROFILE,
  initialState,
  reducers: {
    onProfileDataApiInitiate: onProfileDataApiInitiateReducer,
    onProfileDataApiSuccess: onProfileDataApiSuccessReducer,
    onProfileDataApiFailure: onProfileDataApiFailureReducer,
    updateUserName: updateUserNameReducer,
    onProfileUpdateApiFailed: onUpdateApiFailedReducer,
    resetDataReducer: resetData
  }
})

export const { onProfileDataApiInitiate, onProfileDataApiSuccess, onProfileDataApiFailure, resetDataReducer, updateUserName, onProfileUpdateApiFailed } = ratingSlice.actions

export default ratingSlice.reducer