import { createSlice } from '@reduxjs/toolkit'
import { get, isEmpty } from 'lodash'
import { ToastAndroid } from 'react-native'

import { ISignupState } from './SignupInterface'
import { dimissKeyboard } from '../../common/App-Utils'
import { log } from '../../common/config/log'
import { ReducerName, SIGN_UP_FORM } from '../../common/Constant'
import { showAndroidToastMessage } from '../../common/Toast'
import { IAPIError, IAPIResponse, IActions } from '../../network/NetworkUtil'
import { tString } from '../../utils/app-utils'


const initialState: ISignupState = {
  formData: SIGN_UP_FORM
}

const onChangeUserInputReducer = (state: ISignupState, action: IActions) => {
  const { textFieldKey = '', inputValue = '' } = action.payload || {}
  if(!isEmpty(state.formData[textFieldKey])) {
    state.formData[textFieldKey].inputValue = inputValue
  }
}

const onApiFetchStarted = () => {
  dimissKeyboard()
}

const onApiSuccessResponse = (state: ISignupState, { payload  }: { payload: IAPIResponse }) => {
  const { responseData } = payload
  log('onApiSuccessResponseonApiSuccessResponse', responseData)
  // navigate to email verification screen
}

const onApiFailedResponse = (state: ISignupState, { payload }: { payload: IAPIError  }) => {
  const { error = {}  } = payload || {}
  showAndroidToastMessage(get(error, 'message', tString('SOMETHING_WENT_WRONG')), ToastAndroid.SHORT, false)

}

const resetFormData = (state: ISignupState) => {
  state.formData = SIGN_UP_FORM
}

const signupSlice = createSlice({
  name: ReducerName.SIGN_UP,
  initialState,
  reducers: {
    onChangeUserInput: onChangeUserInputReducer,
    onApiFetchStartedReducer: onApiFetchStarted,
    onSignupSuccessReducer: onApiSuccessResponse,
    onApiFailedResponseReducer: onApiFailedResponse,
    resetFormDataReducer: resetFormData
  }
})

export const {
  onChangeUserInput, onApiFetchStartedReducer, onSignupSuccessReducer, onApiFailedResponseReducer,
  resetFormDataReducer
} = signupSlice.actions

export default signupSlice.reducer