import React, { useCallback, useState } from 'react'

import { get } from 'lodash'
import { ToastAndroid, View } from 'react-native'

import { forgetPswdStyles as styles } from './styles'
import { dimissKeyboard } from '../../common/App-Utils'
import { textColor } from '../../common/Colors'
import { SubHeadingComponent, ButtonComponent, TextInputComponent } from '../../common/components'
import { CrossButtonComponent, HeadingComponent } from '../../common/components/screens'
import { log } from '../../common/config/log'
import { ButtonType } from '../../common/Enumerators'
import { ScreenNames } from '../../common/Screens'
import { showAndroidToastMessage } from '../../common/Toast'
import { callForgetPasswordApi } from '../../redux/forget-password/ForgetPasswordApi'
import { goBack, navigateSimple } from '../../utils/navigation-utils'
import { tString } from '../../utils/app-utils'


export const EmailVerifyForgetPassword = ({ navigation }) => {
  const [emailId, updateEmailId] = useState('')

  const onCrossBtnClicked = useCallback(() => {
    goBack(navigation)
  }, [navigation])

  const renderHeaderContainer = () => {
    return (
      <View style={styles.headingContainer}>
        <CrossButtonComponent onPressIcon={onCrossBtnClicked} />
        <HeadingComponent text={ 'FORGET_PASSWORD.TITLE' }
          fontWeight = {'bold'} />
        <View />
      </View>
    )
  }

  const renderDescriptionComponent = () => {
    return (
      <SubHeadingComponent
        text={'FORGET_PASSWORD.DESCRIPTION'}
        color={textColor.white}
        textStyle={styles.subHeading}
      />
    )
  }


  const onChangeEmailId = useCallback((userIp: string) => {
    updateEmailId(userIp)
  }, [])

  const renderEmailTextField = () => {
    return (
      <TextInputComponent
        label={'FORGET_PASSWORD.Email'}
        value={emailId}
        onChangeText={onChangeEmailId}
        placeholder={'FORGET_PASSWORD.EMAIL_PLACEHOLDER'}
        placeholderTextColor={textColor.lightGrey}
      />
    )
  }

  const sendOtpOnEmail = useCallback(() => {
    dimissKeyboard()
    callForgetPasswordApi(emailId)?.then(() => {
      navigateSimple({ navigator: navigation, screenToNavigate: ScreenNames.EMAIL_VERIFICATION, params: {
        emailId, forgetPassword: true
      } })
    }).catch(err => {
      log('sendOtpOnEmail', err)
      showAndroidToastMessage(get(err, 'message', tString('SOMETHING_WENT_WRONG')), ToastAndroid.SHORT, false)

    })
  }, [emailId, navigation])

  const renderSendButton = () => {
    return (
      <ButtonComponent
        buttonType={ButtonType.ROUNDED_BTN_WITH_UNDERLINE_TEXT}
        text={'BUTTONS.SEND'}
        onPress={sendOtpOnEmail}
      />
    )
  }
  const renderTopSection = () => {
    return (
      <View>
        {renderHeaderContainer()}
        {renderDescriptionComponent()}
        {renderEmailTextField()}
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      {renderTopSection()}
      {renderSendButton()}
    </View>
  )

}