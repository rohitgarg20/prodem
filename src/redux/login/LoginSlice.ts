import { createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

import { dimissKeyboard } from '../../common/App-Utils'
import { log } from '../../common/config/log'
import { LOGIN_FORM, LoginFormKeys, ReducerName } from '../../common/Constant'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { IUserFormItem } from '../../common/Interfaces'
import { showAndroidToastMessage } from '../../common/Toast'
import { IActions } from '../../network/NetworkUtil'

export interface ILoginState {
  formData: Record<LoginFormKeys, IUserFormItem>
}

const initialState: ILoginState = {
  formData: LOGIN_FORM
}

const onChangeUserInputReducer = (state: ILoginState, action: IActions) => {
  const { textFieldKey = '', inputValue = '' } = action.payload || {}
  if(!isEmpty(state.formData[textFieldKey])) {
    state.formData[textFieldKey].inputValue = inputValue
  }
}

const onApiFetchStarted = () => {
  dimissKeyboard()
}

const onApiSuccessResponse = (state: ILoginState, { payload  }) => {
  const { responseData } = payload
  log('onApiSuccessResponseonApiSuccessResponse', responseData)
  // navigate to email verification screen
}

const onApiFailedResponse = (state: ILoginState, { payload }) => {
}

const resetFormData = (state: ILoginState) => {
  state.formData = LOGIN_FORM
}

const loginSlice = createSlice({
  name: ReducerName.LOGIN,
  initialState,
  reducers: {
    onChangeUserInput: onChangeUserInputReducer,
    onApiFetchStartedReducer: onApiFetchStarted,
    onLoginApiSuccessReducer: onApiSuccessResponse,
    onLoginApiFailedResponseReducer: onApiFailedResponse,
    resetFormDataReducer: resetFormData
  }
})

export const {
  onChangeUserInput, onApiFetchStartedReducer, onLoginApiSuccessReducer, onLoginApiFailedResponseReducer,
  resetFormDataReducer
} = loginSlice.actions

export default loginSlice.reducer