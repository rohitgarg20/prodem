import { onOtpApiFailureReducer, onOtpRequestInitiatedReducer, onOtpSuccessApiResponseReducer,
  onResendOtpInitiatedReducer, onResendOtpApiSuccessReducer, onResendOtpApiFailureReducer
} from './OtpVerificationSlice'
import { API_END_POINT } from '../../common/ApiConstant'
import { showAndroidToastMessage } from '../../common/Toast'
import { isOTPValid } from '../../common/validators/validation-utils'
import { apiDispatch } from '../../network/DispatchApiCall'


const { VERIFY_OTP, RESEND_OTP, FORGET_OTP_VERIFICATION, FORGET_RESEND_OTP } = API_END_POINT

export const verifyOtp = (otp: string[], email: string, isForgetPassword = false) => {
  const otpStr = otp.join('')
  if(isOTPValid(otpStr)) {
    const otpValidateForm = new FormData()
    otpValidateForm.append('email', email)
    otpValidateForm.append('verification_code', otpStr)
    return new Promise((resolve, reject) => {
      const apiRespData = apiDispatch({
        endPoint: isForgetPassword ? FORGET_OTP_VERIFICATION : VERIFY_OTP,
        method: 'POST',
        body: otpValidateForm,
        onStart: onOtpRequestInitiatedReducer.type,
        onSuccess: onOtpSuccessApiResponseReducer.type,
        onFailure: onOtpApiFailureReducer.type,
        showLoaderOnScreen: true
      })
      try {
        resolve(apiRespData)
      } catch(err) {
        reject(err)
      }
    })
  } else {
    showAndroidToastMessage('INVALID_OTP')
  }

}

export const resendOtp = (email: string, isForgetPassword = false) => {

  const resendOtpForm = new FormData()
  resendOtpForm.append('email', email)

  apiDispatch({
    endPoint: isForgetPassword ? FORGET_RESEND_OTP : RESEND_OTP,
    method: 'POST',
    body: resendOtpForm,
    onStart: onResendOtpInitiatedReducer.type,
    onSuccess: onResendOtpApiSuccessReducer.type,
    onFailure: onResendOtpApiFailureReducer.type,
    showLoaderOnScreen: true
  })

}