import { createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

import { ISignupState } from './SignupInterface'
import { dimissKeyboard } from '../../common/App-Utils'
import { log } from '../../common/config/log'
import { ReducerName, SIGN_UP_FORM } from '../../common/Constant'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { showAndroidToastMessage } from '../../common/Toast'
import { IAPIError, IAPIResponse, IActions } from '../../network/NetworkUtil'


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
  const { message = SOMETHING_WENT_WRONG } = error
  showAndroidToastMessage(message)
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