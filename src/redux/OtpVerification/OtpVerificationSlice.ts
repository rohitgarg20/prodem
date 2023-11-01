import { createSlice } from '@reduxjs/toolkit'

import { dimissKeyboard } from '../../common/App-Utils'
import { log } from '../../common/config/log'
import { ReducerName } from '../../common/Constant'
import { IActions } from '../../network/NetworkUtil'


interface IOtpVerificationState {
  otp: string[]
}

const initialState: IOtpVerificationState = {
  otp: []
}


const onChangeUserInput = (state, action: IActions) => {
  const { otpInput = [] } = action.payload || {}
  log('onChangeUserInput', action)
  state.otp = otpInput
}

const onOtpRequestInitated = () => {
  dimissKeyboard()
}

const onOtpSuccessApiResponse = (state: IOtpVerificationState, action: IActions) => {
  log('onOtpSuccessApiResponse', state, action)
}

const onOtpApiFailureResponse = (state: IOtpVerificationState, action: IActions) => {
  log('onOtpSuccessApiResponse', state, action)
}

const onResendOtpInitiated = (state) => {
  dimissKeyboard()
  state.otp = []
}

const onResendOtpApiSuccess = () => {

}

const onResendOtpApiFailure = () => {

}

const resetOtpData = (state: IOtpVerificationState) => {
  state.otp = []
}

const otpVerificationSlice = createSlice({
  name: ReducerName.OTP_VERIFICATION,
  initialState,
  reducers: {
    onChangeOtpReducer: onChangeUserInput,
    onOtpRequestInitiatedReducer: onOtpRequestInitated,
    onOtpSuccessApiResponseReducer: onOtpSuccessApiResponse,
    onOtpApiFailureReducer: onOtpApiFailureResponse,
    onResendOtpInitiatedReducer: onResendOtpInitiated,
    onResendOtpApiSuccessReducer: onResendOtpApiSuccess,
    onResendOtpApiFailureReducer: onResendOtpApiFailure,
    resetOtpReducer: resetOtpData
  }
})

export const {
  onChangeOtpReducer, onOtpSuccessApiResponseReducer, onOtpApiFailureReducer, onOtpRequestInitiatedReducer,
  onResendOtpInitiatedReducer, onResendOtpApiSuccessReducer, onResendOtpApiFailureReducer, resetOtpReducer

} = otpVerificationSlice.actions

export default otpVerificationSlice.reducer