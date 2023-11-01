import React, { useState, useCallback } from 'react'

import { useRoute } from '@react-navigation/native'
import { get } from 'lodash'
import { View } from 'react-native'
import { batch, useDispatch } from 'react-redux'

import { forgetPswdStyles as styles } from './styles'
import { textColor } from '../../common/Colors'
import { SubHeadingComponent, ButtonComponent, TextInputComponent, SpacerComponent } from '../../common/components'
import { HeadingComponent } from '../../common/components/screens'
import { CrossButtonComponent } from '../../common/components/screens/CrossButtonComponent'
import { ButtonType } from '../../common/Enumerators'
import { SOMETHING_WENT_WRONG } from '../../common/ErrorMessages'
import { ScreenNames } from '../../common/Screens'
import { SET_PASSWORD, BUTTONS } from '../../common/strings'
import { showAndroidToastMessage } from '../../common/Toast'
import { getCreatePasswordErrorMsg } from '../../common/validators/validation-utils'
import { dispatchSetPasswordApi } from '../../redux/forget-password/ForgetPasswordApi'
import { resetFormDataReducer as resetLoginFormReducer } from '../../redux/login/LoginSlice'
import { resetFormDataReducer } from '../../redux/Signup/SignupSlice'
import { navigateSimple } from '../../utils/navigation-utils'
import { dimissKeyboard } from '../../common/App-Utils'


const { TITLE, CREATE_PASSWORD, PASSWORD_LABEL, CONFIRM_PASSWORD_LABEL } = SET_PASSWORD
const { SEND } = BUTTONS

export const SetPasswordScreen = ({ navigation  }) => {

  const [password, setPassword] = useState('')
  const [confmPswd, setConfirmPassword] = useState('')
  const routeParams = useRoute()
  const dispatch = useDispatch()

  const onCrossBtnClicked = useCallback(() => {
    navigateSimple({ screenToNavigate: ScreenNames.LOGIN_SCREEN, navigator: navigation })
  }, [navigation])

  const renderHeaderContainer = () => {
    return (
      <View style={styles.headingContainer}>
        <CrossButtonComponent onPressIcon={onCrossBtnClicked} />
        <HeadingComponent text={ TITLE }
          fontWeight = {'bold'} />
        <View />
      </View>
    )
  }

  const renderDescriptionComponent = () => {
    return (
      <SubHeadingComponent
        text={CREATE_PASSWORD}
        color={textColor.white}
        textStyle={styles.subHeading}
      />
    )
  }

  const renderPasswordTextField = () => {
    return (
      <TextInputComponent
        label={PASSWORD_LABEL}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
    )
  }

  const renderConfirmPasswordTextField = () => {
    return (
      <TextInputComponent
        label={CONFIRM_PASSWORD_LABEL}
        value={confmPswd}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
      />
    )
  }

  const resetPassword = useCallback(() => {
    const passwordErrorMsg = getCreatePasswordErrorMsg(password, confmPswd)
    dimissKeyboard()
    if(passwordErrorMsg.length) {
      showAndroidToastMessage(passwordErrorMsg)
    } else {
      const emailId = get(routeParams, 'params.emailId', '')
      const verificationCode = get(routeParams, 'params.otp', '')
      // make an api call
      dispatchSetPasswordApi(emailId, password,verificationCode).then(() => {
        batch(() => {
          dispatch({ type: resetFormDataReducer.type })
          dispatch({ type: resetLoginFormReducer.type })
        })
      }).catch((err) => {
        showAndroidToastMessage(get(err, 'message', SOMETHING_WENT_WRONG))
      })
    }
  }, [password, confmPswd, routeParams, dispatch])

  const renderResetPswdButton = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
        text={SEND}
        onPress={resetPassword}
      />
    )
  }

  const renderTopSection = () => {
    return (
      <View>
        {renderHeaderContainer()}
        {renderDescriptionComponent()}
        {renderPasswordTextField()}
        <SpacerComponent style={styles.textInputSeperator}/>
        {renderConfirmPasswordTextField()}
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {renderTopSection()}
      {renderResetPswdButton()}
    </View>
  )
}
