import { createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

import { ICheckUserExistance } from './UserExistanceInterface'
import { API_STATUS_CODE } from '../../common/ApiConstant'
import { dimissKeyboard } from '../../common/App-Utils'
import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { showAndroidToastMessage } from '../../common/Toast'
import { IAPIError, IAPIResponse } from '../../network/NetworkUtil'
import { navigateSimple } from '../../utils/navigation-utils'
import { ScreenNames } from '../../common/Screens'

const { SUCCESS, USER_NOT_EXISTS } = API_STATUS_CODE

interface IUserExistanceState {
  emailId: string
}

const initialState: IUserExistanceState = {
  emailId: ''
}


const onApiRequestInitiated = () => {
  dimissKeyboard()
}

const onApiResponseFetched = (state: IUserExistanceState, { payload  }: { payload: IAPIResponse }) => {
  log('onApiResponseFetched is = ', payload)
  const { responseData } = payload || {}
  const { code, message  } = responseData as ICheckUserExistance || {}
  log('success is called', code)

  if(code === SUCCESS) {
    log('success is called')
    // navigate to login screen
    // navigateSimple({ screenToNavigate: ScreenNames.LOGIN_SCREEN })
    showAndroidToastMessage(message)
  }

}

const onApiResponseFailed = (state, { payload }: { payload: IAPIError  }) => {
  log('onApiResponseFailed is = rohit garg', payload)
  const { message, code } = payload?.error
  if(code === USER_NOT_EXISTS) {
    // navigateSimple({ screenToNavigate: ScreenNames.SIGNUP_SCREEN })
  }
  showAndroidToastMessage(message)
}


export const UserExistanceSlice = createSlice({
  name: ReducerName.USER_EXISTANCE,
  initialState,
  reducers: {
    onStart: onApiRequestInitiated,
    onApiResponse: onApiResponseFetched,
    onApiFailed: onApiResponseFailed
  }
})

export const { onStart, onApiResponse, onApiFailed } = UserExistanceSlice.actions

const checkUserExistanceReducer =  UserExistanceSlice.reducer

export {
  checkUserExistanceReducer
}

