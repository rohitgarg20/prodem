import React, { useEffect, useMemo, useRef } from 'react'

import { useRoute } from '@react-navigation/native'
import { get } from 'lodash'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { OtpVerificationStyles as styles } from './styles'
import { dimissKeyboard } from '../../common/App-Utils'
import { textColor } from '../../common/Colors'
import { BackButtonComponent, ButtonComponent, CustomText, IconWrapper, OtpInputComponent, SpacerComponent } from '../../common/components'
import { KeyboardHandledScrollView } from '../../common/components/generic/KeyboardHandledScrollView'
import { log } from '../../common/config/log'
import { ButtonType } from '../../common/Enumerators'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { icons } from '../../common/Icons'
import { ScreenNames } from '../../common/Screens'
import { BUTTONS, OTP_VERIFICATION_SCREEN } from '../../common/strings'
import { showAndroidToastMessage } from '../../common/Toast'
import { isOTPValid } from '../../common/validators/validation-utils'
import { resendOtp, verifyOtp } from '../../redux/OtpVerification/OtpVerificationApi'
import { onChangeOtpReducer, resetOtpReducer } from '../../redux/OtpVerification/OtpVerificationSlice'
import { resetFormDataReducer } from '../../redux/Signup/SignupSlice'
import { Dispatch, RootState } from '../../store/DataStore'
import { goBack, replaceNavigation } from '../../utils/navigation-utils'


const { OTP_VERIFICATION, OTP_SEND, RESEND_OTP_IN, RESEND_OTP, EDIT }  = OTP_VERIFICATION_SCREEN
const { VERIFY_OTP } = BUTTONS

export const OtpVerificationScreen = ({ navigation }) => {

  const dispatch: Dispatch = useDispatch()
  const routeParams = useRoute()
  const fromForgetPswdScreen = get(routeParams, 'params.forgetPassword', false)
  const emailId = get(routeParams, 'params.emailId', '')
  const { otp } = useSelector((state: RootState) => state.otpVerificationReducer)

  const otpInputRef: any = useRef(null)

  const onChangeOtpValue = (otpValue) => {
    dispatch({ type: onChangeOtpReducer.type, payload: { otpInput: otpValue } })
  }

  useEffect(() => {
    return () => {
      dispatch({ type: resetOtpReducer.type })
    }
  }, [dispatch])

  const onEditOtpBtn = () => {
    // navigate back to previous screen
    goBack(navigation)
  }


  const navigateOnOtpVerify = () => {
    if(fromForgetPswdScreen) {
      replaceNavigation({ navigator: navigation, screenToNavigate:  ScreenNames.SET_PASSWORD, params: { emailId, otp: otp.join('') }})
    } else {
      replaceNavigation({ navigator: navigation, screenToNavigate:  ScreenNames.LOGIN_SCREEN })
      dispatch({ type: resetFormDataReducer.type })
    }
  }

  const verifyEmailOtp = () => {
    dimissKeyboard()
    verifyOtp(otp, emailId, fromForgetPswdScreen)?.then(() => {
      navigateOnOtpVerify()
    }).catch((err) => {
      showAndroidToastMessage(get(err, 'message', SOMETHING_WENT_WRONG))
    })
  }


  const renderIconComponent = () => (
    <View style={styles.iconContainer}>
      <IconWrapper
        iconSource={icons.OTP_VERIFICATION}
        iconHeight={250}
        iconWidth={200}
        resizeMode={'contain'}
      />
    </View>
  )

  const renderHeadingComponent = () => (
    <CustomText
      text={OTP_VERIFICATION}
      color={textColor.white}
      textStyle={styles.heading}
    />
  )

  const renderSubHeading = () => {
    const heading = `${OTP_SEND} ${emailId}`
    return (<CustomText
      text={heading}
      color={textColor.primary}
      fontSize={16}
      textStyle={styles.subHeading}
    />)
  }


  const renderOtpInputComponent = () => {
    return (
      <View style={styles.otpInputContainer}>
        <OtpInputComponent
          ref={otpInputRef}
          otpLength = {4}
          onChangeOtpValue={onChangeOtpValue}
          otpInputValue={otp}
        />
      </View>
    )
  }

  const renderDescription = () => (
    <CustomText
      text={RESEND_OTP_IN}
      color={textColor.white}
      fontSize={18}
      textStyle={styles.description}
    />
  )

  const onResendOtp = () => {
    if(otpInputRef) {
      otpInputRef?.current?.focusTextInput()
    }
    resendOtp(emailId, fromForgetPswdScreen)
  }


  const renderResendOtpBtn = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        text={RESEND_OTP}
        onPress={onResendOtp}
      />
    )
  }

  const renderEditBtn = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.SIMPLE_BTN}
        text={EDIT}
        onPress={onEditOtpBtn}
      />
    )
  }

  const isOtpBtnDisabled= useMemo(() => {
    const otpInStr = otp.join('')
    log('isOtpBtnDisabled', isOTPValid(otpInStr), otpInStr)
    return !isOTPValid(otpInStr)
  }, [otp])

  const renderVerifyOtpButton = () => {
    return(
      <View style={styles.otpMarginContainer}>
        <ButtonComponent
          buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
          text={VERIFY_OTP}
          onPress={verifyEmailOtp}
          disabled={isOtpBtnDisabled}
          buttonContainerStyle={styles.verifyOtpBtnStyle}
        />
      </View>
    )
  }

  const renderFooterContainer = () => {
    return (
      <View style={styles.footerContainer}>
        {renderResendOtpBtn()}
        {renderEditBtn()}
      </View>
    )
  }

  return (
    <KeyboardHandledScrollView
      style={styles.otpContainer}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <BackButtonComponent />
      <SpacerComponent style={styles.backBtnSeperator} />
      {renderIconComponent()}
      {renderHeadingComponent()}
      {renderSubHeading()}
      {renderOtpInputComponent()}
      {renderDescription()}
      {renderFooterContainer()}
      {renderVerifyOtpButton()}
    </KeyboardHandledScrollView>
  )
}